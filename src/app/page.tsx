import { ApiStatusCard } from "@/components/api-status-card";

const stack = [
  { label: "Framework", value: "Next.js (App Router) + TypeScript" },
  { label: "Estado do servidor", value: "TanStack Query" },
  { label: "Estado do cliente", value: "Zustand" },
  { label: "UI", value: "Tailwind CSS + shadcn/ui" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">InvestFácil</h1>
        <p className="text-muted-foreground">
          Plataforma acadêmica de investimentos — CDBs, Tesouro Direto e Fundos.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {stack.map((item) => (
          <div key={item.label} className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="font-medium">{item.value}</p>
          </div>
        ))}
      </section>

      <ApiStatusCard />
    </main>
  );
}
