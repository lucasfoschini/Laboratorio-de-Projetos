"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/axios";
import { adaptUser } from "@/lib/adapters";
import type { User } from "@/types";

// Apenas o user é persistido no localStorage — tokens trafegam via cookies HttpOnly
const KEYS = { user: "@labativo:user" };

interface UpdateProfileData {
  name?: string; department?: string; institution?: string;
  avatar?: string; bio?: string; linkedin?: string; github?: string; phone?: string;
}

// O backend seta accessToken e refreshToken como cookies HttpOnly no login/refresh
interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: "ALUNO" | "PROFESSOR";
    department?: string | null;
    institution?: string | null;
    avatar?: string | null;
    bio?: string | null;
    linkedin?: string | null;
    github?: string | null;
    phone?: string | null;
    createdAt: string;
  };
}

interface AuthContextType {
  user: User | null; isLoading: boolean; isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (d: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (d: UpdateProfileData) => Promise<void>;
}

interface RegisterData { name: string; email: string; password: string; role: "ALUNO"|"PROFESSOR"; institution?: string; department?: string; }

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const stored = localStorage.getItem(KEYS.user);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(KEYS.user); // limpa dado corrompido em vez de silenciar
      }
    }
    setIsLoading(false);
  }, []);

  const save = (data: AuthResponse) => {
    const adapted = adaptUser(data.user);
    localStorage.setItem(KEYS.user, JSON.stringify(adapted));
    setUser(adapted);
  };

  const login    = useCallback(async (email: string, password: string) => { const { data } = await authApi.login({ email, password }); save(data); }, []);
  const register = useCallback(async (d: RegisterData) => { const { data } = await authApi.register(d); save(data); }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout(); // POST /auth/logout — limpa cookies no servidor
    } catch {
      // ignora falha de rede no logout
    } finally {
      queryClient.clear(); // limpa todo o cache do React Query ao trocar de conta
      localStorage.removeItem(KEYS.user);
      setUser(null);
      window.location.href = "/auth/login";
    }
  }, [router, queryClient]);

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
