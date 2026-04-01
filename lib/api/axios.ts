import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3334";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  withCredentials: true,                          // cookies enviados automaticamente
  headers: { "Content-Type": "application/json" },
});

// Interceptor de request removido — tokens trafegam via cookies HttpOnly (withCredentials: true)

let isRefreshing = false;
let queue: { resolve: () => void; reject: (e: unknown) => void }[] = [];

const processQueue = (err: unknown) => {
  queue.forEach(({ resolve, reject }) => (err ? reject(err) : resolve()));
  queue = [];
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const orig = error.config as InternalAxiosRequestConfig & { _retry?: boolean; _retryCount?: number };

    // 429: espera e retenta (max 2x), respeitando o header Retry-After quando disponível
    if (error.response?.status === 429) {
      orig._retryCount = (orig._retryCount ?? 0) + 1;
      if (orig._retryCount <= 2) {
        const retryAfter = error.response?.headers["retry-after"];
        const delay = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : orig._retryCount * 2000;
        await sleep(delay);
        return api(orig);
      }
      return Promise.reject(error);
    }

    // 401: tenta renovar via refresh token (cookie HttpOnly enviado automaticamente)
    if (error.response?.status === 401 && !orig._retry) {
      if (typeof window === "undefined") return Promise.reject(error);

      if (isRefreshing) {
        return new Promise<void>((res, rej) => queue.push({ resolve: res, reject: rej })).then(
          () => api(orig)
        );
      }

      orig._retry  = true;
      isRefreshing = true;

      try {
        // Sem body e sem localStorage — o cookie de refresh vai automaticamente
        await axios.post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true, timeout: 10_000 });
        processQueue(null);
        return api(orig);
      } catch (e) {
        processQueue(e);
        localStorage.removeItem("@labativo:user"); // apenas o user — cookies limpos pelo servidor
        window.location.href = "/auth/login";
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// ─── APIs ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login:          (d: unknown) => api.post("/auth/login",           d),
  register:       (d: unknown) => api.post("/auth/register",        d),
  refresh:        (d: unknown) => api.post("/auth/refresh",         d),
  me:             ()           => api.get("/auth/me"),
  updateMe:       (d: unknown) => api.patch("/auth/me",             d),
  forgotPassword: (d: unknown) => api.post("/auth/forgot-password", d),
  resetPassword:  (d: unknown) => api.post("/auth/reset-password",  d),
  logout:         ()           => api.post("/auth/logout"),          // limpa cookies HttpOnly no servidor
};

export const projectsApi = {
  list:               (p?: object, signal?: AbortSignal)             => api.get("/projects",                     { params: p, signal }),
  byId:               (id: string, signal?: AbortSignal)             => api.get(`/projects/${id}`,               { signal }),
  create:             (d: unknown)                                    => api.post("/projects",                    d),
  update:             (id: string, d: unknown)                       => api.patch(`/projects/${id}`,             d),
  delete:             (id: string)                                    => api.delete(`/projects/${id}`),
  subscribe:          (id: string)                                    => api.post(`/projects/${id}/subscribe`),
  unsubscribe:        (id: string)                                    => api.delete(`/projects/${id}/subscribe`),
  subscriptionStatus: (id: string, signal?: AbortSignal)             => api.get(`/projects/${id}/subscribe`,     { signal }),
  joinRequest:        (id: string, d: unknown)                       => api.post(`/projects/${id}/join-request`, d),
  joinRequests:       (id: string, signal?: AbortSignal)             => api.get(`/projects/${id}/join-requests`, { signal }),
  posts:              (id: string, p?: object, signal?: AbortSignal) => api.get(`/projects/${id}/posts`,         { params: p, signal }),
  createPost:         (id: string, d: unknown)                       => api.post(`/projects/${id}/posts`,        d),
  leave:              (id: string)                                    => api.delete(`/projects/${id}/leave`),
  removeMember:       (id: string, userId: string)                   => api.delete(`/projects/${id}/members/${userId}`),
};

export const memberRequestsApi = {
  my:     ()                                   => api.get("/member-requests/my"),
  review: (id: string, d: { status: string }) => api.patch(`/member-requests/${id}`, d),
  cancel: (id: string)                         => api.delete(`/member-requests/${id}`),
};

export const postsApi = {
  byId:   (id: string)             => api.get(`/posts/${id}`),
  update: (id: string, d: unknown) => api.patch(`/posts/${id}`, d),
  delete: (id: string)             => api.delete(`/posts/${id}`),
};

export const publicationsApi = {
  list:    (p?: object, signal?: AbortSignal) => api.get("/publications",               { params: p, signal }),
  byId:    (id: string, signal?: AbortSignal) => api.get(`/publications/${id}`,         { signal }),
  create:  (d: unknown)                       => api.post("/publications",               d),
  update:  (id: string, d: unknown)           => api.patch(`/publications/${id}`,        d),
  delete:  (id: string)                       => api.delete(`/publications/${id}`),
  approve:  (id: string)                          => api.patch(`/publications/${id}/approve`),
  suggest:  (id: string, suggestion: string)      => api.post(`/publications/${id}/suggest`, { suggestion }),
  reject:  (id: string, reason?: string)        => api.patch(`/publications/${id}/reject`, { reason }),
  pending: (projectId: string)                   => api.get(`/publications/pending/${projectId}`),
};

export const dashboardApi = {
  notificationSummary: (signal?: AbortSignal) => api.get("/dashboard/notification-summary", { signal }),
  overview:            (signal?: AbortSignal) => api.get("/dashboard/overview",             { signal }),
  stats:               (signal?: AbortSignal) => api.get("/dashboard/stats",                { signal }),
  myProjects:          (signal?: AbortSignal) => api.get("/dashboard/projects",             { signal }),
  myRequests:          (signal?: AbortSignal) => api.get("/dashboard/requests/mine",        { signal }),
  pendingRequests:     (signal?: AbortSignal) => api.get("/dashboard/requests/pending",     { signal }),
  subscriptions:       (signal?: AbortSignal) => api.get("/dashboard/subscriptions",        { signal }),
  subscribedActivity:  (signal?: AbortSignal) => api.get("/dashboard/subscribed-activity",  { signal }),
};

export const usersApi = {
  search:   (q: string)                        => api.get("/users/search", { params: { q } }),
  me:       ()                                 => api.get("/users/me"),
  updateMe: (d: unknown)                       => api.patch("/users/me",   d),
  getById:  (id: string, signal?: AbortSignal) => api.get(`/users/${id}`,  { signal }),
};

export const activitiesApi = {
  list:    (projectId: string)                         => api.get(`/projects/${projectId}/activities`),
  getById: (projectId: string, activityId: string)     => api.get(`/projects/${projectId}/activities/${activityId}`),
  create:  (projectId: string, d: unknown)             => api.post(`/projects/${projectId}/activities`, d),
  toggle:  (projectId: string, activityId: string)     => api.patch(`/projects/${projectId}/activities/${activityId}/toggle`),
  delete:  (projectId: string, activityId: string)     => api.delete(`/projects/${projectId}/activities/${activityId}`),
};

export const notificationsApi = {
  list:        (signal?: AbortSignal) => api.get("/notifications",           { signal }),
  markRead:    (id: string)           => api.patch(`/notifications/${id}/read`),
  markReadAll: ()                     => api.patch("/notifications/read-all"),
  deleteAllRead: ()                   => api.delete("/notifications/read"),
};