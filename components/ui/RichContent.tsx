"use client";

import { Fragment } from "react";

/**
 * Renderiza texto com imagens inline e formatação Markdown básica.
 *
 * Formatos suportados:
 *   - **negrito**, *itálico*, ~~tachado~~, `código`
 *   - Markdown: ![alt text](https://example.com/image.png)
 *   - URL puro em linha própria: https://example.com/image.jpg
 *
 * URLs de imagem detectadas automaticamente: .png, .jpg, .jpeg, .gif, .webp, .svg, .bmp
 */

const MD_IMAGE_RE      = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g;
const IMAGE_EXT_RE     = /\.(png|jpe?g|gif|webp|svg|bmp|avif)(\?[^\s]*)?$/i;
const BARE_URL_LINE_RE = /^(https?:\/\/[^\s]+)$/;

// Regex para formatação inline — ** deve vir antes de * para ter precedência
const INLINE_RE = /(\*\*(.+?)\*\*|\*(.+?)\*|~~(.+?)~~|`([^`]+)`)/g;

interface RichContentProps {
  text: string;
  className?: string;
}

type ContentBlock =
  | { type: "text"; value: string }
  | { type: "image"; src: string; alt: string };

/** Renderiza formatação Markdown inline dentro de um trecho de texto puro */
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let key  = 0;
  let m: RegExpExecArray | null;
  INLINE_RE.lastIndex = 0;

  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));

    if      (m[2] !== undefined) parts.push(<strong key={key++} className="font-semibold">{m[2]}</strong>);
    else if (m[3] !== undefined) parts.push(<em key={key++}>{m[3]}</em>);
    else if (m[4] !== undefined) parts.push(<del key={key++} className="opacity-60">{m[4]}</del>);
    else if (m[5] !== undefined) parts.push(
      <code key={key++} className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-700 text-[0.85em] font-mono">
        {m[5]}
      </code>
    );

    last = INLINE_RE.lastIndex;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
}

function parseContent(raw: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  // 1. Replace markdown images with placeholder tokens and collect them
  const images: { src: string; alt: string }[] = [];
  let processed = raw.replace(MD_IMAGE_RE, (_match, alt, src) => {
    const idx = images.length;
    images.push({ src, alt });
    return `\x00IMG[${idx}]\x00`;
  });

  // 2. Split by lines to detect bare image URLs
  const lines      = processed.split("\n");
  const finalLines: string[] = [];

  for (const line of lines) {
    const trimmed  = line.trim();
    const bareMatch = trimmed.match(BARE_URL_LINE_RE);
    if (bareMatch && IMAGE_EXT_RE.test(bareMatch[1])) {
      const idx = images.length;
      images.push({ src: bareMatch[1], alt: "" });
      finalLines.push(`\x00IMG[${idx}]\x00`);
    } else {
      finalLines.push(line);
    }
  }

  processed = finalLines.join("\n");

  // 3. Split by image tokens and build blocks
  const parts = processed.split(/\x00IMG\[(\d+)\]\x00/);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (parts[i]) blocks.push({ type: "text", value: parts[i] });
    } else {
      const img = images[parseInt(parts[i])];
      if (img) blocks.push({ type: "image", src: img.src, alt: img.alt });
    }
  }

  return blocks;
}

export function RichContent({ text, className }: RichContentProps) {
  const blocks = parseContent(text);

  return (
    <div className={className}>
      {blocks.map((block, idx) => (
        <Fragment key={idx}>
          {block.type === "text" ? (
            <span className="whitespace-pre-line break-words">{renderInline(block.value)}</span>
          ) : (
            <figure className="my-4">
              <img
                src={block.src}
                alt={block.alt || "Imagem da publicação"}
                className="max-w-full h-auto rounded-xl object-contain shadow-card block"
                loading="lazy"
              />
              {block.alt && (
                <figcaption className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-2 italic">
                  {block.alt}
                </figcaption>
              )}
            </figure>
          )}
        </Fragment>
      ))}
    </div>
  );
}
