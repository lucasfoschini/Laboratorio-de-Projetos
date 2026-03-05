"use client";

import { useState, useMemo } from "react";
import { BookOpen, Plus, Search, X, AlertCircle, ChevronDown, UserPlus } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Input, Button, EmptyState, Skeleton } from "@/components/ui";
import { PublicationCard } from "@/components/ui/PublicationCard";
import { TYPE_LABELS } from "@/lib/utils";
import { usePublications, useCreatePublication, useDashboardProjects, useDeletePublication, useProject } from "@/lib/hooks/useQueries";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";
import type { PublicationType } from "@/types";

const TYPE_OPTIONS: { value: PublicationType | "all"; label: string }[] = [
  { value: "all",          label: "Todos"          },
  { value: "article",      label: "Artigos"        },
  { value: "report",       label: "Relatórios"     },
  { value: "presentation", label: "Apresentações"  },
  { value: "thesis",       label: "TCC/Monografia" },
];

/* ── Formulários por tipo ────────────────────────────────────────── */

function FieldGroup({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}{required && <span className="text-danger-500 ml-0.5">*</span>}</label>
      {children}
    </div>
  );
}

const inp = "w-full h-10 rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-white dark:bg-neutral-800 dark:text-neutral-100";
const ta  = "w-full rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-white dark:bg-neutral-800 dark:text-neutral-100";
const sel = "h-10 w-full rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm bg-white dark:bg-neutral-800 dark:text-neutral-100 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all";

function FormArticle({ form, set, projects }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <FieldGroup label="Título" required><input className={inp} value={form.title} onChange={e => set({ ...form, title: e.target.value })} placeholder="Título do artigo" /></FieldGroup>
      <FieldGroup label="Ano" required><input type="number" min="1900" max="2100" className={inp} value={form.year} onChange={e => set({ ...form, year: e.target.value })} /></FieldGroup>
      <FieldGroup label="Resumo / Abstract" required><textarea rows={3} className={cn(ta, "md:col-span-2")} value={form.abstract} onChange={e => set({ ...form, abstract: e.target.value })} placeholder="Descreva o conteúdo e contribuições..." /></FieldGroup>
      <FieldGroup label="Autores (nomes separados por vírgula)"><input className={inp} value={form.authors} onChange={e => set({ ...form, authors: e.target.value })} placeholder="Ex: João Silva, Maria Santos" /></FieldGroup>
      <FieldGroup label="Projeto vinculado" required>
        <select className={sel} value={form.projectId} onChange={e => set({ ...form, projectId: e.target.value })}>
          <option value="">Selecione um projeto</option>
          {projects.map((p: any) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </FieldGroup>
      <FieldGroup label="Revista / Evento"><input className={inp} value={form.journal} onChange={e => set({ ...form, journal: e.target.value })} placeholder="Ex: IEEE Transactions, SBRC 2024" /></FieldGroup>
      <FieldGroup label="DOI"><input className={inp} value={form.doi} onChange={e => set({ ...form, doi: e.target.value })} placeholder="10.xxxx/xxxxx" /></FieldGroup>
      <FieldGroup label="Link Zenodo"><input className={inp} value={form.zenodoLink} onChange={e => set({ ...form, zenodoLink: e.target.value })} placeholder="https://zenodo.org/..." /></FieldGroup>
      <FieldGroup label="Palavras-chave (separadas por vírgula)"><input className={inp} value={form.tags} onChange={e => set({ ...form, tags: e.target.value })} placeholder="Ex: iot, machine learning" /></FieldGroup>
    </div>
  );
}

function FormReport({ form, set, projects }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <FieldGroup label="Título" required><input className={inp} value={form.title} onChange={e => set({ ...form, title: e.target.value })} placeholder="Título do relatório" /></FieldGroup>
      <FieldGroup label="Ano" required><input type="number" min="1900" max="2100" className={inp} value={form.year} onChange={e => set({ ...form, year: e.target.value })} /></FieldGroup>
      <FieldGroup label="Resumo" required><textarea rows={3} className={ta} value={form.abstract} onChange={e => set({ ...form, abstract: e.target.value })} placeholder="Descreva o conteúdo..." /></FieldGroup>
      <div className="flex flex-col gap-4">
        <FieldGroup label="Autores *"><input className={inp} value={form.authors} onChange={e => set({ ...form, authors: e.target.value })} placeholder="Nomes separados por vírgula" /></FieldGroup>
        <FieldGroup label="Projeto vinculado" required>
          <select className={sel} value={form.projectId} onChange={e => set({ ...form, projectId: e.target.value })}>
            <option value="">Selecione um projeto</option>
            {projects.map((p: any) => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </FieldGroup>
      </div>
      <FieldGroup label="Orientador (se houver)"><input className={inp} value={form.advisor} onChange={e => set({ ...form, advisor: e.target.value })} placeholder="Nome do orientador" /></FieldGroup>
      <FieldGroup label="Tipo de relatório">
        <select className={sel} value={form.reportType} onChange={e => set({ ...form, reportType: e.target.value })}>
          <option value="">Selecione</option>
          <option value="Técnico">Técnico</option>
          <option value="Parcial">Parcial</option>
          <option value="Final">Final</option>
        </select>
      </FieldGroup>
      <FieldGroup label="Versão (ex: v1.0, v2.0)"><input className={inp} value={form.version} onChange={e => set({ ...form, version: e.target.value })} placeholder="v1.0" /></FieldGroup>
      <FieldGroup label="Número do relatório"><input className={inp} value={form.reportNumber} onChange={e => set({ ...form, reportNumber: e.target.value })} placeholder="Ex: REL-2025-001" /></FieldGroup>
      <FieldGroup label="Instituição"><input className={inp} value={form.institution} onChange={e => set({ ...form, institution: e.target.value })} placeholder="Nome da instituição" /></FieldGroup>
      <FieldGroup label="Link do PDF / Arquivo"><input className={inp} value={form.zenodoLink} onChange={e => set({ ...form, zenodoLink: e.target.value })} placeholder="https://..." /></FieldGroup>
      <FieldGroup label="DOI (se publicado)"><input className={inp} value={form.doi} onChange={e => set({ ...form, doi: e.target.value })} placeholder="10.xxxx/xxxxx" /></FieldGroup>
      <FieldGroup label="Palavras-chave"><input className={inp} value={form.tags} onChange={e => set({ ...form, tags: e.target.value })} placeholder="Separadas por vírgula" /></FieldGroup>
    </div>
  );
}

function FormPresentation({ form, set, projects }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <FieldGroup label="Título" required><input className={inp} value={form.title} onChange={e => set({ ...form, title: e.target.value })} placeholder="Título da apresentação" /></FieldGroup>
      <FieldGroup label="Data" required><input type="date" className={inp} value={form.eventDate} onChange={e => set({ ...form, eventDate: e.target.value })} /></FieldGroup>
      <FieldGroup label="Resumo" required><textarea rows={3} className={ta} value={form.abstract} onChange={e => set({ ...form, abstract: e.target.value })} placeholder="Descreva o conteúdo..." /></FieldGroup>
      <div className="flex flex-col gap-4">
        <FieldGroup label="Apresentadores *"><input className={inp} value={form.authors} onChange={e => set({ ...form, authors: e.target.value })} placeholder="Nomes separados por vírgula" /></FieldGroup>
        <FieldGroup label="Evento *"><input className={inp} value={form.journal} onChange={e => set({ ...form, journal: e.target.value })} placeholder="Ex: SBRC 2025, TechConf..." /></FieldGroup>
      </div>
      <FieldGroup label="Projeto vinculado">
        <select className={sel} value={form.projectId} onChange={e => set({ ...form, projectId: e.target.value })}>
          <option value="">Selecione um projeto</option>
          {projects.map((p: any) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </FieldGroup>
      <FieldGroup label="Tipo de apresentação">
        <select className={sel} value={form.presentationType} onChange={e => set({ ...form, presentationType: e.target.value })}>
          <option value="">Selecione</option>
          <option value="Oral">Oral</option>
          <option value="Pôster">Pôster</option>
          <option value="Demo">Demo</option>
        </select>
      </FieldGroup>
      <FieldGroup label="Local"><input className={inp} value={form.location} onChange={e => set({ ...form, location: e.target.value })} placeholder="Cidade, Estado ou Online" /></FieldGroup>
      <FieldGroup label="Carga horária (horas)"><input type="number" min="0" className={inp} value={form.workload} onChange={e => set({ ...form, workload: e.target.value })} placeholder="Ex: 4" /></FieldGroup>
      <FieldGroup label="Link do arquivo (PDF/PPT)"><input className={inp} value={form.zenodoLink} onChange={e => set({ ...form, zenodoLink: e.target.value })} placeholder="https://..." /></FieldGroup>
      <FieldGroup label="Link do certificado"><input className={inp} value={form.certificate} onChange={e => set({ ...form, certificate: e.target.value })} placeholder="https://..." /></FieldGroup>
      <FieldGroup label="Tags"><input className={inp} value={form.tags} onChange={e => set({ ...form, tags: e.target.value })} placeholder="Separadas por vírgula" /></FieldGroup>
    </div>
  );
}

function FormThesis({ form, set, projects }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <FieldGroup label="Título" required><input className={inp} value={form.title} onChange={e => set({ ...form, title: e.target.value })} placeholder="Título do TCC/monografia" /></FieldGroup>
      <FieldGroup label="Ano" required><input type="number" min="1900" max="2100" className={inp} value={form.year} onChange={e => set({ ...form, year: e.target.value })} /></FieldGroup>
      <FieldGroup label="Resumo" required><textarea rows={3} className={ta} value={form.abstract} onChange={e => set({ ...form, abstract: e.target.value })} placeholder="Descreva o conteúdo e contribuições..." /></FieldGroup>
      <div className="flex flex-col gap-4">
        <FieldGroup label="Autor *"><input className={inp} value={form.authors} onChange={e => set({ ...form, authors: e.target.value })} placeholder="Nome do autor" /></FieldGroup>
        <FieldGroup label="Orientador *"><input className={inp} value={form.advisor} onChange={e => set({ ...form, advisor: e.target.value })} placeholder="Nome do orientador" /></FieldGroup>
      </div>
      <FieldGroup label="Curso *"><input className={inp} value={form.course} onChange={e => set({ ...form, course: e.target.value })} placeholder="Ex: Engenharia de Computação" /></FieldGroup>
      <FieldGroup label="Instituição *"><input className={inp} value={form.institution} onChange={e => set({ ...form, institution: e.target.value })} placeholder="Nome da universidade/faculdade" /></FieldGroup>
      <FieldGroup label="Área de pesquisa *"><input className={inp} value={form.researchArea} onChange={e => set({ ...form, researchArea: e.target.value })} placeholder="Ex: Inteligência Artificial" /></FieldGroup>
      <FieldGroup label="Projeto vinculado">
        <select className={sel} value={form.projectId} onChange={e => set({ ...form, projectId: e.target.value })}>
          <option value="">Selecione um projeto</option>
          {projects.map((p: any) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </FieldGroup>
      <FieldGroup label="Coorientador"><input className={inp} value={form.coAdvisor} onChange={e => set({ ...form, coAdvisor: e.target.value })} placeholder="Nome do coorientador (se houver)" /></FieldGroup>
      <FieldGroup label="Número de páginas"><input type="number" min="1" className={inp} value={form.pages} onChange={e => set({ ...form, pages: e.target.value })} placeholder="Ex: 98" /></FieldGroup>
      <FieldGroup label="Banca examinadora"><input className={inp} value={form.committee} onChange={e => set({ ...form, committee: e.target.value })} placeholder="Membros separados por vírgula" /></FieldGroup>
      <FieldGroup label="Nota final"><input className={inp} value={form.grade} onChange={e => set({ ...form, grade: e.target.value })} placeholder="Ex: 9.5 ou Aprovado" /></FieldGroup>
      <FieldGroup label="Link do PDF (arquivo final)"><input className={inp} value={form.zenodoLink} onChange={e => set({ ...form, zenodoLink: e.target.value })} placeholder="https://..." /></FieldGroup>
      <FieldGroup label="DOI (se publicado)"><input className={inp} value={form.doi} onChange={e => set({ ...form, doi: e.target.value })} placeholder="10.xxxx/xxxxx" /></FieldGroup>
      <FieldGroup label="Repositório GitHub"><input className={inp} value={form.github} onChange={e => set({ ...form, github: e.target.value })} placeholder="https://github.com/..." /></FieldGroup>
      <FieldGroup label="Palavras-chave" required><input className={inp} value={form.tags} onChange={e => set({ ...form, tags: e.target.value })} placeholder="Separadas por vírgula" /></FieldGroup>
    </div>
  );
}

/* ── Página principal ────────────────────────────────────────────── */

const EMPTY_FORM = {
  title: "", abstract: "", year: new Date().getFullYear().toString(), projectId: "",
  authors: "", journal: "", doi: "", zenodoLink: "", tags: "",
  content: "", images: "", references: "",
  // report
  advisor: "", reportType: "", version: "", reportNumber: "", institution: "",
  // presentation
  eventDate: "", presentationType: "", location: "", workload: "", certificate: "",
  // thesis
  course: "", researchArea: "", coAdvisor: "", pages: "", committee: "", grade: "", github: "",
};

const TYPE_LABELS_FORM: Record<string, string> = {
  ARTICLE:      "Artigo Científico",
  REPORT:       "Relatório Técnico",
  PRESENTATION: "Apresentação",
  THESIS:       "TCC / Monografia",
};

export default function PublicacoesPage() {
  const { isAuthenticated, user } = useAuth();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [type,   setType]   = useState<PublicationType | "all">("all");
  const [year,   setYear]   = useState("all");
  const [showForm, setShowForm]     = useState(false);
  const [pubType,  setPubType]      = useState("ARTICLE");
  const [form,     setForm]         = useState({ ...EMPTY_FORM });
  const [formError, setFormError]   = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<any[]>([]);

  const { data: publications = [], isLoading, isError } = usePublications();
  const { data: myProjectsRaw = [] } = useDashboardProjects(isAuthenticated);
  const createMutation = useCreatePublication();
  const deleteMutation = useDeletePublication();

  // Busca membros do projeto selecionado para o author picker
  const { data: selectedProject } = useProject(form.projectId || "");

  // Filtra só projetos do usuário para o formulário
  const myProjects = Array.isArray(myProjectsRaw) ? myProjectsRaw : [];

  // IDs dos projetos onde o usuário é dono ou membro (para verificar permissão de excluir publicação)
  const myProjectIds = useMemo(() => new Set(myProjects.map((p: any) => p.id)), [myProjects]);

  const filtered = useMemo(() => {
    let result = [...publications];
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.authors?.some((a: any) => a.name.toLowerCase().includes(q)) ||
        p.tags?.some((t: string) => t.includes(q)),
      );
    }
    if (type !== "all") result = result.filter(p => p.type === type);
    if (year !== "all") result = result.filter(p => String(p.year) === year);
    return result;
  }, [publications, search, type, year]);

const yearOptions = useMemo(() => {
  const years = [...new Set(publications.map(p => String(p.year)))].sort((a, b) => Number(b) - Number(a));
  return [{ value: "all", label: "Todos os anos" }, ...years.map(y => ({ value: y, label: y }))];
}, [publications]);

  const countByType = useMemo(() =>
    publications.reduce((acc: Record<string, number>, p) => { acc[p.type] = (acc[p.type] ?? 0) + 1; return acc; }, {}),
  [publications]);

  const buildAbstractWithExtras = () => {
    let abs = form.abstract;
    const extras: string[] = [];
    if (pubType === "REPORT") {
      if (form.advisor)      extras.push(`Orientador: ${form.advisor}`);
      if (form.reportType)   extras.push(`Tipo: ${form.reportType}`);
      if (form.version)      extras.push(`Versão: ${form.version}`);
      if (form.reportNumber) extras.push(`Nº: ${form.reportNumber}`);
      if (form.institution)  extras.push(`Instituição: ${form.institution}`);
    }
    if (pubType === "PRESENTATION") {
      if (form.journal)           extras.push(`Evento: ${form.journal}`);
      if (form.presentationType)  extras.push(`Tipo: ${form.presentationType}`);
      if (form.location)          extras.push(`Local: ${form.location}`);
      if (form.workload)          extras.push(`Carga horária: ${form.workload}h`);
      if (form.certificate)       extras.push(`Certificado: ${form.certificate}`);
      if (form.eventDate)         extras.push(`Data: ${form.eventDate}`);
    }
    if (pubType === "THESIS") {
      if (form.advisor)      extras.push(`Orientador: ${form.advisor}`);
      if (form.coAdvisor)    extras.push(`Coorientador: ${form.coAdvisor}`);
      if (form.course)       extras.push(`Curso: ${form.course}`);
      if (form.institution)  extras.push(`Instituição: ${form.institution}`);
      if (form.researchArea) extras.push(`Área: ${form.researchArea}`);
      if (form.pages)        extras.push(`Páginas: ${form.pages}`);
      if (form.committee)    extras.push(`Banca: ${form.committee}`);
      if (form.grade)        extras.push(`Nota: ${form.grade}`);
      if (form.github)       extras.push(`GitHub: ${form.github}`);
    }
    if (form.authors) extras.push(`Autores: ${form.authors}`);
    return extras.length > 0 ? `${abs}\n\n---\n${extras.join(" | ")}` : abs;
  };

  const handleCreate = async () => {
    try {
      setFormError("");
      if (!form.title.trim())    { setFormError("Título obrigatório"); return; }
      if (!form.abstract.trim()) { setFormError("Resumo obrigatório"); return; }
      if (!form.projectId)       { setFormError("Selecione um projeto"); return; }
      const yearNum = parseInt(form.year);
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) { setFormError("Ano inválido"); return; }

      // Para PRESENTATION, o "year" vem da data do evento
      const finalYear = pubType === "PRESENTATION" && form.eventDate
        ? parseInt(form.eventDate.slice(0, 4)) || yearNum
        : yearNum;

      await createMutation.mutateAsync({
        title:      form.title,
        abstract:   buildAbstractWithExtras(),
        content:    form.content || undefined,
        images:     form.images ? form.images.split("\n").map(u => u.trim()).filter(Boolean) : [],
        references: form.references ? form.references.split("\n").map(r => r.trim()).filter(Boolean) : [],
        type:       pubType,
        year:       finalYear,
        journal:    form.journal    || undefined,
        doi:        form.doi        || undefined,
        zenodoLink: form.zenodoLink || undefined,
        tags:       form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
        projectId:  form.projectId,
        authorIds:  selectedAuthors.map((a: any) => a.id),
      });
      setForm({ ...EMPTY_FORM });
      setSelectedAuthors([]);
      setShowForm(false);
    } catch (err: any) {
      setFormError(err?.response?.data?.message ?? "Erro ao criar publicação.");
    }
  };

  const resetForm = () => { setForm({ ...EMPTY_FORM }); setFormError(""); setShowForm(false); setSelectedAuthors([]); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={18} className="text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">Publicações</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-neutral-900 dark:text-neutral-100 mb-2">Publicações Acadêmicas</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Produção científica e técnica gerada pelos projetos de extensão</p>
        </div>
        {isAuthenticated && (
          <Button onClick={() => setShowForm(!showForm)} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus size={15} /> Nova publicação
          </Button>
        )}
      </div>

      {/* Formulário dinâmico */}
      {showForm && isAuthenticated && (
        <div className="bg-white dark:bg-neutral-800 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-6 shadow-card mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-neutral-800 dark:text-neutral-200">Nova publicação</h2>
            <button onClick={resetForm} className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all">
              <X size={16} />
            </button>
          </div>

          {/* Seletor de tipo */}
          <div className="mb-6">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Tipo de publicação</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(TYPE_LABELS_FORM).map(([val, lbl]) => (
                <button
                  key={val}
                  onClick={() => setPubType(val)}
                  className={cn(
                    "px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left",
                    pubType === val
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600 hover:border-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-400",
                  )}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-700 pt-5">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900 rounded-lg px-3 py-2 mb-5">
              Formulário: {TYPE_LABELS_FORM[pubType]}
            </p>

            {formError && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-danger-50 border border-red-200 text-danger-700 text-sm">
                <AlertCircle size={14} /> {formError}
              </div>
            )}

            {pubType === "ARTICLE"      && <FormArticle      form={form} set={setForm} projects={myProjects} />}
            {pubType === "REPORT"       && <FormReport       form={form} set={setForm} projects={myProjects} />}
            {pubType === "PRESENTATION" && <FormPresentation form={form} set={setForm} projects={myProjects} />}
            {pubType === "THESIS"       && <FormThesis       form={form} set={setForm} projects={myProjects} />}

            {/* ── Author Picker (membros do projeto selecionado) ── */}
            {form.projectId && selectedProject?.members?.length > 0 && (
              <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                <div className="flex items-center gap-2 mb-2">
                  <UserPlus size={14} className="text-emerald-600" />
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Selecionar autores do projeto</p>
                </div>
                <p className="text-xs text-neutral-400 mb-3">Clique nos membros para adicioná-los como autores. Você ainda pode digitar nomes manualmente no campo acima.</p>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.members ?? []).map((m: any) => {
                    const isSelected = selectedAuthors.some((a: any) => a.id === m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedAuthors((prev: any[]) =>
                            isSelected ? prev.filter((a: any) => a.id !== m.id) : [...prev, { id: m.id, name: m.name }]
                          );
                        }}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                          isSelected
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                            : "bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600 hover:border-emerald-300 hover:text-emerald-600",
                        )}
                      >
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                          {m.name?.[0]?.toUpperCase() ?? "?"}
                        </span>
                        {m.name}
                      </button>
                    );
                  })}
                </div>
                {selectedAuthors.length > 0 && (
                  <p className="text-xs text-emerald-600 mt-2">
                    {selectedAuthors.length} membro{selectedAuthors.length !== 1 ? "s" : ""} selecionado{selectedAuthors.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            )}

            {/* ── Conteúdo completo + Imagens (comum a todos os tipos) ── */}
            <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-700 grid gap-4">
              <FieldGroup label="Texto completo / Explicação detalhada">
                <textarea
                  rows={6}
                  className={ta}
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="Adicione uma explicação mais extensa, metodologia, resultados, conclusões... Para inserir imagens inline use: ![descrição](url) ou cole a URL da imagem em uma linha separada."
                />
                <p className="text-xs text-neutral-400 mt-1">Este texto aparecerá na página de detalhe, abaixo do resumo. Use <code className="bg-neutral-100 dark:bg-neutral-700 px-1 rounded text-[11px]">![descrição](url)</code> para imagens inline.</p>
              </FieldGroup>
              <FieldGroup label="URLs de imagens (uma por linha, opcional)">
                <textarea
                  rows={3}
                  className={ta}
                  value={form.images}
                  onChange={e => setForm({ ...form, images: e.target.value })}
                  placeholder={"https://exemplo.com/imagem1.png\nhttps://exemplo.com/imagem2.jpg"}
                />
                <p className="text-xs text-neutral-400 mt-1">Imagens exibidas na página de detalhe. Prefira usar imagens inline no texto acima.</p>
              </FieldGroup>
              <FieldGroup label="Referências bibliográficas (uma por linha, opcional)">
                <textarea
                  rows={5}
                  className={ta}
                  value={form.references}
                  onChange={e => setForm({ ...form, references: e.target.value })}
                  placeholder={"SOBRENOME, N. Título do trabalho. Ano. Available from: https://...\nSOBRENOME, N., SOBRENOME, N. Título do artigo. Revista, v. X, n. Y, p. Z. Ano."}
                />
                <p className="text-xs text-neutral-400 mt-1">Cada linha será uma referência numerada na publicação. Links são detectados automaticamente.</p>
              </FieldGroup>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700">
              <Button variant="secondary" onClick={resetForm}>Cancelar</Button>
              <Button onClick={handleCreate} loading={createMutation.isPending} className="bg-emerald-600 hover:bg-emerald-700">
                Publicar {TYPE_LABELS_FORM[pubType]}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {TYPE_OPTIONS.filter(o => o.value !== "all").map(({ value, label }) => (
          <button key={value} onClick={() => setType(value as PublicationType | "all")}
            className={cn("bg-white dark:bg-neutral-800 border rounded-2xl p-4 text-left shadow-card transition-all hover:shadow-card-md",
              type === value ? "border-brand-300 dark:border-brand-700 ring-1 ring-brand-200 dark:ring-brand-800" : "border-neutral-200 dark:border-neutral-700")}>
            <p className="font-display font-bold text-xl text-neutral-900 dark:text-neutral-100">{isLoading ? "—" : countByType[value] ?? 0}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{label}</p>
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 mb-6 shadow-card">
        <div className="flex gap-3 flex-wrap items-center">
          <div className="flex-1 min-w-48">
            <Input placeholder="Buscar por título, autor ou palavra-chave..." value={search} onChange={e => setSearch(e.target.value)} leftIcon={<Search size={15} />} /> {/* mantém search instantâneo para UX */}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {TYPE_OPTIONS.map(opt => (
              <button key={opt.value} onClick={() => setType(opt.value as PublicationType | "all")}
                className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap",
                  type === opt.value ? "bg-emerald-600 text-white shadow-sm" : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600")}>
                {opt.label}
              </button>
            ))}
          </div>
          <select value={year} onChange={e => setYear(e.target.value)}
            className="h-9 px-3 rounded-xl border border-neutral-300 dark:border-neutral-600 text-sm bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500">
           // DEPOIS
          {yearOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {(search || type !== "all" || year !== "all") && (
            <button onClick={() => { setSearch(""); setType("all"); setYear("all"); }} className="text-xs text-danger-500 hover:text-danger-700 font-medium">Limpar</button>
          )}
        </div>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
        <span className="font-semibold text-neutral-700 dark:text-neutral-300">{filtered.length}</span> publicaç{filtered.length !== 1 ? "ões" : "ão"} encontrada{filtered.length !== 1 ? "s" : ""}
      </p>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-5">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card space-y-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <EmptyState icon={<BookOpen size={24} />} title="Erro ao carregar publicações" description="Verifique sua conexão e tente novamente." />
      ) : filtered.length === 0 ? (
        <EmptyState icon={<BookOpen size={24} />} title="Nenhuma publicação encontrada" description="Tente outros termos de busca ou remova os filtros."
          action={<Button variant="secondary" size="sm" onClick={() => { setSearch(""); setType("all"); setYear("all"); }}>Limpar filtros</Button>} />
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map(pub => {
            const raw = pub as any;
            const isAuthor = isAuthenticated && user?.id && pub.authors?.some((a: any) => a.id === user.id);
            const isProjectOwner = isAuthenticated && user?.id && (raw.project?.ownerId === user.id || raw.project?.professorId === user.id || raw.project?.professor?.id === user.id);
            const isCreator = isAuthenticated && user?.id && (raw.userId === user.id || raw.createdBy === user.id || raw.authorId === user.id);
            return (
              <PublicationCard
                key={pub.id}
                publication={pub}
                canDelete={!!(isAuthor || isProjectOwner || isCreator)}
                canEdit={!!(isAuthor || isProjectOwner || isCreator)}
                onDelete={(id) => deleteMutation.mutate(id)}
                isDeleting={deleteMutation.isPending}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
