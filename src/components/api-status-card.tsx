"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApiHealth } from "@/hooks/use-api-health";

export function ApiStatusCard() {
  const { data, isPending, isError, refetch, isFetching } = useApiHealth();

  const status = isPending ? "Verificando..." : isError ? "Offline" : (data?.status ?? "Online");

  async function handleRefetch() {
    const result = await refetch();
    if (result.isError) toast.error("Não foi possível conectar ao back-end.");
    else toast.success("Back-end respondeu com sucesso.");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status da API</CardTitle>
        <CardDescription>{process.env.NEXT_PUBLIC_API_URL}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <span className={isError ? "text-destructive font-medium" : "font-medium"}>{status}</span>
        <Button variant="outline" onClick={handleRefetch} disabled={isFetching}>
          Testar conexão
        </Button>
      </CardContent>
    </Card>
  );
}
