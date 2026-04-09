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

    // ── Eventos de Domínio Real-Time ──────────────────────────────────────────
    
    es.addEventListener("activities_updated", (e) => {
      try {
        const { projectId } = JSON.parse(e.data);
        if (projectId) qc.invalidateQueries({ queryKey: ["project", projectId, "activities"] });
      } catch {}
    });

    es.addEventListener("member_requests_updated", () => {
      // Invalida a lista do solicitante e as pendências gerais do Dashboard do líder
      qc.invalidateQueries({ queryKey: ["member-requests"] });
      qc.invalidateQueries({ queryKey: ["dashboard", "requests", "pending"] });
    });

    es.addEventListener("project_updated", (e) => {
      try {
        const { projectId } = JSON.parse(e.data);
        if (projectId) {
          // Atualiza dados internos do projeto (ex: vagas, membros) se ele estiver aberto
          qc.invalidateQueries({ queryKey: ["project", projectId] });
        }
        // Atualiza relatórios gerais do Dashboard se afetar visões do usuário
        qc.invalidateQueries({ queryKey: ["dashboard", "projects"] });
        qc.invalidateQueries({ queryKey: ["dashboard", "overview"] });
      } catch {}
    });

    es.addEventListener("posts_updated", (e) => {
      try {
        const { projectId } = JSON.parse(e.data);
        if (projectId) qc.invalidateQueries({ queryKey: ["project", projectId, "posts"] });
      } catch {}
    });

    es.addEventListener("global_projects_updated", () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    });

    es.addEventListener("global_publications_updated", () => {
      qc.invalidateQueries({ queryKey: ["publications"] });
      qc.invalidateQueries({ queryKey: ["dashboard", "publications"] });
      qc.invalidateQueries({ queryKey: ["dashboard", "overview"] });
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
