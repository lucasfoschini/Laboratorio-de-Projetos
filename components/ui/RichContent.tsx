"use client";

import { Fragment } from "react";

/**
 * Renderiza texto com imagens inline.
 *
 * Formatos suportados:
 *   - Markdown: ![alt text](https://example.com/image.png)
 *   - URL puro em linha própria: https://example.com/image.jpg
 *
 * URLs de imagem detectadas automaticamente: .png, .jpg, .jpeg, .gif, .webp, .svg, .bmp
 */

const MD_IMAGE_RE = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g;
const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|svg|bmp|avif)(\?[^\s]*)?$/i;
const BARE_URL_LINE_RE = /^(https?:\/\/[^\s]+)$/;

interface RichContentProps {
  text: string;
  className?: string;
}

type ContentBlock =
  | { type: "text"; value: string }
  | { type: "image"; src: string; alt: string };

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
  const lines = processed.split("\n");
  const finalLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
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
      // text part
      if (parts[i]) {
        blocks.push({ type: "text", value: parts[i] });
      }
    } else {
      // image index
      const img = images[parseInt(parts[i])];
      if (img) {
        blocks.push({ type: "image", src: img.src, alt: img.alt });
      }
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
            <span className="whitespace-pre-line break-words">{block.value}</span>
          ) : (
            <figure className="my-4">
              <img
                src={block.src}
                alt={block.alt || "Imagem da publicação"}
                className="w-full max-w-2xl mx-auto h-auto rounded-xl object-contain shadow-card"
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
