"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, FlaskConical, Mail, Lock, User, Building, AlertCircle, BookOpen, Check, X } from "lucide-react";
import { Input, Button } from "@/components/ui";
import { registerSchema, type RegisterSchema, PASSWORD_RULES } from "@/lib/schemas";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [apiError, setApiError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "student" },
  });

  const role = watch("role");
  const pwd  = watch("password") ?? "";

  const onSubmit = async (data: RegisterSchema) => {
    try {
      setApiError("");
      setFieldErrors({});
      await registerUser({
        name:        data.name,
        email:       data.email.trim().toLowerCase(),
        password:    data.password,
        role:        data.role === "professor" ? "PROFESSOR" : "ALUNO",
        institution: data.institution,
        department:  data.department || undefined,
      });
      router.push("/dashboard");
    } catch (err: any) {
      const status = err?.response?.status;
      const body   = err?.response?.data;

      if (status === 429) {
        setApiError(body?.message ?? "Muitas tentativas. Tente novamente mais tarde.");
        return;
      }
      if (status === 413) {
        setApiError("Payload muito grande. Reduza o tamanho dos dados.");
        return;
      }

      // Field-level validation errors from backend
      if (body?.errors?.fieldErrors) {
        setFieldErrors(body.errors.fieldErrors);
      }

      const msg = body?.message ?? "Erro ao criar conta.";
      setApiError(msg === "E-mail já cadastrado" ? "Este e-mail já está em uso." : msg);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Painel esquerdo */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-12">
        <div className="flex items-center gap-2.5 mb-12">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <FlaskConical size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-white text-lg">Laboratório Ativo</span>
        </div>

        <div>
          <h2 className="text-white text-3xl font-display font-extrabold leading-tight mb-4">
            Faça parte da comunidade acadêmica
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            Conecte-se com projetos reais, colabore com professores e crie impacto na sociedade através da extensão universitária.
          </p>
        </div>
      </div>

      {/* Painel direito */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-neutral-50 dark:bg-neutral-900 overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100 mb-1">Criar conta</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Preencha os dados para começar</p>
          </div>

          {/* Seletor de perfil */}
          <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            {[
              { value: "student", label: "Sou Aluno" },
              { value: "professor", label: "Sou Professor" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className={cn(
                  "flex items-center justify-center py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all",
                  role === value
                    ? "bg-white dark:bg-neutral-700 text-brand-700 dark:text-brand-400 shadow-card"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
                )}
              >
                <input
                  type="radio"
                  value={value}
                  className="sr-only"
                  {...register("role")}
                />
                {label}
              </label>
            ))}
          </div>

          {apiError && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-danger-50 border border-red-200 text-danger-700 text-sm">
              <AlertCircle size={15} className="flex-shrink-0" />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Nome completo"
              type="text"
              placeholder="Seu nome"
              leftIcon={<User size={15} />}
              error={errors.name?.message || fieldErrors.name?.[0]}
              {...register("name")}
            />

            <Input
              label="E-mail institucional"
              type="email"
              placeholder="voce@universidade.edu.br"
              leftIcon={<Mail size={15} />}
              error={errors.email?.message || fieldErrors.email?.[0]}
              {...register("email")}
            />

            <Input
              label="Instituição"
              type="text"
              placeholder="Ex: UNICAMP, USP, UFMG..."
              leftIcon={<Building size={15} />}
              error={errors.institution?.message}
              {...register("institution")}
            />

            <Input
              label="Departamento / Curso"
              type="text"
              placeholder={role === "professor" ? "Ex: Departamento de Computação" : "Ex: Engenharia de Computação"}
              leftIcon={<BookOpen size={15} />}
              error={errors.department?.message}
              {...register("department")}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Senha</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="Mín. 8 caracteres"
                  className={cn(
                    "w-full h-10 rounded-xl border bg-white dark:bg-neutral-800 text-sm px-3 pl-9 pr-10 outline-none transition-all dark:text-neutral-100",
                    "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500",
                    "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
                    errors.password && "border-danger-500",
                  )}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-danger-500">{errors.password.message}</p>}
              {fieldErrors.password && fieldErrors.password.map((e, i) => <p key={i} className="text-xs text-danger-500">{e}</p>)}
              {/* Real-time password rules feedback */}
              {pwd.length > 0 && (
                <ul className="mt-1 space-y-0.5">
                  {PASSWORD_RULES.map((rule) => {
                    const ok = rule.test(pwd);
                    return (
                      <li key={rule.label} className={cn("flex items-center gap-1.5 text-xs transition-colors", ok ? "text-success-600" : "text-neutral-400")}>
                        {ok ? <Check size={12} /> : <X size={12} />}
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Confirmar senha</label>
              <input
                type="password"
                placeholder="Repita a senha"
                className={cn(
                  "w-full h-10 rounded-xl border bg-white dark:bg-neutral-800 text-sm px-3 outline-none transition-all dark:text-neutral-100",
                  "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500",
                  "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
                  errors.confirmPassword && "border-danger-500",
                )}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && <p className="text-xs text-danger-500">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" size="lg" loading={isSubmitting} className="mt-1">
              {isSubmitting ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
            Já tem conta?{" "}
            <Link href="/auth/login" className="text-brand-600 font-semibold hover:text-brand-800">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
