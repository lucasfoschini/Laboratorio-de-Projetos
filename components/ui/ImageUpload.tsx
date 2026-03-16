"use client";

import { useRef, useState } from "react";
import NextImage from "next/image";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CLOUD_NAME  = "dbsn1ch65";
const UPLOAD_PRESET = "labex_uploads";

interface ImageUploadProps {
  value?:       string;
  onChange:     (url: string) => void;
  label?:       string;
  hint?:        string;
  shape?:       "square" | "circle";
  previewSize?: number; // px
  accept?:      string;
  className?:   string;
}

export function ImageUpload({
  value,
  onChange,
  label,
  hint,
  shape      = "square",
  previewSize = 80,
  accept      = "image/*",
  className,
}: ImageUploadProps) {
  const inputRef            = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState("");

  const handleFile = async (file: File) => {
    if (!file) return;

    // Limite 10 MB
    if (file.size > 10 * 1024 * 1024) {
      setError("Arquivo muito grande. Máximo 10 MB.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file",         file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name",    CLOUD_NAME);

      const res  = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body:   formData,
      });

      if (!res.ok) throw new Error("Falha no upload");

      const data = await res.json();
      onChange(data.secure_url);
    } catch {
      setError("Erro ao fazer upload. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const isCircle = shape === "circle";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}

      <div className="flex items-center gap-4">
        {/* Preview */}
        <div
          className={cn(
            "flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-700 border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center",
            isCircle ? "rounded-full" : "rounded-xl",
          )}
          style={{ width: previewSize, height: previewSize }}
        >
          {value ? (
            <NextImage
              src={value}
              alt="preview"
              width={previewSize}
              height={previewSize}
              className={cn("object-cover w-full h-full", isCircle ? "rounded-full" : "rounded-xl")}
            />
          ) : (
            <ImageIcon size={previewSize * 0.35} className="text-neutral-400" />
          )}
        </div>

        {/* Upload area */}
        <div className="flex-1">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "cursor-pointer rounded-xl border-2 border-dashed px-4 py-3 text-center transition-all",
              uploading
                ? "border-brand-300 bg-brand-50 dark:bg-brand-950/30"
                : "border-neutral-300 dark:border-neutral-600 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/20",
            )}
          >
            {uploading ? (
              <div className="flex items-center justify-center gap-2 text-brand-600 text-sm">
                <Loader2 size={16} className="animate-spin" />
                Enviando...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                <Upload size={16} />
                <span>Clique ou arraste uma imagem</span>
              </div>
            )}
          </div>

          {/* URL manual como fallback */}
          <input
            type="url"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ou cole uma URL..."
            className="mt-2 w-full h-9 rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-xs outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-800 dark:text-neutral-100 text-neutral-700"
          />

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="mt-1.5 flex items-center gap-1 text-xs text-danger-500 hover:text-danger-700 transition-colors"
            >
              <X size={12} /> Remover imagem
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-xs text-danger-500">{error}</p>}
      {hint  && !error && <p className="text-xs text-neutral-400">{hint}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
