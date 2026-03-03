"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/axios";
import { adaptUser } from "@/lib/adapters";
import type { User } from "@/types";

const KEYS = { access: "@labativo:access_token", refresh: "@labativo:refresh_token", user: "@labativo:user" };

interface UpdateProfileData {
  name?: string; department?: string; institution?: string;
  avatar?: string; bio?: string; linkedin?: string; github?: string; phone?: string;
}

interface AuthContextType {
  user: User | null; isLoading: boolean; isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (d: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (d: UpdateProfileData) => Promise<void>; // ← novo
}

interface RegisterData { name: string; email: string; password: string; role: "ALUNO"|"PROFESSOR"; institution?: string; department?: string; }

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem(KEYS.user);
    const token  = localStorage.getItem(KEYS.access);
    if (stored && token) { try { setUser(JSON.parse(stored)); } catch {} }
    setIsLoading(false);
  }, []);

  const save = (data: any) => {
    const adapted = adaptUser(data.user);
    localStorage.setItem(KEYS.access,  data.accessToken);
    localStorage.setItem(KEYS.refresh, data.refreshToken);
    localStorage.setItem(KEYS.user,    JSON.stringify(adapted));
    setUser(adapted);
  };

  const login    = useCallback(async (email: string, password: string) => { const { data } = await authApi.login({ email, password }); save(data); }, []);
  const register = useCallback(async (d: RegisterData) => { const { data } = await authApi.register(d); save(data); }, []);
  const logout   = useCallback(() => {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
    setUser(null);
    router.push("/auth/login");
  }, [router]);

  const updateProfile = useCallback(async (d: UpdateProfileData) => {
    const { data } = await authApi.updateMe(d);
    const adapted = adaptUser(data);
    // Atualiza localStorage sem mexer nos tokens
    localStorage.setItem(KEYS.user, JSON.stringify(adapted));
    setUser(adapted);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
