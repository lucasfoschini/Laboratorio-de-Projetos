import { z } from "zod";

export const loginSchema = z.object({
  email:    z.string().email("E-mail inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

export const passwordSchema = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .max(128, "Máximo 128 caracteres")
  .regex(/[a-z]/, "Deve conter pelo menos 1 letra minúscula")
  .regex(/[A-Z]/, "Deve conter pelo menos 1 letra maiúscula")
  .regex(/[0-9]/, "Deve conter pelo menos 1 número");

export const PASSWORD_RULES = [
  { label: "Mínimo 8 caracteres",           test: (v: string) => v.length >= 8 },
  { label: "Máximo 128 caracteres",          test: (v: string) => v.length <= 128 },
  { label: "Pelo menos 1 letra minúscula",  test: (v: string) => /[a-z]/.test(v) },
  { label: "Pelo menos 1 letra maiúscula",  test: (v: string) => /[A-Z]/.test(v) },
  { label: "Pelo menos 1 número",            test: (v: string) => /[0-9]/.test(v) },
];

export const registerSchema = z.object({
  name:            z.string().min(3, "Nome muito curto"),
  email:           z.string().email("E-mail inválido"),
  password:        passwordSchema,
  confirmPassword: z.string(),
  role:            z.enum(["student", "professor"]),
  institution:     z.string().min(2, "Informe a instituição"),
  department:      z.string().optional(),
}).refine((d) => d.password === d.confirmPassword, { message: "Senhas não coincidem", path: ["confirmPassword"] });

export const projectSchema = z.object({
  title:               z.string().min(5, "Título muito curto").max(120),
  description:         z.string().min(20, "Descrição muito curta"),
  area:                z.string().min(1, "Selecione pelo menos uma área"),
  category:            z.string().optional(),
  status:              z.enum(["ABERTO","EM_ANDAMENTO","FINALIZADO"]).optional(),
  vacancies:           z.coerce.number().int().min(1, "Mínimo 1 vaga").max(100),
  startDate:           z.string().optional(),
  endDate:             z.string().optional(),
  applicationDeadline: z.string().optional(),
  tags:                z.string().optional(),
  tempo:               z.string().optional(),
  custo:               z.coerce.number().nonnegative().optional(),
  escopo:              z.string().optional(),
  contactEmail:        z.string().email("E-mail inválido").optional().or(z.literal("")),
  contactInfo:         z.string().optional(),
});

export type LoginSchema    = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ProjectSchema  = z.infer<typeof projectSchema>;
