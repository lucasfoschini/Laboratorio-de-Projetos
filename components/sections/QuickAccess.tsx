"use client";

import Link from "next/link";
import { BookOpen, FlaskConical, LayoutDashboard, Users, Search, Bell } from "lucide-react";
import { useAuth } from "@/contexts/auth";

export function QuickAccess() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Link href="/projetos" className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card hover:shadow-card-md hover:border-neutral-300 dark:hover:border-neutral-600 transition-all">
        <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center mb-3">
          <Search size={22} className="text-brand-600 dark:text-brand-400" />
        </div>
        <p className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">Analise os Projetos</p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 leading-snug">Qualquer usuário pode pesquisar e analisar os projetos publicados na plataforma</p>
      </Link>

      <Link href="/publicacoes" className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card hover:shadow-card-md hover:border-neutral-300 dark:hover:border-neutral-600 transition-all">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center mb-3">
          <BookOpen size={22} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <p className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">Publicações</p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 leading-snug">Produção científica e técnica</p>
      </Link>

      <Link href="/dashboard" className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card hover:shadow-card-md hover:border-neutral-300 dark:hover:border-neutral-600 transition-all">
        <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center mb-3">
          <LayoutDashboard size={22} className="text-violet-600 dark:text-violet-400" />
        </div>
        <p className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">Dashboard</p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 leading-snug">Gerencie seus projetos e pedidos</p>
      </Link>

      {!isAuthenticated && (
        <Link href="/auth/register" className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card hover:shadow-card-md hover:border-neutral-300 dark:hover:border-neutral-600 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center mb-3">
            <Users size={22} className="text-amber-600 dark:text-amber-400" />
          </div>
          <p className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">Cadastre-se</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 leading-snug">Crie sua conta e comece agora</p>
        </Link>
      )}

      {isAuthenticated && (
        <Link href="/projetos" className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card hover:shadow-card-md hover:border-brand-200 dark:hover:border-brand-700 transition-all">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 flex items-center justify-center mb-3">
            <Bell size={22} className="text-teal-600 dark:text-teal-400" />
          </div>
          <p className="font-display font-bold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">Acompanhe os Projetos</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 leading-snug">Inscreva-se em projetos para receber as atualizações e saber quando forem finalizados</p>
        </Link>
      )}
    </div>
  );
}
