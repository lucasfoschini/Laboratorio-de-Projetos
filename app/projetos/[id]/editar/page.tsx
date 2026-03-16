"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { projectSchema, type ProjectSchema } from "@/lib/schemas";
import { useProject, useUpdateProject } from "@/lib/hooks/useQueries";
import { useAuth } from "@/contexts/auth";
import { AREA_LABELS, cn } from "@/lib/utils";

const AREA_KEYS = [
  "controle_sistemas", "sistemas_mecatronicos", "acionamentos_eletricos",
  "sistemas_inteligentes", "robotica_industrial", "automacao_mecanica",
  "automacao_eletrica", "engenharia_projeto", "manufatura_digital",
  "projeto_computador", "simulacao_computacional",
] as const;


const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</label>
    {children}
    {error && <p className="text-xs text-danger-500">{error}</p>}
  </div>
);

const inputCls = (err?: string) => cn(
  "w-full h-10 rounded-xl border bg-white dark:bg-neutral-800 text-sm px-3 outline-none transition-all dark:text-neutral-100",
  "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
  err && "border-danger-500",
);

export default function EditarProjetoPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const updateMutation = useUpdateProject();
  const [apiError, setApiError]           = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const { data: project, isLoading: projectLoading } = useProject(id);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/auth/login");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!project) return;
    const statusMap: Record<string, NonNullable<ProjectSchema["status"]>> = {
      open:        "ABERTO",
      in_progress: "EM_ANDAMENTO",
      completed:   "FINALIZADO",
    };
    const projectAreas = project.areas?.length
      ? project.areas.map((a: string) => a.toLowerCase())
      : project.area ? [project.area] : [];
    setSelectedAreas(projectAreas);
    reset({
      title:               project.title,
      description:         project.description,
      area:                projectAreas[0] ?? "",
      vacancies:           project.vacancies,
      startDate:           project.startDate           ? new Date(project.startDate).toISOString().slice(0, 10)           : "",
      endDate:             project.endDate             ? new Date(project.endDate).toISOString().slice(0, 10)             : "",
      applicationDeadline: project.applicationDeadline ? new Date(project.applicationDeadline).toISOString().slice(0, 10) : "",
      tempo:               project.tempo        ?? "",
      custo:               project.custo        ?? 0,
      escopo:              project.escopo       ?? "",
      contactEmail:        project.contactEmail ?? "",
      contactInfo:         project.contactInfo  ?? "",
      tags:                (project.tags ?? []).join(", "),
      status:              statusMap[project.status] ?? "ABERTO",
    });
  }, [project, reset]);

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) => {
      const next = prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area];
      setValue("area", next[0] || "", { shouldValidate: true });
      return next;
    });
  };

  const onSubmit = async (data: ProjectSchema) => {
    try {
      setApiError("");
      if (selectedAreas.length === 0) { setApiError("Selecione pelo menos uma área temática."); return; }
      const minVac = project?.enrolled ?? 1;
      if (Number(data.vacancies) < minVac) {
        setApiError(`O projeto já possui ${minVac} membro${minVac !== 1 ? "s" : ""}. Não é possível definir menos vagas.`);
        return;
      }
      await updateMutation.mutateAsync({
        id,
        data: {
          title:               data.title,
          description:         data.description,
          area:                selectedAreas[0].toUpperCase(),
          status:              data.status === "FINALIZADO" ? "FINALIZADO" : undefined,
          areas:               selectedAreas.map((a) => a.toUpperCase()),
          vacancies:           Number(data.vacancies),
          startDate:           data.startDate           ? new Date(data.startDate).toISOString()           : undefined,
          endDate:             data.endDate             ? new Date(data.endDate).toISOString()             : undefined,
          applicationDeadline: data.applicationDeadline ? new Date(data.applicationDeadline).toISOString() : undefined,
          tempo:               data.tempo ?? "A definir",
          custo:               Number(data.custo ?? 0),
          escopo:              data.escopo ?? data.description,
          contactEmail:        data.contactEmail || undefined,
          contactInfo:         data.contactInfo  || undefined,
          tags:                data.tags ? data.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
        },
      });
      router.push(`/projetos/${id}`);
    } catch (err: any) {
      setApiError(err?.response?.data?.message ?? "Erro ao atualizar projeto.");
    }
  };

  if (isLoading || projectLoading) return null;
  if (!project) return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-neutral-400">Projeto não encontrado</div>;
  if (project.ownerId !== user?.id) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-neutral-500 mb-4">Você não tem permissão para editar este projeto.</p>
        <Link href={`/projetos/${id}`}><Button variant="secondary">Voltar ao projeto</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href={`/projetos/${id}`} className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-brand-600 mb-6 transition-colors group">
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Voltar ao projeto
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center">
          <Pencil size={20} className="text-brand-600" />
        </div>
        <div>
          <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100">Editar Projeto</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Atualize as informações do seu projeto</p>
        </div>
      </div>

      {apiError && (
        <div className="mb-4 p-3 rounded-xl bg-danger-50 border border-red-200 text-danger-700 text-sm">{apiError}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-card divide-y divide-neutral-100 dark:divide-neutral-700">

        {/* ── Básico ── */}
        <div className="p-6">
          <h2 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-5">Informações básicas</h2>
          <div className="flex flex-col gap-4">
            <Field label="Título do projeto *" error={errors.title?.message}>
              <input placeholder="Ex: Dispositivo de Soldagem de Braço de Suspensão" className={inputCls(errors.title?.message)} {...register("title")} />
            </Field>
            <Field label="Descrição *" error={errors.description?.message}>
              <textarea rows={4} placeholder="Descreva o objetivo, metodologia e impacto esperado..." className={cn("rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-800 dark:text-neutral-100", errors.description?.message && "border-danger-500")} {...register("description")} />
            </Field>
            <Field label="Áreas temáticas *" error={selectedAreas.length === 0 ? "Selecione pelo menos uma área" : undefined}>
              <input type="hidden" {...register("area")} />
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                {AREA_KEYS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleArea(a)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                      selectedAreas.includes(a)
                        ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                        : "bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600 hover:border-brand-300 hover:text-brand-600"
                    )}
                  >
                    {AREA_LABELS[a]}
                  </button>
                ))}
              </div>
              {selectedAreas.length > 0 && (
                <p className="text-xs text-brand-600 mt-1">{selectedAreas.length} área{selectedAreas.length !== 1 ? "s" : ""} selecionada{selectedAreas.length !== 1 ? "s" : ""}</p>
              )}
            </Field>
            <Field label="Tags (separadas por vírgula)">
              <input placeholder="Ex: soldagem. mecatrônica. automação" className={inputCls()} {...register("tags")} />
            </Field>
          </div>
        </div>

        {/* ── Vagas ── */}
        <div className="p-6">
          <h2 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-5">Vagas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Vagas disponíveis *" error={errors.vacancies?.message}>
              <input type="number" min={project.enrolled ?? 1} max={100} className={inputCls(errors.vacancies?.message)} {...register("vacancies")} />
              {project.enrolled > 0 && (
                <p className="text-xs text-neutral-500 mt-1">
                  Mínimo de <span className="font-semibold text-brand-600">{project.enrolled}</span> vaga{project.enrolled !== 1 ? "s" : ""} (membros atuais)
                </p>
              )}
            </Field>
            <div />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Field label="Data de início">
              <input type="date" className={inputCls()} {...register("startDate")} />
            </Field>
            <Field label="Prazo de inscrição">
              <input type="date" className={inputCls()} {...register("applicationDeadline")} />
            </Field>
          </div>
        </div>

        {/* ── Detalhes técnicos ── */}
        <div className="p-6">
          <h2 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-5">Detalhes técnicos</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Duração estimada" error={errors.tempo?.message}>
              <input placeholder="Ex: 6 meses, 1 ano" className={inputCls(errors.tempo?.message)} {...register("tempo")} />
            </Field>
            <Field label="Custo previsto (R$)">
              <input type="number" min={0} placeholder="0" className={inputCls()} {...register("custo")} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Escopo detalhado">
              <textarea rows={3} placeholder="Descreva o escopo técnico e as entregas esperadas..." className="rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all w-full bg-white dark:bg-neutral-800 dark:text-neutral-100" {...register("escopo")} />
            </Field>
          </div>
        </div>

        {/* ── Contato ── */}
        <div className="p-6">
          <h2 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-5">Informações de contato</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="E-mail de contato público" error={errors.contactEmail?.message}>
              <input type="email" placeholder="contato@projeto.com" className={inputCls(errors.contactEmail?.message)} {...register("contactEmail")} />
            </Field>
            <Field label="Informações adicionais">
              <input placeholder="Ex: LinkedIn, WhatsApp do grupo, Discord..." className={inputCls()} {...register("contactInfo")} />
            </Field>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="px-6 py-4 flex justify-end gap-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-b-2xl">
          <Link href={`/projetos/${id}`}>
            <Button type="button" variant="secondary" size="lg">Cancelar</Button>
          </Link>
          <Button type="submit" size="lg" loading={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </form>
    </div>
  );
}
