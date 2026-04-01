"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <p className="font-display text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Algo deu errado
      </p>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
        {error.message || "Ocorreu um erro inesperado. Tente novamente."}
      </p>
      <button
        onClick={reset}
        className="px-5 py-2 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );
}
