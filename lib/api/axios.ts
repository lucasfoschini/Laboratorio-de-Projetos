import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3334";

export const api = axios.create({
  baseURL: BASE_URL, timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("@labativo:access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let queue: { resolve: (v: string) => void; reject: (e: unknown) => void }[] = [];
const processQueue = (err: unknown, token: string | null = null) => {
  queue.forEach(({ resolve, reject }) => err ? reject(err) : resolve(token!));
  queue = [];
};

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const orig = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !orig._retry) {
      if (typeof window === "undefined") return Promise.reject(error);
      // Se o usuário nem tem token, é visitante — não redirecionar para login
      const hasToken = !!localStorage.getItem("@labativo:access_token");
      if (!hasToken) return Promise.reject(error);
      if (isRefreshing) return new Promise((res, rej) => queue.push({ resolve: res, reject: rej }))
        .then((token) => { orig.headers.Authorization = `Bearer ${token}`; return api(orig); });
      orig._retry = true; isRefreshing = true;
      try {
        const rt = localStorage.getItem("@labativo:refresh_token");
        if (!rt) throw new Error("no refresh token");
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken: rt });
        localStorage.setItem("@labativo:access_token",  data.accessToken);
        localStorage.setItem("@labativo:refresh_token", data.refreshToken);
        processQueue(null, data.accessToken);
        orig.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(orig);
      } catch (e) {
        processQueue(e, null);
        ["@labativo:access_token","@labativo:refresh_token","@labativo:user"].forEach((k) => localStorage.removeItem(k));
        window.location.href = "/auth/login";
        return Promise.reject(e);
      } finally { isRefreshing = false; }
    }
    return Promise.reject(error);
  },
);

export const authApi = {
  login:          (d: unknown) => api.post("/auth/login",   d),
  register:       (d: unknown) => api.post("/auth/register", d),
  refresh:        (d: unknown) => api.post("/auth/refresh",  d),
  me:             ()           => api.get("/auth/me"),
  updateMe:       (d: unknown) => api.patch("/auth/me", d), // ← novo
  forgotPassword: (d: unknown) => api.post("/auth/forgot-password", d),
  resetPassword:  (d: unknown) => api.post("/auth/reset-password",  d),
};

export const projectsApi = {
  list:              (p?: object)           => api.get("/projects", { params: p }),
  byId:              (id: string)           => api.get(`/projects/${id}`),
  create:            (d: unknown)           => api.post("/projects", d),
  update:            (id: string, d: unknown) => api.patch(`/projects/${id}`, d),
  delete:            (id: string)           => api.delete(`/projects/${id}`),
  subscribe:         (id: string)           => api.post(`/projects/${id}/subscribe`),
  unsubscribe:       (id: string)           => api.delete(`/projects/${id}/subscribe`),
  subscriptionStatus: (id: string)          => api.get(`/projects/${id}/subscribe`),
  joinRequest:       (id: string, d: unknown) => api.post(`/projects/${id}/join-request`, d),
  joinRequests:      (id: string)           => api.get(`/projects/${id}/join-requests`),
  posts:             (id: string, p?: object) => api.get(`/projects/${id}/posts`, { params: p }),
  createPost:        (id: string, d: unknown) => api.post(`/projects/${id}/posts`, d),
  leave:             (id: string)           => api.delete(`/projects/${id}/leave`),
  removeMember:      (id: string, userId: string) => api.delete(`/projects/${id}/members/${userId}`),
};

export const memberRequestsApi = {
  my:     ()                                   => api.get("/member-requests/my"),
  review: (id: string, d: { status: string }) => api.patch(`/member-requests/${id}`, d),
  cancel: (id: string)                         => api.delete(`/member-requests/${id}`),
};

export const postsApi = {
  byId:   (id: string) => api.get(`/posts/${id}`),
  update: (id: string, d: unknown) => api.patch(`/posts/${id}`, d),
  delete: (id: string) => api.delete(`/posts/${id}`),
};

export const publicationsApi = {
  list:   (p?: object)           => api.get("/publications", { params: p }),
  byId:   (id: string)           => api.get(`/publications/${id}`),
  create: (d: unknown)           => api.post("/publications", d),
  update: (id: string, d: unknown) => api.patch(`/publications/${id}`, d),
  delete: (id: string)           => api.delete(`/publications/${id}`),
};

export const dashboardApi = {
  overview:           () => api.get("/dashboard/overview"), // ← novo
  stats:              () => api.get("/dashboard/stats"),
  myProjects:         () => api.get("/dashboard/projects"),
  myRequests:         () => api.get("/dashboard/requests/mine"),
  pendingRequests:    () => api.get("/dashboard/requests/pending"),
  subscriptions:      () => api.get("/dashboard/subscriptions"),
  subscribedActivity: () => api.get("/dashboard/subscribed-activity"),
};

export const usersApi = {
  search: (q: string) => api.get("/users/search", { params: { q } }),
  me:     ()          => api.get("/users/me"),
  updateMe: (d: unknown) => api.patch("/users/me", d),
  getById: (id: string) => api.get(`/users/${id}`),
};

export const notificationsApi = {
  list:     ()            => api.get("/notifications"),
  markRead: (id: string)  => api.patch(`/notifications/${id}/read`),
};
