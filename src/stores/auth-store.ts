import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";

type AuthState = {
  token: string | null;
  user: User | null;
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
};

/**
 * Estado global de autenticação (estado do cliente).
 * Dados vindos da API (saldo, produtos, extrato...) devem ficar no TanStack Query, não aqui.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    { name: "investfacil-auth" },
  ),
);

export const selectIsAuthenticated = (state: AuthState) => state.token !== null;
