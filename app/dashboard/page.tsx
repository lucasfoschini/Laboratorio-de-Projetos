"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NextImage from "next/image";
import {
  ArrowRight, Bell, BookmarkCheck, CheckCircle2, Clock,
  FlaskConical, LayoutDashboard, Loader2, PlusCircle, Settings,
  Trash2, Users, XCircle, Pencil, X, Check,
} from "lucide-react";
import { Badge, Avatar, Button, Skeleton } from "@/components/ui";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useAuth } from "@/contexts/auth";
import {
  useDashboardStats, useDashboardProjects, useDashboardRequests,
  useDashboardPendingRequests, useDashboardSubscriptions,
  useReviewRequest, useCancelRequest, useDeleteProject,
} from "@/lib/hooks/useQueries";
import { cn } from "@/lib/utils";

type Tab = "overview" | "projects" | "requests" | "subscriptions";

const REQ_STATUS: Record<string, { label: string; variant: "success"|"warning"|"danger"|"neutral"; icon: React.ElementType; color: string }> = {
  pending:  { label: "Aguardando", variant: "warning", icon: Clock,        color: "text-warning-600" },
  approved: { label: "Aprovado",   variant: "success", icon: CheckCircle2, color: "text-success-600" },
  rejected: { label: "Recusado",   variant: "danger",  icon: XCircle,      color: "text-danger-500"  },
};

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const { user, isAuthenticated, isLoading: authLoading, updateProfile } = useAuth();
  const router = useRouter();

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError,   setProfileError]   = useState("");
  const [profileForm, setProfileForm] = useState({
    name: "", department: "", institution: "", avatar: "", bio: "", linkedin: "",
  });

  const { data: stats }         = useDashboardStats();
  const { data: myProjects = [] } = useDashboardProjects();
  const { data: myRequests = [] } = useDashboardRequests();
  const { data: pendingReqs = [] } = useDashboardPendingRequests();
  const { data: subscriptions = [] } = useDashboardSubscriptions();

  const reviewMut = useReviewRequest();
  const cancelMut = useCancelRequest();
  const deleteMut = useDeleteProject();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/auth/login");
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) setProfileForm({
      name:        user.name                   ?? "",
      department:  (user as any).department    ?? "",
      institution: (user as any).institution   ?? "",
      avatar:      (user as any).avatar        ?? "",
      bio:         (user as any).bio           ?? "",
      linkedin:    (user as any).linkedin      ?? "",
    });
  }, [user]);

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
  const ownedProjects = myProjects.filter((p: any) => p.isOwner);
  const memberProjects = myProjects.filter((p: any) => !p.isOwner);
  const pendingCount = pendingReqs.length;

  const TABS = [
    { id: "overview" as Tab,      label: "Visão Geral",   icon: LayoutDashboard },
    { id: "projects" as Tab,      label: "Projetos",       icon: FlaskConical    },
    { id: "requests" as Tab,      label: `Solicitações${pendingCount > 0 ? ` (${pendingCount})` : ""}`, icon: Users },
    { id: "subscriptions" as Tab, label: "Acompanhando",  icon: Bell            },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Profile ── */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 mb-6 shadow-card">
        {!editingProfile ? (
          /* MODO VISUALIZAÇÃO */
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-brand-100 dark:bg-brand-900 flex items-center justify-center flex-shrink-0">
                {(user as any).avatar ? (
                  <NextImage src={(user as any).avatar} alt={user.name} width={56} height={56} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display font-extrabold text-brand-700 dark:text-brand-300 text-lg">{initials}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display font-bold text-neutral-900 dark:text-neutral-100 text-lg">{user.name}</h2>
                  <Badge variant={user.role === "professor" ? "brand" : "neutral"}>
                    {user.role === "professor" ? "Professor" : "Aluno"}
                  </Badge>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {[(user as any).department, (user as any).institution, user.email].filter(Boolean).join(" · ")}
                </p>
                 <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {[(user as any).bio].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/perfil" className="p-2 rounded-lg text-neutral-400 hover:text-brand-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all" title="Configurações">
                <Settings size={17} />
              </Link>
              <Link href="/projetos/novo">
                <Button size="sm"><PlusCircle size={14} /> Criar projeto</Button>
              </Link>
            </div>
          </div>
        ) : (
          /* MODO EDIÇÃO */
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200">Editar perfil</h3>
              <button onClick={() => { setEditingProfile(false); setProfileError(""); }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all">
                <X size={15} />
              </button>
            </div>

            {/* Preview do avatar */}
            <div className="flex items-center gap-4 mb-4 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-brand-100 dark:bg-brand-900 flex items-center justify-center flex-shrink-0">
                {profileForm.avatar ? (
                  <img src={profileForm.avatar} alt="preview" className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")} />
                ) : (
                  <span className="font-bold text-brand-700 dark:text-brand-300 text-sm">{initials}</span>
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">URL da foto de perfil</p>
                <input
                  className="w-full h-9 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  value={profileForm.avatar}
                  onChange={e => setProfileForm(f => ({ ...f, avatar: e.target.value }))}
                  placeholder="https://exemplo.com/sua-foto.jpg"
                />
                <p className="text-[10px] text-neutral-400 mt-1">
                  Cole a URL de uma imagem. Sugestão: use seu avatar do GitHub (https://github.com/seuusuario.png).
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
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
              <div className="md:col-span-2">
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
                <Check size={13} /> Salvar perfil
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Projetos criados",  value: stats?.ownedCount    ?? 0, icon: FlaskConical,  color: "bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400"    },
          { label: "Sou membro",        value: stats?.memberCount   ?? 0, icon: Users,          color: "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400"  },
          { label: "Acompanhando",      value: stats?.subsCount     ?? 0, icon: Bell,           color: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400"    },
          { label: "Solicitações",      value: stats?.pendingRequests ?? 0, icon: Clock,        color: "bg-warning-50 dark:bg-warning-950 text-warning-700 dark:text-warning-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 shadow-card">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon size={16} />
            </div>
            <p className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100">{value}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-card overflow-hidden">
        <div className="flex border-b border-neutral-200 dark:border-neutral-700 px-2 pt-2 gap-1 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={cn("flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap",
                tab === id ? "text-brand-700 dark:text-brand-400 border-brand-600 bg-brand-50/50 dark:bg-brand-950/50" : "text-neutral-500 dark:text-neutral-400 border-transparent hover:text-neutral-700 dark:hover:text-neutral-200"
              )}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        <div className="p-5">

          {/* ── VISÃO GERAL ── */}
          {tab === "overview" && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200">Meus projetos</h3>
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
                  <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200">Solicitações pendentes</h3>
                  {pendingCount > 0 && (
                    <button onClick={() => setTab("requests")} className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
                      Ver todas <ArrowRight size={12} />
                    </button>
                  )}
                </div>
                {pendingReqs.slice(0, 3).map((req: any) => (
                  <div key={req.id} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-100 dark:border-neutral-700 mb-2">
                    <Avatar name={req.user?.name ?? "?"} size="sm" src={req.user?.avatar} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">{req.user?.name}</p>
                      <p className="text-[11px] text-neutral-400 truncate">{req.project?.title}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => reviewMut.mutate({ id: req.id, status: "APPROVED" })}
                        className="p-1.5 rounded-lg bg-success-600 text-white hover:bg-success-700 hover:scale-110 transition-all duration-150 shadow-sm">
                        <CheckCircle2 size={15} />
                      </button>
                      <button onClick={() => reviewMut.mutate({ id: req.id, status: "REJECTED" })}
                        className="p-1.5 rounded-lg bg-danger-500 text-white hover:bg-danger-600 hover:scale-110 transition-all duration-150 shadow-sm">
                        <XCircle size={15} />
                      </button>
                    </div>
                  </div>
                ))}
                {pendingReqs.length === 0 && (
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
                  <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
                    <FlaskConical size={16} className="text-brand-500" /> Projetos que criei
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
                  <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
                    <Users size={16} className="text-violet-500" /> Projetos que participo
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {memberProjects.map((p: any) => <ProjectCard key={p.id} project={p} />)}
                  </div>
                </>
              )}

              {myProjects.length === 0 && (
                <div className="text-center py-16">
                  <FlaskConical size={32} className="text-neutral-200 mx-auto mb-3" />
                  <p className="text-neutral-500 mb-4">Você ainda não tem projetos.</p>
                  <div className="flex justify-center gap-3">
                    <Link href="/projetos/novo"><Button size="sm"><PlusCircle size={14} /> Criar projeto</Button></Link>
                    <Link href="/projetos"><Button variant="secondary" size="sm">Explorar projetos</Button></Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── SOLICITAÇÕES ── */}
          {tab === "requests" && (
            <div className="grid lg:grid-cols-2 gap-8">

              {/* Recebidas (nos meus projetos) */}
              <div>
                <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-4">Solicitações recebidas</h3>
                {pendingReqs.length === 0 ? (
                  <p className="text-sm text-neutral-400 py-6 text-center border border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
                    Nenhuma solicitação pendente nos seus projetos.
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {pendingReqs.map((req: any) => (
                      <div key={req.id} className="p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar name={req.user?.name ?? "?"} size="sm" src={req.user?.avatar} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{req.user?.name}</p>
                            <p className="text-xs text-neutral-400 truncate">{req.project?.title}</p>
                          </div>
                          <Badge variant="warning">Pendente</Badge>
                        </div>
                        {req.message && (
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-800 rounded-lg p-2 border border-neutral-100 dark:border-neutral-700 mb-3 italic">
                            "{req.message}"
                          </p>
                        )}
                        <div className="flex gap-2">
                          <Button size="sm" variant="success" className="flex-1 hover:scale-105 transition-all duration-150 shadow-sm"
                            loading={reviewMut.isPending}
                            onClick={() => reviewMut.mutate({ id: req.id, status: "APPROVED" })}>
                            <CheckCircle2 size={13} /> Aprovar
                          </Button>
                          <Button size="sm" variant="danger" className="flex-1 hover:scale-105 transition-all duration-150 shadow-sm"
                            loading={reviewMut.isPending}
                            onClick={() => reviewMut.mutate({ id: req.id, status: "REJECTED" })}>
                            <XCircle size={13} /> Rejeitar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Enviadas (minhas solicitações) */}
              <div>
                <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-4">Minhas solicitações enviadas</h3>
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
                        <div key={req.id} className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                          <Icon size={18} className={s.color} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                              {req.project?.title ?? "Projeto"}
                            </p>
                            <p className="text-xs text-neutral-400">
                              {new Date(req.createdAt).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <Badge variant={s.variant}>{s.label}</Badge>
                          {req.status === "pending" && (
                            <button
                              onClick={() => cancelMut.mutate(req.id)}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-danger-500 hover:bg-danger-50 transition-all">
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
                <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-5 flex items-center gap-2">
                <Bell size={16} className="text-amber-500" /> Projetos que acompanho
              </h3>
              {subscriptions.length === 0 ? (
                <div className="text-center py-16">
                  <Bell size={32} className="text-neutral-200 mx-auto mb-3" />
                  <p className="text-neutral-500 mb-3">Você não está acompanhando nenhum projeto ainda.</p>
                  <p className="text-sm text-neutral-400 mb-4">Ao se inscrever em um projeto, você recebe as atualizações e postagens do grupo.</p>
                  <Link href="/projetos"><Button variant="secondary" size="sm">Explorar projetos</Button></Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subscriptions.map((sub: any) => {
                    const p = sub.project;
                    if (!p) return null;
                    return (
                      <Link key={sub.id} href={`/projetos/${p.id}`}
                        className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center flex-shrink-0">
                            <BookmarkCheck size={16} className="text-amber-600" />
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
    </div>
  );
}
