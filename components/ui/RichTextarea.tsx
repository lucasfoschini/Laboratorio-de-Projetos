"use client";

import { useRef, useState, useEffect } from "react";
import { Bold, Italic, Strikethrough, Code } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  minRows?: number;
  className?: string;
  textareaClassName?: string;
  required?: boolean;
  name?: string;
}

const TOOLS = [
  { icon: Bold,          label: "Negrito",  before: "**", after: "**" },
  { icon: Italic,        label: "Itálico",  before: "*",  after: "*"  },
  { icon: Strikethrough, label: "Tachado",  before: "~~", after: "~~" },
  { icon: Code,          label: "Código",   before: "`",  after: "`"  },
] as const;

function applyFormat(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string,
  onChange: (v: string) => void
) {
  const start  = textarea.selectionStart;
  const end    = textarea.selectionEnd;
  const text   = textarea.value;
  const sel    = text.slice(start, end);

  // Toggle: se já tem a marcação ao redor, remove; senão, adiciona
  const before_ = text.slice(start - before.length, start);
  const after_  = text.slice(end, end + after.length);
  if (before_ === before && after_ === after) {
    const newText = text.slice(0, start - before.length) + sel + text.slice(end + after.length);
    onChange(newText);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start - before.length, end - before.length);
    });
  } else {
    const newText = text.slice(0, start) + before + sel + after + text.slice(end);
    onChange(newText);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    });
  }
}

export function RichTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  minRows = 4,
  className,
  textareaClassName,
  required,
  name,
}: RichTextareaProps) {
  const ref     = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);

  // Auto-resize: cresce conforme o conteúdo
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 20;
    const minH = lineHeight * minRows + 24; // padding
    el.style.height = `${Math.max(el.scrollHeight, minH)}px`;
  }, [value, minRows]);

  return (
    <div className={cn("flex flex-col", className)}>
      {/* ── Toolbar ── */}
      <div
        className={cn(
          "flex items-center gap-0.5 px-2 py-1 rounded-t-xl border border-b-0 transition-colors",
          focused
            ? "border-brand-500 bg-brand-50/50 dark:bg-brand-950/30"
            : "border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700/40"
        )}
      >
        {TOOLS.map(({ icon: Icon, label, before, after }) => (
          <button
            key={label}
            type="button"
            title={label}
            onMouseDown={(e) => {
              e.preventDefault(); // mantém o foco no textarea
              if (ref.current) applyFormat(ref.current, before, after, onChange);
            }}
            className="p-1.5 rounded-lg text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all"
          >
            <Icon size={13} />
          </button>
        ))}
        <span className="ml-auto text-[10px] text-neutral-300 dark:text-neutral-600 pr-1 hidden sm:block select-none">
          **negrito** *itálico*
        </span>
      </div>

      {/* ── Textarea ── */}
      <textarea
        ref={ref}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ overflowY: "hidden" }}
        className={cn(
          "w-full rounded-b-xl border border-t-0 p-3 text-sm resize-y outline-none transition-colors bg-white dark:bg-neutral-800 dark:text-neutral-100",
          focused
            ? "border-brand-500 ring-2 ring-brand-500/20"
            : "border-neutral-300 dark:border-neutral-600",
          textareaClassName
        )}
      />
    </div>
  );
}
