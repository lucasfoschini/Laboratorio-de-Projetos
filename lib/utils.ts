import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AREA_LABELS: Record<string, string> = {
  technology:  "Tecnologia",
  health:      "Saúde",
  education:   "Educação",
  environment: "Meio Ambiente",
  law:         "Direito",
  arts:        "Artes",
  engineering: "Engenharia",
  social:      "Social",
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
