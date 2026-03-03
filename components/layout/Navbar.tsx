"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { Bell, BellDot, FlaskConical, LayoutDashboard, LogIn, LogOut, Menu, MessageSquare, Moon, Settings, Sun, UserCircle, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth";
import { useTheme } from "@/contexts/theme";
import { useDashboardPendingRequests, useDashboardSubscriptions, useSubscribedActivity, useNotifications } from "@/lib/hooks/useQueries";

const NAV = [
  { href: "/",            label: "Início"      },
  { href: "/projetos",    label: "Projetos"    },
  { href: "/publicacoes", label: "Publicações" },
];

const NOTIF_SEEN_KEY = "@labativo:notif_seen_at";
const NOTIF_DISMISSED_KEY = "@labativo:notif_dismissed_ids";

function getSeenAt(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(NOTIF_SEEN_KEY);
}
function setSeenAt(iso: string) {
  if (typeof window !== "undefined") localStorage.setItem(NOTIF_SEEN_KEY, iso);
}
function getDismissedIds(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(NOTIF_DISMISSED_KEY) ?? "[]"); } catch { return []; }
}
function addDismissedId(id: string) {
  const ids = getDismissedIds();
  if (!ids.includes(id)) { ids.push(id); localStorage.setItem(NOTIF_DISMISSED_KEY, JSON.stringify(ids)); }
}

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [seenAt, _setSeenAt] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { data: pending = [] } = useDashboardPendingRequests();
  const { data: activity } = useSubscribedActivity(true);
  const { data: subscriptions = [] } = useDashboardSubscriptions();
  const { data: systemNotifs = [] } = useNotifications(true);

  // Carrega estado persistido no mount
  useEffect(() => {
    _setSeenAt(getSeenAt());
    setDismissedIds(getDismissedIds());
  }, []);

  const pendingCount = Array.isArray(pending) ? pending.length : 0;

  // Filtra atividade para mostrar apenas itens criados APÓS a inscrição do usuário naquele projeto
  const subDateMap = useMemo(() => {
    const map: Record<string, string> = {};
    (Array.isArray(subscriptions) ? subscriptions : []).forEach((s: any) => {
      if (s.projectId && (s.subscribedAt || s.createdAt)) {
        map[s.projectId] = s.subscribedAt ?? s.createdAt;
      }
    });
    return map;
  }, [subscriptions]);

  const activityPosts = useMemo(() => {
    return (activity?.posts ?? []).filter((post: any) => {
      const subDate = subDateMap[post.projectId];
      if (!subDate || !post.createdAt) return true;
      return new Date(post.createdAt) >= new Date(subDate);
    });
  }, [activity?.posts, subDateMap]);

  const activityPubs = useMemo(() => {
    return (activity?.publications ?? []).filter((pub: any) => {
      const subDate = subDateMap[pub.projectId];
      if (!subDate || !pub.createdAt) return true;
      return new Date(pub.createdAt) >= new Date(subDate);
    });
  }, [activity?.publications, subDateMap]);

  // Filtra itens já dispensados individualmente
  const visiblePending = useMemo(() => {
    const arr = Array.isArray(pending) ? pending : [];
    return arr.filter((r: any) => !dismissedIds.includes(r.id));
  }, [pending, dismissedIds]);

  const visiblePosts = useMemo(() => activityPosts.filter((p: any) => !dismissedIds.includes(p.id)), [activityPosts, dismissedIds]);
  const visiblePubs  = useMemo(() => activityPubs.filter((p: any) => !dismissedIds.includes(p.id)), [activityPubs, dismissedIds]);

  // Notificações do sistema (leave, remove, aceitação, etc.)
  const visibleSystemNotifs = useMemo(() => {
    const arr = Array.isArray(systemNotifs) ? systemNotifs : [];
    return arr.filter((n: any) => !dismissedIds.includes(n.id) && !n.read);
  }, [systemNotifs, dismissedIds]);

  // Conta apenas notificações NOVAS (após o último "seen") para o badge
  const unseenCount = useMemo(() => {
    if (!seenAt) return visiblePending.length + visiblePosts.length + visiblePubs.length + visibleSystemNotifs.length;
    const threshold = new Date(seenAt);
    const newPending = visiblePending.filter((r: any) => !r.createdAt || new Date(r.createdAt) > threshold);
    const newPosts   = visiblePosts.filter((p: any) => !p.createdAt || new Date(p.createdAt) > threshold);
    const newPubs    = visiblePubs.filter((p: any) => !p.createdAt || new Date(p.createdAt) > threshold);
    const newSystem  = visibleSystemNotifs.filter((n: any) => !n.createdAt || new Date(n.createdAt) > threshold);
    return newPending.length + newPosts.length + newPubs.length + newSystem.length;
  }, [seenAt, visiblePending, visiblePosts, visiblePubs, visibleSystemNotifs]);

  const totalVisible = visiblePending.length + visiblePosts.length + visiblePubs.length + visibleSystemNotifs.length;
  const showBadge    = unseenCount > 0;

  // Fecha ao clicar fora
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggle = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen) {
      // Marca tudo como "visto" — badge zera e persiste
      const now = new Date().toISOString();
      setSeenAt(now);
      _setSeenAt(now);
    }
  };

  const handleDismiss = (id: string) => {
    addDismissedId(id);
    setDismissedIds((prev) => [...prev, id]);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleToggle}
        className="relative p-2 rounded-lg text-neutral-400 hover:text-brand-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
        title="Notificações"
      >
        {showBadge ? <BellDot size={17} className="text-brand-600" /> : <Bell size={17} />}
        {showBadge && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {unseenCount > 9 ? "9+" : unseenCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
            <p className="font-display font-bold text-sm text-neutral-800 dark:text-neutral-100">Notificações</p>
            <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
              <X size={14} />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {totalVisible === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-neutral-400">
                Nenhuma notificação por enquanto
              </div>
            ) : (
              <>
                {/* Solicitações pendentes nos seus projetos */}
                {visiblePending.length > 0 && (
                  <>
                    <div className="px-4 py-2 bg-brand-50 border-b border-brand-100 flex items-center gap-2">
                      <Bell size={12} className="text-brand-600" />
                      <p className="text-xs font-semibold text-brand-700">
                        {visiblePending.length} solicitação{visiblePending.length !== 1 ? "ões" : ""} pendente{visiblePending.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    {visiblePending.slice(0, 4).map((req: any) => (
                      <div key={req.id} className="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0">
                        <Link
                          href="/dashboard"
                          onClick={() => setOpen(false)}
                          className="flex items-start gap-3 flex-1 min-w-0"
                        >
                          {req.user?.avatar ? (
                            <NextImage src={req.user.avatar} alt={req.user.name ?? ""} width={28} height={28} className="rounded-full object-cover flex-shrink-0 mt-0.5" loading="lazy" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[11px] font-bold text-brand-700">
                                {req.user?.name?.[0]?.toUpperCase() ?? "?"}
                              </span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-neutral-800 truncate">
                              {req.user?.name ?? "Usuário"} quer entrar em
                            </p>
                            <p className="text-xs text-neutral-500 truncate">{req.project?.title ?? "seu projeto"}</p>
                          </div>
                        </Link>
                        <button onClick={() => handleDismiss(req.id)} className="flex-shrink-0 p-1 rounded-md text-neutral-300 hover:text-neutral-600 hover:bg-neutral-100 transition-colors" title="Dispensar">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {visiblePending.length > 4 && (
                      <Link href="/dashboard" onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-xs text-center text-brand-600 hover:bg-brand-50 transition-colors font-semibold border-b border-neutral-100">
                        Ver todas as {visiblePending.length} solicitações →
                      </Link>
                    )}
                  </>
                )}

                {/* Atividade recente dos projetos acompanhados */}
                {(visiblePosts.length + visiblePubs.length) > 0 && (
                  <>
                    <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2">
                      <MessageSquare size={12} className="text-emerald-600" />
                      <p className="text-xs font-semibold text-emerald-700">
                        Novidades nos projetos que você acompanha
                      </p>
                    </div>
                    {visiblePosts.slice(0, 3).map((post: any) => (
                      <div key={post.id} className="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0">
                        <Link
                          href={`/projetos/${post.projectId}`}
                          onClick={() => setOpen(false)}
                          className="flex items-start gap-3 flex-1 min-w-0"
                        >
                          <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MessageSquare size={12} className="text-emerald-700" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-neutral-800 line-clamp-1">{post.title}</p>
                            <p className="text-xs text-neutral-500 truncate">Atualização em {post.project?.title}</p>
                          </div>
                        </Link>
                        <button onClick={() => handleDismiss(post.id)} className="flex-shrink-0 p-1 rounded-md text-neutral-300 hover:text-neutral-600 hover:bg-neutral-100 transition-colors" title="Dispensar">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {visiblePubs.slice(0, 2).map((pub: any) => (
                      <div key={pub.id} className="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0">
                        <Link
                          href="/publicacoes"
                          onClick={() => setOpen(false)}
                          className="flex items-start gap-3 flex-1 min-w-0"
                        >
                          <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[10px] font-bold text-amber-700">PUB</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-neutral-800 line-clamp-1">{pub.title}</p>
                            <p className="text-xs text-neutral-500 truncate">Nova publicação em {pub.project?.title}</p>
                          </div>
                        </Link>
                        <button onClick={() => handleDismiss(pub.id)} className="flex-shrink-0 p-1 rounded-md text-neutral-300 hover:text-neutral-600 hover:bg-neutral-100 transition-colors" title="Dispensar">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </>
                )}

                {/* Notificações do sistema (saída, remoção, aceitação) */}
                {visibleSystemNotifs.length > 0 && (
                  <>
                    <div className="px-4 py-2 bg-violet-50 border-b border-violet-100 flex items-center gap-2">
                      <Bell size={12} className="text-violet-600" />
                      <p className="text-xs font-semibold text-violet-700">
                        Avisos do sistema
                      </p>
                    </div>
                    {visibleSystemNotifs.slice(0, 5).map((notif: any) => (
                      <div key={notif.id} className="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0">
                        <Link
                          href={notif.projectId ? `/projetos/${notif.projectId}` : notif.project?.id ? `/projetos/${notif.project.id}` : "/dashboard"}
                          onClick={() => setOpen(false)}
                          className="flex items-start gap-3 flex-1 min-w-0"
                        >
                          <div className={cn(
                            "w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5",
                            notif.type === "REQUEST_ACCEPTED" ? "bg-green-100" :
                            notif.type === "MEMBER_REMOVED"   ? "bg-red-100" :
                            "bg-violet-100",
                          )}>
                            <span className={cn(
                              "text-[10px] font-bold",
                              notif.type === "REQUEST_ACCEPTED" ? "text-green-700" :
                              notif.type === "MEMBER_REMOVED"   ? "text-red-700" :
                              "text-violet-700",
                            )}>
                              {notif.type === "REQUEST_ACCEPTED" ? "✓" : notif.type === "MEMBER_REMOVED" ? "✕" : "!"}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-neutral-800 line-clamp-2">{notif.message}</p>
                            {notif.createdAt && (
                              <p className="text-[10px] text-neutral-400 mt-0.5">
                                {new Date(notif.createdAt).toLocaleDateString("pt-BR")}
                              </p>
                            )}
                          </div>
                        </Link>
                        <button onClick={() => handleDismiss(notif.id)} className="flex-shrink-0 p-1 rounded-md text-neutral-300 hover:text-neutral-600 hover:bg-neutral-100 transition-colors" title="Dispensar">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const initials = user?.name?.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase() ?? "??";
  const firstName = user?.name?.split(" ")[0];

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shadow-md shadow-brand/30 group-hover:bg-brand-700 transition-colors">
              <FlaskConical size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-neutral-900 dark:text-neutral-100 text-[15px] tracking-tight hidden sm:block">
              Laboratório<span className="text-brand-600 dark:text-brand-400"> Ativo</span>
            </span>
            <span className="font-display font-bold text-neutral-900 dark:text-neutral-100 text-[15px] tracking-tight sm:hidden">
              Lab<span className="text-brand-600 dark:text-brand-400">Ativo</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ href, label }) => (
              <Link key={href} href={href} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all",
                isActive(href) ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800")}>
                {label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link href="/dashboard" className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all",
                isActive("/dashboard") ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800")}>
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-400 hover:text-brand-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
              title={theme === "dark" ? "Modo claro" : "Modo escuro"}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            {isAuthenticated ? (
              <>
                <NotificationBell />
                <Link href="/perfil" className="p-2 rounded-lg text-neutral-400 hover:text-brand-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all" title="Configurações">
                  <Settings size={17} />
                </Link>
                <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-700" />
                <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                  {user?.avatar ? (
                    <NextImage src={user.avatar} alt={user.name ?? ""} width={28} height={28} className="rounded-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                      <span className="text-[11px] font-bold text-brand-700 dark:text-brand-300">{initials}</span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{firstName}</span>
                </Link>
                <button onClick={logout} className="p-2 rounded-lg text-neutral-400 hover:text-danger-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all" title="Sair">
                  <LogOut size={17} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" className="px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">Entrar</Link>
                <Link href="/auth/register" className="px-4 py-2 rounded-xl text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 transition-all shadow-sm">Cadastrar</Link>
              </div>
            )}
          </div>

          <button className="md:hidden p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 flex flex-col gap-1 transition-colors duration-200">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={cn("px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive(href) ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800")}>
              {label}
            </Link>
          ))}
          {isAuthenticated && (
            <>
              <Link href="/dashboard" onClick={() => setOpen(false)}
                className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive("/dashboard") ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800")}>
                <LayoutDashboard size={15} /> Dashboard
              </Link>
              <Link href="/perfil" onClick={() => setOpen(false)}
                className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive("/perfil") ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800")}>
                <Settings size={15} /> Configurações
              </Link>
            </>
          )}
          {/* Dark mode toggle mobile */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            {theme === "dark" ? "Modo claro" : "Modo escuro"}
          </button>
          <div className="pt-2 border-t border-neutral-100 mt-1 flex flex-col gap-1">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2.5">
                  {user?.avatar ? (
                    <NextImage src={user.avatar} alt={user?.name ?? ""} width={32} height={32} className="rounded-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-brand-700">{initials}</span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">{user?.name}</p>
                    <p className="text-xs text-neutral-400">{user?.role === "professor" ? "Professor" : "Aluno"}</p>
                  </div>
                </div>
                <button onClick={() => { setOpen(false); logout(); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-danger-500 hover:bg-danger-50 transition-all">
                  <LogOut size={15} /> Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-600">
                  <LogIn size={15} /> Entrar
                </Link>
                <Link href="/auth/register" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-brand-600">
                  <UserCircle size={15} /> Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
