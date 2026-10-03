@AGENTS.md

# InvestFácil — Frontend

Next.js 16 (App Router) + React 19 + TypeScript, Tailwind 4 + shadcn (`src/components/ui`), TanStack Query para dados do servidor, Zustand para estado do cliente.

## Comandos

```bash
npm run dev         # http://localhost:3000 (precisa do back em NEXT_PUBLIC_API_URL)
npm run lint
npm run typecheck
npm run build
```

## Estrutura e convenções

- `src/app/`: rotas (App Router).
- `src/components/`: componentes. `ui/` é gerado pelo shadcn e só deve ser editado se necessário.
- `src/services/api-client.ts`: todas as chamadas HTTP passam por ele.
- `src/hooks/`: hooks de TanStack Query (`use-*.ts`).
- `src/stores/`: stores Zustand (ex.: `auth-store.ts`).
- `src/types/`: tipos que espelham os DTOs da API (camelCase). Precisam ser mantidos em sincronia com o backend.
- Variáveis de ambiente em `.env.local` (modelo em `.env.example`). Nunca commitar `.env.local`.
- Formulários e telas com labels acessíveis: os testes E2E usam `getByRole` e `getByLabel`.
- Antes de concluir: `npm run lint` e `npm run typecheck`.

## Git

`feature/<nome>` → PR `develop` → PR `master`.
