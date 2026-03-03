"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, FlaskConical } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Input, Badge, Button, EmptyState, Skeleton } from "@/components/ui";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { AREA_LABELS } from "@/lib/utils";
import { useProjects } from "@/lib/hooks/useQueries";
import { cn } from "@/lib/utils";
import type { Project, ProjectArea, ProjectStatus } from "@/types";

const STATUS_OPTIONS: { value: ProjectStatus | "all"; label: string }[] = [
  { value: "all",         label: "Todos"          },
  { value: "open",        label: "Vagas abertas"  },
  { value: "in_progress", label: "Em andamento"   },
  { value: "completed",   label: "Concluídos"     },
];

const AREA_OPTIONS = [
  { value: "all", label: "Todas as áreas" },
  ...Object.entries(AREA_LABELS).map(([value, label]) => ({ value, label })),
];

const SORT_OPTIONS = [
  { value: "newest",    label: "Mais recentes" },
  { value: "vacancies", label: "Mais vagas"    },
  { value: "alpha",     label: "A–Z"           },
];

export default function ProjetosPage() {
  const [search,      setSearch]      = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [status,      setStatus]      = useState<ProjectStatus | "all">("all");
  const [area,        setArea]        = useState<ProjectArea | "all">("all");
  const [sort,        setSort]        = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const { data: projects = [], isLoading, isError } = useProjects();

  const filtered = useMemo(() => {
    let result = [...projects];

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags?.some((t: string) => t.includes(q)),
      );
    }

    if (status !== "all") result = result.filter((p) => p.status === status);
    if (area   !== "all") result = result.filter((p) => p.area   === area);

    if (sort === "newest")   result.sort((a, b) => b.createdAt?.localeCompare(a.createdAt ?? "") ?? 0);
    if (sort === "vacancies") result.sort((a, b) => (b.vacancies ?? 0) - (a.vacancies ?? 0));
    if (sort === "alpha")    result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [projects, search, status, area, sort]);

  const openCount = projects.filter((p: Project) => p.status === "open").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Page header ───────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <FlaskConical size={18} className="text-brand-600" />
          <span className="text-sm font-semibold text-brand-600 tracking-wide uppercase">Projetos</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl text-neutral-900 dark:text-neutral-100 mb-2">Projetos de Extensão</h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          {isLoading ? "Carregando..." : `${openCount} projeto${openCount !== 1 ? "s" : ""} com vagas abertas neste semestre`}
        </p>
      </div>

      {/* ── Filtros ───────────────────────────────────────────── */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 mb-6 shadow-card">
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-48">
            <Input
              placeholder="Buscar por título, área ou tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          // search input still updates immediately for UI responsiveness
              leftIcon={<Search size={15} />}
            />
          </div>

          <div className="flex items-center gap-1.5">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatus(opt.value as ProjectStatus | "all")}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap",
                  status === opt.value ? "bg-brand-600 text-white shadow-sm" : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <Button variant="secondary" size="sm" onClick={() => setShowFilters(!showFilters)} className={cn(showFilters && "ring-brand-400 text-brand-700")}>
            <SlidersHorizontal size={14} /> Filtros
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700 flex flex-wrap gap-4 items-end animate-fade-in">
            <div>
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">Área temática</p>
              <div className="flex flex-wrap gap-1.5">
                {AREA_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setArea(opt.value as ProjectArea | "all")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium transition-all",
                      area === opt.value ? "bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 ring-1 ring-brand-300 dark:ring-brand-700" : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ml-auto">
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">Ordenar</p>
              <div className="flex gap-1.5">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSort(opt.value)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium transition-all",
                      sort === opt.value ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900" : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {(search || status !== "all" || area !== "all") && (
              <button onClick={() => { setSearch(""); setStatus("all"); setArea("all"); }} className="text-xs text-danger-500 hover:text-danger-700 font-medium">
                Limpar filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Contagem ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">{filtered.length}</span> projeto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Grid ──────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card space-y-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-1.5 w-full mt-4" />
              <div className="flex items-center gap-2 pt-3 border-t border-neutral-100">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <EmptyState icon={<FlaskConical size={24} />} title="Erro ao carregar projetos" description="Verifique sua conexão e tente novamente." />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<FlaskConical size={24} />}
          title="Nenhum projeto encontrado"
          description="Tente ajustar os filtros ou termos de busca."
          action={<Button variant="secondary" size="sm" onClick={() => { setSearch(""); setStatus("all"); setArea("all"); }}>Limpar filtros</Button>}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
