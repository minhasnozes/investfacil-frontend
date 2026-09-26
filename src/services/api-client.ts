import { useAuthStore } from "@/stores/auth-store";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

/**
 * Wrapper de fetch para a API do back-end.
 * - Prefixa a URL base (NEXT_PUBLIC_API_URL)
 * - Serializa o body em JSON
 * - Envia o token JWT do auth-store, se existir
 * - Lança ApiError em respostas não-2xx (o TanStack Query trata como erro)
 */
export async function apiFetch<T>(path: string, { body, headers, ...init }: RequestOptions = {}): Promise<T> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      // Content-Type só quando há body: em GET ele forçaria um preflight CORS desnecessário
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) useAuthStore.getState().clearSession();
    const message = (data as { message?: string } | null)?.message ?? `Erro ${response.status}`;
    throw new ApiError(response.status, message, data);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, init?: RequestOptions) => apiFetch<T>(path, { ...init, method: "GET" }),
  post: <T>(path: string, body?: unknown, init?: RequestOptions) =>
    apiFetch<T>(path, { ...init, method: "POST", body }),
  put: <T>(path: string, body?: unknown, init?: RequestOptions) =>
    apiFetch<T>(path, { ...init, method: "PUT", body }),
  delete: <T>(path: string, init?: RequestOptions) => apiFetch<T>(path, { ...init, method: "DELETE" }),
};
