# LabEx — Laboratório de Projetos de Extensão

Plataforma acadêmica para gestão de projetos de extensão universitária.

## Stack

| Camada       | Tecnologia                          |
|-------------|--------------------------------------|
| Framework   | Next.js 14+ (App Router)             |
| Linguagem   | TypeScript                           |
| Estilos     | Tailwind CSS (paleta institucional)  |
| Data fetch  | TanStack Query v5                    |
| HTTP client | Axios + Interceptors JWT             |
| Formulários | React Hook Form + Zod                |
| Fontes      | Syne (display) + DM Sans (body)      |

## Estrutura de pastas

```
labex/
├── app/
│   ├── layout.tsx              # Root layout com providers e Navbar
│   ├── globals.css
│   ├── page.tsx                # Home — hero, stats, projetos em destaque
│   ├── projetos/
│   │   └── page.tsx            # Listagem com filtros (status, área, busca)
│   ├── publicacoes/
│   │   └── page.tsx            # Listagem com filtros por tipo e ano
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard do usuário (abas)
│   └── auth/
│       └── login/page.tsx      # Login com RHF + Zod
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Navbar responsiva
│   ├── providers/
│   │   └── QueryProvider.tsx   # TanStack Query setup
│   └── ui/
│       ├── index.tsx           # Badge, Button, Input, Card, Avatar, etc.
│       ├── ProjectCard.tsx     # Card de projeto (default + compact)
│       └── PublicationCard.tsx # Card de publicação
│
├── lib/
│   ├── api/
│   │   └── axios.ts            # Instância Axios + interceptors JWT + refresh
│   ├── hooks/
│   │   └── useQueries.ts       # Todos os hooks TanStack Query
│   ├── schemas.ts              # Schemas Zod (login, register, project, apply)
│   └── utils.ts                # cn(), mock data, label maps
│
├── types/
│   └── index.ts                # Todos os tipos TypeScript
│
├── tailwind.config.ts          # Paleta brand + fontes + sombras customizadas
├── next.config.js
└── tsconfig.json
```

## Início rápido

```bash
npm install
npm run dev
# Acesse http://localhost:3000
```

## Variável de ambiente

```env
NEXT_PUBLIC_API_URL=https://api.labex.edu.br
```

## Páginas

| Rota              | Descrição                                              |
|-------------------|--------------------------------------------------------|
| `/`               | Home com hero, stats e projetos em destaque            |
| `/projetos`       | Listagem com filtros de status, área e busca           |
| `/publicacoes`    | Publicações com filtro por tipo, ano e busca           |
| `/dashboard`      | Dashboard do usuário com abas (overview, projetos...) |
| `/auth/login`     | Login com validação Zod                                |
| `/auth/register`  | Cadastro com validação Zod                             |

## Autenticação

O Axios (`lib/api/axios.ts`) injeta automaticamente o JWT em cada request e faz
refresh do token ao receber 401, usando a fila de requisições pendentes.

Os tokens são salvos em `localStorage` com as chaves:
- `@labex:access_token`
- `@labex:refresh_token`
