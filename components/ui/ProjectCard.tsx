"use client";

import Link from "next/link";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Cpu, Heart, BookOpen, Leaf, Scale, Palette, Wrench, Users } from "lucide-react";
import { Badge, Avatar } from "@/components/ui";
import { cn, AREA_LABELS, STATUS_LABELS } from "@/lib/utils";
import { projectsApi } from "@/lib/api/axios";
import { adaptProject } from "@/lib/adapters";
import type { Project } from "@/types";

const STATUS_VARIANT: Record<string, "success" | "warning" | "neutral" | "brand"> = {
  open:        "success",
  in_progress: "brand",
  closed:      "neutral",
  completed:   "neutral",
};

const AREA_COLORS: Record<string, string> = {
  technology:  "bg-violet-50 text-violet-700",
  health:      "bg-rose-50 text-rose-700",
  education:   "bg-amber-50 text-amber-700",
  environment: "bg-emerald-50 text-emerald-700",
  law:         "bg-sky-50 text-sky-700",
  arts:        "bg-pink-50 text-pink-700",
  engineering: "bg-orange-50 text-orange-700",
  social:      "bg-teal-50 text-teal-700",
};

const AREA_ICON: Record<string, React.ElementType> = {
  technology:  Cpu,
  health:      Heart,
  education:   BookOpen,
  environment: Leaf,
  law:         Scale,
  arts:        Palette,
  engineering: Wrench,
  social:      Users,
};

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "compact";
}

export function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  const queryClient = useQueryClient();
  const Icon = AREA_ICON[project.area] ?? Cpu;
  const enrolled  = project.enrolled  ?? 0;
  const vacancies = project.vacancies ?? 0;
  const openSlots = Math.max(0, vacancies - enrolled);
  const isFull    = openSlots === 0;
  const occupancyPct = vacancies > 0 ? Math.min(100, Math.round((enrolled / vacancies) * 100)) : 100;

  const creator = (project as any).owner ?? (project as any).professor;

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ["project", project.id],
      queryFn: async () => {
        const { data } = await projectsApi.byId(project.id);
        return adaptProject(data);
      },
      staleTime: 1000 * 60 * 2, // não re-busca se já tem cache de até 2 min
    });
  };

  if (variant === "compact") {
    return (
      <Link
        href={`/projetos/${project.id}`}
        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-all border border-transparent hover:border-neutral-200"
      >
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", AREA_COLORS[project.area])}>
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-800 truncate group-hover:text-brand-600 transition-colors">
            {project.title}
          </p>
          <p className="text-xs text-neutral-400 mt-0.5">{creator?.name}</p>
        </div>
        <Badge variant={STATUS_VARIANT[project.status]}>{STATUS_LABELS[project.status]}</Badge>
      </Link>
    );
  }

  return (
    <Link href={`/projetos/${project.id}`} className="group block">
      <article className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-1.5">
            {((project as any).areas?.length ? (project as any).areas.map((a: string) => a.toLowerCase()) : [project.area]).map((a: string) => (
              <div key={a} className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold", AREA_COLORS[a] || "bg-neutral-100 text-neutral-600")}>
                {AREA_LABELS[a] || a}
              </div>
            ))}
          </div>
          <Badge variant={STATUS_VARIANT[project.status]}>{STATUS_LABELS[project.status]}</Badge>
        </div>

        <h3 className="font-display font-bold text-neutral-900 dark:text-neutral-100 text-[15px] leading-snug mb-2 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors line-clamp-2 break-words">
          {project.title}
        </h3>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(project.tags ?? []).slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 font-medium">
              #{tag}
            </span>
          ))}
          {(project.tags ?? []).length > 3 && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Barra de vagas — só quando projeto está aberto ou em andamento */}
        {(project.status === "open" || project.status === "in_progress") && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-neutral-400">{enrolled}/{vacancies} membro{enrolled !== 1 ? "s" : ""}</span>
              {isFull ? (
                <span className="font-semibold text-danger-500">Lotado</span>
              ) : (
                <span className="font-semibold text-success-600">{openSlots} vaga{openSlots !== 1 ? "s" : ""} aberta{openSlots !== 1 ? "s" : ""}</span>
              )}
            </div>
            <div className={cn("rounded-full overflow-hidden transition-all", isFull ? "h-2.5 bg-danger-100" : "h-1.5 bg-neutral-100")}>
              <div
                className={cn("h-full rounded-full transition-all", isFull ? "bg-danger-400" : "bg-brand-400")}
                style={{ width: `${occupancyPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Rodapé com criador */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-700">
          <div className="flex items-center gap-2">
            {creator ? (
              <>
                {creator.avatar ? (
                  <Image
                    src={creator.avatar}
                    alt={creator.name}
                    width={24}
                    height={24}
                    className="rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-brand-700 dark:text-brand-300">
                      {creator.name?.split(" ").slice(0,2).map((n: string) => n[0]).join("").toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 leading-none">
                    {creator.name?.replace(/Prof\.?ª?\s*(Dr|Dra)?\.?\s*/gi, "") ?? ""}
                  </p>
                  {creator.department && (
                    <p className="text-[10px] text-neutral-400 mt-0.5">{creator.department}</p>
                  )}
                </div>
              </>
            ) : (
              <span className="text-xs text-neutral-400">—</span>
            )}
          </div>
          <span className="text-brand-500 group-hover:translate-x-0.5 transition-transform">
            <ArrowRight size={16} />
          </span>
        </div>
      </article>
    </Link>
  );
}
