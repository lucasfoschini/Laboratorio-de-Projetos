"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, FlaskConical, Mail, Lock, AlertCircle } from "lucide-react";
import { Input, Button } from "@/components/ui";
import { loginSchema, type LoginSchema } from "@/lib/schemas";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [apiError, setApiError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setApiError("");
      await login(data.email.trim().toLowerCase(), data.password);
      router.push("/dashboard");
    } catch (err: any) {
      const status = err?.response?.status;
      const body   = err?.response?.data;

      if (status === 429) {
        setApiError(body?.message ?? "Muitas tentativas. Tente novamente mais tarde.");
        return;
      }

      const msg = body?.message ?? "Erro ao fazer login. Tente novamente.";
      setApiError(msg === "Invalid credentials" ? "E-mail ou senha incorretos." : msg);
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
          <blockquote className="text-white/90 text-xl font-display font-bold leading-relaxed mb-6">
            "A extensão universitária é a ponte entre o saber acadêmico e as necessidades reais da sociedade."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-bold">CS</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Prof. Dr. Carlos Silva</p>
              <p className="text-white/60 text-xs">Departamento de Computação</p>
            </div>
          </div>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-neutral-50 dark:bg-neutral-900">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100 mb-1">Bem-vindo de volta</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Entre na sua conta para continuar</p>
          </div>

          {apiError && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-danger-50 border border-red-200 text-danger-700 text-sm">
              <AlertCircle size={15} className="flex-shrink-0" />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="E-mail institucional"
              type="email"
              placeholder="voce@universidade.edu.br"
              leftIcon={<Mail size={15} />}
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Senha</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
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
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-neutral-300 text-brand-600" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Lembrar de mim</span>
              </label>
              <Link href="/auth/esqueci-senha" className="text-sm text-brand-600 font-medium hover:text-brand-800 transition-colors">
                Esqueceu a senha?
              </Link>
            </div>

            <Button type="submit" size="lg" loading={isSubmitting} className="mt-1">
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
            Não tem conta?{" "}
            <Link href="/auth/register" className="text-brand-600 font-semibold hover:text-brand-800">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
