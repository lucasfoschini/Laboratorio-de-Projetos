import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AREA_LABELS: Record<string, string> = {
  controle_sistemas:       "Controle de Sistemas",
  sistemas_mecatronicos:   "Sistemas Mecatrônicos",
  acionamentos_eletricos:  "Acionamentos Elétricos",
  sistemas_inteligentes:   "Sistemas Inteligentes",
  robotica_industrial:     "Robótica Industrial",
  automacao_mecanica:      "Automação de Sist. Mecânicos",
  automacao_eletrica:      "Automação de Sist. Elétricos",
  engenharia_projeto:      "Engenharia de Projeto",
  manufatura_digital:      "Manufatura Digital",
  projeto_computador:      "Projeto Assist. por Computador",
  simulacao_computacional: "Simulação Computacional",
};

export const AREA_COLORS: Record<string, string> = {
  controle_sistemas:       "bg-blue-50   text-blue-700   dark:bg-blue-950   dark:text-blue-300",
  sistemas_mecatronicos:   "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  acionamentos_eletricos:  "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  sistemas_inteligentes:   "bg-cyan-50   text-cyan-700   dark:bg-cyan-950   dark:text-cyan-300",
  robotica_industrial:     "bg-rose-50   text-rose-700   dark:bg-rose-950   dark:text-rose-300",
  automacao_mecanica:      "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  automacao_eletrica:      "bg-amber-50  text-amber-700  dark:bg-amber-950  dark:text-amber-300",
  engenharia_projeto:      "bg-teal-50   text-teal-700   dark:bg-teal-950   dark:text-teal-300",
  manufatura_digital:      "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  projeto_computador:      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  simulacao_computacional: "bg-pink-50   text-pink-700   dark:bg-pink-950   dark:text-pink-300",
};

export const STATUS_LABELS: Record<string, string> = {
  open:        "Vagas abertas",
  in_progress: "Em andamento",
  closed:      "Encerrado",
  completed:   "Concluído",
};

export const TYPE_LABELS: Record<string, string> = {
  article:      "Artigo",
  report:       "Relatório",
  presentation: "Apresentação",
  thesis:       "Monografia",
};