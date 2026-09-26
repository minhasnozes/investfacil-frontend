# InvestFácil - Frontend

Front-end da plataforma acadêmica de investimentos InvestFácil (CDBs, Tesouro Direto e Fundos).

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Estado do servidor (dados da API) | TanStack Query |
| Estado do cliente (sessão, UI) | Zustand |
| UI | Tailwind CSS + shadcn/ui |
| Notificações (toast) | sonner (via shadcn/ui) |

## Como rodar

Pré-requisito: Node.js 20+.

```bash
npm install
cp .env.example .env.local   # ajuste NEXT_PUBLIC_API_URL se necessário
npm run dev
```

Acesse http://localhost:3000.

### Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Sobe o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Checagem de tipos (tsc) |

## Estrutura de pastas

```
src/
├── app/            # Rotas (App Router): páginas, layouts
├── components/
│   └── ui/         # Componentes gerados pelo shadcn/ui (não editar à mão sem necessidade)
├── hooks/          # Hooks de dados (useQuery / useMutation) por recurso
├── lib/            # Utilitários genéricos
├── providers/      # Providers globais (TanStack Query, tema, toaster)
├── services/       # Cliente HTTP (api-client.ts) e chamadas à API
├── stores/         # Stores Zustand (ex.: auth-store.ts)
└── types/          # Tipos compartilhados (entidades da API)
```

## Convenções

- **Dados vindos da API** (saldo, extrato, produtos...) ficam no **TanStack Query** — crie um hook em `src/hooks/` usando `api` de `src/services/api-client.ts`.
- **Estado local do cliente** (token de sessão, preferências, estado de UI compartilhado) fica no **Zustand**, em `src/stores/`.
- O `api-client` envia automaticamente o token JWT do `auth-store` e limpa a sessão em respostas `401`.
- Para adicionar componentes do shadcn/ui: `npx shadcn@latest add <componente>` (ex.: `dialog`, `table`, `form`).

## Integração com o back-end

A URL da API é definida em `NEXT_PUBLIC_API_URL` (padrão `http://localhost:8080`).
O card "Status da API" da página inicial consulta `GET /actuator/health` — para funcionar, o back-end precisa
do `spring-boot-starter-actuator` e liberar CORS para `http://localhost:3000`.
