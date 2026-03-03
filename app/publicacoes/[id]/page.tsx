"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, BookOpen, Calendar, Download, ExternalLink, FileText,
  GraduationCap, Presentation, Tag, User, Users, Building2,
  ClipboardList, Globe, MapPin, Clock, Award, Github, Hash, Layers,
  BookMarked, Pencil,
} from "lucide-react";
import { Badge, Avatar, Button, Skeleton } from "@/components/ui";
import { RichContent } from "@/components/ui/RichContent";
import { cn, TYPE_LABELS } from "@/lib/utils";
import { usePublication } from "@/lib/hooks/useQueries";
import { useAuth } from "@/contexts/auth";
import type { Publication, PublicationType } from "@/types";

/* ── Constantes visuais ─────────────────────────────────── */

const TYPE_ICON: Record<string, React.ReactNode> = {
  article:      <FileText size={22} />,
  report:       <BookOpen size={22} />,
  presentation: <Presentation size={22} />,
  thesis:       <GraduationCap size={22} />,
};

const TYPE_COLOR: Record<string, "brand" | "success" | "warning" | "neutral"> = {
  article:      "brand",
  report:       "warning",
  presentation: "success",
  thesis:       "neutral",
};

const TYPE_BG: Record<string, string> = {
  article:      "from-brand-500 to-brand-700",
  report:       "from-amber-500 to-amber-700",
  presentation: "from-emerald-500 to-emerald-700",
  thesis:       "from-neutral-600 to-neutral-800",
};

/* ── Parseia metadados do abstract ──────────────────────── */

function parseAbstract(raw: string): { abstract: string; extras: Record<string, string> } {
  const extras: Record<string, string> = {};
  const sepIdx = raw.indexOf("\n\n---\n");
  if (sepIdx === -1) return { abstract: raw, extras };

  const abstract = raw.slice(0, sepIdx).trim();
  const tail = raw.slice(sepIdx + 5); // after "\n\n---\n"
  tail.split(" | ").forEach((kv) => {
    const colon = kv.indexOf(": ");
    if (colon > 0) {
      extras[kv.slice(0, colon).trim()] = kv.slice(colon + 2).trim();
    }
  });
  return { abstract, extras };
}

/* ── Detail row helper ─────────────────────────────────── */

function DetailRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="w-8 h-8 rounded-lg bg-neutral-50 dark:bg-neutral-700 flex items-center justify-center text-neutral-400 dark:text-neutral-500 flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">{label}</p>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 font-medium break-all transition-colors">
            {value}
          </a>
        ) : (
          <p className="text-sm text-neutral-800 dark:text-neutral-200 font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

/* ── Seções específicas por tipo ─────────────────────────── */

function ArticleDetails({ extras, pub }: { extras: Record<string, string>; pub: Publication }) {
  return (
    <>
      <DetailRow icon={<BookOpen size={15} />} label="Revista / Evento" value={pub.journal || ""} />
      <DetailRow icon={<Hash size={15} />} label="DOI" value={pub.doi || ""} href={pub.doi ? `https://doi.org/${pub.doi}` : undefined} />
      <DetailRow icon={<Globe size={15} />} label="Link Zenodo" value={pub.downloadUrl || ""} href={pub.downloadUrl || undefined} />
    </>
  );
}

function ReportDetails({ extras, pub }: { extras: Record<string, string>; pub: Publication }) {
  return (
    <>
      <DetailRow icon={<User size={15} />} label="Orientador" value={extras["Orientador"] || ""} />
      <DetailRow icon={<ClipboardList size={15} />} label="Tipo de relatório" value={extras["Tipo"] || ""} />
      <DetailRow icon={<Layers size={15} />} label="Versão" value={extras["Versão"] || ""} />
      <DetailRow icon={<Hash size={15} />} label="Número" value={extras["Nº"] || ""} />
      <DetailRow icon={<Building2 size={15} />} label="Instituição" value={extras["Instituição"] || ""} />
      <DetailRow icon={<Hash size={15} />} label="DOI" value={pub.doi || ""} href={pub.doi ? `https://doi.org/${pub.doi}` : undefined} />
      <DetailRow icon={<Download size={15} />} label="Arquivo" value={pub.downloadUrl || ""} href={pub.downloadUrl || undefined} />
    </>
  );
}

function PresentationDetails({ extras, pub }: { extras: Record<string, string>; pub: Publication }) {
  return (
    <>
      <DetailRow icon={<Globe size={15} />} label="Evento" value={extras["Evento"] || pub.journal || ""} />
      <DetailRow icon={<Presentation size={15} />} label="Tipo" value={extras["Tipo"] || ""} />
      <DetailRow icon={<MapPin size={15} />} label="Local" value={extras["Local"] || ""} />
      <DetailRow icon={<Clock size={15} />} label="Carga horária" value={extras["Carga horária"] || ""} />
      <DetailRow icon={<Calendar size={15} />} label="Data" value={extras["Data"] || ""} />
      <DetailRow icon={<Award size={15} />} label="Certificado" value={extras["Certificado"] || ""} href={extras["Certificado"] || undefined} />
      <DetailRow icon={<Download size={15} />} label="Arquivo" value={pub.downloadUrl || ""} href={pub.downloadUrl || undefined} />
    </>
  );
}

function ThesisDetails({ extras, pub }: { extras: Record<string, string>; pub: Publication }) {
  return (
    <>
      <DetailRow icon={<User size={15} />} label="Orientador" value={extras["Orientador"] || ""} />
      <DetailRow icon={<Users size={15} />} label="Coorientador" value={extras["Coorientador"] || ""} />
      <DetailRow icon={<GraduationCap size={15} />} label="Curso" value={extras["Curso"] || ""} />
      <DetailRow icon={<Building2 size={15} />} label="Instituição" value={extras["Instituição"] || ""} />
      <DetailRow icon={<Tag size={15} />} label="Área de pesquisa" value={extras["Área"] || ""} />
      <DetailRow icon={<FileText size={15} />} label="Páginas" value={extras["Páginas"] || ""} />
      <DetailRow icon={<Users size={15} />} label="Banca examinadora" value={extras["Banca"] || ""} />
      <DetailRow icon={<Award size={15} />} label="Nota final" value={extras["Nota"] || ""} />
      <DetailRow icon={<Github size={15} />} label="GitHub" value={extras["GitHub"] || ""} href={extras["GitHub"] || undefined} />
      <DetailRow icon={<Hash size={15} />} label="DOI" value={pub.doi || ""} href={pub.doi ? `https://doi.org/${pub.doi}` : undefined} />
      <DetailRow icon={<Download size={15} />} label="Arquivo" value={pub.downloadUrl || ""} href={pub.downloadUrl || undefined} />
    </>
  );
}

/* ── Página principal ────────────────────────────────────── */

export default function PublicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { data: rawPub, isLoading, isError } = usePublication(id);

  /* Loading */
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  /* Error */
  if (isError || !rawPub) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
          <BookOpen size={28} />
        </div>
        <h2 className="font-display font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-2">Publicação não encontrada</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6">Não foi possível carregar esta publicação.</p>
        <Button variant="secondary" onClick={() => router.push("/publicacoes")}>
          <ArrowLeft size={15} /> Voltar para publicações
        </Button>
      </div>
    );
  }

  const pub = rawPub as Publication;
  const { abstract, extras } = parseAbstract(pub.abstract);
  const typeLower = pub.type as PublicationType;

  // Permissão de editar — autor da publicação, criador, ou líder do projeto
  const raw = pub as any;
  const canEdit = isAuthenticated && !!user?.id && (
    pub.authors?.some((a: any) => a.id === user.id) ||
    raw.userId === user.id ||
    raw.createdBy === user.id ||
    raw.authorId === user.id ||
    raw.project?.ownerId === user.id ||
    raw.project?.professorId === user.id ||
    raw.project?.professor?.id === user.id
  );

  const DetailsComponent: Record<string, React.FC<{ extras: Record<string, string>; pub: Publication }>> = {
    article:      ArticleDetails,
    report:       ReportDetails,
    presentation: PresentationDetails,
    thesis:       ThesisDetails,
  };
  const Specific = DetailsComponent[typeLower];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Back button */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/publicacoes" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors group">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" /> Voltar para publicações
        </Link>
        {canEdit && (
          <Link href={`/publicacoes/${pub.id}/editar`}>
            <Button variant="secondary" size="sm">
              <Pencil size={14} /> Editar
            </Button>
          </Link>
        )}
      </div>

      {/* Hero banner */}
      <div className={cn("relative rounded-2xl p-6 sm:p-8 mb-8 text-white bg-gradient-to-br overflow-hidden", TYPE_BG[typeLower] || TYPE_BG.article)}>
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/5" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              {TYPE_ICON[typeLower]}
            </div>
            <Badge variant={TYPE_COLOR[typeLower]} className="bg-white/20 text-white ring-white/30">
              {TYPE_LABELS[typeLower] || typeLower}
            </Badge>
            <span className="text-white/70 text-sm">{pub.year}</span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl leading-tight mb-3">
            {pub.title}
          </h1>

          {/* Authors row */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex -space-x-2">
              {pub.authors.slice(0, 5).map((a: { id: string; name: string; avatar?: string }) => (
                <Avatar key={a.id} name={a.name} size="md" src={a.avatar} />
              ))}
            </div>
            <span className="text-white/80 text-sm font-medium">
              {pub.authors.map((a: { id: string; name: string }) => a.name).join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* Main content — 2 columns */}
        <div className="md:col-span-2 space-y-8">

          {/* Abstract */}
          <section>
            <h2 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
              <FileText size={18} className="text-brand-500" /> Resumo
            </h2>
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line break-words">
                {abstract}
              </p>
            </div>
          </section>

          {/* Texto completo (content) */}
          {pub.content && (
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <BookOpen size={18} className="text-brand-500" /> Texto completo
              </h2>
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
                <RichContent
                  text={pub.content}
                  className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed"
                />
              </div>
            </section>
          )}

          {/* Referências bibliográficas */}
          {pub.references && pub.references.length > 0 && (
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <BookMarked size={18} className="text-brand-500" /> Referências
              </h2>
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
                <ol className="list-decimal list-inside space-y-3">
                  {pub.references.map((ref, idx) => {
                    // Detecta URL no final da referência para torná-la clicável
                    const urlMatch = ref.match(/(https?:\/\/[^\s]+)\s*$/);
                    if (urlMatch) {
                      const textPart = ref.slice(0, ref.lastIndexOf(urlMatch[1])).trim();
                      return (
                        <li key={idx} className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {textPart}{" "}
                          <a
                            href={urlMatch[1]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-600 dark:text-brand-400 hover:underline break-all"
                          >
                            {urlMatch[1]}
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={idx} className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {ref}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </section>
          )}

          {/* Imagens (legado — mantém compatibilidade) */}
          {pub.images && pub.images.length > 0 && (
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <Layers size={18} className="text-brand-500" /> Imagens
              </h2>
              <div className="space-y-4">
                {pub.images.map((url, idx) => (
                  <div key={idx} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-card">
                    <img
                      src={url}
                      alt={`Imagem ${idx + 1} — ${pub.title}`}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {pub.tags.length > 0 && (
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <Tag size={18} className="text-brand-500" /> Palavras-chave
              </h2>
              <div className="flex flex-wrap gap-2">
                {pub.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-medium ring-1 ring-brand-200 dark:ring-brand-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Project link */}
          {pub.project && (
            <section>
              <h2 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <Layers size={18} className="text-brand-500" /> Projeto vinculado
              </h2>
              <Link href={`/projetos/${pub.project.id}`} className="block group">
                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600 dark:text-brand-400">
                      <BookOpen size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors truncate">
                        {pub.project.title}
                      </p>
                      <p className="text-xs text-neutral-400">Clique para ver o projeto</p>
                    </div>
                    <ArrowLeft size={16} className="rotate-180 text-neutral-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </section>
          )}
        </div>

        {/* Sidebar — informações detalhadas */}
        <aside className="space-y-6">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
            <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-4 text-sm uppercase tracking-wide">
              Informações
            </h3>
            <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
              <DetailRow icon={<Calendar size={15} />} label="Ano" value={String(pub.year)} />
              {pub.journal && typeLower === "article" && (
                <DetailRow icon={<BookOpen size={15} />} label="Revista / Evento" value={pub.journal} />
              )}
              {Specific && <Specific extras={extras} pub={pub} />}
              <DetailRow icon={<Calendar size={15} />} label="Publicado em" value={new Date(pub.createdAt).toLocaleDateString("pt-BR")} />
            </div>
          </div>

          {/* Extra authors from abstract metadata (text names) */}
          {extras["Autores"] && (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
              <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-3 text-sm uppercase tracking-wide">
                Autores (texto)
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{extras["Autores"]}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
