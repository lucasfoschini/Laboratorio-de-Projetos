import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, LayoutDashboard, Users } from "lucide-react";
import { Button } from "@/components/ui";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { QuickAccess } from "@/components/sections/QuickAccess";

export const metadata: Metadata = { title: "Início" };

const HOW = [
  { step: "1", title: "Crie seu projeto", desc: "Qualquer usuário pode criar um projeto de extensão, adicionar membros do grupo e publicar atualizações." },
  { step: "2", title: "Peça para entrar", desc: "Encontrou um projeto interessante? Envie uma solicitação ao grupo e aguarde a aprovação." },
  { step: "3", title: "Acompanhe sem entrar", desc: "Inscreva-se em projetos para receber as atualizações e saber quando forem finalizados." },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="mb-14"><HeroBanner /></section>

      {/* ── Acesso Rápido (conteúdo condicional por auth) ── */}
      <section className="mb-14">
        <h2 className="font-display font-bold text-lg text-neutral-700 dark:text-neutral-300 mb-4">Acesso rápido</h2>
        <QuickAccess />
      </section>

      {/* ── Como funciona ── */}
      <section className="mb-14">
        <h2 className="font-display font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-6 text-center">Como funciona</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {HOW.map(({ step, title, desc }) => (
            <div key={step} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-card">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-display font-extrabold text-sm mb-4 shadow-md shadow-brand/30">{step}</div>
              <h3 className="font-display font-bold text-neutral-900 dark:text-neutral-100 mb-2">{title}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <ProjectsPreview />

      <section className="mt-14">
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center">
              <Users size={24} className="text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <p className="font-display font-bold text-neutral-900 dark:text-neutral-100">Tem um projeto em mente?</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">Publique seu projeto, forme um grupo e compartilhe o progresso com a comunidade.</p>
            </div>
          </div>
          <Link href="/projetos/novo" className="flex-shrink-0">
            <Button size="lg"><FlaskConical size={16} /> Criar projeto <ArrowRight size={16} /></Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
