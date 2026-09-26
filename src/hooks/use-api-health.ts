import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api-client";

type HealthResponse = { status: string };

/** Exemplo de query com TanStack Query: verifica se o back-end está no ar. */
export function useApiHealth() {
  return useQuery({
    queryKey: ["api-health"],
    queryFn: () => api.get<HealthResponse>("/actuator/health"),
    retry: false,
  });
}
