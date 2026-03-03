import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardApi, memberRequestsApi, notificationsApi, postsApi, projectsApi, publicationsApi } from "@/lib/api/axios";
import { adaptProject, adaptPublication, adaptRequest } from "@/lib/adapters";

const STALE = {
  short:  1000 * 60 * 2,  // 2 min  — dados que mudam com frequência
  medium: 1000 * 60 * 5,  // 5 min  — dados moderadamente estáveis
  long:   1000 * 60 * 10, // 10 min — dados raramente alterados
};

// ─── Projects ─────────────────────────────────────────────────────────────────
export function useProjects(p?: object) {
  return useQuery({ queryKey: ["projects", p], queryFn: async () => { const { data } = await projectsApi.list(p); const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []; return items.map(adaptProject); }, staleTime: STALE.medium });
}
export function useProject(id: string) {
  return useQuery({ queryKey: ["project", id], queryFn: async () => { const { data } = await projectsApi.byId(id); return adaptProject(data); }, enabled: !!id, staleTime: STALE.short });
}
export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (d: unknown) => projectsApi.create(d), onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }) });
}
export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: unknown }) => projectsApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: ["project", id] }); qc.invalidateQueries({ queryKey: ["projects"] }); } });
}
export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => projectsApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }) });
}

export function useLeaveProject() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => projectsApi.leave(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ["projects"] }); qc.invalidateQueries({ queryKey: ["project"] }); qc.invalidateQueries({ queryKey: ["dashboard"] }); } });
}
export function useRemoveMember() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ projectId, userId }: { projectId: string; userId: string }) => projectsApi.removeMember(projectId, userId), onSuccess: (_, { projectId }) => { qc.invalidateQueries({ queryKey: ["project", projectId] }); qc.invalidateQueries({ queryKey: ["projects"] }); qc.invalidateQueries({ queryKey: ["dashboard"] }); } });
}

// ─── Subscription ────────────────────────────────────────────────────────────
export function useSubscriptionStatus(projectId: string, enabled = true) {
  return useQuery({ queryKey: ["subscription", projectId], queryFn: async () => { const { data } = await projectsApi.subscriptionStatus(projectId); return data as { subscribed: boolean }; }, enabled: !!projectId && enabled, staleTime: STALE.medium });
}
export function useSubscribe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, subscribed }: { id: string; subscribed: boolean }) =>
      subscribed ? projectsApi.unsubscribe(id) : projectsApi.subscribe(id),
    onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: ["subscription", id] }); qc.invalidateQueries({ queryKey: ["dashboard"] }); },
  });
}

// ─── MemberRequests ───────────────────────────────────────────────────────────
export function useJoinRequest() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: unknown }) => projectsApi.joinRequest(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["dashboard"] }); qc.invalidateQueries({ queryKey: ["member-requests"] }); } });
}
export function useProjectJoinRequests(projectId: string, enabled = true) {
  return useQuery({ queryKey: ["join-requests", projectId], queryFn: async () => { const { data } = await projectsApi.joinRequests(projectId); return Array.isArray(data) ? data.map(adaptRequest) : []; }, enabled: !!projectId && enabled, staleTime: STALE.short });
}
export function useReviewRequest() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, status }: { id: string; status: "APPROVED" | "REJECTED" }) => memberRequestsApi.review(id, { status }), onSuccess: () => { qc.invalidateQueries({ queryKey: ["join-requests"] }); qc.invalidateQueries({ queryKey: ["dashboard"] }); qc.invalidateQueries({ queryKey: ["projects"] }); } });
}
export function useCancelRequest() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => memberRequestsApi.cancel(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ["dashboard"] }); } });
}

// ─── Posts ───────────────────────────────────────────────────────────────────
export function useProjectPosts(projectId: string, page = 1) {
  return useQuery({ queryKey: ["posts", projectId, page], queryFn: async () => { const { data } = await projectsApi.posts(projectId, { page }); return data; }, enabled: !!projectId, staleTime: STALE.short });
}
export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ projectId, data }: { projectId: string; data: unknown }) => projectsApi.createPost(projectId, data), onSuccess: (_, { projectId }) => { qc.invalidateQueries({ queryKey: ["posts", projectId] }); qc.invalidateQueries({ queryKey: ["project", projectId] }); } });
}
export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => postsApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }) });
}

// ─── Publications ─────────────────────────────────────────────────────────────
export function usePublications(p?: object) {
  return useQuery({ queryKey: ["publications", p], queryFn: async () => { const { data } = await publicationsApi.list(p); return (Array.isArray(data) ? data : []).map(adaptPublication); }, staleTime: STALE.long });
}
export function usePublication(id: string) {
  return useQuery({ queryKey: ["publication", id], queryFn: async () => { const { data } = await publicationsApi.byId(id); return adaptPublication(data); }, enabled: !!id });
}
export function useCreatePublication() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (d: unknown) => publicationsApi.create(d), onSuccess: () => qc.invalidateQueries({ queryKey: ["publications"] }) });
}
export function useUpdatePublication() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: unknown }) => publicationsApi.update(id, data), onSuccess: (_, { id }) => { qc.invalidateQueries({ queryKey: ["publication", id] }); qc.invalidateQueries({ queryKey: ["publications"] }); } });
}
export function useDeletePublication() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => publicationsApi.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["publications"] }) });
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export function useDashboardStats() {
  return useQuery({ queryKey: ["dashboard", "stats"], queryFn: async () => { const { data } = await dashboardApi.stats(); return data; }, staleTime: STALE.short });
}
export function useDashboardProjects(enabled = true) {
  return useQuery({ queryKey: ["dashboard", "projects"], queryFn: async () => { const { data } = await dashboardApi.myProjects(); return Array.isArray(data) ? data.map(adaptProject) : []; }, enabled, staleTime: STALE.short });
}
export function useDashboardRequests() {
  return useQuery({ queryKey: ["dashboard", "requests"], queryFn: async () => { const { data } = await dashboardApi.myRequests(); return Array.isArray(data) ? data.map(adaptRequest) : []; }, staleTime: STALE.short });
}
export function useDashboardPendingRequests() {
  return useQuery({ queryKey: ["dashboard", "pending-requests"], queryFn: async () => { const { data } = await dashboardApi.pendingRequests(); return Array.isArray(data) ? data.map(adaptRequest) : []; }, staleTime: STALE.short });
}
export function useDashboardSubscriptions() {
  return useQuery({ queryKey: ["dashboard", "subscriptions"], queryFn: async () => { const { data } = await dashboardApi.subscriptions(); return Array.isArray(data) ? data : []; }, staleTime: STALE.medium });
}
export function useSubscribedActivity(enabled = true) {
  return useQuery({
    queryKey: ["dashboard", "subscribed-activity"],
    queryFn: async () => {
      const { data } = await dashboardApi.subscribedActivity();
      return data as { posts: any[]; publications: any[] };
    },
    enabled,
    staleTime:       1000 * 60 * 5,  // 5 min de cache
    refetchInterval: 1000 * 60 * 5,  // polling a cada 5 min
  });
}

export function useDashboardOverview() {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: async () => {
      const { data } = await dashboardApi.overview();
      return data as {
        stats: any;
        projects: any[];
        pendingRequests: any[];
        requests: any[];
        subscriptions: any[];
      };
    },
    staleTime: STALE.short,
  });
}

// ─── Notifications ────────────────────────────────────────────────────────────
export function useNotifications(enabled = true) {
  return useQuery({ queryKey: ["notifications"], queryFn: async () => { const { data } = await notificationsApi.list(); return Array.isArray(data) ? data : []; }, enabled, staleTime: 30_000, retry: false });
}
export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => notificationsApi.markRead(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }) });
}
