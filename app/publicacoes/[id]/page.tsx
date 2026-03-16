"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, BookOpen, Calendar, Download, FileText,
  GraduationCap, Presentation, Tag, User, Users, Building2,
  ClipboardList, Globe, MapPin, Clock, Award, Github, Hash, Layers,
  BookMarked, Pencil, MessageSquare,
} from "lucide-react";
import { Badge, Avatar, Button, Skeleton } from "@/components/ui";
import { RichContent } from "@/components/ui/RichContent";
import { cn, TYPE_LABELS } from "@/lib/utils";
import { usePublication, useSuggestPublication } from "@/lib/hooks/useQueries";
import { useAuth } from "@/contexts/auth";
import type { Publication, PublicationType } from "@/types";

const TYPE_ICON: Record<string, React.ReactNode> = {
  article:      <FileText size={20} />,
  report:       <BookOpen size={20} />,
  presentation: <Presentation size={20} />,
  thesis:       <GraduationCap size={20} />,
};
const TYPE_COLOR: Record<string, "brand" | "success" | "warning" | "neutral"> = {
  article: "brand", report: "warning", presentation: "success", thesis: "neutral",
};
const TYPE_BG: Record<string, string> = {
  article: "from-brand-500 to-brand-700", report: "from-amber-500 to-amber-700",
  presentation: "from-emerald-500 to-emerald-700", thesis: "from-neutral-600 to-neutral-800",
};

function parseAbstract(raw: string): { abstract: string; extras: Record<string, string> } {
  const extras: Record<string, string> = {};
  const sepIdx = raw.indexOf("\n\n---\n");
  if (sepIdx === -1) return { abstract: raw, extras };
  const abstract = raw.slice(0, sepIdx).trim();
  raw.slice(sepIdx + 5).split(" | ").forEach((kv) => {
    const colon = kv.indexOf(": ");
    if (colon > 0) extras[kv.slice(0, colon).trim()] = kv.slice(colon + 2).trim();
  });
  return { abstract, extras };
}

function DetailRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5 sm:gap-3 py-2.5">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-50 dark:bg-neutral-700 flex items-center justify-center text-neutral-400 flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-wide">{label}</p>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="text-xs sm:text-sm text-brand-600 dark:text-brand-400 hover:text-brand-800 font-medium break-all transition-colors">
            {value}
          </a>
        ) : (
          <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium break-words">{value}</p>
        )}
      </div>
    </div>
  );
}

function ArticleDetails({ extras, pub }: { extras: Record<string, string>; pub: Publication }) {
  return (<>
    <DetailRow icon={<BookOpen size={14} />} label="Revista / Evento" value={pub.journal || ""} />
    <DetailRow icon={<Hash size={14} />} label="DOI" value={pub.doi || ""} href={pub.doi ? `https://doi.org/${pub.doi}` : undefined} />
    <DetailRow icon={<Globe size={14} />} label="Link Zenodo" value={pub.downloadUrl || ""} href={pub.downloadUrl || undefined} />
  </>);
}
function ReportDetails({ extras, pub }: { extras: Record<string, string>; pub: Publication }) {
  return (<>
    <DetailRow icon={<User size={14} />} label="Orientador" value={extras["Orientador"] || ""} />
    <DetailRow icon={<ClipboardList size={14} />} label="Tipo de relatório" value={extras["Tipo"] || ""} />
    <DetailRow icon={<Layers size={14} />} label="Versão" value={extras["Versão"] || ""} />
    <DetailRow icon={<Hash size={14} />} label="Número" value={extras["Nº"] || ""} />
    <DetailRow icon={<Building2 size={14} />} label="Instituição" value={extras["Instituição"] || ""} />
    <DetailRow icon={<Hash size={14} />} label="DOI" value={pub.doi || ""} href={pub.doi ? `https://doi.org/${pub.doi}` : undefined} />
    <DetailRow icon={<Download size={14} />} label="Arquivo" value={pub.downloadUrl || ""} href={pub.downloadUrl || undefined} />
  </>);
}
function PresentationDetails({ extras, pub }: { extras: Record<string, string>; pub: Publication }) {
  return (<>
    <DetailRow icon={<Globe size={14} />} label="Evento" value={extras["Evento"] || pub.journal || ""} />
    <DetailRow icon={<Presentation size={14} />} label="Tipo" value={extras["Tipo"] || ""} />
    <DetailRow icon={<MapPin size={14} />} label="Local" value={extras["Local"] || ""} />
    <DetailRow icon={<Clock size={14} />} label="Carga horária" value={extras["Carga horária"] || ""} />
    <DetailRow icon={<Calendar size={14} />} label="Data" value={extras["Data"] || ""} />
    <DetailRow icon={<Award size={14} />} label="Certificado" value={extras["Certificado"] || ""} href={extras["Certificado"] || undefined} />
    <DetailRow icon={<Download size={14} />} label="Arquivo" value={pub.downloadUrl || ""} href={pub.downloadUrl || undefined} />
  </>);
}
function ThesisDetails({ extras, pub }: { extras: Record<string, string>; pub: Publication }) {
  return (<>
    <DetailRow icon={<User size={14} />} label="Orientador" value={extras["Orientador"] || ""} />
    <DetailRow icon={<Users size={14} />} label="Coorientador" value={extras["Coorientador"] || ""} />
    <DetailRow icon={<GraduationCap size={14} />} label="Curso" value={extras["Curso"] || ""} />
    <DetailRow icon={<Building2 size={14} />} label="Instituição" value={extras["Instituição"] || ""} />
    <DetailRow icon={<Tag size={14} />} label="Área de pesquisa" value={extras["Área"] || ""} />
    <DetailRow icon={<FileText size={14} />} label="Páginas" value={extras["Páginas"] || ""} />
    <DetailRow icon={<Users size={14} />} label="Banca examinadora" value={extras["Banca"] || ""} />
    <DetailRow icon={<Award size={14} />} label="Nota final" value={extras["Nota"] || ""} />
    <DetailRow icon={<Github size={14} />} label="GitHub" value={extras["GitHub"] || ""} href={extras["GitHub"] || undefined} />
    <DetailRow icon={<Hash size={14} />} label="DOI" value={pub.doi || ""} href={pub.doi ? `https://doi.org/${pub.doi}` : undefined} />
    <DetailRow icon={<Download size={14} />} label="Arquivo" value={pub.downloadUrl || ""} href={pub.downloadUrl || undefined} />
  </>);
}

export default function PublicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { data: rawPub, isLoading, isError } = usePublication(id);
  const suggestMut = useSuggestPublication();
  const [showSuggest,    setShowSuggest]    = useState(false);
  const [suggestionText, setSuggestionText] = useState("");

  if (isLoading) return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-36 sm:h-48 w-full rounded-2xl" />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-6 w-full" />)}</div>
        <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-10 w-full" />)}</div>
      </div>
    </div>
  );

  if (isError || !rawPub) return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
        <BookOpen size={24} />
      </div>
      <h2 className="font-display font-bold text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 mb-2">Publicação não encontrada</h2>
      <p className="text-neutral-500 dark:text-neutral-400 mb-6 text-sm">Não foi possível carregar esta publicação.</p>
      <Button variant="secondary" onClick={() => router.push("/publicacoes")}><ArrowLeft size={15} /> Voltar para publicações</Button>
    </div>
  );

  const pub = rawPub as Publication;
  const { abstract, extras } = parseAbstract(pub.abstract);
  const typeLower = pub.type as PublicationType;
  const raw = pub as any;
  const isProfessor = isAuthenticated && !!user?.id && (
    raw.project?.ownerId === user.id ||
    raw.project?.professorId === user.id || raw.project?.professor?.id === user.id
  );
  const isAuthor = isAuthenticated && !!user?.id && (
    pub.authors?.some((a: any) => a.id === user.id) ||
    raw.userId === user.id || raw.createdBy === user.id || raw.authorId === user.id
  );
  const canEdit = isAuthor;
  const DetailsMap: Record<string, React.FC<{ extras: Record<string, string>; pub: Publication }>> = {
    article: ArticleDetails, report: ReportDetails,
    presentation: PresentationDetails, thesis: ThesisDetails,
  };
  const Specific = DetailsMap[typeLower];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      {/* Modal de sugestão */}
      {showSuggest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl max-w-md w-full border border-neutral-200 dark:border-neutral-700">
            <h2 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-1">Enviar sugestão de revisão</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              O autor receberá sua sugestão por e-mail e notificação, podendo editar e reenviar para aprovação.
            </p>
            <textarea
              rows={5}
              value={suggestionText}
              onChange={e => setSuggestionText(e.target.value)}
              placeholder="Descreva as alterações necessárias antes de aprovar..."
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 bg-white dark:bg-neutral-700 dark:text-neutral-100 mb-4"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setShowSuggest(false)}>Cancelar</Button>
              <Button
                loading={suggestMut.isPending}
                disabled={!suggestionText.trim()}
                onClick={async () => {
                  await suggestMut.mutateAsync({ id: pub.id, suggestion: suggestionText });
                  setShowSuggest(false);
                  router.push("/dashboard?tab=requests");
                }}
              >
                <MessageSquare size={14} /> Enviar sugestão
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <Link href="/publicacoes"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors group">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Voltar para publicações</span>
          <span className="sm:hidden">Voltar</span>
        </Link>
        <div className="flex gap-2">
          {canEdit && (
            <Link href={`/publicacoes/${pub.id}/editar`}>
              <Button variant="secondary" size="sm"><Pencil size={14} /> <span className="hidden sm:inline">Editar</span></Button>
            </Link>
          )}
          {isProfessor && !isAuthor && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => { setShowSuggest(true); setSuggestionText(""); }}
            >
              <MessageSquare size={14} /> <span className="hidden sm:inline">Sugestão</span>
            </Button>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className={cn("relative rounded-2xl p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8 text-white bg-gradient-to-br overflow-hidden", TYPE_BG[typeLower] || TYPE_BG.article)}>
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/5" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
              {TYPE_ICON[typeLower]}
            </div>
            <Badge variant={TYPE_COLOR[typeLower]} className="bg-white/20 text-white ring-white/30">
              {TYPE_LABELS[typeLower] || typeLower}
            </Badge>
            <span className="text-white/70 text-sm">{pub.year}</span>
          </div>
          <h1 className="font-display font-extrabold text-lg sm:text-2xl lg:text-3xl leading-tight mb-3 break-words">
            {pub.title}
          </h1>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex -space-x-2 flex-shrink-0">
              {pub.authors.slice(0, 4).map((a: { id: string; name: string; avatar?: string }) => (
                <Avatar key={a.id} name={a.name} size="md" src={a.avatar} />
              ))}
            </div>
            <span className="text-white/80 text-xs sm:text-sm font-medium line-clamp-2">
              {pub.authors.map((a: { id: string; name: string }) => a.name).join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

        {/* Conteúdo principal */}
        <div className="md:col-span-2 space-y-6 sm:space-y-8">

          <section>
            <h2 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
              <FileText size={16} className="text-brand-500" /> Resumo
            </h2>
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 shadow-card">
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line break-words">{abstract}</p>
            </div>
          </section>

          {pub.content && (
            <section>
              <h2 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-brand-500" /> Texto completo
              </h2>
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 shadow-card">
                <RichContent text={pub.content} className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed" />
              </div>
            </section>
          )}

          {pub.references && pub.references.length > 0 && (
            <section>
              <h2 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <BookMarked size={16} className="text-brand-500" /> Referências
              </h2>
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 shadow-card">
                <ol className="list-decimal list-inside space-y-3">
                  {pub.references.map((ref, idx) => {
                    const urlMatch = ref.match(/(https?:\/\/[^\s]+)\s*$/);
                    if (urlMatch) {
                      const textPart = ref.slice(0, ref.lastIndexOf(urlMatch[1])).trim();
                      return (
                        <li key={idx} className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {textPart}{" "}
                          <a href={urlMatch[1]} target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline break-all">{urlMatch[1]}</a>
                        </li>
                      );
                    }
                    return <li key={idx} className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{ref}</li>;
                  })}
                </ol>
              </div>
            </section>
          )}

          {pub.images && pub.images.length > 0 && (
            <section>
              <h2 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <Layers size={16} className="text-brand-500" /> Imagens
              </h2>
              <div className="space-y-4">
                {pub.images.map((url, idx) => (
                  <div key={idx} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-card">
                    <img src={url} alt={`Imagem ${idx + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {pub.tags.length > 0 && (
            <section>
              <h2 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <Tag size={16} className="text-brand-500" /> Palavras-chave
              </h2>
              <div className="flex flex-wrap gap-2">
                {pub.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-medium ring-1 ring-brand-200 dark:ring-brand-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {pub.project && (
            <section>
              <h2 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
                <Layers size={16} className="text-brand-500" /> Projeto vinculado
              </h2>
              <Link href={`/projetos/${pub.project.id}`} className="block group">
                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600 flex-shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-neutral-800 dark:text-neutral-200 group-hover:text-brand-700 transition-colors truncate">{pub.project.title}</p>
                      <p className="text-xs text-neutral-400">Clique para ver o projeto</p>
                    </div>
                    <ArrowLeft size={15} className="rotate-180 text-neutral-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </div>
              </Link>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 sm:space-y-6">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 shadow-card">
            <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-3 text-xs sm:text-sm uppercase tracking-wide">
              Informações
            </h3>
            <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
              <DetailRow icon={<Calendar size={14} />} label="Ano" value={String(pub.year)} />
              {pub.journal && typeLower === "article" && (
                <DetailRow icon={<BookOpen size={14} />} label="Revista / Evento" value={pub.journal} />
              )}
              {Specific && <Specific extras={extras} pub={pub} />}
              <DetailRow icon={<Calendar size={14} />} label="Publicado em" value={new Date(pub.createdAt).toLocaleDateString("pt-BR")} />
            </div>
          </div>

          {extras["Autores"] && (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 shadow-card">
              <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-2 text-xs sm:text-sm uppercase tracking-wide">
                Autores (texto)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">{extras["Autores"]}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
