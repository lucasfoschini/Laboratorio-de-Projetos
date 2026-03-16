"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, FlaskConical, Loader2 } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Input, Button, EmptyState, Skeleton } from "@/components/ui";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { AREA_LABELS } from "@/lib/utils";
import { useProjects } from "@/lib/hooks/useQueries";
import { cn } from "@/lib/utils";
import type { ProjectArea, ProjectStatus } from "@/types";

const STATUS_OPTIONS: { value: ProjectStatus | "all"; label: string }[] = [
  { value: "all",         label: "Todos"         },
  { value: "open",        label: "Vagas abertas" },
  { value: "in_progress", label: "Em andamento"  },
  { value: "completed",   label: "Concluídos"    },
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
  const debouncedSearch               = useDebounce(search, 400);
  const [status,      setStatus]      = useState<ProjectStatus | "all">("all");
  const [area,        setArea]        = useState<ProjectArea | "all">("all");
  const [sort,        setSort]        = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProjects();

  // Achata todas as páginas carregadas
  const allProjects = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data],
  );

  // Total e contagem de abertos vêm do backend (primeira página)
  const total     = data?.pages[0]?.total ?? 0;

  // Filtro + ordenação client-side sobre os itens já carregados
  const filtered = useMemo(() => {
    let result = [...allProjects];

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t: string) => t.includes(q)),
      );
    }

    if (status !== "all") result = result.filter((p) => p.status === status);
    if (area !== "all") result = result.filter((p) => {
      const areas = (p as any).areas?.map((a: string) => a.toLowerCase()) ?? [];
      return p.area === area || areas.includes(area);
    });

    if (sort === "newest")    result.sort((a, b) => b.createdAt?.localeCompare(a.createdAt ?? "") ?? 0);
    if (sort === "vacancies") result.sort((a, b) => (b.vacancies ?? 0) - (a.vacancies ?? 0));
    if (sort === "alpha")     result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [allProjects, debouncedSearch, status, area, sort]);

  const openCount        = allProjects.filter((p) => p.status === "open").length;
  const hasActiveFilters = search || status !== "all" || area !== "all";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      {/* ── Page header ── */}
      <div className="mb-5 sm:mb-8">
        <div className="flex items-center gap-2 mb-1">
          <FlaskConical size={15} className="text-brand-600" />
          <span className="text-xs font-semibold text-brand-600 tracking-wide uppercase">Projetos</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-100 mb-1 sm:mb-2">
          Projetos de Extensão
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {isLoading
            ? "Carregando..."
            : `${openCount} projeto${openCount !== 1 ? "s" : ""} com vagas abertas neste semestre`}
        </p>
      </div>

      {/* ── Filtros ── */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-card">

        <div className="flex gap-2">
          <div className="flex-1 min-w-0">
            <Input
              placeholder="Buscar por título, área ou tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={15} />}
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={cn("flex-shrink-0", showFilters && "ring-1 ring-brand-400 text-brand-700")}
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline ml-1">Filtros</span>
          </Button>
        </div>

        {/* Status — scroll horizontal no mobile */}
        <div className="flex gap-1.5 mt-2.5 overflow-x-auto pb-0.5 scrollbar-none">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatus(opt.value as ProjectStatus | "all")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0",
                status === opt.value
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Painel avançado */}
        {showFilters && (
          <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-neutral-100 dark:border-neutral-700 space-y-4">
            <div>
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">Área temática</p>
              <div className="flex flex-wrap gap-1.5">
                {AREA_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setArea(opt.value as ProjectArea | "all")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium transition-all",
                      area === opt.value
                        ? "bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 ring-1 ring-brand-300 dark:ring-brand-700"
                        : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">Ordenar</p>
                <div className="flex gap-1.5 flex-wrap">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSort(opt.value)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-medium transition-all",
                        sort === opt.value
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={() => { setSearch(""); setStatus("all"); setArea("all"); }}
                  className="text-xs text-danger-500 hover:text-danger-700 font-medium self-start sm:self-auto"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Contagem ── */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          {debouncedSearch || status !== "all" || area !== "all" ? (
            <>
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">{filtered.length}</span>
              {" "}de {allProjects.length} carregados
            </>
          ) : (
            <>
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">{total}</span>
              {" "}projeto{total !== 1 ? "s" : ""} encontrado{total !== 1 ? "s" : ""}
            </>
          )}
        </p>
      </div>

      {/* ── Grid ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 shadow-card space-y-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-1.5 w-full mt-4" />
              <div className="flex items-center gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-700">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          icon={<FlaskConical size={24} />}
          title="Erro ao carregar projetos"
          description="Verifique sua conexão e tente novamente."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<FlaskConical size={24} />}
          title="Nenhum projeto encontrado"
          description="Tente ajustar os filtros ou termos de busca."
          action={
            <Button variant="secondary" size="sm" onClick={() => { setSearch(""); setStatus("all"); setArea("all"); }}>
              Limpar filtros
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Botão carregar mais — só aparece se não houver filtro ativo */}
          {hasNextPage && !debouncedSearch && status === "all" && area === "all" && (
            <div className="flex justify-center mt-8">
              <Button
                variant="secondary"
                onClick={() => fetchNextPage()}
                loading={isFetchingNextPage}
                className="min-w-40"
              >
                {isFetchingNextPage ? (
                  <><Loader2 size={14} className="animate-spin" /> Carregando...</>
                ) : (
                  "Carregar mais"
                )}
              </Button>
            </div>
          )}

          {/* Indicador de fim */}
          {!hasNextPage && allProjects.length > 12 && (
            <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-8">
              Todos os {total} projetos foram carregados
            </p>
          )}
        </>
      )}
    </div>
  );
}
