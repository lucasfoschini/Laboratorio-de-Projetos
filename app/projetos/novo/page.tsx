"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, FlaskConical, Search, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { projectSchema, type ProjectSchema } from "@/lib/schemas";
import { useCreateProject } from "@/lib/hooks/useQueries";
import { useAuth } from "@/contexts/auth";
import { AREA_LABELS, cn } from "@/lib/utils";
import { usersApi } from "@/lib/api/axios";

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

export default function NovoProjetoPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const createMutation = useCreateProject();
  const [memberSearch, setMemberSearch]       = useState("");
  const [searchResults, setSearchResults]     = useState<any[]>([]);
  const [searching, setSearching]             = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
  const [apiError, setApiError]               = useState("");
  const [selectedAreas, setSelectedAreas]     = useState<string[]>([]);

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: { vacancies: 5, custo: 0 },
  });

  const currentVacancies   = Number(watch("vacancies")) || 1;
  const maxExtraMembers    = Math.max(0, currentVacancies - 1);
  const memberLimitReached = selectedMembers.length >= maxExtraMembers;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/auth/login");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (memberSearch.length < 2) { setSearchResults([]); return; }
    const t = setTimeout(async () => {
      try {
        setSearching(true);
        const { data } = await usersApi.search(memberSearch);
        setSearchResults(Array.isArray(data) ? data : []);
      } catch {
        setSearchResults([]);
      } finally { setSearching(false); }
    }, 400);
    return () => clearTimeout(t);
  }, [memberSearch]);

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) => {
      const next = prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area];
      setValue("area", next[0] || "", { shouldValidate: true });
      return next;
    });
  };

  const addMember = (member: any) => {
    if (selectedMembers.length >= maxExtraMembers) return;
    if (!selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers((prev) => [...prev, member]);
    }
    setMemberSearch(""); setSearchResults([]);
  };

  const removeMember = (id: string) => setSelectedMembers((prev) => prev.filter((m) => m.id !== id));

  const onSubmit = async (data: ProjectSchema) => {
    try {
      setApiError("");
      if (selectedAreas.length === 0) { setApiError("Selecione pelo menos uma área temática."); return; }
      const totalMembers = selectedMembers.length + 1;
      if (totalMembers > Number(data.vacancies)) {
        setApiError(`Você adicionou ${selectedMembers.length} membro${selectedMembers.length !== 1 ? "s" : ""} mas definiu apenas ${data.vacancies} vaga${Number(data.vacancies) !== 1 ? "s" : ""}. Aumente as vagas ou remova membros.`);
        return;
      }
      await createMutation.mutateAsync({
        title:               data.title,
        description:         data.description,
        area:                selectedAreas[0].toUpperCase(),
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
        memberIds:           selectedMembers.map((m) => m.id),
      });
      toast.success("Projeto publicado com sucesso!", {
        description: "Seu projeto já está visível para outros usuários.",
      });
      router.push("/dashboard");
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Erro ao criar projeto.";
      setApiError(msg);
      toast.error("Erro ao publicar projeto", { description: msg });
    }
  };

  if (isLoading) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-brand-600 mb-6 transition-colors group">
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center">
          <FlaskConical size={20} className="text-brand-600" />
        </div>
        <div>
          <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100">Criar Projeto</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Preencha os dados do seu projeto de extensão</p>
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
            <Field label="Áreas temáticas *" error={selectedAreas.length === 0 && errors.area?.message ? "Selecione pelo menos uma área" : undefined}>
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
            <Field label="Tags (separadas por ponto)">
              <input placeholder="Ex: soldagem. mecatrônica. automação" className={inputCls()} {...register("tags")} />
            </Field>
          </div>
        </div>

        {/* ── Vagas e Datas ── */}
        <div className="p-6">
          <h2 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-5">Vagas e prazos</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Vagas disponíveis *" error={errors.vacancies?.message}>
              <input type="number" min={1} max={100} className={inputCls(errors.vacancies?.message)} {...register("vacancies")} />
            </Field>
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
              <textarea rows={3} placeholder="Descreva o escopo técnico e as entregas esperadas..." className={cn("rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-800 dark:text-neutral-100")} {...register("escopo")} />
            </Field>
          </div>
        </div>

        {/* ── Contato ── */}
        <div className="p-6">
          <h2 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-5">Informações de contato</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Facilite o contato de quem tiver interesse no projeto.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="E-mail de contato público" error={errors.contactEmail?.message}>
              <input type="email" placeholder="contato@projeto.com" className={inputCls(errors.contactEmail?.message)} {...register("contactEmail")} />
            </Field>
            <Field label="Informações adicionais">
              <input placeholder="Ex: LinkedIn, WhatsApp do grupo, Discord..." className={inputCls()} {...register("contactInfo")} />
            </Field>
          </div>
        </div>

        {/* ── Membros iniciais ── */}
        <div className="p-6">
          <h2 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-2">Membros do grupo</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            Você é adicionado automaticamente. Pessoas adicionadas aqui entram direto no grupo sem precisar pedir.
            Depois, outros usuários poderão solicitar entrada pelo projeto.
          </p>

          {memberLimitReached && (
            <div className="flex items-center gap-2 p-3 mb-3 rounded-xl bg-warning-50 border border-warning-200 text-warning-700 text-sm">
              Limite atingido — você definiu {currentVacancies} vaga{currentVacancies !== 1 ? "s" : ""} e já
              selecionou {selectedMembers.length} membro{selectedMembers.length !== 1 ? "s" : ""} (+ você).
            </div>
          )}

          {selectedMembers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedMembers.map((m) => (
                <div key={m.id} className="flex items-center gap-1.5 bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 rounded-lg px-2.5 py-1 text-sm text-brand-700 dark:text-brand-300">
                  <span className="font-medium">{m.name}</span>
                  <button type="button" onClick={() => removeMember(m.id)} className="text-brand-400 hover:text-brand-700">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              placeholder="Buscar usuário pelo nome ou e-mail..."
              className="w-full h-10 rounded-xl border border-neutral-300 dark:border-neutral-600 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-800 dark:text-neutral-100"
            />
          </div>

          {searchResults.length > 0 && (
            <div className="mt-1 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-md bg-white dark:bg-neutral-800 overflow-hidden">
              {searchResults.map((u) => (
                <button key={u.id} type="button" onClick={() => addMember(u)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-left transition-colors">
                  <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-brand-700 dark:text-brand-300">{u.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{u.name}</p>
                    <p className="text-xs text-neutral-400">{u.email}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {searching && <p className="text-xs text-neutral-400 mt-2">Buscando usuários...</p>}
        </div>

        {/* ── Actions ── */}
        <div className="px-6 py-4 flex justify-end gap-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-b-2xl">
          <Link href="/dashboard">
            <Button type="button" variant="secondary" size="lg">Cancelar</Button>
          </Link>
          <Button type="submit" size="lg" loading={isSubmitting}>
            {isSubmitting ? "Publicando..." : "Publicar projeto"}
          </Button>
        </div>
      </form>
    </div>
  );
}
