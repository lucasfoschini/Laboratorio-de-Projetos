"use client";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Hook que mantém uma conexão SSE aberta com o servidor para receber
 * notificações em tempo real, sem polling.
 *
 * Decisões de implementação:
 *
 * 1. useRef para a instância do EventSource — evita que re-renders do componente
 *    pai criem múltiplas conexões para o mesmo usuário.
 *
 * 2. Guarda só no useEffect com [userId] como dep — a conexão só é (re)criada
 *    quando o userId muda (login/logout). Re-renders por outros motivos não
 *    reabrem a conexão.
 *
 * 3. withCredentials: true — necessário para o browser enviar os cookies
 *    HttpOnly na requisição SSE (mesmo sendo same-origin via proxy Next.js).
 *
 * 4. onerror — EventSource reconecta automaticamente em caso de erro (com
 *    back-off exponencial nativo). Não precisamos reimplementar isso.
 *
 * 5. Cleanup no return do useEffect — fecha a conexão ao desmontar ou ao
 *    trocar de userId (logout → novo login com outro usuário).
 */
export function useSSE(userId: string | undefined) {
  const qc      = useQueryClient();
  const esRef   = useRef<EventSource | null>(null);

  useEffect(() => {
    // Só conecta quando o userId estiver definido (usuário autenticado)
    if (!userId) return;

    // Se já existe uma conexão aberta (re-render no StrictMode, por ex.),
    // fecha antes de criar uma nova para evitar conexões duplicadas
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }

    // withCredentials envia cookies HttpOnly automaticamente
    const es = new EventSource("/api/notifications/stream", { withCredentials: true });
    esRef.current = es;

    // ── Evento de confirmação de conexão ──────────────────────────────────────
    es.addEventListener("connected", () => {
      console.log("[SSE] Conexão estabelecida para o usuário:", userId);
    });

    // ── Evento de nova notificação ────────────────────────────────────────────
    // Ao receber qualquer notificação, invalida o cache relevante do React Query
    // para que os hooks (useNotificationSummary, useNotifications) façam refetch
    es.addEventListener("notification", () => {
      qc.invalidateQueries({ queryKey: ["notification-summary"] });
      qc.invalidateQueries({ queryKey: ["notifications"] });
    });

    // ── Erro / reconexão ──────────────────────────────────────────────────────
    // O EventSource reconecta automaticamente com back-off nativo.
    // Não fechamos aqui — deixamos o browser gerenciar a reconexão.
    es.onerror = (e) => {
      console.warn("[SSE] Erro na conexão — reconectando automaticamente...", e);
    };

    // ── Cleanup ───────────────────────────────────────────────────────────────
    // Fechar ao desmontar ou quando userId mudar (logout / troca de conta)
    return () => {
      es.close();
      esRef.current = null;
      console.log("[SSE] Conexão encerrada para o usuário:", userId);
    };
  }, [userId, qc]);
}
