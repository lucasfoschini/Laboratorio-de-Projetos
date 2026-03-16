"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FlaskConical, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { PASSWORD_RULES, passwordSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const schema = z.object({
  password:        passwordSchema,
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Senhas não coincidem", path: ["confirmPassword"] });

type FormData = z.infer<typeof schema>;

export default function RedefinirSenhaPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-64px)] flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-brand-600" /></div>}>
      <RedefinirSenhaContent />
    </Suspense>
  );
}

function RedefinirSenhaContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [showPwd, setShowPwd] = useState(false);
  const [done, setDone] = useState(false);
  const [apiError, setApiError] = useState("");

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const pwd = watch("password") ?? "";

  const onSubmit = async (data: FormData) => {
    try {
      setApiError("");
      const { authApi } = await import("@/lib/api/axios");
      await authApi.resetPassword({ token, password: data.password });
      setDone(true);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 429) {
        setApiError(err.response.data?.message ?? "Muitas tentativas. Aguarde 15 minutos.");
        return;
      }
      const fieldErrors = err?.response?.data?.errors?.fieldErrors;
      if (fieldErrors?.password) {
        setApiError(fieldErrors.password.join(" | "));
        return;
      }
      const msg = err?.response?.data?.message;
      if (msg === "Token inválido ou expirado.") {
        setApiError("Link expirado ou já utilizado. Solicite um novo link.");
      } else {
        setApiError(msg ?? "Erro ao redefinir senha. O link pode ter expirado.");
      }
    }
  };

  if (!token) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100 mb-2">Link inválido</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">Este link de recuperação é inválido ou já expirou.</p>
          <Link href="/auth/esqueci-senha" className="text-brand-600 font-semibold text-sm hover:text-brand-800">
            Solicitar novo link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 bg-neutral-50 dark:bg-neutral-900">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-md">
            <FlaskConical size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-neutral-900 dark:text-neutral-100 text-lg">LEXA</span>
        </div>

        {done ? (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-success-50 dark:bg-success-950 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} className="text-success-600" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100 mb-2">Senha redefinida!</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-6">
              Sua senha foi alterada com sucesso. Agora você pode fazer login.
            </p>
            <Link href="/auth/login" className="inline-flex items-center justify-center h-11 px-6 rounded-xl text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 transition-all shadow-sm">
              Ir para login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100 mb-1">Redefinir senha</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">Digite sua nova senha abaixo.</p>

            {apiError && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-danger-50 border border-red-200 text-danger-700 text-sm">
                <AlertCircle size={15} className="flex-shrink-0" />
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Nova senha</label>
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
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-danger-500">{errors.password.message}</p>}
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
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Confirmar nova senha</label>
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

              <Button type="submit" size="lg" loading={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Redefinir senha"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
