"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical, Zap, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui";
import { useAuth } from "@/contexts/auth";

export function HeroBanner() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="relative bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 rounded-3xl overflow-hidden px-8 py-14 md:px-14 md:py-16">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-400 rounded-full blur-[100px] opacity-20" />
      <div className="relative max-w-xl">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-3 py-1 mb-6">
          <Zap size={12} className="text-brand-300" />
          <span className="text-xs font-semibold text-brand-100 tracking-wide">Plataforma de Projetos de Extensão</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight tracking-tight mb-4">
          Laboratório<br /><span className="text-brand-300">Ativo</span>
        </h1>
        <p className="text-brand-200 text-base leading-relaxed mb-8 max-w-md">
          Conecte pessoas, crie projetos com impacto real e acompanhe o progresso de iniciativas que transformam a sociedade.
        </p>
        {!isLoading && (
          <div className="flex flex-wrap gap-3">
            <Link href="/projetos">
              <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50 shadow-lg shadow-black/20">
                Explorar Projetos <ArrowRight size={16} />
              </Button>
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10">
                  <LayoutDashboard size={16} /> Meu Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth/register">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10">
                  Criar conta gratuita
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
