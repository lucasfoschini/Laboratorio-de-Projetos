"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import NextImage from "next/image";
import {
  ArrowRight, Bell, BookmarkCheck, CheckCircle2, Clock,
  FlaskConical, LayoutDashboard, Loader2, PlusCircle, Settings,
  Trash2, Users, XCircle, Pencil, X, Check, BookOpen, ExternalLink, MessageSquare,
} from "lucide-react";
import { Badge, Avatar, Button, Skeleton } from "@/components/ui";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useAuth } from "@/contexts/auth";
import {
  useDashboardOverview, useApprovePublication, useNotificationSummary,
  usePendingPublications as usePendingPublicationsHook,
  useRejectPublication,
  useReviewRequest, useCancelRequest, useDeleteProject,
  useMarkNotificationRead,
} from "@/lib/hooks/useQueries";
import { adaptProject, adaptRequest } from "@/lib/adapters";
import { cn } from "@/lib/utils";

type Tab = "overview" | "projects" | "requests" | "subscriptions";

const REQ_STATUS: Record<string, { label: string; variant: "success"|"warning"|"danger"|"neutral"; icon: React.ElementType; color: string }> = {
  pending:  { label: "Aguardando", variant: "warning", icon: Clock,        color: "text-warning-600" },
  approved: { label: "Aprovado",   variant: "success", icon: CheckCircle2, color: "text-success-600" },
  rejected: { label: "Recusado",   variant: "danger",  icon: XCircle,      color: "text-danger-500"  },
};


/* ── Componente: modal de recusa de publicação ── */
function RejectModal({
  pubId,
  onConfirm,
  onCancel,
}: {
  pubId: string;
  onConfirm: (id: string, reason?: string) => void;
  onCancel: () => void;
}) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 w-full max-w-md shadow-card-lg mx-4">
        <h3 className="font-display text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
          Recusar publicação
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          Informe o motivo (opcional). O autor será notificado.
        </p>
        <textarea
          className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-brand-400 min-h-[80px]"
          placeholder="Ex: falta de referências, conteúdo incompleto..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          autoFocus
        />
        <div className="flex gap-2 mt-4 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(pubId, reason || undefined)}
            className="px-4 py-2 rounded-xl bg-danger-500 text-white text-sm font-semibold hover:bg-danger-600 transition-colors"
          >
            Confirmar recusa
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Componente: publicações pendentes por projeto ── */
function PendingPublicationsSection({
  projectId, projectTitle, onApprove, onReject, onRequestReject, processingPubId, isAnyProcessing,
}: {
  projectId: string;
  projectTitle: string;
  onApprove: (id: string) => void;
  onReject: (id: string, reason?: string) => void;
  onRequestReject: (id: string) => void;
  processingPubId: string | null;
  isAnyProcessing: boolean;
}) {
  const { data: pubs = [] } = usePendingPublicationsHook(projectId);
  if (pubs.length === 0) return null;
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">{projectTitle}</p>
      {pubs.map((pub: any) => {
        const isProcessing = processingPubId === pub.id;
        return (
          <div key={pub.id} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-2">
            <div className="flex-1 min-w-0">
              <Link
                href={`/publicacoes/${pub.id}`}
                target="_blank"
                className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-brand-600 transition-colors truncate block"
              >
                {pub.title} <ExternalLink size={10} className="inline ml-0.5 opacity-50" />
              </Link>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {pub.authors?.map((a: any) => a.name).join(", ") || pub.user?.name || "Sem autor"} · {pub.year}
              </p>
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              <button
                onClick={() => onApprove(pub.id)}
                disabled={isAnyProcessing}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Aprovar
              </button>
              <button
                onClick={() => onRequestReject(pub.id)}
                disabled={isAnyProcessing}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-danger-500 text-white text-xs font-semibold hover:bg-danger-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={12} />} Recusar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DashboardContent({ initialTab }: { initialTab: string }) {
  const [tab, setTab] = useState<Tab>((initialTab as Tab) ?? "overview");
  const { user, isAuthenticated, isLoading: authLoading, updateProfile } = useAuth();
  const router = useRouter();

  const [rejectTarget, setRejectTarget] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError,   setProfileError]   = useState("");
  const [profileForm, setProfileForm] = useState({
    name: "", department: "", institution: "", avatar: "", bio: "", linkedin: "",
  });

  // Rastreia qual solicitação de membro está sendo processada — evita desabilitar todos os botões
  const [processingReqId, setProcessingReqId] = useState<string | null>(null);

  // Rastreia qual publicação está sendo aprovada ou recusada
  const [processingPubId, setProcessingPubId] = useState<string | null>(null);

  const { data: overview, isLoading: overviewLoading } = useDashboardOverview();
  const { data: notifSummary } = useNotificationSummary(isAuthenticated);

  const stats         = overview?.stats;
  const myProjects    = (overview?.projects       ?? []).map(adaptProject);
  const myRequests    = (overview?.requests        ?? []).map(adaptRequest);
  const pendingReqs   = (overview?.pendingRequests ?? []).map(adaptRequest);
  const subscriptions = overview?.subscriptions ?? [];

  const reviewMut     = useReviewRequest();
  const cancelMut     = useCancelRequest();
  const deleteMut     = useDeleteProject();
  const approvePubMut = useApprovePublication();
  const rejectPubMut  = useRejectPublication();
  const markReadMut   = useMarkNotificationRead();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/auth/login");
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) setProfileForm({
      name:        user.name                 ?? "",
      department:  (user as any).department  ?? "",
      institution: (user as any).institution ?? "",
      avatar:      (user as any).avatar      ?? "",
      bio:         (user as any).bio         ?? "",
      linkedin:    (user as any).linkedin    ?? "",
    });
  }, [user]);

  // Limpa o processingReqId quando a mutation terminar (sucesso ou erro)
  useEffect(() => {
    if (!reviewMut.isPending) setProcessingReqId(null);
  }, [reviewMut.isPending]);

  // Limpa o processingPubId quando as mutations de publicação terminarem
  useEffect(() => {
    if (!approvePubMut.isPending && !rejectPubMut.isPending) setProcessingPubId(null);
  }, [approvePubMut.isPending, rejectPubMut.isPending]);

  if (authLoading || !user) return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
      <Loader2 size={32} className="animate-spin text-brand-500" />
    </div>
  );

  const initials = user.name.split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase();

  const handleSaveProfile = async () => {
    try {
      setProfileError("");
      setProfileLoading(true);
      await updateProfile({
        name:        profileForm.name        || undefined,
        department:  profileForm.department  || undefined,
        institution: profileForm.institution || undefined,
        avatar:      profileForm.avatar      || undefined,
        bio:         profileForm.bio         || undefined,
        linkedin:    profileForm.linkedin    || undefined,
      });
      setEditingProfile(false);
    } catch (err: any) {
      setProfileError(err?.response?.data?.message ?? "Erro ao salvar perfil.");
    } finally {
      setProfileLoading(false);
    }
  };

  // Função centralizada para revisar solicitações — rastreia o ID sendo processado
  const handleReview = (id: string, status: "APPROVED" | "REJECTED") => {
    setProcessingReqId(id);
    reviewMut.mutate({ id, status });
  };

  // Funções centralizadas para aprovar/recusar publicações — rastreiam o ID sendo processado
  const handleApprovePub = (id: string) => {
    setProcessingPubId(id);
    approvePubMut.mutate(id);
  };

  const handleRejectPub = (id: string, reason?: string) => {
    setProcessingPubId(id);
    rejectPubMut.mutate({ id, reason });
  };

  const ownedProjects  = myProjects.filter((p: any) => p.isOwner);
  const isProfessor    = user?.role === "professor";
  const suggestionNotifs = (notifSummary?.systemNotifications ?? []).filter(
    (n: any) => n.type === "PUBLICATION_SUGGESTION" && !n.read
  );
  const memberProjects = myProjects.filter((p: any) => !p.isOwner);
  const pendingCount   = pendingReqs.length;

  const TABS = [
    { id: "overview" as Tab,      label: "Visão Geral",  icon: LayoutDashboard },
    { id: "projects" as Tab,      label: "Projetos",      icon: FlaskConical    },
    { id: "requests" as Tab,      label: `Solicitações${pendingCount > 0 ? ` (${pendingCount})` : ""}`, icon: Users },
    { id: "subscriptions" as Tab, label: "Acompanhando", icon: Bell            },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      {/* ── Profile ── */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 shadow-card">
        {!editingProfile ? (
          /* MODO VISUALIZAÇÃO */
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-brand-100 dark:bg-brand-900 flex items-center justify-center flex-shrink-0">
                {(user as any).avatar ? (
                  <NextImage src={(user as any).avatar} alt={user.name} width={56} height={56} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display font-extrabold text-brand-700 dark:text-brand-300 text-base sm:text-lg">{initials}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display font-bold text-neutral-900 dark:text-neutral-100 text-base sm:text-lg truncate">{user.name}</h2>
                  <Badge variant={user.role === "professor" ? "brand" : "neutral"}>
                    {user.role === "professor" ? "Professor" : "Aluno"}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                  {[(user as any).department, (user as any).institution, user.email].filter(Boolean).join(" · ")}
                </p>
                {(user as any).bio && (
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                    {(user as any).bio}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:flex-shrink-0">
              <Link
                href="/perfil"
                className="p-2 rounded-lg text-neutral-400 hover:text-brand-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all"
                title="Configurações"
              >
                <Settings size={17} />
              </Link>
              {isProfessor && (
              <Link href="/projetos/novo" className="flex-1 sm:flex-none">
                <Button size="sm" className="w-full sm:w-auto">
                  <PlusCircle size={14} />
                  <span className="hidden xs:inline sm:inline">Criar projeto</span>
                  <span className="xs:hidden sm:hidden">Criar</span>
                </Button>
              </Link>
              )}
            </div>
          </div>
        ) : (
          /* MODO EDIÇÃO */
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200">Editar perfil</h3>
              <button
                onClick={() => { setEditingProfile(false); setProfileError(""); }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 mb-4 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-brand-100 dark:bg-brand-900 flex items-center justify-center flex-shrink-0">
                {profileForm.avatar ? (
                  <img src={profileForm.avatar} alt="preview" className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")} />
                ) : (
                  <span className="font-bold text-brand-700 dark:text-brand-300 text-sm">{initials}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">URL da foto de perfil</p>
                <input
                  className="w-full h-9 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  value={profileForm.avatar}
                  onChange={e => setProfileForm(f => ({ ...f, avatar: e.target.value }))}
                  placeholder="https://exemplo.com/sua-foto.jpg"
                />
                <p className="text-[10px] text-neutral-400 mt-1 hidden sm:block">
                  Cole a URL de uma imagem. Sugestão: use seu avatar do GitHub (https://github.com/seuusuario.png).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Nome completo",  key: "name",        placeholder: "Seu nome" },
                { label: "Departamento",   key: "department",  placeholder: "Ex: Engenharia de Computação" },
                { label: "Instituição",    key: "institution", placeholder: "Ex: UNICAMP" },
                { label: "LinkedIn (URL)", key: "linkedin",    placeholder: "https://linkedin.com/in/..." },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1 block">{label}</label>
                  <input
                    className="w-full h-9 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                    value={(profileForm as any)[key]}
                    onChange={e => setProfileForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                  />
                </div>
              ))}
              <div className="col-span-1 sm:col-span-2">
                <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1 block">Bio</label>
                <textarea rows={2}
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  value={profileForm.bio}
                  onChange={e => setProfileForm(f => ({ ...f, bio: e.target.value }))}
                  placeholder="Uma breve descrição sobre você..."
                />
              </div>
            </div>

            {profileError && <p className="text-xs text-danger-500 mt-3">{profileError}</p>}

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-700">
              <Button variant="secondary" size="sm" onClick={() => { setEditingProfile(false); setProfileError(""); }}>
                Cancelar
              </Button>
              <Button size="sm" loading={profileLoading} onClick={handleSaveProfile}>
                <Check size={13} /> Salvar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {[
          { label: "Projetos criados", value: stats?.ownedCount      ?? 0, icon: FlaskConical, color: "bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400"      },
          { label: "Sou membro",       value: stats?.memberCount     ?? 0, icon: Users,         color: "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400"    },
          { label: "Acompanhando",     value: stats?.subsCount       ?? 0, icon: Bell,          color: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400"       },
          { label: "Solicitações",     value: stats?.pendingRequests ?? 0, icon: Clock,         color: "bg-warning-50 dark:bg-warning-950 text-warning-700 dark:text-warning-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-3 sm:p-4 shadow-card">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center mb-2 sm:mb-3 ${color}`}>
              <Icon size={15} />
            </div>
            {overviewLoading ? (
              <Skeleton className="h-7 sm:h-8 w-12 mb-0.5 rounded-lg" />
            ) : (
              <p className="font-display font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-neutral-100">{String(value)}</p>
            )}
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-card overflow-hidden">
        <div className="flex border-b border-neutral-200 dark:border-neutral-700 px-2 pt-2 gap-1 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap flex-shrink-0",
                tab === id
                  ? "text-brand-700 dark:text-brand-400 border-brand-600 bg-brand-50/50 dark:bg-brand-950/50"
                  : "text-neutral-500 dark:text-neutral-400 border-transparent hover:text-neutral-700 dark:hover:text-neutral-200"
              )}
            >
              <Icon size={14} />
              <span className="hidden xs:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-5">

          {/* ── VISÃO GERAL ── */}
          {tab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200">Meus projetos</h3>
                  <button onClick={() => setTab("projects")} className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
                    Ver todos <ArrowRight size={12} />
                  </button>
                </div>
                {myProjects.slice(0, 3).map((p: any) => (
                  <ProjectCard key={p.id} project={p} variant="compact" />
                ))}
                {myProjects.length === 0 && (
                  <div className="text-sm text-neutral-400 py-6 text-center border border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
                    Você ainda não participa de nenhum projeto.
                    <br /><Link href="/projetos" className="text-brand-600 font-semibold mt-1 inline-block">Explorar projetos →</Link>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200">Solicitações pendentes</h3>
                  {(pendingCount + suggestionNotifs.length) > 0 && (
                    <button onClick={() => setTab("requests")} className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
                      Ver todas <ArrowRight size={12} />
                    </button>
                  )}
                </div>

                {/* Sugestões do professor (aluno) */}
                {!isProfessor && suggestionNotifs.slice(0, 2).map((notif: any) => {
                  const pubIdMatch = notif.message?.match(/\[pubId:([^\]]+)\]/);
                  const pubId      = pubIdMatch?.[1];
                  const titleMatch = notif.message?.match(/publicação "([^"]+)"/);
                  const pubTitle   = titleMatch?.[1] ?? "Publicação";
                  return (
                    <div key={notif.id} className="flex items-center gap-2 sm:gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-2">
                      <div className="w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0">
                        <MessageSquare size={13} className="text-amber-700 dark:text-amber-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">{pubTitle}</p>
                        <p className="text-[11px] text-amber-600 dark:text-amber-400">Sugestão do professor</p>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <Link
                          href={pubId ? `/publicacoes/${pubId}/editar` : "/publicacoes"}
                          onClick={() => markReadMut.mutate(notif.id)}
                          className="p-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 hover:scale-110 transition-all duration-150 shadow-sm flex-shrink-0"
                          title="Revisar"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => markReadMut.mutate(notif.id)}
                          className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-400 hover:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-950 transition-all duration-150 shadow-sm flex-shrink-0"
                          title="Limpar"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Solicitações de entrada — botões de ícone com disabled preciso por ID */}
                {pendingReqs.slice(0, 3).map((req: any) => {
                  const isProcessing = processingReqId === req.id;
                  const isAnyProcessing = processingReqId !== null;
                  return (
                    <div key={req.id} className="flex items-center gap-2 sm:gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-100 dark:border-neutral-700 mb-2">
                      <Avatar name={req.user?.name ?? "?"} size="sm" src={req.user?.avatar} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">{req.user?.name}</p>
                        <p className="text-[11px] text-neutral-400 truncate">{req.project?.title}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleReview(req.id, "APPROVED")}
                          disabled={isAnyProcessing}
                          className="p-1.5 rounded-lg bg-success-600 text-white hover:bg-success-700 hover:scale-110 transition-all duration-150 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        >
                          {isProcessing && reviewMut.isPending
                            ? <Loader2 size={14} className="animate-spin" />
                            : <CheckCircle2 size={14} />
                          }
                        </button>
                        <button
                          onClick={() => handleReview(req.id, "REJECTED")}
                          disabled={isAnyProcessing}
                          className="p-1.5 rounded-lg bg-danger-500 text-white hover:bg-danger-600 hover:scale-110 transition-all duration-150 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        >
                          {isProcessing && reviewMut.isPending
                            ? <Loader2 size={14} className="animate-spin" />
                            : <XCircle size={14} />
                          }
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Publicações pendentes de aprovação (professor) */}
                {isProfessor && ownedProjects.slice(0, 2).map((proj: any) => (
                  <PendingPublicationsSection
                    key={proj.id}
                    projectId={proj.id}
                    projectTitle={proj.title}
                    onApprove={handleApprovePub}
                    onReject={handleRejectPub}
                    onRequestReject={setRejectTarget}
                    processingPubId={processingPubId}
                    isAnyProcessing={processingPubId !== null}
                  />
                ))}

                {pendingReqs.length === 0 && suggestionNotifs.length === 0 && !(isProfessor && ownedProjects.length > 0) && (
                  <p className="text-sm text-neutral-400 py-6 text-center">Nenhuma solicitação pendente.</p>
                )}
              </div>
            </div>
          )}

          {/* ── PROJETOS ── */}
          {tab === "projects" && (
            <div>
              {ownedProjects.length > 0 && (
                <>
                  <h3 className="font-display font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200 mb-3 sm:mb-4 flex items-center gap-2">
                    <FlaskConical size={15} className="text-brand-500" /> Projetos que criei
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {ownedProjects.map((p: any) => (
                      <div key={p.id} className="relative group">
                        <ProjectCard project={p} />
                        <button
                          onClick={() => { if (confirm("Excluir este projeto?")) deleteMut.mutate(p.id); }}
                          className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/80 dark:bg-neutral-800/80 text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-950 transition-all shadow-sm"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {memberProjects.length > 0 && (
                <>
                  <h3 className="font-display font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200 mb-3 sm:mb-4 flex items-center gap-2">
                    <Users size={15} className="text-violet-500" /> Projetos que participo
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {memberProjects.map((p: any) => <ProjectCard key={p.id} project={p} />)}
                  </div>
                </>
              )}

              {myProjects.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <FlaskConical size={28} className="text-neutral-200 mx-auto mb-3" />
                  <p className="text-neutral-500 mb-4 text-sm">Você ainda não tem projetos.</p>
                  <div className="flex flex-col xs:flex-row justify-center gap-2 sm:gap-3">
                    {isProfessor && <Link href="/projetos/novo"><Button size="sm"><PlusCircle size={14} /> Criar projeto</Button></Link>}
                    <Link href="/projetos"><Button variant="secondary" size="sm">Explorar projetos</Button></Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── SOLICITAÇÕES ── */}
          {tab === "requests" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

              <div className="flex flex-col gap-6">

                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200 mb-3 sm:mb-4">Solicitações pendentes</h3>
                  {pendingReqs.length === 0 && suggestionNotifs.length === 0 && !(isProfessor && ownedProjects.length > 0) && (
                    <p className="text-sm text-neutral-400 py-6 text-center border border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
                      Nenhuma solicitação pendente.
                    </p>
                  )}
                  {pendingReqs.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {pendingReqs.map((req: any) => {
                        const isProcessing    = processingReqId === req.id;
                        const isAnyProcessing = processingReqId !== null;
                        return (
                          <div key={req.id} className="p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2">
                              <Avatar name={req.user?.name ?? "?"} size="sm" src={req.user?.avatar} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">{req.user?.name}</p>
                                <p className="text-xs text-neutral-400 truncate">{req.project?.title}</p>
                              </div>
                              <Badge variant="warning" className="flex-shrink-0">Pendente</Badge>
                            </div>
                            {req.message && (
                              <p className="text-xs text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-800 rounded-lg p-2 border border-neutral-100 dark:border-neutral-700 mb-3 italic line-clamp-3">
                                "{req.message}"
                              </p>
                            )}
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="success"
                                className="flex-1"
                                loading={isProcessing && reviewMut.isPending}
                                disabled={isAnyProcessing}
                                onClick={() => handleReview(req.id, "APPROVED")}
                              >
                                <CheckCircle2 size={13} /> Aprovar
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                className="flex-1"
                                loading={isProcessing && reviewMut.isPending}
                                disabled={isAnyProcessing}
                                onClick={() => handleReview(req.id, "REJECTED")}
                              >
                                <XCircle size={13} /> Rejeitar
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Publicações pendentes de aprovação (professor) */}
                {isProfessor && ownedProjects.map((proj: any) => (
                  <PendingPublicationsSection
                    key={proj.id}
                    projectId={proj.id}
                    projectTitle={proj.title}
                    onApprove={handleApprovePub}
                    onReject={handleRejectPub}
                    onRequestReject={setRejectTarget}
                    processingPubId={processingPubId}
                    isAnyProcessing={processingPubId !== null}
                  />
                ))}

                {/* Sugestões recebidas (aluno) */}
                {!isProfessor && suggestionNotifs.length > 0 && (
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200 mb-3 sm:mb-4 flex items-center gap-2">
                      <MessageSquare size={15} className="text-amber-600" /> Sugestões do Professor
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs font-bold">{suggestionNotifs.length}</span>
                    </h3>
                    <div className="flex flex-col gap-3">
                      {suggestionNotifs.map((notif: any) => {
                        const pubIdMatch = notif.message?.match(/\[pubId:([^\]]+)\]/);
                        const pubId      = pubIdMatch?.[1];
                        const titleMatch = notif.message?.match(/publicação "([^"]+)"/);
                        const colonIdx   = notif.message?.indexOf('": ');
                        const rawSugg    = colonIdx > 0 ? notif.message.slice(colonIdx + 3).replace(/\s*\[pubId:[^\]]+\]/, "").replace(/\.\.\.$/,"").trim() : "";
                        const pubTitle   = titleMatch?.[1] ?? "Publicação";
                        return (
                          <div key={notif.id} className="p-3 sm:p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0">
                                <MessageSquare size={13} className="text-amber-700 dark:text-amber-300" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">{pubTitle}</p>
                                <p className="text-xs text-neutral-400">{new Date(notif.createdAt).toLocaleDateString("pt-BR")}</p>
                              </div>
                              <Badge variant="warning" className="flex-shrink-0">Revisão</Badge>
                            </div>
                            {rawSugg && (
                              <p className="text-xs text-amber-700 dark:text-amber-300 bg-white dark:bg-neutral-800 rounded-lg p-2 border border-amber-100 dark:border-amber-900 mb-3 italic line-clamp-3">
                                "{rawSugg}"
                              </p>
                            )}
                            <div className="flex gap-2">
                              <Link
                                href={pubId ? `/publicacoes/${pubId}/editar` : "/publicacoes"}
                                className="flex items-center justify-center gap-1.5 flex-1 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-all"
                              >
                                <Pencil size={12} /> Revisar
                              </Link>
                              <button
                                onClick={() => markReadMut.mutate(notif.id)}
                                className="flex items-center justify-center gap-1.5 flex-1 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-500 hover:text-danger-600 dark:hover:text-danger-400 text-xs font-semibold hover:bg-danger-50 dark:hover:bg-danger-950 transition-all"
                              >
                                <X size={12} /> Limpar
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>

              {/* Coluna direita: minhas solicitações enviadas */}
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200 mb-3 sm:mb-4">Minhas solicitações enviadas</h3>
                {myRequests.length === 0 ? (
                  <p className="text-sm text-neutral-400 py-6 text-center border border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
                    Você ainda não solicitou entrar em nenhum grupo.
                    <br /><Link href="/projetos" className="text-brand-600 font-semibold mt-1 inline-block">Explorar projetos →</Link>
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {myRequests.map((req: any) => {
                      const s = REQ_STATUS[req.status] ?? REQ_STATUS.pending;
                      const Icon = s.icon;
                      return (
                        <div key={req.id} className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                          <Icon size={16} className={cn(s.color, "flex-shrink-0")} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">{req.project?.title ?? "Projeto"}</p>
                            <p className="text-xs text-neutral-400">{new Date(req.createdAt).toLocaleDateString("pt-BR")}</p>
                          </div>
                          <Badge variant={s.variant} className="flex-shrink-0">{s.label}</Badge>
                          {req.status === "pending" && (
                            <button onClick={() => cancelMut.mutate(req.id)} className="p-1.5 rounded-lg text-neutral-400 hover:text-danger-500 hover:bg-danger-50 transition-all flex-shrink-0">
                              <XCircle size={14} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── ACOMPANHANDO ── */}
          {tab === "subscriptions" && (
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200 mb-4 sm:mb-5 flex items-center gap-2">
                <Bell size={15} className="text-amber-500" /> Projetos que acompanho
              </h3>
              {subscriptions.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <Bell size={28} className="text-neutral-200 mx-auto mb-3" />
                  <p className="text-neutral-500 mb-2 text-sm">Você não está acompanhando nenhum projeto ainda.</p>
                  <p className="text-xs sm:text-sm text-neutral-400 mb-4 max-w-xs mx-auto">Ao se inscrever em um projeto, você recebe as atualizações e postagens do grupo.</p>
                  <Link href="/projetos"><Button variant="secondary" size="sm">Explorar projetos</Button></Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {subscriptions.map((sub: any) => {
                    const p = sub.project;
                    if (!p) return null;
                    return (
                      <Link key={sub.id} href={`/projetos/${p.id}`}
                        className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-3 sm:p-4 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center flex-shrink-0">
                            <BookmarkCheck size={15} className="text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-2 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                              {p.title}
                            </p>
                            <p className="text-xs text-neutral-400 mt-1">
                              {p._count?.members ?? p.members?.length ?? 0} membros
                              {" · "}{p._count?.posts ?? 0} posts
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ── Modal de recusa de publicação ── */}
      {rejectTarget && (
        <RejectModal
          pubId={rejectTarget}
          onConfirm={(id, reason) => {
            handleRejectPub(id, reason);
            setRejectTarget(null);
          }}
          onCancel={() => setRejectTarget(null)}
        />
      )}
    </div>
  );
}

function DashboardPageInner() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") ?? "overview";
  return <DashboardContent initialTab={initialTab} />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600" /></div>}>
      <DashboardPageInner />
    </Suspense>
  );
}
