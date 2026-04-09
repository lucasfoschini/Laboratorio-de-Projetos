"use client";

import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui";

export default function AcessoNegado() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-200/50 via-neutral-50 to-neutral-50 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-900" />
      
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 shadow-2xl rounded-3xl p-8 z-10 mx-auto text-center overflow-hidden">
        
        {/* Glow behind the icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-danger-500/20 dark:bg-danger-500/10 blur-[40px] rounded-full" />

        <div className="w-16 h-16 mx-auto bg-danger-100 dark:bg-danger-900/50 text-danger-600 dark:text-danger-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm ring-1 ring-inset ring-danger-500/20">
          <ShieldAlert size={32} strokeWidth={2} />
        </div>
        
        <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100 mb-2">Acesso Negado</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
          Você não tem permissões para acessar esta página. Apenas professores e administradores da plataforma estão autorizados a visualizar esta seção.
        </p>
        
        <div className="flex flex-col gap-3">
          <Button variant="primary" className="w-full text-sm h-11" onClick={() => window.history.back()}>
            Voltar para onde eu estava
          </Button>
          <Link href="/dashboard" className="w-full">
            <Button variant="secondary" className="w-full text-sm h-11">
              <ArrowLeft size={16} className="mr-2" /> Ir para a página inicial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
