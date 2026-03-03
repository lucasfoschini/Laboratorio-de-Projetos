(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/labex-front/components/providers/QueryProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryProvider",
    ()=>QueryProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/@tanstack/react-query-devtools/build/modern/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function QueryProvider({ children }) {
    _s();
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "QueryProvider.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60,
                        retry: {
                            "QueryProvider.useState": (failureCount, error)=>{
                                const status = error?.response?.status;
                                if (status === 401 || status === 403 || status === 404) return false;
                                return failureCount < 2;
                            }
                        }["QueryProvider.useState"]
                    }
                }
            })
    }["QueryProvider.useState"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactQueryDevtools"], {
                initialIsOpen: false
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/providers/QueryProvider.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/components/providers/QueryProvider.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(QueryProvider, "Gdnisejn6owaxGGn8+z20bvxi/8=");
_c = QueryProvider;
var _c;
__turbopack_context__.k.register(_c, "QueryProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/labex-front/lib/api/axios.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api,
    "authApi",
    ()=>authApi,
    "dashboardApi",
    ()=>dashboardApi,
    "memberRequestsApi",
    ()=>memberRequestsApi,
    "notificationsApi",
    ()=>notificationsApi,
    "postsApi",
    ()=>postsApi,
    "projectsApi",
    ()=>projectsApi,
    "publicationsApi",
    ()=>publicationsApi,
    "usersApi",
    ()=>usersApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:3334") ?? "http://localhost:3334";
const api = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: BASE_URL,
    timeout: 15_000,
    headers: {
        "Content-Type": "application/json"
    }
});
api.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const token = localStorage.getItem("@labativo:access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
let isRefreshing = false;
let queue = [];
const processQueue = (err, token = null)=>{
    queue.forEach(({ resolve, reject })=>err ? reject(err) : resolve(token));
    queue = [];
};
api.interceptors.response.use((r)=>r, async (error)=>{
    const orig = error.config;
    if (error.response?.status === 401 && !orig._retry) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Se o usuário nem tem token, é visitante — não redirecionar para login
        const hasToken = !!localStorage.getItem("@labativo:access_token");
        if (!hasToken) return Promise.reject(error);
        if (isRefreshing) return new Promise((res, rej)=>queue.push({
                resolve: res,
                reject: rej
            })).then((token)=>{
            orig.headers.Authorization = `Bearer ${token}`;
            return api(orig);
        });
        orig._retry = true;
        isRefreshing = true;
        try {
            const rt = localStorage.getItem("@labativo:refresh_token");
            if (!rt) throw new Error("no refresh token");
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${BASE_URL}/auth/refresh`, {
                refreshToken: rt
            });
            localStorage.setItem("@labativo:access_token", data.accessToken);
            localStorage.setItem("@labativo:refresh_token", data.refreshToken);
            processQueue(null, data.accessToken);
            orig.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(orig);
        } catch (e) {
            processQueue(e, null);
            [
                "@labativo:access_token",
                "@labativo:refresh_token",
                "@labativo:user"
            ].forEach((k)=>localStorage.removeItem(k));
            window.location.href = "/auth/login";
            return Promise.reject(e);
        } finally{
            isRefreshing = false;
        }
    }
    return Promise.reject(error);
});
const authApi = {
    login: (d)=>api.post("/auth/login", d),
    register: (d)=>api.post("/auth/register", d),
    refresh: (d)=>api.post("/auth/refresh", d),
    me: ()=>api.get("/auth/me"),
    forgotPassword: (d)=>api.post("/auth/forgot-password", d),
    resetPassword: (d)=>api.post("/auth/reset-password", d)
};
const projectsApi = {
    list: (p)=>api.get("/projects", {
            params: p
        }),
    byId: (id)=>api.get(`/projects/${id}`),
    create: (d)=>api.post("/projects", d),
    update: (id, d)=>api.patch(`/projects/${id}`, d),
    delete: (id)=>api.delete(`/projects/${id}`),
    subscribe: (id)=>api.post(`/projects/${id}/subscribe`),
    unsubscribe: (id)=>api.delete(`/projects/${id}/subscribe`),
    subscriptionStatus: (id)=>api.get(`/projects/${id}/subscribe`),
    joinRequest: (id, d)=>api.post(`/projects/${id}/join-request`, d),
    joinRequests: (id)=>api.get(`/projects/${id}/join-requests`),
    posts: (id, p)=>api.get(`/projects/${id}/posts`, {
            params: p
        }),
    createPost: (id, d)=>api.post(`/projects/${id}/posts`, d),
    leave: (id)=>api.delete(`/projects/${id}/leave`),
    removeMember: (id, userId)=>api.delete(`/projects/${id}/members/${userId}`)
};
const memberRequestsApi = {
    my: ()=>api.get("/member-requests/my"),
    review: (id, d)=>api.patch(`/member-requests/${id}`, d),
    cancel: (id)=>api.delete(`/member-requests/${id}`)
};
const postsApi = {
    byId: (id)=>api.get(`/posts/${id}`),
    delete: (id)=>api.delete(`/posts/${id}`)
};
const publicationsApi = {
    list: (p)=>api.get("/publications", {
            params: p
        }),
    byId: (id)=>api.get(`/publications/${id}`),
    create: (d)=>api.post("/publications", d),
    update: (id, d)=>api.patch(`/publications/${id}`, d),
    delete: (id)=>api.delete(`/publications/${id}`)
};
const dashboardApi = {
    stats: ()=>api.get("/dashboard/stats"),
    myProjects: ()=>api.get("/dashboard/projects"),
    myRequests: ()=>api.get("/dashboard/requests/mine"),
    pendingRequests: ()=>api.get("/dashboard/requests/pending"),
    subscriptions: ()=>api.get("/dashboard/subscriptions"),
    subscribedActivity: ()=>api.get("/dashboard/subscribed-activity")
};
const usersApi = {
    search: (q)=>api.get("/users/search", {
            params: {
                q
            }
        }),
    me: ()=>api.get("/users/me"),
    updateMe: (d)=>api.patch("/users/me", d)
};
const notificationsApi = {
    list: ()=>api.get("/notifications"),
    markRead: (id)=>api.patch(`/notifications/${id}/read`)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/labex-front/lib/adapters.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adaptArea",
    ()=>adaptArea,
    "adaptProject",
    ()=>adaptProject,
    "adaptPublication",
    ()=>adaptPublication,
    "adaptRequest",
    ()=>adaptRequest,
    "adaptRequestStatus",
    ()=>adaptRequestStatus,
    "adaptRole",
    ()=>adaptRole,
    "adaptStatus",
    ()=>adaptStatus,
    "adaptType",
    ()=>adaptType,
    "adaptUser",
    ()=>adaptUser
]);
const adaptArea = (a)=>a?.toLowerCase() ?? "technology";
const adaptStatus = (s)=>({
        EM_ANDAMENTO: "in_progress",
        ABERTO: "open",
        FINALIZADO: "completed"
    })[s] ?? s?.toLowerCase() ?? "open";
const adaptType = (t)=>t?.toLowerCase() ?? "article";
const adaptRole = (r)=>({
        PROFESSOR: "professor",
        ALUNO: "student"
    })[r] ?? "student";
const adaptRequestStatus = (s)=>s?.toLowerCase() ?? "pending";
function adaptProject(p) {
    return p ? {
        ...p,
        area: adaptArea(p.area),
        status: adaptStatus(p.status)
    } : p;
}
function adaptPublication(p) {
    return p ? {
        ...p,
        type: adaptType(p.type),
        tags: p.tags ?? [],
        authors: p.authors ?? []
    } : p;
}
function adaptUser(u) {
    if (!u) return u;
    return {
        ...u,
        role: adaptRole(u.role),
        bio: u.bio || ""
    };
}
function adaptRequest(r) {
    return r ? {
        ...r,
        status: adaptRequestStatus(r.status),
        project: r.project ? adaptProject(r.project) : r.project
    } : r;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/labex-front/contexts/auth.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/lib/api/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$adapters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/lib/adapters.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const KEYS = {
    access: "@labativo:access_token",
    refresh: "@labativo:refresh_token",
    user: "@labativo:user"
};
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const stored = localStorage.getItem(KEYS.user);
            const token = localStorage.getItem(KEYS.access);
            if (stored && token) {
                try {
                    setUser(JSON.parse(stored));
                } catch  {}
            }
            setIsLoading(false);
        }
    }["AuthProvider.useEffect"], []);
    const save = (data)=>{
        const adapted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$adapters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptUser"])(data.user);
        localStorage.setItem(KEYS.access, data.accessToken);
        localStorage.setItem(KEYS.refresh, data.refreshToken);
        localStorage.setItem(KEYS.user, JSON.stringify(adapted));
        setUser(adapted);
    };
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": async (email, password)=>{
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].login({
                email,
                password
            });
            save(data);
        }
    }["AuthProvider.useCallback[login]"], []);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[register]": async (d)=>{
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].register(d);
            save(data);
        }
    }["AuthProvider.useCallback[register]"], []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": ()=>{
            Object.values(KEYS).forEach({
                "AuthProvider.useCallback[logout]": (k)=>localStorage.removeItem(k)
            }["AuthProvider.useCallback[logout]"]);
            setUser(null);
            router.push("/auth/login");
        }
    }["AuthProvider.useCallback[logout]"], [
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            register,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/labex-front/contexts/auth.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "y9w6FToFnCYKQFUHF/gPnxfNinQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
    return ctx;
}
_s1(useAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/labex-front/contexts/theme.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    theme: "light",
    toggleTheme: ()=>{}
});
const STORAGE_KEY = "@labativo:theme";
function ThemeProvider({ children }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Carrega preferência salva no mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === "dark" || saved === "light") {
                setTheme(saved);
            } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setTheme("dark");
            }
            setMounted(true);
        }
    }["ThemeProvider.useEffect"], []);
    // Aplica a classe no <html>
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            if (!mounted) return;
            const root = document.documentElement;
            if (theme === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
            localStorage.setItem(STORAGE_KEY, theme);
        }
    }["ThemeProvider.useEffect"], [
        theme,
        mounted
    ]);
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ThemeProvider.useCallback[toggleTheme]": ()=>{
            setTheme({
                "ThemeProvider.useCallback[toggleTheme]": (prev)=>prev === "dark" ? "light" : "dark"
            }["ThemeProvider.useCallback[toggleTheme]"]);
        }
    }["ThemeProvider.useCallback[toggleTheme]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/labex-front/contexts/theme.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "QffCKdCn2dgbanvYW09FanyEtT0=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
}
_s1(useTheme, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/labex-front/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AREA_LABELS",
    ()=>AREA_LABELS,
    "STATUS_LABELS",
    ()=>STATUS_LABELS,
    "TYPE_LABELS",
    ()=>TYPE_LABELS,
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const AREA_LABELS = {
    technology: "Tecnologia",
    health: "Saúde",
    education: "Educação",
    environment: "Meio Ambiente",
    law: "Direito",
    arts: "Artes",
    engineering: "Engenharia",
    social: "Social"
};
const STATUS_LABELS = {
    open: "Vagas abertas",
    in_progress: "Em andamento",
    closed: "Encerrado",
    completed: "Concluído"
};
const TYPE_LABELS = {
    article: "Artigo",
    report: "Relatório",
    presentation: "Apresentação",
    thesis: "Monografia"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/labex-front/lib/hooks/useQueries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCancelRequest",
    ()=>useCancelRequest,
    "useCreatePost",
    ()=>useCreatePost,
    "useCreateProject",
    ()=>useCreateProject,
    "useCreatePublication",
    ()=>useCreatePublication,
    "useDashboardPendingRequests",
    ()=>useDashboardPendingRequests,
    "useDashboardProjects",
    ()=>useDashboardProjects,
    "useDashboardRequests",
    ()=>useDashboardRequests,
    "useDashboardStats",
    ()=>useDashboardStats,
    "useDashboardSubscriptions",
    ()=>useDashboardSubscriptions,
    "useDeletePost",
    ()=>useDeletePost,
    "useDeleteProject",
    ()=>useDeleteProject,
    "useDeletePublication",
    ()=>useDeletePublication,
    "useJoinRequest",
    ()=>useJoinRequest,
    "useLeaveProject",
    ()=>useLeaveProject,
    "useMarkNotificationRead",
    ()=>useMarkNotificationRead,
    "useNotifications",
    ()=>useNotifications,
    "useProject",
    ()=>useProject,
    "useProjectJoinRequests",
    ()=>useProjectJoinRequests,
    "useProjectPosts",
    ()=>useProjectPosts,
    "useProjects",
    ()=>useProjects,
    "usePublication",
    ()=>usePublication,
    "usePublications",
    ()=>usePublications,
    "useRemoveMember",
    ()=>useRemoveMember,
    "useReviewRequest",
    ()=>useReviewRequest,
    "useSubscribe",
    ()=>useSubscribe,
    "useSubscribedActivity",
    ()=>useSubscribedActivity,
    "useSubscriptionStatus",
    ()=>useSubscriptionStatus,
    "useUpdateProject",
    ()=>useUpdateProject,
    "useUpdatePublication",
    ()=>useUpdatePublication
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/lib/api/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$adapters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/lib/adapters.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature(), _s14 = __turbopack_context__.k.signature(), _s15 = __turbopack_context__.k.signature(), _s16 = __turbopack_context__.k.signature(), _s17 = __turbopack_context__.k.signature(), _s18 = __turbopack_context__.k.signature(), _s19 = __turbopack_context__.k.signature(), _s20 = __turbopack_context__.k.signature(), _s21 = __turbopack_context__.k.signature(), _s22 = __turbopack_context__.k.signature(), _s23 = __turbopack_context__.k.signature(), _s24 = __turbopack_context__.k.signature(), _s25 = __turbopack_context__.k.signature(), _s26 = __turbopack_context__.k.signature(), _s27 = __turbopack_context__.k.signature(), _s28 = __turbopack_context__.k.signature();
;
;
;
function useProjects(p) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "projects",
            p
        ],
        queryFn: {
            "useProjects.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].list(p);
                return (Array.isArray(data) ? data : []).map(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$adapters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptProject"]);
            }
        }["useProjects.useQuery"],
        staleTime: 60_000 * 2
    });
}
_s(useProjects, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useProject(id) {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "project",
            id
        ],
        queryFn: {
            "useProject.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].byId(id);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$adapters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptProject"])(data);
            }
        }["useProject.useQuery"],
        enabled: !!id
    });
}
_s1(useProject, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreateProject() {
    _s2();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useCreateProject.useMutation": (d)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].create(d)
        }["useCreateProject.useMutation"],
        onSuccess: {
            "useCreateProject.useMutation": ()=>qc.invalidateQueries({
                    queryKey: [
                        "projects"
                    ]
                })
        }["useCreateProject.useMutation"]
    });
}
_s2(useCreateProject, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useUpdateProject() {
    _s3();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useUpdateProject.useMutation": ({ id, data })=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].update(id, data)
        }["useUpdateProject.useMutation"],
        onSuccess: {
            "useUpdateProject.useMutation": (_, { id })=>{
                qc.invalidateQueries({
                    queryKey: [
                        "project",
                        id
                    ]
                });
                qc.invalidateQueries({
                    queryKey: [
                        "projects"
                    ]
                });
            }
        }["useUpdateProject.useMutation"]
    });
}
_s3(useUpdateProject, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useDeleteProject() {
    _s4();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useDeleteProject.useMutation": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].delete(id)
        }["useDeleteProject.useMutation"],
        onSuccess: {
            "useDeleteProject.useMutation": ()=>qc.invalidateQueries({
                    queryKey: [
                        "projects"
                    ]
                })
        }["useDeleteProject.useMutation"]
    });
}
_s4(useDeleteProject, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useLeaveProject() {
    _s5();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLeaveProject.useMutation": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].leave(id)
        }["useLeaveProject.useMutation"],
        onSuccess: {
            "useLeaveProject.useMutation": ()=>{
                qc.invalidateQueries({
                    queryKey: [
                        "projects"
                    ]
                });
                qc.invalidateQueries({
                    queryKey: [
                        "project"
                    ]
                });
                qc.invalidateQueries({
                    queryKey: [
                        "dashboard"
                    ]
                });
            }
        }["useLeaveProject.useMutation"]
    });
}
_s5(useLeaveProject, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useRemoveMember() {
    _s6();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useRemoveMember.useMutation": ({ projectId, userId })=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].removeMember(projectId, userId)
        }["useRemoveMember.useMutation"],
        onSuccess: {
            "useRemoveMember.useMutation": (_, { projectId })=>{
                qc.invalidateQueries({
                    queryKey: [
                        "project",
                        projectId
                    ]
                });
                qc.invalidateQueries({
                    queryKey: [
                        "projects"
                    ]
                });
                qc.invalidateQueries({
                    queryKey: [
                        "dashboard"
                    ]
                });
            }
        }["useRemoveMember.useMutation"]
    });
}
_s6(useRemoveMember, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSubscriptionStatus(projectId, enabled = true) {
    _s7();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "subscription",
            projectId
        ],
        queryFn: {
            "useSubscriptionStatus.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].subscriptionStatus(projectId);
                return data;
            }
        }["useSubscriptionStatus.useQuery"],
        enabled: !!projectId && enabled
    });
}
_s7(useSubscriptionStatus, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useSubscribe() {
    _s8();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSubscribe.useMutation": ({ id, subscribed })=>subscribed ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].unsubscribe(id) : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].subscribe(id)
        }["useSubscribe.useMutation"],
        onSuccess: {
            "useSubscribe.useMutation": (_, { id })=>{
                qc.invalidateQueries({
                    queryKey: [
                        "subscription",
                        id
                    ]
                });
                qc.invalidateQueries({
                    queryKey: [
                        "dashboard"
                    ]
                });
            }
        }["useSubscribe.useMutation"]
    });
}
_s8(useSubscribe, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useJoinRequest() {
    _s9();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useJoinRequest.useMutation": ({ id, data })=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].joinRequest(id, data)
        }["useJoinRequest.useMutation"],
        onSuccess: {
            "useJoinRequest.useMutation": ()=>{
                qc.invalidateQueries({
                    queryKey: [
                        "dashboard"
                    ]
                });
                qc.invalidateQueries({
                    queryKey: [
                        "member-requests"
                    ]
                });
            }
        }["useJoinRequest.useMutation"]
    });
}
_s9(useJoinRequest, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useProjectJoinRequests(projectId, enabled = true) {
    _s10();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "join-requests",
            projectId
        ],
        queryFn: {
            "useProjectJoinRequests.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].joinRequests(projectId);
                return Array.isArray(data) ? data.map(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$adapters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptRequest"]) : [];
            }
        }["useProjectJoinRequests.useQuery"],
        enabled: !!projectId && enabled
    });
}
_s10(useProjectJoinRequests, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useReviewRequest() {
    _s11();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useReviewRequest.useMutation": ({ id, status })=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memberRequestsApi"].review(id, {
                    status
                })
        }["useReviewRequest.useMutation"],
        onSuccess: {
            "useReviewRequest.useMutation": ()=>{
                qc.invalidateQueries({
                    queryKey: [
                        "join-requests"
                    ]
                });
                qc.invalidateQueries({
                    queryKey: [
                        "dashboard"
                    ]
                });
                qc.invalidateQueries({
                    queryKey: [
                        "projects"
                    ]
                });
            }
        }["useReviewRequest.useMutation"]
    });
}
_s11(useReviewRequest, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useCancelRequest() {
    _s12();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useCancelRequest.useMutation": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memberRequestsApi"].cancel(id)
        }["useCancelRequest.useMutation"],
        onSuccess: {
            "useCancelRequest.useMutation": ()=>{
                qc.invalidateQueries({
                    queryKey: [
                        "dashboard"
                    ]
                });
            }
        }["useCancelRequest.useMutation"]
    });
}
_s12(useCancelRequest, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useProjectPosts(projectId, page = 1) {
    _s13();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "posts",
            projectId,
            page
        ],
        queryFn: {
            "useProjectPosts.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].posts(projectId, {
                    page
                });
                return data;
            }
        }["useProjectPosts.useQuery"],
        enabled: !!projectId
    });
}
_s13(useProjectPosts, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreatePost() {
    _s14();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useCreatePost.useMutation": ({ projectId, data })=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectsApi"].createPost(projectId, data)
        }["useCreatePost.useMutation"],
        onSuccess: {
            "useCreatePost.useMutation": (_, { projectId })=>{
                qc.invalidateQueries({
                    queryKey: [
                        "posts",
                        projectId
                    ]
                });
                qc.invalidateQueries({
                    queryKey: [
                        "project",
                        projectId
                    ]
                });
            }
        }["useCreatePost.useMutation"]
    });
}
_s14(useCreatePost, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useDeletePost() {
    _s15();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useDeletePost.useMutation": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postsApi"].delete(id)
        }["useDeletePost.useMutation"],
        onSuccess: {
            "useDeletePost.useMutation": ()=>qc.invalidateQueries({
                    queryKey: [
                        "posts"
                    ]
                })
        }["useDeletePost.useMutation"]
    });
}
_s15(useDeletePost, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function usePublications(p) {
    _s16();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "publications",
            p
        ],
        queryFn: {
            "usePublications.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicationsApi"].list(p);
                return (Array.isArray(data) ? data : []).map(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$adapters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptPublication"]);
            }
        }["usePublications.useQuery"],
        staleTime: 60_000 * 5
    });
}
_s16(usePublications, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function usePublication(id) {
    _s17();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "publication",
            id
        ],
        queryFn: {
            "usePublication.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicationsApi"].byId(id);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$adapters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptPublication"])(data);
            }
        }["usePublication.useQuery"],
        enabled: !!id
    });
}
_s17(usePublication, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreatePublication() {
    _s18();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useCreatePublication.useMutation": (d)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicationsApi"].create(d)
        }["useCreatePublication.useMutation"],
        onSuccess: {
            "useCreatePublication.useMutation": ()=>qc.invalidateQueries({
                    queryKey: [
                        "publications"
                    ]
                })
        }["useCreatePublication.useMutation"]
    });
}
_s18(useCreatePublication, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useUpdatePublication() {
    _s19();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useUpdatePublication.useMutation": ({ id, data })=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicationsApi"].update(id, data)
        }["useUpdatePublication.useMutation"],
        onSuccess: {
            "useUpdatePublication.useMutation": (_, { id })=>{
                qc.invalidateQueries({
                    queryKey: [
                        "publication",
                        id
                    ]
                });
                qc.invalidateQueries({
                    queryKey: [
                        "publications"
                    ]
                });
            }
        }["useUpdatePublication.useMutation"]
    });
}
_s19(useUpdatePublication, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useDeletePublication() {
    _s20();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useDeletePublication.useMutation": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicationsApi"].delete(id)
        }["useDeletePublication.useMutation"],
        onSuccess: {
            "useDeletePublication.useMutation": ()=>qc.invalidateQueries({
                    queryKey: [
                        "publications"
                    ]
                })
        }["useDeletePublication.useMutation"]
    });
}
_s20(useDeletePublication, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useDashboardStats() {
    _s21();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "dashboard",
            "stats"
        ],
        queryFn: {
            "useDashboardStats.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardApi"].stats();
                return data;
            }
        }["useDashboardStats.useQuery"]
    });
}
_s21(useDashboardStats, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useDashboardProjects(enabled = true) {
    _s22();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "dashboard",
            "projects"
        ],
        queryFn: {
            "useDashboardProjects.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardApi"].myProjects();
                return Array.isArray(data) ? data.map(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$adapters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptProject"]) : [];
            }
        }["useDashboardProjects.useQuery"],
        enabled
    });
}
_s22(useDashboardProjects, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useDashboardRequests() {
    _s23();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "dashboard",
            "requests"
        ],
        queryFn: {
            "useDashboardRequests.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardApi"].myRequests();
                return Array.isArray(data) ? data.map(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$adapters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptRequest"]) : [];
            }
        }["useDashboardRequests.useQuery"]
    });
}
_s23(useDashboardRequests, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useDashboardPendingRequests() {
    _s24();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "dashboard",
            "pending-requests"
        ],
        queryFn: {
            "useDashboardPendingRequests.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardApi"].pendingRequests();
                return Array.isArray(data) ? data.map(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$adapters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptRequest"]) : [];
            }
        }["useDashboardPendingRequests.useQuery"]
    });
}
_s24(useDashboardPendingRequests, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useDashboardSubscriptions() {
    _s25();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "dashboard",
            "subscriptions"
        ],
        queryFn: {
            "useDashboardSubscriptions.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardApi"].subscriptions();
                return Array.isArray(data) ? data : [];
            }
        }["useDashboardSubscriptions.useQuery"]
    });
}
_s25(useDashboardSubscriptions, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useSubscribedActivity(enabled = true) {
    _s26();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "dashboard",
            "subscribed-activity"
        ],
        queryFn: {
            "useSubscribedActivity.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardApi"].subscribedActivity();
                return data;
            }
        }["useSubscribedActivity.useQuery"],
        enabled,
        staleTime: 60_000
    });
}
_s26(useSubscribedActivity, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useNotifications(enabled = true) {
    _s27();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "notifications"
        ],
        queryFn: {
            "useNotifications.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationsApi"].list();
                return Array.isArray(data) ? data : [];
            }
        }["useNotifications.useQuery"],
        enabled,
        staleTime: 30_000,
        retry: false
    });
}
_s27(useNotifications, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useMarkNotificationRead() {
    _s28();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useMarkNotificationRead.useMutation": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationsApi"].markRead(id)
        }["useMarkNotificationRead.useMutation"],
        onSuccess: {
            "useMarkNotificationRead.useMutation": ()=>qc.invalidateQueries({
                    queryKey: [
                        "notifications"
                    ]
                })
        }["useMarkNotificationRead.useMutation"]
    });
}
_s28(useMarkNotificationRead, "ec0A66mtyLA0kdwNsMUsaWj/EHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/labex-front/components/layout/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellDot$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/bell-dot.js [app-client] (ecmascript) <export default as BellDot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/flask-conical.js [app-client] (ecmascript) <export default as FlaskConical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/log-in.js [app-client] (ecmascript) <export default as LogIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/circle-user.js [app-client] (ecmascript) <export default as UserCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$contexts$2f$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/contexts/auth.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$contexts$2f$theme$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/contexts/theme.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/labex-front/lib/hooks/useQueries.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const NAV = [
    {
        href: "/",
        label: "Início"
    },
    {
        href: "/projetos",
        label: "Projetos"
    },
    {
        href: "/publicacoes",
        label: "Publicações"
    }
];
const NOTIF_SEEN_KEY = "@labativo:notif_seen_at";
const NOTIF_DISMISSED_KEY = "@labativo:notif_dismissed_ids";
function getSeenAt() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem(NOTIF_SEEN_KEY);
}
function setSeenAt(iso) {
    if ("TURBOPACK compile-time truthy", 1) localStorage.setItem(NOTIF_SEEN_KEY, iso);
}
function getDismissedIds() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return JSON.parse(localStorage.getItem(NOTIF_DISMISSED_KEY) ?? "[]");
    } catch  {
        return [];
    }
}
function addDismissedId(id) {
    const ids = getDismissedIds();
    if (!ids.includes(id)) {
        ids.push(id);
        localStorage.setItem(NOTIF_DISMISSED_KEY, JSON.stringify(ids));
    }
}
function NotificationBell() {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dismissedIds, setDismissedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [seenAt, _setSeenAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data: pending = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardPendingRequests"])();
    const { data: activity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscribedActivity"])(true);
    const { data: subscriptions = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardSubscriptions"])();
    const { data: systemNotifs = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"])(true);
    // Carrega estado persistido no mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationBell.useEffect": ()=>{
            _setSeenAt(getSeenAt());
            setDismissedIds(getDismissedIds());
        }
    }["NotificationBell.useEffect"], []);
    const pendingCount = Array.isArray(pending) ? pending.length : 0;
    // Filtra atividade para mostrar apenas itens criados APÓS a inscrição do usuário naquele projeto
    const subDateMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NotificationBell.useMemo[subDateMap]": ()=>{
            const map = {};
            (Array.isArray(subscriptions) ? subscriptions : []).forEach({
                "NotificationBell.useMemo[subDateMap]": (s)=>{
                    if (s.projectId && (s.subscribedAt || s.createdAt)) {
                        map[s.projectId] = s.subscribedAt ?? s.createdAt;
                    }
                }
            }["NotificationBell.useMemo[subDateMap]"]);
            return map;
        }
    }["NotificationBell.useMemo[subDateMap]"], [
        subscriptions
    ]);
    const activityPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NotificationBell.useMemo[activityPosts]": ()=>{
            return (activity?.posts ?? []).filter({
                "NotificationBell.useMemo[activityPosts]": (post)=>{
                    const subDate = subDateMap[post.projectId];
                    if (!subDate || !post.createdAt) return true;
                    return new Date(post.createdAt) >= new Date(subDate);
                }
            }["NotificationBell.useMemo[activityPosts]"]);
        }
    }["NotificationBell.useMemo[activityPosts]"], [
        activity?.posts,
        subDateMap
    ]);
    const activityPubs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NotificationBell.useMemo[activityPubs]": ()=>{
            return (activity?.publications ?? []).filter({
                "NotificationBell.useMemo[activityPubs]": (pub)=>{
                    const subDate = subDateMap[pub.projectId];
                    if (!subDate || !pub.createdAt) return true;
                    return new Date(pub.createdAt) >= new Date(subDate);
                }
            }["NotificationBell.useMemo[activityPubs]"]);
        }
    }["NotificationBell.useMemo[activityPubs]"], [
        activity?.publications,
        subDateMap
    ]);
    // Filtra itens já dispensados individualmente
    const visiblePending = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NotificationBell.useMemo[visiblePending]": ()=>{
            const arr = Array.isArray(pending) ? pending : [];
            return arr.filter({
                "NotificationBell.useMemo[visiblePending]": (r)=>!dismissedIds.includes(r.id)
            }["NotificationBell.useMemo[visiblePending]"]);
        }
    }["NotificationBell.useMemo[visiblePending]"], [
        pending,
        dismissedIds
    ]);
    const visiblePosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NotificationBell.useMemo[visiblePosts]": ()=>activityPosts.filter({
                "NotificationBell.useMemo[visiblePosts]": (p)=>!dismissedIds.includes(p.id)
            }["NotificationBell.useMemo[visiblePosts]"])
    }["NotificationBell.useMemo[visiblePosts]"], [
        activityPosts,
        dismissedIds
    ]);
    const visiblePubs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NotificationBell.useMemo[visiblePubs]": ()=>activityPubs.filter({
                "NotificationBell.useMemo[visiblePubs]": (p)=>!dismissedIds.includes(p.id)
            }["NotificationBell.useMemo[visiblePubs]"])
    }["NotificationBell.useMemo[visiblePubs]"], [
        activityPubs,
        dismissedIds
    ]);
    // Notificações do sistema (leave, remove, aceitação, etc.)
    const visibleSystemNotifs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NotificationBell.useMemo[visibleSystemNotifs]": ()=>{
            const arr = Array.isArray(systemNotifs) ? systemNotifs : [];
            return arr.filter({
                "NotificationBell.useMemo[visibleSystemNotifs]": (n)=>!dismissedIds.includes(n.id) && !n.read
            }["NotificationBell.useMemo[visibleSystemNotifs]"]);
        }
    }["NotificationBell.useMemo[visibleSystemNotifs]"], [
        systemNotifs,
        dismissedIds
    ]);
    // Conta apenas notificações NOVAS (após o último "seen") para o badge
    const unseenCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NotificationBell.useMemo[unseenCount]": ()=>{
            if (!seenAt) return visiblePending.length + visiblePosts.length + visiblePubs.length + visibleSystemNotifs.length;
            const threshold = new Date(seenAt);
            const newPending = visiblePending.filter({
                "NotificationBell.useMemo[unseenCount].newPending": (r)=>!r.createdAt || new Date(r.createdAt) > threshold
            }["NotificationBell.useMemo[unseenCount].newPending"]);
            const newPosts = visiblePosts.filter({
                "NotificationBell.useMemo[unseenCount].newPosts": (p)=>!p.createdAt || new Date(p.createdAt) > threshold
            }["NotificationBell.useMemo[unseenCount].newPosts"]);
            const newPubs = visiblePubs.filter({
                "NotificationBell.useMemo[unseenCount].newPubs": (p)=>!p.createdAt || new Date(p.createdAt) > threshold
            }["NotificationBell.useMemo[unseenCount].newPubs"]);
            const newSystem = visibleSystemNotifs.filter({
                "NotificationBell.useMemo[unseenCount].newSystem": (n)=>!n.createdAt || new Date(n.createdAt) > threshold
            }["NotificationBell.useMemo[unseenCount].newSystem"]);
            return newPending.length + newPosts.length + newPubs.length + newSystem.length;
        }
    }["NotificationBell.useMemo[unseenCount]"], [
        seenAt,
        visiblePending,
        visiblePosts,
        visiblePubs,
        visibleSystemNotifs
    ]);
    const totalVisible = visiblePending.length + visiblePosts.length + visiblePubs.length + visibleSystemNotifs.length;
    const showBadge = unseenCount > 0;
    // Fecha ao clicar fora
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationBell.useEffect": ()=>{
            function handler(e) {
                if (ref.current && !ref.current.contains(e.target)) setOpen(false);
            }
            document.addEventListener("mousedown", handler);
            return ({
                "NotificationBell.useEffect": ()=>document.removeEventListener("mousedown", handler)
            })["NotificationBell.useEffect"];
        }
    }["NotificationBell.useEffect"], []);
    const handleToggle = ()=>{
        const willOpen = !open;
        setOpen(willOpen);
        if (willOpen) {
            // Marca tudo como "visto" — badge zera e persiste
            const now = new Date().toISOString();
            setSeenAt(now);
            _setSeenAt(now);
        }
    };
    const handleDismiss = (id)=>{
        addDismissedId(id);
        setDismissedIds((prev)=>[
                ...prev,
                id
            ]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleToggle,
                className: "relative p-2 rounded-lg text-neutral-400 hover:text-brand-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all",
                title: "Notificações",
                children: [
                    showBadge ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellDot$3e$__["BellDot"], {
                        size: 17,
                        className: "text-brand-600"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                        lineNumber: 143,
                        columnNumber: 22
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                        size: 17
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                        lineNumber: 143,
                        columnNumber: 73
                    }, this),
                    showBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center leading-none",
                        children: unseenCount > 9 ? "9+" : unseenCount
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-full mt-2 w-80 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl z-50 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-neutral-100 dark:border-neutral-700 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-display font-bold text-sm text-neutral-800 dark:text-neutral-100",
                                children: "Notificações"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpen(false),
                                className: "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-96 overflow-y-auto",
                        children: totalVisible === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-6 text-center text-sm text-neutral-400",
                            children: "Nenhuma notificação por enquanto"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                            lineNumber: 161,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                visiblePending.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-4 py-2 bg-brand-50 border-b border-brand-100 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                    size: 12,
                                                    className: "text-brand-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-semibold text-brand-700",
                                                    children: [
                                                        visiblePending.length,
                                                        " solicitação",
                                                        visiblePending.length !== 1 ? "ões" : "",
                                                        " pendente",
                                                        visiblePending.length !== 1 ? "s" : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 169,
                                            columnNumber: 21
                                        }, this),
                                        visiblePending.slice(0, 4).map((req)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/dashboard",
                                                        onClick: ()=>setOpen(false),
                                                        className: "flex items-start gap-3 flex-1 min-w-0",
                                                        children: [
                                                            req.user?.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: req.user.avatar,
                                                                alt: req.user.name ?? "",
                                                                className: "w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[11px] font-bold text-brand-700",
                                                                    children: req.user?.name?.[0]?.toUpperCase() ?? "?"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                    lineNumber: 186,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-neutral-800 truncate",
                                                                        children: [
                                                                            req.user?.name ?? "Usuário",
                                                                            " quer entrar em"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                        lineNumber: 192,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-neutral-500 truncate",
                                                                        children: req.project?.title ?? "seu projeto"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                        lineNumber: 195,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                lineNumber: 191,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleDismiss(req.id),
                                                        className: "flex-shrink-0 p-1 rounded-md text-neutral-300 hover:text-neutral-600 hover:bg-neutral-100 transition-colors",
                                                        title: "Dispensar",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                            lineNumber: 199,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, req.id, true, {
                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                lineNumber: 176,
                                                columnNumber: 23
                                            }, this)),
                                        visiblePending.length > 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard",
                                            onClick: ()=>setOpen(false),
                                            className: "block px-4 py-2 text-xs text-center text-brand-600 hover:bg-brand-50 transition-colors font-semibold border-b border-neutral-100",
                                            children: [
                                                "Ver todas as ",
                                                visiblePending.length,
                                                " solicitações →"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 204,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true),
                                visiblePosts.length + visiblePubs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-4 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                    size: 12,
                                                    className: "text-emerald-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-semibold text-emerald-700",
                                                    children: "Novidades nos projetos que você acompanha"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 215,
                                            columnNumber: 21
                                        }, this),
                                        visiblePosts.slice(0, 3).map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/projetos/${post.projectId}`,
                                                        onClick: ()=>setOpen(false),
                                                        className: "flex items-start gap-3 flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                    size: 12,
                                                                    className: "text-emerald-700"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                    lineNumber: 229,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                lineNumber: 228,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-neutral-800 line-clamp-1",
                                                                        children: post.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                        lineNumber: 232,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-neutral-500 truncate",
                                                                        children: [
                                                                            "Atualização em ",
                                                                            post.project?.title
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                        lineNumber: 233,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                lineNumber: 231,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleDismiss(post.id),
                                                        className: "flex-shrink-0 p-1 rounded-md text-neutral-300 hover:text-neutral-600 hover:bg-neutral-100 transition-colors",
                                                        title: "Dispensar",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, post.id, true, {
                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                lineNumber: 222,
                                                columnNumber: 23
                                            }, this)),
                                        visiblePubs.slice(0, 2).map((pub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/publicacoes",
                                                        onClick: ()=>setOpen(false),
                                                        className: "flex items-start gap-3 flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-bold text-amber-700",
                                                                    children: "PUB"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                    lineNumber: 249,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                lineNumber: 248,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-neutral-800 line-clamp-1",
                                                                        children: pub.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                        lineNumber: 252,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-neutral-500 truncate",
                                                                        children: [
                                                                            "Nova publicação em ",
                                                                            pub.project?.title
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                        lineNumber: 253,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                lineNumber: 251,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleDismiss(pub.id),
                                                        className: "flex-shrink-0 p-1 rounded-md text-neutral-300 hover:text-neutral-600 hover:bg-neutral-100 transition-colors",
                                                        title: "Dispensar",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, pub.id, true, {
                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                lineNumber: 242,
                                                columnNumber: 23
                                            }, this))
                                    ]
                                }, void 0, true),
                                visibleSystemNotifs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-4 py-2 bg-violet-50 border-b border-violet-100 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                    size: 12,
                                                    className: "text-violet-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-semibold text-violet-700",
                                                    children: "Avisos do sistema"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 267,
                                            columnNumber: 21
                                        }, this),
                                        visibleSystemNotifs.slice(0, 5).map((notif)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: notif.projectId ? `/projetos/${notif.projectId}` : notif.project?.id ? `/projetos/${notif.project.id}` : "/dashboard",
                                                        onClick: ()=>setOpen(false),
                                                        className: "flex items-start gap-3 flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5", notif.type === "REQUEST_ACCEPTED" ? "bg-green-100" : notif.type === "MEMBER_REMOVED" ? "bg-red-100" : "bg-violet-100"),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[10px] font-bold", notif.type === "REQUEST_ACCEPTED" ? "text-green-700" : notif.type === "MEMBER_REMOVED" ? "text-red-700" : "text-violet-700"),
                                                                    children: notif.type === "REQUEST_ACCEPTED" ? "✓" : notif.type === "MEMBER_REMOVED" ? "✕" : "!"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-semibold text-neutral-800 line-clamp-2",
                                                                        children: notif.message
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                        lineNumber: 296,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    notif.createdAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[10px] text-neutral-400 mt-0.5",
                                                                        children: new Date(notif.createdAt).toLocaleDateString("pt-BR")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                        lineNumber: 298,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                                lineNumber: 295,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleDismiss(notif.id),
                                                        className: "flex-shrink-0 p-1 rounded-md text-neutral-300 hover:text-neutral-600 hover:bg-neutral-100 transition-colors",
                                                        title: "Dispensar",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, notif.id, true, {
                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                lineNumber: 274,
                                                columnNumber: 23
                                            }, this))
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                lineNumber: 152,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s(NotificationBell, "jsHGZJZ+IcJAMRD9LARSG3kvdcA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardPendingRequests"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubscribedActivity"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardSubscriptions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$hooks$2f$useQueries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"]
    ];
});
_c = NotificationBell;
function Navbar() {
    _s1();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, isAuthenticated, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$contexts$2f$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$contexts$2f$theme$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const initials = user?.name?.split(" ").slice(0, 2).map((n)=>n[0]).join("").toUpperCase() ?? "??";
    const firstName = user?.name?.split(" ")[0];
    const isActive = (href)=>href === "/" ? pathname === "/" : pathname.startsWith(href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 transition-colors duration-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between h-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-2.5 group flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shadow-md shadow-brand/30 group-hover:bg-brand-700 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                                        size: 16,
                                        className: "text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                        lineNumber: 339,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                    lineNumber: 338,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-display font-bold text-neutral-900 dark:text-neutral-100 text-[15px] tracking-tight hidden sm:block",
                                    children: [
                                        "Laboratório",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-brand-600 dark:text-brand-400",
                                            children: " Ativo"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 342,
                                            columnNumber: 26
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-display font-bold text-neutral-900 dark:text-neutral-100 text-[15px] tracking-tight sm:hidden",
                                    children: [
                                        "Lab",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-brand-600 dark:text-brand-400",
                                            children: "Ativo"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 345,
                                            columnNumber: 18
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                    lineNumber: 344,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                            lineNumber: 337,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden md:flex items-center gap-1",
                            children: [
                                NAV.map(({ href, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: href,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-4 py-2 rounded-lg text-sm font-medium transition-all", isActive(href) ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"),
                                        children: label
                                    }, href, false, {
                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                        lineNumber: 352,
                                        columnNumber: 15
                                    }, this)),
                                isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-4 py-2 rounded-lg text-sm font-medium transition-all", isActive("/dashboard") ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"),
                                    children: "Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                    lineNumber: 358,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                            lineNumber: 350,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: toggleTheme,
                                    className: "p-2 rounded-lg text-neutral-400 hover:text-brand-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all",
                                    title: theme === "dark" ? "Modo claro" : "Modo escuro",
                                    children: theme === "dark" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                        size: 17
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                        lineNumber: 373,
                                        columnNumber: 35
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                        size: 17
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                        lineNumber: 373,
                                        columnNumber: 55
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                    lineNumber: 368,
                                    columnNumber: 13
                                }, this),
                                isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotificationBell, {}, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 377,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/perfil",
                                            className: "p-2 rounded-lg text-neutral-400 hover:text-brand-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all",
                                            title: "Configurações",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                size: 17
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                lineNumber: 379,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 378,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-px h-5 bg-neutral-200 dark:bg-neutral-700"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 381,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard",
                                            className: "flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all",
                                            children: [
                                                user?.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: user.avatar,
                                                    alt: user.name ?? "",
                                                    className: "w-7 h-7 rounded-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                    lineNumber: 384,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-bold text-brand-700 dark:text-brand-300",
                                                        children: initials
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                    lineNumber: 386,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium text-neutral-700 dark:text-neutral-300",
                                                    children: firstName
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 382,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: logout,
                                            className: "p-2 rounded-lg text-neutral-400 hover:text-danger-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all",
                                            title: "Sair",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                size: 17
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                lineNumber: 393,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/auth/login",
                                            className: "px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all",
                                            children: "Entrar"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 398,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/auth/register",
                                            className: "px-4 py-2 rounded-xl text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 transition-all shadow-sm",
                                            children: "Cadastrar"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 399,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                    lineNumber: 397,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                            lineNumber: 366,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "md:hidden p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                            onClick: ()=>setOpen(!open),
                            children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                lineNumber: 405,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                lineNumber: 405,
                                columnNumber: 39
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                    lineNumber: 334,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 flex flex-col gap-1 transition-colors duration-200",
                children: [
                    NAV.map(({ href, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: href,
                            onClick: ()=>setOpen(false),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-4 py-2.5 rounded-xl text-sm font-medium transition-all", isActive(href) ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"),
                            children: label
                        }, href, false, {
                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                            lineNumber: 413,
                            columnNumber: 13
                        }, this)),
                    isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                onClick: ()=>setOpen(false),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all", isActive("/dashboard") ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"], {
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                        lineNumber: 424,
                                        columnNumber: 17
                                    }, this),
                                    " Dashboard"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                lineNumber: 421,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/perfil",
                                onClick: ()=>setOpen(false),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all", isActive("/perfil") ? "bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300" : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                        lineNumber: 429,
                                        columnNumber: 17
                                    }, this),
                                    " Configurações"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                lineNumber: 426,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleTheme,
                        className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all",
                        children: [
                            theme === "dark" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                size: 15
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                lineNumber: 438,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                size: 15
                            }, void 0, false, {
                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                lineNumber: 438,
                                columnNumber: 53
                            }, this),
                            theme === "dark" ? "Modo claro" : "Modo escuro"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                        lineNumber: 434,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-2 border-t border-neutral-100 mt-1 flex flex-col gap-1",
                        children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 px-4 py-2.5",
                                    children: [
                                        user?.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: user.avatar,
                                            alt: user?.name ?? "",
                                            className: "w-8 h-8 rounded-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 446,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-brand-700",
                                                children: initials
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                lineNumber: 449,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 448,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-semibold text-neutral-800",
                                                    children: user?.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-neutral-400",
                                                    children: user?.role === "professor" ? "Professor" : "Aluno"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 452,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                    lineNumber: 444,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setOpen(false);
                                        logout();
                                    },
                                    className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-danger-500 hover:bg-danger-50 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                            size: 15
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 459,
                                            columnNumber: 19
                                        }, this),
                                        " Sair"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                    lineNumber: 457,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/auth/login",
                                    onClick: ()=>setOpen(false),
                                    className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                                            size: 15
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 465,
                                            columnNumber: 19
                                        }, this),
                                        " Entrar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                    lineNumber: 464,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/auth/register",
                                    onClick: ()=>setOpen(false),
                                    className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-brand-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__["UserCircle"], {
                                            size: 15
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                            lineNumber: 468,
                                            columnNumber: 19
                                        }, this),
                                        " Cadastrar"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                                    lineNumber: 467,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                        lineNumber: 441,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
                lineNumber: 411,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/labex-front/components/layout/Navbar.tsx",
        lineNumber: 332,
        columnNumber: 5
    }, this);
}
_s1(Navbar, "ZwKqBCyvj4VyIC233n6OSfl+C/I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$contexts$2f$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$labex$2d$front$2f$contexts$2f$theme$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c1 = Navbar;
var _c, _c1;
__turbopack_context__.k.register(_c, "NotificationBell");
__turbopack_context__.k.register(_c1, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_labex-front_82840130._.js.map