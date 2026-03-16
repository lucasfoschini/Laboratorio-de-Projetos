"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, FlaskConical, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { Input, Button } from "@/components/ui";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
});
type FormData = z.infer<typeof schema>;

export default function EsqueciSenhaPage() {
  const [sent, setSent] = useState(false);
  const [apiError, setApiError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setApiError("");
      const { authApi } = await import("@/lib/api/axios");
      await authApi.forgotPassword({ email: data.email.trim().toLowerCase() });
      setSent(true);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 429) {
        setApiError(err.response.data?.message ?? "Muitas tentativas. Tente novamente mais tarde.");
        return;
      }
      setSent(true);
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
          <span className="font-display font-bold text-white text-lg">LEXA</span>
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
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-neutral-50 dark:bg-neutral-900">
        <div className="w-full max-w-sm">
          <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 mb-6 transition-colors">
            <ArrowLeft size={15} /> Voltar para login
          </Link>

          {/* Logo mobile */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-md">
              <FlaskConical size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-neutral-900 dark:text-neutral-100 text-lg">LEXA</span>
          </div>

          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-success-50 dark:bg-success-950 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-success-600" />
              </div>
              <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100 mb-2">E-mail enviado!</h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha. Verifique também a pasta de spam.
              </p>
              <Link href="/auth/login" className="text-brand-600 font-semibold text-sm hover:text-brand-800 transition-colors">
                Voltar para login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100 mb-1">Esqueceu a senha?</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                  Digite seu e-mail e enviaremos um link para redefinir sua senha.
                </p>
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

                <Button type="submit" size="lg" loading={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
                </Button>
              </form>

              <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
                Lembrou a senha?{" "}
                <Link href="/auth/login" className="text-brand-600 font-semibold hover:text-brand-800">
                  Entrar
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
