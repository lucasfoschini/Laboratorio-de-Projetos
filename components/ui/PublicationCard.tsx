"use client";

import Link from "next/link";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, FileText, Presentation, BookOpen, GraduationCap, Trash2, Pencil } from "lucide-react";
import { Badge, Avatar } from "@/components/ui";
import { TYPE_LABELS } from "@/lib/utils";
import { publicationsApi } from "@/lib/api/axios";
import { adaptPublication } from "@/lib/adapters";
import type { Publication } from "@/types";

const TYPE_ICON: Record<string, React.ReactNode> = {
  article:      <FileText size={16} />,
  report:       <BookOpen size={16} />,
  presentation: <Presentation size={16} />,
  thesis:       <GraduationCap size={16} />,
};

const TYPE_COLOR: Record<string, "brand" | "success" | "warning" | "neutral"> = {
  article:      "brand",
  report:       "success",
  presentation: "warning",
  thesis:       "neutral",
};

interface PublicationCardProps {
  publication: Publication;
  canDelete?: boolean;
  canEdit?: boolean;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export function PublicationCard({ publication, canDelete, canEdit, onDelete, isDeleting }: PublicationCardProps) {
  const queryClient = useQueryClient();

  const handleMouseEnter = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ["publication", publication.id],
      queryFn: async () => {
        const { data } = await publicationsApi.byId(publication.id);
        return adaptPublication(data);
      },
      staleTime: 1000 * 60 * 5,
    });
  }, [queryClient, publication.id]);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter}>
      {/* Botões de ação — canto superior direito */}
      {(canEdit || (canDelete && onDelete)) && (
        <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
          {canEdit && (
            <Link
              href={`/publicacoes/${publication.id}/editar`}
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg text-neutral-300 dark:text-neutral-600 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-all"
              title="Editar publicação"
            >
              <Pencil size={15} />
            </Link>
          )}
          {canDelete && onDelete && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (confirm("Tem certeza que deseja excluir esta publicação?")) onDelete(publication.id); }}
              disabled={isDeleting}
              className="p-1.5 rounded-lg text-neutral-300 dark:text-neutral-600 hover:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-all disabled:opacity-50"
              title="Excluir publicação"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      )}

      <Link href={`/publicacoes/${publication.id}`} className="block group">
        <article className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200">
          {/* Header row */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
              {TYPE_ICON[publication.type]}
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Badge variant={TYPE_COLOR[publication.type]}>{TYPE_LABELS[publication.type]}</Badge>
                <span className="text-xs text-neutral-400">{publication.year}</span>
              </div>
              <h3 className="font-display font-bold text-neutral-900 dark:text-neutral-100 text-[15px] leading-snug group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors line-clamp-2 break-words">
                {publication.title}
              </h3>
            </div>
          </div>

          {/* Abstract */}
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3 mb-4 break-words overflow-hidden">
            {publication.abstract}
          </p>

          {/* Authors */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-1.5">
              {publication.authors.slice(0, 3).map((a) => (
                <Avatar key={a.id} name={a.name} size="sm" src={(a as any).avatar} />
              ))}
            </div>
            <span className="text-xs text-neutral-500">
              {publication.authors.map((a) => a.name.split(" ").at(-1)).join(", ")}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {publication.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 font-medium">
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              {publication.project && (
                <span className="text-xs text-brand-600 dark:text-brand-400 font-medium truncate max-w-[200px]">
                  → {publication.project.title}
                </span>
              )}
            </div>
            <span className="text-brand-500 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight size={16} />
            </span>
          </div>
        </article>
      </Link>
    </div>
  );
}
