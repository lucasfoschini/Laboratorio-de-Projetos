"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Pencil, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { usePublication, useUpdatePublication, useDashboardProjects, useMarkNotificationRead, useNotificationSummary } from "@/lib/hooks/useQueries";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";

/* ── Helpers de formulário (mesmos da page de criação) ────────────── */

function FieldGroup({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}{required && <span className="text-danger-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inp = "w-full h-10 rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-white dark:bg-neutral-800 dark:text-neutral-100";
const ta  = "w-full rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all bg-white dark:bg-neutral-800 dark:text-neutral-100";
const sel = "h-10 w-full rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm bg-white dark:bg-neutral-800 dark:text-neutral-100 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all";

/* ── Formulários por tipo ─────────────────────────────────────────── */

function FormArticle({ form, set, projects }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <FieldGroup label="Título" required><input className={inp} value={form.title} onChange={e => set({ ...form, title: e.target.value })} placeholder="Título do artigo" /></FieldGroup>
      <FieldGroup label="Ano" required><input type="number" min="1900" max="2100" className={inp} value={form.year} onChange={e => set({ ...form, year: e.target.value })} /></FieldGroup>
      <FieldGroup label="Resumo / Abstract" required><textarea rows={3} className={cn(ta, "md:col-span-2")} value={form.abstract} onChange={e => set({ ...form, abstract: e.target.value })} placeholder="Descreva o conteúdo e contribuições..." /></FieldGroup>
      <FieldGroup label="Projeto vinculado" required>
        <div className="h-10 w-full rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 flex items-center bg-neutral-50 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 text-sm cursor-not-allowed opacity-75">
          {projects.find((p: any) => p.id === form.projectId)?.title ?? "Projeto vinculado"}
        </div>
      </FieldGroup>
      <FieldGroup label="Revista / Evento"><input className={inp} value={form.journal} onChange={e => set({ ...form, journal: e.target.value })} placeholder="Ex: IEEE Transactions, SBRC 2024" /></FieldGroup>
      <FieldGroup label="DOI"><input className={inp} value={form.doi} onChange={e => set({ ...form, doi: e.target.value })} placeholder="10.xxxx/xxxxx" /></FieldGroup>
      <FieldGroup label="Link Zenodo"><input className={inp} value={form.zenodoLink} onChange={e => set({ ...form, zenodoLink: e.target.value })} placeholder="https://zenodo.org/..." /></FieldGroup>
      <FieldGroup label="Palavras-chave (separadas por ponto)"><input className={inp} value={form.tags} onChange={e => set({ ...form, tags: e.target.value })} placeholder="Ex: iot. machine learning" /></FieldGroup>
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
        <FieldGroup label="Projeto vinculado" required>
          <div className="h-10 w-full rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 flex items-center bg-neutral-50 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 text-sm cursor-not-allowed opacity-75">
            {projects.find((p: any) => p.id === form.projectId)?.title ?? "Projeto vinculado"}
          </div>
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
      <FieldGroup label="Palavras-chave"><input className={inp} value={form.tags} onChange={e => set({ ...form, tags: e.target.value })} placeholder="Separadas por ponto" /></FieldGroup>
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
        <FieldGroup label="Evento *"><input className={inp} value={form.journal} onChange={e => set({ ...form, journal: e.target.value })} placeholder="Ex: SBRC 2025, TechConf..." /></FieldGroup>
      </div>
      <FieldGroup label="Projeto vinculado">
        <div className="h-10 w-full rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 flex items-center bg-neutral-50 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 text-sm cursor-not-allowed opacity-75">
          {projects.find((p: any) => p.id === form.projectId)?.title ?? "Projeto vinculado"}
        </div>
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
      <FieldGroup label="Tags"><input className={inp} value={form.tags} onChange={e => set({ ...form, tags: e.target.value })} placeholder="Separadas por ponto" /></FieldGroup>
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
        <FieldGroup label="Orientador *"><input className={inp} value={form.advisor} onChange={e => set({ ...form, advisor: e.target.value })} placeholder="Nome do orientador" /></FieldGroup>
      </div>
      <FieldGroup label="Curso *"><input className={inp} value={form.course} onChange={e => set({ ...form, course: e.target.value })} placeholder="Ex: Engenharia de Computação" /></FieldGroup>
      <FieldGroup label="Instituição *"><input className={inp} value={form.institution} onChange={e => set({ ...form, institution: e.target.value })} placeholder="Nome da universidade/faculdade" /></FieldGroup>
      <FieldGroup label="Área de pesquisa *"><input className={inp} value={form.researchArea} onChange={e => set({ ...form, researchArea: e.target.value })} placeholder="Ex: Inteligência Artificial" /></FieldGroup>
      <FieldGroup label="Projeto vinculado">
        <div className="h-10 w-full rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 flex items-center bg-neutral-50 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 text-sm cursor-not-allowed opacity-75">
          {projects.find((p: any) => p.id === form.projectId)?.title ?? "Projeto vinculado"}
        </div>
      </FieldGroup>
      <FieldGroup label="Coorientador"><input className={inp} value={form.coAdvisor} onChange={e => set({ ...form, coAdvisor: e.target.value })} placeholder="Nome do coorientador (se houver)" /></FieldGroup>
      <FieldGroup label="Número de páginas"><input type="number" min="1" className={inp} value={form.pages} onChange={e => set({ ...form, pages: e.target.value })} placeholder="Ex: 98" /></FieldGroup>
      <FieldGroup label="Banca examinadora"><input className={inp} value={form.committee} onChange={e => set({ ...form, committee: e.target.value })} placeholder="Membros separados por vírgula" /></FieldGroup>
      <FieldGroup label="Nota final"><input className={inp} value={form.grade} onChange={e => set({ ...form, grade: e.target.value })} placeholder="Ex: 9.5 ou Aprovado" /></FieldGroup>
      <FieldGroup label="Link do PDF (arquivo final)"><input className={inp} value={form.zenodoLink} onChange={e => set({ ...form, zenodoLink: e.target.value })} placeholder="https://..." /></FieldGroup>
      <FieldGroup label="DOI (se publicado)"><input className={inp} value={form.doi} onChange={e => set({ ...form, doi: e.target.value })} placeholder="10.xxxx/xxxxx" /></FieldGroup>
      <FieldGroup label="Repositório GitHub"><input className={inp} value={form.github} onChange={e => set({ ...form, github: e.target.value })} placeholder="https://github.com/..." /></FieldGroup>
      <FieldGroup label="Palavras-chave" required><input className={inp} value={form.tags} onChange={e => set({ ...form, tags: e.target.value })} placeholder="Separadas por ponto" /></FieldGroup>
    </div>
  );
}

/* ── Parseia metadados extras do abstract ────────────────────────── */

function parseAbstract(raw: string): { abstract: string; extras: Record<string, string> } {
  const extras: Record<string, string> = {};
  const sepIdx = raw.indexOf("\n\n---\n");
  if (sepIdx === -1) return { abstract: raw, extras };
  const abstract = raw.slice(0, sepIdx).trim();
  const tail = raw.slice(sepIdx + 5);
  tail.split(" | ").forEach((kv) => {
    const colon = kv.indexOf(": ");
    if (colon > 0) extras[kv.slice(0, colon).trim()] = kv.slice(colon + 2).trim();
  });
  return { abstract, extras };
}

/* ── Constantes ──────────────────────────────────────────────────── */

const EMPTY_FORM = {
  title: "", abstract: "", year: new Date().getFullYear().toString(), projectId: "",
  authors: "", journal: "", doi: "", zenodoLink: "", tags: "",
  content: "", images: "", references: "",
  advisor: "", reportType: "", version: "", reportNumber: "", institution: "",
  eventDate: "", presentationType: "", location: "", workload: "", certificate: "",
  course: "", researchArea: "", coAdvisor: "", pages: "", committee: "", grade: "", github: "",
};

const TYPE_LABELS_FORM: Record<string, string> = {
  ARTICLE:      "Artigo Científico",
  REPORT:       "Relatório Técnico",
  PRESENTATION: "Apresentação",
  THESIS:       "TCC / Monografia",
};

/* ── Página de edição ────────────────────────────────────────────── */

export default function EditarPublicacaoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const { data: publication, isLoading: pubLoading } = usePublication(id);
  const { data: myProjectsRaw = [] } = useDashboardProjects(isAuthenticated);
  const updateMutation  = useUpdatePublication();
  const markReadMut     = useMarkNotificationRead();
  const { data: notifSummary } = useNotificationSummary(true);

  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [pubType, setPubType] = useState("ARTICLE");
  const [formError, setFormError] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  const myProjects = Array.isArray(myProjectsRaw) ? myProjectsRaw : [];

  // Busca membros do projeto selecionado para o author picker
  const selectedProject = myProjects.find((p: any) => p.id === form.projectId);

  // Redirect se não autenticado
  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/auth/login");
  }, [authLoading, isAuthenticated, router]);

  // Preenche formulário com os dados da publicação
  useEffect(() => {
    if (!publication || loaded) return;

    const raw = publication as any;
    const { abstract, extras } = parseAbstract(raw.abstract || "");
    const typeUpper = (raw.type || "article").toUpperCase();

    setPubType(typeUpper);
    setSelectedAuthors(raw.authors || []);

    const newForm = { ...EMPTY_FORM };
    newForm.title = raw.title || "";
    newForm.abstract = abstract;
    newForm.year = String(raw.year || new Date().getFullYear());
    newForm.projectId = raw.project?.id || raw.projectId || "";
    newForm.journal = raw.journal || "";
    newForm.doi = raw.doi || "";
    newForm.zenodoLink = raw.downloadUrl || raw.zenodoLink || "";
    newForm.tags = (raw.tags || []).join(", ");
    newForm.content = raw.content || "";
    newForm.images = (raw.images || []).join("\n");
    newForm.references = (raw.references || []).join("\n");

    // Extras do abstract
    newForm.authors = extras["Autores"] || (raw.authors || []).map((a: any) => a.name).join(", ");
    newForm.advisor = extras["Orientador"] || "";
    newForm.reportType = extras["Tipo"] || "";
    newForm.version = extras["Versão"] || "";
    newForm.reportNumber = extras["Nº"] || "";
    newForm.institution = extras["Instituição"] || "";
    newForm.presentationType = extras["Tipo"] || "";
    newForm.location = extras["Local"] || "";
    newForm.workload = extras["Carga horária"]?.replace("h", "") || "";
    newForm.certificate = extras["Certificado"] || "";
    newForm.eventDate = extras["Data"] || "";
    newForm.course = extras["Curso"] || "";
    newForm.researchArea = extras["Área"] || "";
    newForm.coAdvisor = extras["Coorientador"] || "";
    newForm.pages = extras["Páginas"] || "";
    newForm.committee = extras["Banca"] || "";
    newForm.grade = extras["Nota"] || "";
    newForm.github = extras["GitHub"] || "";

    setForm(newForm);
    setLoaded(true);
  }, [publication, loaded]);

  // Check permission — autor da publicação, criador, ou líder do projeto
  const canEdit = useMemo(() => {
    if (!publication || !user) return false;
    const raw = publication as any;
    return (
      raw.authors?.some((a: any) => a.id === user.id) ||
      raw.userId === user.id ||
      raw.createdBy === user.id ||
      raw.authorId === user.id ||
      raw.project?.ownerId === user.id ||
      raw.project?.professorId === user.id ||
      raw.project?.professor?.id === user.id
    );
  }, [publication, user]);

  // Build abstract with extras (same logic as create page)
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
    return extras.length > 0 ? `${abs}\n\n---\n${extras.join(" | ")}` : abs;
  };

  const handleUpdate = async () => {
    try {
      setFormError("");
      if (!form.title.trim())    { setFormError("Título obrigatório"); return; }
      if (!form.abstract.trim()) { setFormError("Resumo obrigatório"); return; }
      const yearNum = parseInt(form.year);
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) { setFormError("Ano inválido"); return; }

      const finalYear = pubType === "PRESENTATION" && form.eventDate
        ? parseInt(form.eventDate.slice(0, 4)) || yearNum
        : yearNum;

      await updateMutation.mutateAsync({
        id,
        data: {
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
          projectId:  form.projectId || undefined,
          authorIds:  selectedAuthors.map((a: any) => a.id),
        },
      });

      // Redireciona de volta. O servidor já limpou as notificações de sugestão.
      router.push("/dashboard?tab=requests");
    } catch (err: any) {
      setFormError(err?.response?.data?.message ?? "Erro ao atualizar publicação.");
    }
  };

  /* ── Loading ── */
  if (pubLoading || authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-64 bg-neutral-200 dark:bg-neutral-700 rounded-2xl" />
        </div>
      </div>
    );
  }

  /* ── Sem permissão ── */
  if (!canEdit) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
          <Pencil size={28} />
        </div>
        <h2 className="font-display font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-2">Sem permissão</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6">Você não tem permissão para editar esta publicação.</p>
        <Link href={`/publicacoes/${id}`}>
          <Button variant="secondary"><ArrowLeft size={15} /> Voltar</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Back */}
      <Link href={`/publicacoes/${id}`} className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors mb-6 group">
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" /> Voltar para publicação
      </Link>

      <div className="bg-white dark:bg-neutral-800 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Pencil size={18} className="text-emerald-600" />
            <h1 className="font-display font-bold text-xl text-neutral-800 dark:text-neutral-200">Editar publicação</h1>
          </div>
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
            Editando: {TYPE_LABELS_FORM[pubType]}
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

          {/* ── Author Picker ── */}
          {form.projectId && selectedProject?.members?.length > 0 && (
            <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-700">
              <div className="flex items-center gap-2 mb-2">
                <UserPlus size={14} className="text-emerald-600" />
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Selecionar autores do projeto</p>
              </div>
              <p className="text-xs text-neutral-400 mb-3">Clique nos membros para adicioná-los como autores.</p>
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

          {/* ── Conteúdo completo + Imagens + Referências ── */}
          <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-700 grid gap-4">
            <FieldGroup label="Texto completo / Explicação detalhada">
              <textarea
                rows={6}
                className={ta}
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                placeholder="Texto extenso, metodologia, resultados, conclusões... Use ![descrição](url) para imagens inline."
              />
              <p className="text-xs text-neutral-400 mt-1">
                Use <code className="bg-neutral-100 dark:bg-neutral-700 px-1 rounded text-[11px]">![descrição](url)</code> para imagens inline.
              </p>
            </FieldGroup>
            <FieldGroup label="Imagens (opcional)">
              <div className="flex flex-col gap-2">
                <div
                  className="cursor-pointer rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-600 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/20 px-4 py-2.5 text-center transition-all text-sm text-neutral-500 dark:text-neutral-400"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = async (e: any) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const fd = new FormData();
                      fd.append("file", file);
                      fd.append("upload_preset", "labex_uploads");
                      fd.append("cloud_name", "dbsn1ch65");
                      try {
                        const res = await fetch("https://api.cloudinary.com/v1_1/dbsn1ch65/image/upload", { method: "POST", body: fd });
                        const data = await res.json();
                        if (data.secure_url) {
                          const existing = form.images ? form.images.split("\n").filter(Boolean) : [];
                          setForm({ ...form, images: [...existing, data.secure_url].join("\n") });
                        }
                      } catch {}
                    };
                    input.click();
                  }}
                >
                  Clique para fazer upload de imagem
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Ou cole uma URL de imagem..."
                    className={cn(inp, "flex-1")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val) {
                          const existing = form.images ? form.images.split("\n").filter(Boolean) : [];
                          if (!existing.includes(val)) setForm({ ...form, images: [...existing, val].join("\n") });
                          (e.target as HTMLInputElement).value = "";
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-all"
                    onClick={(e) => {
                      const input = (e.currentTarget.previousSibling as HTMLInputElement);
                      const val = input?.value.trim();
                      if (val) {
                        const existing = form.images ? form.images.split("\n").filter(Boolean) : [];
                        if (!existing.includes(val)) setForm({ ...form, images: [...existing, val].join("\n") });
                        input.value = "";
                      }
                    }}
                  >Adicionar</button>
                </div>
              </div>
              {form.images && form.images.split("\n").filter(Boolean).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.images.split("\n").filter(Boolean).map((url: string, i: number) => (
                    <div key={i} className="relative group">
                      <img src={url} alt="" className="w-16 h-16 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, images: form.images.split("\n").filter((_: string, j: number) => j !== i).join("\n") })}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-danger-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >×</button>
                    </div>
                  ))}
                </div>
              )}
            </FieldGroup>
            <FieldGroup label="Referências bibliográficas (uma por linha, opcional)">
              <textarea
                rows={5}
                className={ta}
                value={form.references}
                onChange={e => setForm({ ...form, references: e.target.value })}
                placeholder={"SOBRENOME, N. Título do trabalho. Ano. Available from: https://...\nSOBRENOME, N., SOBRENOME, N. Título do artigo. Revista, v. X, n. Y, p. Z. Ano."}
              />
            </FieldGroup>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700">
            <Link href={`/publicacoes/${id}`}>
              <Button variant="secondary">Cancelar</Button>
            </Link>
            <Button onClick={handleUpdate} loading={updateMutation.isPending} className="bg-emerald-600 hover:bg-emerald-700">
              <Pencil size={14} /> Salvar alterações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
