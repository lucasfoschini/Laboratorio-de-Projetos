"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProjects } from "@/lib/hooks/useQueries";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Skeleton } from "@/components/ui";
import type { Project } from "@/types";

export function ProjectsPreview() {
  const { data, isLoading } = useProjects();

  // useProjects usa useInfiniteQuery — achata a primeira página
  const allProjects = data?.pages.flatMap((p) => p.data) ?? [];
  const featured    = allProjects.filter((p: Project) => p.status === "open").slice(0, 3);

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-xl text-neutral-800 dark:text-neutral-200">Projetos com vagas abertas</h2>
        <Link href="/projetos" className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 flex items-center gap-1 transition-colors">
          Ver todos <ArrowRight size={14} />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card space-y-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-1.5 w-full mt-4" />
            </div>
          ))}
        </div>
      ) : featured.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-neutral-400 text-sm">
          Nenhum projeto com vagas abertas no momento.
        </div>
      )}
    </section>
  );
}
