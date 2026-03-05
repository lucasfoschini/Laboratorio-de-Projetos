"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Mail, Github, Linkedin,
  BookOpen, Users, Globe, Calendar, FlaskConical, FileText,
} from "lucide-react";
import { Badge, Skeleton } from "@/components/ui";
import { AREA_LABELS, cn } from "@/lib/utils";
import { useUserProfile } from "@/lib/hooks/useQueries";

const STATUS_MAP: Record<string, { label: string; variant: "success" | "brand" | "neutral" | "warning" }> = {
  open:         { label: "Vagas abertas", variant: "success" },
  in_progress:  { label: "Em andamento",  variant: "brand"   },
  completed:    { label: "Finalizado",    variant: "neutral" },
  closed:       { label: "Encerrado",     variant: "neutral" },
  ABERTO:       { label: "Vagas abertas", variant: "success" },
  EM_ANDAMENTO: { label: "Em andamento",  variant: "brand"   },
  FINALIZADO:   { label: "Finalizado",    variant: "neutral" },
};

const AREA_COLORS: Record<string, string> = {
  technology:  "bg-violet-50 text-violet-700",
  health:      "bg-rose-50 text-rose-700",
  education:   "bg-amber-50 text-amber-700",
  environment: "bg-emerald-50 text-emerald-700",
  law:         "bg-sky-50 text-sky-700",
  arts:        "bg-pink-50 text-pink-700",
  engineering: "bg-orange-50 text-orange-700",
  social:      "bg-teal-50 text-teal-700",
};

function getStatus(status: string) {
  return STATUS_MAP[status] ?? STATUS_MAP[status?.toUpperCase()] ?? { label: status, variant: "neutral" as const };
}

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: profile, isLoading, isError } = useUserProfile(id);

  const ownedProjects  = (profile?.ownedProjects  ?? []) as any[];
  const memberProjects = (profile?.memberProjects ?? []) as any[];
  const projects = [...ownedProjects, ...memberProjects].filter(
    (p, idx, self) => self.findIndex((x: any) => x.id === p.id) === idx
  );
  const publications = (profile?.publications ?? []) as any[];

  const initials    = profile?.name?.split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase() ?? "?";
  const roleLabel   = profile?.role === "PROFESSOR" || profile?.role === "professor" ? "Professor" : "Aluno";
  const roleVariant = profile?.role === "PROFESSOR" || profile?.role === "professor" ? "brand" : "neutral";

  if (isError) return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <p className="text-neutral-400 mb-4">Usuário não encontrado.</p>
      <Link href="/projetos" className="text-sm text-emerald-600 hover:underline">← Voltar aos projetos</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      {/* Voltar */}
      <Link href="/projetos" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-600 mb-5 sm:mb-6 transition-colors group">
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Voltar
      </Link>

      {/* Card de perfil */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Avatar + info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-brand-100 dark:bg-brand-900 flex items-center justify-center flex-shrink-0">
              {isLoading ? <Skeleton className="w-full h-full" /> : profile?.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-display font-extrabold text-brand-700 dark:text-brand-300 text-base sm:text-lg">{initials}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              {isLoading ? (
                <div className="space-y-2"><Skeleton className="h-5 w-40" /><Skeleton className="h-3.5 w-56" /></div>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-display font-bold text-neutral-900 dark:text-neutral-100 text-base sm:text-lg leading-tight">{profile?.name}</h2>
                    <Badge variant={roleVariant}>{roleLabel}</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                    {[profile?.department, profile?.institution].filter(Boolean).join(" · ")}
                  </p>
                  {profile?.email && (
                    <p className="text-xs text-neutral-400 mt-0.5 truncate sm:hidden">{profile.email}</p>
                  )}
                  {profile?.bio && (
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1.5 line-clamp-2 sm:line-clamp-none max-w-lg">{profile.bio}</p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Links sociais */}
          {!isLoading && profile && (
            <div className="flex items-center gap-2 flex-wrap">
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                  <Linkedin size={12} /> LinkedIn
                </a>
              )}
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600 transition-colors">
                  <Github size={12} /> GitHub
                </a>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600 transition-colors">
                  <Globe size={12} /> Website
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-100 text-neutral-700 hover:bg-brand-50 hover:text-brand-700 dark:bg-neutral-700 dark:text-neutral-300 transition-colors">
                  <Mail size={12} /> {profile.email}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
        {isLoading ? [1,2,3,4].map(i => <Skeleton key={i} className="h-20 sm:h-24 rounded-2xl" />) : (
          <>
            {[
              { label: "Projetos criados", value: profile?._count?.ownedProjects  ?? 0, icon: FlaskConical, color: "bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400" },
              { label: "Participações",    value: profile?._count?.memberProjects ?? profile?._count?.memberOf ?? 0, icon: Users, color: "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400" },
              { label: "Publicações",      value: profile?._count?.publications   ?? 0, icon: BookOpen, color: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400" },
              { label: "Membro desde",     value: profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("pt-BR", { month: "short", year: "numeric" }) : "—", icon: Calendar, color: "bg-neutral-50 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-3 sm:p-4 shadow-card">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center mb-2 sm:mb-3 ${color}`}>
                  <Icon size={14} />
                </div>
                <p className="font-display font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-neutral-100">{value}</p>
                <p className="text-[10px] sm:text-xs text-neutral-400 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Projetos + Publicações */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-card overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">

            {/* Projetos */}
            <div className="pb-6 lg:pb-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2 text-sm sm:text-base">
                  <FlaskConical size={15} className="text-brand-500" /> Projetos
                </h3>
                {projects.length > 3 && (
                  <span className="text-xs font-semibold text-brand-600 flex items-center gap-1">
                    Ver todos <ArrowRight size={12} />
                  </span>
                )}
              </div>

              {isLoading ? (
                <div className="space-y-2">{[1,2,3].map(i => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
              ) : projects.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {projects.slice(0, 4).map((p: any) => (
                    <Link key={p.id} href={`/projetos/${p.id}`}
                      className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl border border-neutral-100 dark:border-neutral-700 hover:border-brand-300 dark:hover:border-brand-700 hover:-translate-y-0.5 transition-all group">
                      <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center flex-shrink-0">
                        <FlaskConical size={13} className="text-brand-600 dark:text-brand-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                          {p.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          {(p.areas?.length ? p.areas : [p.area]).filter(Boolean).slice(0, 2).map((a: string) => (
                            <span key={a} className={`inline-block px-1.5 py-0.5 rounded-md text-[10px] font-semibold ${AREA_COLORS[a.toLowerCase()] ?? "bg-neutral-100 text-neutral-600"}`}>
                              {AREA_LABELS[a.toLowerCase()] ?? a}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        {memberProjects.some((m: any) => m.id === p.id) && !ownedProjects.some((o: any) => o.id === p.id) && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300">
                            Membro
                          </span>
                        )}
                        <Badge variant={getStatus(p.status).variant}>
                          {getStatus(p.status).label}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-xs sm:text-sm text-neutral-400 py-8 text-center border border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
                  Nenhum projeto ainda.
                </div>
              )}
            </div>

            {/* Divisor */}
            <div className="border-t border-neutral-100 dark:border-neutral-700 lg:hidden mb-6" />

            {/* Publicações */}
            <div>
              <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2 text-sm sm:text-base">
                <BookOpen size={15} className="text-amber-500" /> Publicações
              </h3>

              {isLoading ? (
                <div className="space-y-2">{[1,2,3].map(i => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
              ) : publications.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {publications.map((pub: any) => (
                    <Link key={pub.id} href={`/publicacoes/${pub.id}`}
                      className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl border border-neutral-100 dark:border-neutral-700 hover:border-amber-300 dark:hover:border-amber-700 hover:-translate-y-0.5 transition-all group">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText size={13} className="text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                          {pub.title}
                        </p>
                        <p className="text-[10px] sm:text-xs text-neutral-400 mt-0.5">
                          {[pub.journal, pub.year].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-xs sm:text-sm text-neutral-400 py-8 text-center border border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
                  Nenhuma publicação ainda.
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
