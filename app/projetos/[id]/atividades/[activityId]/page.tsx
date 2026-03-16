"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckSquare, Square, Trash2, Clock, User } from "lucide-react";
import { Button, Avatar, Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useActivity, useToggleActivity, useDeleteActivity } from "@/lib/hooks/useQueries";
import { useAuth } from "@/contexts/auth";

export default function AtividadeDetalhePage() {
  const { id: projectId, activityId } = useParams<{ id: string; activityId: string }>();
  const { user } = useAuth();
  const router = useRouter();

  const { data: activity, isLoading } = useActivity(projectId, activityId);
  const toggleMut = useToggleActivity();
  const deleteMut = useDeleteActivity();

  if (isLoading) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Skeleton className="h-5 w-32 mb-6" />
      <Skeleton className="h-8 w-2/3 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );

  if (!activity) return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <p className="text-neutral-400 mb-4">Atividade não encontrada ou sem permissão.</p>
      <Link href={`/projetos/${projectId}`}><Button variant="secondary">Voltar ao projeto</Button></Link>
    </div>
  );

  const isOwner      = user?.id === activity.project?.ownerId;
  const isResponsible = (activity.responsibles ?? []).some((r: any) => r.id === user?.id);
  const isOverdue    = !activity.done && new Date(activity.dueDate) < new Date();
  const canToggle    = isOwner || isResponsible;

  const handleDelete = async () => {
    if (!confirm(`Excluir a atividade "${activity.title}"?`)) return;
    await deleteMut.mutateAsync({ projectId, activityId });
    router.push(`/projetos/${projectId}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href={`/projetos/${projectId}`}
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-brand-600 mb-6 transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Voltar ao projeto
      </Link>

      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-card">
        {/* Status badge */}
        <div className="flex items-center gap-2 mb-4">
          {activity.done ? (
            <span className="text-xs bg-success-50 text-success-700 border border-success-200 px-2.5 py-1 rounded-full font-semibold">Concluída</span>
          ) : isOverdue ? (
            <span className="text-xs bg-danger-50 text-danger-700 border border-danger-200 px-2.5 py-1 rounded-full font-semibold">Atrasada</span>
          ) : (
            <span className="text-xs bg-brand-50 text-brand-700 border border-brand-200 px-2.5 py-1 rounded-full font-semibold">Em andamento</span>
          )}
          <span className="text-xs text-neutral-400">{activity.project?.title}</span>
        </div>

        {/* Título */}
        <h1 className={cn("font-display font-extrabold text-2xl mb-3", activity.done ? "line-through text-neutral-400" : "text-neutral-900 dark:text-neutral-100")}>
          {activity.title}
        </h1>

        {/* Descrição */}
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">{activity.description}</p>

        {/* Meta */}
        <div className="flex flex-col gap-3 p-4 bg-neutral-50 dark:bg-neutral-700/30 rounded-xl border border-neutral-100 dark:border-neutral-700 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={15} className={cn(isOverdue && !activity.done ? "text-danger-500" : "text-neutral-400")} />
            <span className="text-neutral-500 dark:text-neutral-400">Prazo:</span>
            <span className={cn("font-semibold", isOverdue && !activity.done ? "text-danger-600" : "text-neutral-700 dark:text-neutral-300")}>
              {new Date(activity.dueDate).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <User size={15} className="text-neutral-400 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-neutral-500 dark:text-neutral-400">Responsáveis:</span>
              <div className="flex flex-wrap gap-2">
                {(activity.responsibles ?? []).map((r: any) => (
                  <div key={r.id} className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-lg px-2 py-1">
                    <Avatar name={r.name} size="sm" src={r.avatar} />
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300 text-xs">{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={15} className="text-neutral-400" />
            <span className="text-neutral-500 dark:text-neutral-400">Criada em:</span>
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              {new Date((activity as any).createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-3">
          {canToggle && (
            <Button
              variant={activity.done ? "secondary" : "primary"}
              loading={toggleMut.isPending}
              onClick={() => toggleMut.mutate({ projectId, activityId })}
              className="flex-1"
            >
              {activity.done
                ? <><Square size={16} /> Reabrir atividade</>
                : <><CheckSquare size={16} /> Marcar como concluída</>
              }
            </Button>
          )}
          {isOwner && (
            <Button
              variant="secondary"
              loading={deleteMut.isPending}
              onClick={handleDelete}
              className="text-danger-500 hover:text-danger-700 hover:bg-danger-50 border-danger-200"
            >
              <Trash2 size={15} /> Excluir
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
