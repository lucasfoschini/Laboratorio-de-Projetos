import {
  useMutation, useQuery, useQueryClient,
  useInfiniteQuery, type InfiniteData,
} from "@tanstack/react-query";
import {
  activitiesApi, dashboardApi, memberRequestsApi, notificationsApi,
  postsApi, projectsApi, publicationsApi, usersApi,
} from "@/lib/api/axios";
import { useAuth } from "@/contexts/auth";
import { adaptProject, adaptPublication, adaptRequest } from "@/lib/adapters";

const STALE = {
  short: 1000 * 60 * 5,
  medium: 1000 * 60 * 10,
  long: 1000 * 60 * 30,
};

const BASE_OPTS = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: (failureCount: number, error: any) => {
    if (error?.response?.status === 429) return false;
    return failureCount < 2;
  },
};

// ─── Projects ─────────────────────────────────────────────────────────────────

// useProjects — com suporte a load more (página a página)
export function useProjects(p?: object) {
  return useInfiniteQuery({
    ...BASE_OPTS,
    queryKey: ["projects", p],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1, signal }) => {
      const { data } = await projectsApi.list({ ...p, page: pageParam, limit: 12 }, signal);
      const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
      return {
        data: items.map(adaptProject),
        total: data?.total ?? items.length,
        page: data?.page ?? pageParam,
        totalPages: data?.totalPages ?? 1,
        hasMore: data?.hasMore ?? false,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    staleTime: STALE.medium,
  });
}

export function useProject(id: string) {
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["project", id],
    queryFn: async ({ signal }) => {
      const { data } = await projectsApi.byId(id, signal);
      // adaptProject mas preserva subscribed e activities do backend
      const adapted = adaptProject(data);
      return {
        ...adapted,
        subscribed: data.subscribed ?? false,
        activities: data.activities ?? [],
        posts: data.posts ?? [],
        postsTotal: data.postsTotal ?? 0,
      };
    },
    enabled: !!id,
    staleTime: STALE.short,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (d: unknown) => projectsApi.create(d),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => projectsApi.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["project", id] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectsApi.delete(id),
    // Cirúrgico: remove só o item deletado do cache sem refetch
    onMutate: async (deletedId) => {
      await qc.cancelQueries({ queryKey: ["projects"] });
      const previous = qc.getQueriesData({ queryKey: ["projects"] });
      qc.setQueriesData(
        { queryKey: ["projects"] },
        (old: InfiniteData<{ data: any[] }> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.filter((p: any) => p.id !== deletedId),
            })),
          };
        },
      );
      return { previous };
    },
    onError: (_, __, ctx) => {
      ctx?.previous?.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useLeaveProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectsApi.leave(id),
    onMutate: async (projectId) => {
      await qc.cancelQueries({ queryKey: ["project", projectId] });
      const previous = qc.getQueryData(["project", projectId]);
      qc.setQueryData(["project", projectId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          enrolled: Math.max(0, (old.enrolled ?? 1) - 1),
        };
      });
      return { previous };
    },
    onError: (_, projectId, ctx) => {
      if (ctx?.previous) qc.setQueryData(["project", projectId], ctx.previous);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["project"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useRemoveMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, userId }: { projectId: string; userId: string }) =>
      projectsApi.removeMember(projectId, userId),
    onMutate: async ({ projectId, userId }) => {
      await qc.cancelQueries({ queryKey: ["project", projectId] });
      const previous = qc.getQueryData(["project", projectId]);
      qc.setQueryData(["project", projectId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          members: (old.members ?? []).filter((m: any) => m.id !== userId),
          enrolled: Math.max(0, (old.enrolled ?? 1) - 1),
        };
      });
      return { previous };
    },
    onError: (_, { projectId }, ctx) => {
      if (ctx?.previous) qc.setQueryData(["project", projectId], ctx.previous);
    },
    onSettled: (_, __, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
}

// ─── Subscription ─────────────────────────────────────────────────────────────

export function useSubscriptionStatus(projectId: string, enabled = true) {
  // Deriva do cache de useProject — sem request extra
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["project", projectId],
    queryFn: async ({ signal }) => {
      const { data } = await projectsApi.byId(projectId, signal);
      const adapted = adaptProject(data);
      return { ...adapted, subscribed: data.subscribed ?? false, activities: data.activities ?? [], posts: data.posts ?? [] };
    },
    enabled: !!projectId && enabled,
    staleTime: STALE.short,
    select: (data: any) => ({ subscribed: data?.subscribed ?? false }),
  });
}

export function useSubscribe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, subscribed }: { id: string; subscribed: boolean }) =>
      subscribed ? projectsApi.unsubscribe(id) : projectsApi.subscribe(id),
    onMutate: async ({ id, subscribed }) => {
      await qc.cancelQueries({ queryKey: ["subscription", id] });
      const previous = qc.getQueryData(["subscription", id]);
      qc.setQueryData(["subscription", id], { subscribed: !subscribed });
      qc.setQueryData(["project", id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          subscribersCount: (old.subscribersCount ?? 0) + (subscribed ? -1 : 1),
        };
      });
      return { previous };
    },
    onError: (_, { id }, ctx) => {
      if (ctx?.previous) qc.setQueryData(["subscription", id], ctx.previous);
    },
    onSettled: (_, __, { id }) => {
      qc.invalidateQueries({ queryKey: ["subscription", id] });
    },
  });
}

// ─── MemberRequests ───────────────────────────────────────────────────────────

export function useJoinRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => projectsApi.joinRequest(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["notification-summary"] });
    },
  });
}

export function useProjectJoinRequests(projectId: string, enabled = true) {
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["join-requests", projectId],
    queryFn: async ({ signal }) => {
      const { data } = await projectsApi.joinRequests(projectId, signal);
      return Array.isArray(data) ? data.map(adaptRequest) : [];
    },
    enabled: !!projectId && enabled,
    staleTime: STALE.short,
  });
}

export function useReviewRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "APPROVED" | "REJECTED" }) =>
      memberRequestsApi.review(id, { status }),
    onMutate: async ({ id }) => {
      // Cancela queries em andamento para evitar sobrescrever o optimistic update
      await qc.cancelQueries({ queryKey: ["join-requests"] });
      await qc.cancelQueries({ queryKey: ["dashboard"] });

      // Salva estado anterior para rollback em caso de erro
      const previousJoinRequests = qc.getQueriesData({ queryKey: ["join-requests"] });
      const previousOverview = qc.getQueryData(["dashboard", "overview"]);
      const previousPending = qc.getQueryData(["dashboard", "pending-requests"]);
      const previousRequests = qc.getQueryData(["dashboard", "requests"]);

      const filterById = (old: any) =>
        Array.isArray(old) ? old.filter((r: any) => r.id !== id) : old;

      // Remove o item imediatamente de todas as listas que podem exibi-lo
      qc.setQueriesData({ queryKey: ["join-requests"] }, filterById);
      qc.setQueriesData({ queryKey: ["dashboard", "requests"] }, filterById);
      qc.setQueriesData({ queryKey: ["dashboard", "pending-requests"] }, filterById);
      qc.setQueriesData({ queryKey: ["dashboard", "overview"] }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pendingRequests: (old.pendingRequests ?? []).filter((r: any) => r.id !== id),
          requests: (old.requests ?? []).filter((r: any) => r.id !== id),
        };
      });
      qc.setQueriesData({ queryKey: ["notification-summary"] }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pendingRequests: (old.pendingRequests ?? []).filter((r: any) => r.id !== id),
        };
      });

      return { previousJoinRequests, previousOverview, previousPending, previousRequests };
    },
    onError: (error: any, _, ctx) => {
      // 400 "Solicitação já avaliada" — item já foi processado; mantém o update
      // otimista (item oculto) e sincroniza com o servidor após um delay
      if (error?.response?.status === 400) {
        setTimeout(() => {
          qc.invalidateQueries({ queryKey: ["join-requests"] });
          qc.invalidateQueries({ queryKey: ["dashboard"] });
        }, 600);
        return;
      }

      // Reverte o optimistic update apenas em erros verdadeiros (5xx, rede, etc.)
      if (ctx?.previousJoinRequests) {
        ctx.previousJoinRequests.forEach(([key, data]: [any, any]) => qc.setQueryData(key, data));
      }
      if (ctx?.previousOverview) qc.setQueryData(["dashboard", "overview"], ctx.previousOverview);
      if (ctx?.previousPending) qc.setQueryData(["dashboard", "pending-requests"], ctx.previousPending);
      if (ctx?.previousRequests) qc.setQueryData(["dashboard", "requests"], ctx.previousRequests);
    },
    onSuccess: () => {
      // Invalida os caches globais para sincronização com o banco
      qc.invalidateQueries({ queryKey: ["join-requests"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["project"] });
      qc.invalidateQueries({ queryKey: ["notification-summary"] });
    },
  });
}

export function useCancelRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => memberRequestsApi.cancel(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dashboard"] }),
  });
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export function useProjectPosts(projectId: string, page = 1) {
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["posts", projectId, page],
    queryFn: async ({ signal }) => {
      const { data } = await projectsApi.posts(projectId, { page }, signal);
      return data;
    },
    enabled: !!projectId,
    staleTime: STALE.short,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: unknown }) =>
      projectsApi.createPost(projectId, data),
    onSuccess: (_, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["posts", projectId] });
    },
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => postsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => postsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

// ─── Publications ─────────────────────────────────────────────────────────────

// usePublications — infinite scroll com filtros de tipo e ano
export function usePublications(filters?: { type?: string; year?: string }) {
  return useInfiniteQuery({
    ...BASE_OPTS,
    queryKey: ["publications", filters],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1, signal }) => {
      const params: Record<string, unknown> = { page: pageParam, limit: 12 };
      if (filters?.type && filters.type !== "all") params.type = filters.type;
      if (filters?.year && filters.year !== "all") params.year = filters.year;

      const { data } = await publicationsApi.list(params, signal);
      const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
      return {
        data: items.map(adaptPublication),
        total: data?.total ?? items.length,
        page: data?.page ?? pageParam,
        totalPages: data?.totalPages ?? 1,
        hasMore: data?.hasMore ?? false,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    staleTime: STALE.long,
  });
}

export function usePublication(id: string) {
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["publication", id],
    queryFn: async ({ signal }) => {
      const { data } = await publicationsApi.byId(id, signal);
      return adaptPublication(data);
    },
    enabled: !!id,
    staleTime: STALE.long,
  });
}

export function useApprovePublication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => publicationsApi.approve(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["publications"] });
      qc.invalidateQueries({ queryKey: ["pending-publications"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["notification-summary"] });
    },
    onError: (error: any) => {
      if (error?.response?.status === 404) {
        qc.invalidateQueries({ queryKey: ["pending-publications"] });
      }
    },
  });
}

export function usePendingPublications(projectId: string, enabled = true) {
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["pending-publications", projectId],
    queryFn: async ({ signal }) => {
      const { data } = await publicationsApi.pending(projectId);
      return Array.isArray(data) ? data.map(adaptPublication) : [];
    },
    enabled: !!projectId && enabled,
    staleTime: STALE.short,
  });
}

export function useSuggestPublication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, suggestion }: { id: string; suggestion: string }) =>
      publicationsApi.suggest(id, suggestion),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["publications"] });
      qc.invalidateQueries({ queryKey: ["pending-publications"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["notification-summary"] });
    },
  });
}

export function useRejectPublication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      publicationsApi.reject(id, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["publications"] });
      qc.invalidateQueries({ queryKey: ["pending-publications"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["notification-summary"] });
    },
    onError: (error: any) => {
      if (error?.response?.status === 404) {
        qc.invalidateQueries({ queryKey: ["pending-publications"] });
      }
    },
  });
}

export function useCreatePublication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (d: unknown) => publicationsApi.create(d),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["publications"] }),
  });
}

export function useUpdatePublication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => publicationsApi.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["publication", id] });
      qc.invalidateQueries({ queryKey: ["publications"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["notification-summary"] });
    },
  });
}

export function useDeletePublication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => publicationsApi.delete(id),
    // Cirúrgico: remove só o item deletado do cache
    onMutate: async (deletedId) => {
      await qc.cancelQueries({ queryKey: ["publications"] });
      const previous = qc.getQueriesData({ queryKey: ["publications"] });
      qc.setQueriesData(
        { queryKey: ["publications"] },
        (old: InfiniteData<{ data: any[] }> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.filter((p: any) => p.id !== deletedId),
            })),
          };
        },
      );
      return { previous };
    },
    onError: (_, __, ctx) => {
      ctx?.previous?.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["publications"] });
    },
  });
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function useDashboardStats() {
  const { user } = useAuth();
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["dashboard", "stats", user?.id],
    queryFn: async ({ signal }) => { const { data } = await dashboardApi.stats(signal); return data; },
    staleTime: STALE.short,
    enabled: !!user?.id,
  });
}

export function useDashboardProjects(enabled = true) {
  const { user } = useAuth();
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["dashboard", "projects", user?.id],
    queryFn: async ({ signal }) => {
      const { data } = await dashboardApi.myProjects(signal);
      return Array.isArray(data) ? data.map(adaptProject) : [];
    },
    enabled: !!user?.id && enabled,
    staleTime: STALE.short,
  });
}

export function useDashboardRequests() {
  const { user } = useAuth();
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["dashboard", "requests", user?.id],
    queryFn: async ({ signal }) => {
      const { data } = await dashboardApi.myRequests(signal);
      return Array.isArray(data) ? data.map(adaptRequest) : [];
    },
    staleTime: STALE.short,
    enabled: !!user?.id,
  });
}

export function useDashboardPendingRequests() {
  const { user } = useAuth();
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["dashboard", "pending-requests", user?.id],
    queryFn: async ({ signal }) => {
      const { data } = await dashboardApi.pendingRequests(signal);
      return Array.isArray(data) ? data.map(adaptRequest) : [];
    },
    staleTime: STALE.short,
    enabled: !!user?.id,
  });
}

export function useDashboardSubscriptions() {
  const { user } = useAuth();
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["dashboard", "subscriptions", user?.id],
    queryFn: async ({ signal }) => {
      const { data } = await dashboardApi.subscriptions(signal);
      return Array.isArray(data) ? data : [];
    },
    staleTime: STALE.medium,
    enabled: !!user?.id,
  });
}

export function useSubscribedActivity(enabled = true) {
  const { user } = useAuth();
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["dashboard", "subscribed-activity", user?.id],
    queryFn: async ({ signal }) => {
      const { data } = await dashboardApi.subscribedActivity(signal);
      return data as { posts: any[]; publications: any[] };
    },
    enabled: !!user?.id && enabled,
    staleTime: STALE.short,
    refetchInterval: 1000 * 60 * 5,
  });
}

export function useDashboardOverview() {
  const { user } = useAuth();
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["dashboard", "overview", user?.id],
    queryFn: async ({ signal }) => {
      const { data } = await dashboardApi.overview(signal);
      return data as {
        stats: any;
        projects: any[];
        pendingRequests: any[];
        requests: any[];
        subscriptions: any[];
      };
    },
    staleTime: STALE.short,
    enabled: !!user?.id,
  });
}

// ─── Notification Summary ─────────────────────────────────────────────────────

export function useNotificationSummary(enabled = true) {
  const { user } = useAuth();
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["notification-summary", user?.id],
    queryFn: async ({ signal }) => {
      const { data } = await dashboardApi.notificationSummary(signal);
      return data as {
        pendingRequests: any[];
        subscriptions: { projectId: string; createdAt: string }[];
        activity: { posts: any[]; publications: any[] };
        systemNotifications: any[];
      };
    },
    enabled: !!user?.id && enabled,
    staleTime: 1000 * 30,                  // 30 segundos
    refetchInterval: 1000 * 60 * 5,        // 5 min — fallback de segurança (SSE é o mecanismo principal)
  });
}

// ─── Notifications ────────────────────────────────────────────────────────────

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["notifications"] });
      const previous = qc.getQueryData(["notifications"]);
      qc.setQueryData(["notifications"], (old: any[]) =>
        (old ?? []).map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
      return { previous };
    },
    onError: (_, __, ctx) => {
      if (ctx?.previous) qc.setQueryData(["notifications"], ctx.previous);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["notification-summary"] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.markReadAll(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["notification-summary"] });
    },
  });
}

export function useClearAllReadNotifications() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.deleteAllRead(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["notification-summary"] });
    },
  });
}

// ─── Activities ──────────────────────────────────────────────────────────────

export function useActivities(projectId: string) {
  // Lê do mesmo cache de useProject — zero requests extras
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["project", projectId],
    queryFn: async ({ signal }) => {
      const { data } = await projectsApi.byId(projectId, signal);
      const adapted = adaptProject(data);
      return { ...adapted, subscribed: data.subscribed ?? false, activities: data.activities ?? [], posts: data.posts ?? [] };
    },
    enabled: !!projectId,
    staleTime: STALE.short,
    select: (data: any) => (Array.isArray(data?.activities) ? data.activities : []),
  });
}

export function useActivity(projectId: string, activityId: string) {
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["activity", projectId, activityId],
    queryFn: async ({ signal }) => {
      const { data } = await activitiesApi.getById(projectId, activityId);
      return data;
    },
    enabled: !!projectId && !!activityId,
    staleTime: STALE.short,
  });
}

export function useCreateActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: unknown }) =>
      activitiesApi.create(projectId, data),
    onSuccess: (_, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["project", projectId] }); // corrigido: era ["activities", projectId]
    },
  });
}

export function useToggleActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, activityId }: { projectId: string; activityId: string }) =>
      activitiesApi.toggle(projectId, activityId),
    onMutate: async ({ projectId, activityId }) => {
      await qc.cancelQueries({ queryKey: ["project", projectId] });
      const previous = qc.getQueryData(["project", projectId]);
      qc.setQueryData(["project", projectId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          activities: (old.activities ?? []).map((a: any) =>
            a.id === activityId ? { ...a, done: !a.done } : a
          ),
        };
      });
      return { previous };
    },
    onError: (_, { projectId }, ctx) => {
      if (ctx?.previous) qc.setQueryData(["project", projectId], ctx.previous);
    },
    onSettled: (_, __, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["project", projectId] }); // corrigido: era ["activities", projectId]
    },
  });
}

export function useDeleteActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, activityId }: { projectId: string; activityId: string }) =>
      activitiesApi.delete(projectId, activityId),
    onMutate: async ({ projectId, activityId }) => {
      await qc.cancelQueries({ queryKey: ["project", projectId] });
      const previous = qc.getQueryData(["project", projectId]);
      qc.setQueryData(["project", projectId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          activities: (old.activities ?? []).filter((a: any) => a.id !== activityId),
        };
      });
      return { previous };
    },
    onError: (_, { projectId }, ctx) => {
      if (ctx?.previous) qc.setQueryData(["project", projectId], ctx.previous);
    },
    onSettled: (_, __, { projectId }) => {
      qc.invalidateQueries({ queryKey: ["project", projectId] }); // corrigido: era ["activities", projectId]
    },
  });
}

// ─── Users ────────────────────────────────────────────────────────────────────

export function useUserProfile(id: string | null) {
  return useQuery({
    ...BASE_OPTS,
    queryKey: ["user", id],
    queryFn: async ({ signal }) => {
      const { data } = await usersApi.getById(id!, signal);
      return data;
    },
    enabled: !!id,
    staleTime: STALE.medium,
  });
}