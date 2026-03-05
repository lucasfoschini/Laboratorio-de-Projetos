"use client";

import { useEffect, useRef } from "react";
import { X, Mail, Building2, GraduationCap, Github, Linkedin, Phone, BookOpen, FolderOpen, Users } from "lucide-react";
import { useUserProfile } from "@/lib/hooks/useQueries";
import { Skeleton } from "@/components/ui";

interface UserProfileModalProps {
  userId: string | null;
  onClose: () => void;
}

export function UserProfileModal({ userId, onClose }: UserProfileModalProps) {
  const { data: profile, isLoading } = useUserProfile(userId);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ✅ Só trava o scroll quando realmente há um modal aberto
    if (!userId) return;

    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [userId, onClose]);

  if (!userId) return null;

  const initials = profile?.name
    ?.split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase() ?? "?";

  const roleLabel = profile?.role === "PROFESSOR" || profile?.role === "professor"
    ? "Professor" : "Aluno";

  const counts = profile?._count;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header com gradiente */}
        <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 px-6 pt-8 pb-14">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X size={15} />
          </button>

          {isLoading ? (
            <div className="flex items-end gap-4">
              <Skeleton className="w-16 h-16 rounded-2xl bg-white/30" />
              <div className="flex-1 pb-1 space-y-2">
                <Skeleton className="h-5 w-36 bg-white/30" />
                <Skeleton className="h-3.5 w-24 bg-white/30" />
              </div>
            </div>
          ) : (
            <div className="flex items-end gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/20 flex items-center justify-center flex-shrink-0 ring-2 ring-white/40 shadow-lg">
                {profile?.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-white text-xl">{initials}</span>
                )}
              </div>
              <div className="flex-1 pb-1">
                <h2 className="font-bold text-white text-lg leading-tight">{profile?.name}</h2>
                <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/20 text-white/90">
                  {roleLabel}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {!isLoading && counts && (
          <div className="flex -mt-6 mx-5 gap-2 relative z-10">
            {[
              { icon: <FolderOpen size={13} />, value: counts.ownedProjects,  label: "Projetos"      },
              { icon: <Users size={13} />,      value: counts.memberProjects,  label: "Participações" },
              { icon: <BookOpen size={13} />,   value: counts.publications,    label: "Publicações"   },
            ].map(({ icon, value, label }) => (
              <div key={label} className="flex-1 bg-white rounded-2xl shadow-md border border-neutral-100 px-3 py-2.5 text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-600 mb-0.5">{icon}</div>
                <p className="font-bold text-neutral-900 text-base leading-none">{value ?? 0}</p>
                <p className="text-[10px] text-neutral-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <Skeleton key={i} className="h-4 w-full" />)}
            </div>
          ) : (
            <>
              {profile?.bio && (
                <p className="text-sm text-neutral-600 leading-relaxed">{profile.bio}</p>
              )}

              <div className="space-y-2">
                {profile?.email && (
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-2.5 text-sm text-neutral-600 hover:text-emerald-600 transition-colors group">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 group-hover:bg-emerald-50 flex items-center justify-center text-neutral-400 group-hover:text-emerald-600 transition-colors flex-shrink-0">
                      <Mail size={13} />
                    </div>
                    <span className="truncate">{profile.email}</span>
                  </a>
                )}
                {profile?.department && (
                  <div className="flex items-center gap-2.5 text-sm text-neutral-600">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 flex-shrink-0">
                      <GraduationCap size={13} />
                    </div>
                    <span className="truncate">{profile.department}</span>
                  </div>
                )}
                {profile?.institution && (
                  <div className="flex items-center gap-2.5 text-sm text-neutral-600">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 flex-shrink-0">
                      <Building2 size={13} />
                    </div>
                    <span className="truncate">{profile.institution}</span>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center gap-2.5 text-sm text-neutral-600">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 flex-shrink-0">
                      <Phone size={13} />
                    </div>
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>

              {(profile?.linkedin || profile?.github) && (
                <div className="flex gap-2 pt-1">
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                      <Linkedin size={12} /> LinkedIn
                    </a>
                  )}
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors">
                      <Github size={12} /> GitHub
                    </a>
                  )}
                </div>
              )}

              <a
                href={`/usuarios/${userId}`}
                onClick={onClose}
                className="block w-full text-center text-xs font-semibold text-emerald-600 hover:text-emerald-800 py-2 border-t border-neutral-100 mt-2 transition-colors"
              >
                Ver perfil completo →
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
