# 🔬 Laboratório Ativo — Frontend

Interface web da plataforma **Laboratório Ativo**, uma plataforma acadêmica para gestão, descoberta e acompanhamento de projetos de extensão universitária.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · TanStack Query v5 · Axios · React Hook Form · Zod

---

## 🔗 Repositórios do Projeto

| Repositório | Descrição | Deploy |
|---|---|---|
| [Laboratorio-de-Projetos](https://github.com/lucasfoschini/Laboratorio-de-Projetos) | Este repositório — Frontend Next.js | [Vercel](https://lexatec.vercel.app) |
| [API-Laboratorio-de-Projetos-de-Extensao](https://github.com/lucasfoschini/API-Laboratorio-de-Projetos-de-Extensao) | Backend REST API | [Render](https://render.com) |

---

## 🚀 Início Rápido

```bash
cp .env.example .env.local   # configurar variável de ambiente
npm install                  # instalar dependências
npm run dev                  # iniciar (http://localhost:3000)
```

---

## ⚙️ Variável de Ambiente

```env
NEXT_PUBLIC_API_URL=https://sua-api.onrender.com
```

Para desenvolvimento local com a API rodando na porta 3334:

```env
NEXT_PUBLIC_API_URL=http://localhost:3334
```

---

## 📄 Páginas

| Rota | Descrição | Auth |
|---|---|---|
| `/` | Home com hero, acesso rápido e projetos em destaque | Pública |
| `/projetos` | Listagem com filtros de status, área e busca | Pública |
| `/projetos/:id` | Detalhes do projeto, posts, membros e sidebar de ações | Pública |
| `/projetos/novo` | Criar novo projeto com busca de membros iniciais | ✅ |
| `/projetos/:id/editar` | Editar projeto (somente o criador) | ✅ |
| `/publicacoes` | Publicações com formulário dinâmico por tipo | Pública |
| `/dashboard` | Dashboard com abas: visão geral, projetos, solicitações, acompanhando | ✅ |
| `/auth/login` | Login | Pública |
| `/auth/register` | Cadastro | Pública |

---

## 🧩 Funcionalidades

### Projetos
- Listagem com filtros por status, área temática e busca por texto
- Detalhes com posts/atualizações, membros, vagas, dados técnicos (duração, custo, escopo, categoria) e informações do criador
- Indicador de vagas: "X vagas abertas" ou "Vagas esgotadas" com barra de progresso
- Botão "Entrar no grupo" desaparece automaticamente quando as vagas estão cheias
- Criação com busca em tempo real de membros iniciais (debounce 400ms)
- Edição completa incluindo status manual pelo criador

### Publicações
- Formulário dinâmico que muda os campos conforme o tipo selecionado:
  - **Artigo** — título, resumo, autores, projeto, revista, DOI, Zenodo, tags
  - **Relatório Técnico** — tipo (parcial/final/técnico), versão, número, orientador
  - **Apresentação** — evento, data, tipo (oral/pôster/demo), local, carga horária, certificado
  - **TCC / Monografia** — orientador, curso, banca, coorientador, nota, GitHub
- Dropdown de projetos exibe apenas os projetos do próprio usuário
- Aberto para alunos e professores

### Dashboard
- Visão geral com contadores de projetos, solicitações e inscrições
- Gerenciamento de projetos criados e participados
- Aprovação/rejeição de solicitações de entrada
- Lista de projetos acompanhados

### Notificações (sino na navbar)
- **Solicitações pendentes** nos seus projetos
- **Atividade recente** (posts e publicações das últimas 48h) dos projetos que você acompanha
- Badge com contagem total, ícone muda quando há notificações novas

### Acesso rápido (home)
- Cards condicionais: usuário não logado vê "Cadastre-se"; logado vê "Criar projeto"

---

## 📁 Estrutura de Pastas

```
app/
├── page.tsx                        # Home
├── layout.tsx                      # Root layout com Navbar e providers
├── projetos/
│   ├── page.tsx                    # Listagem de projetos
│   ├── novo/page.tsx               # Criar projeto
│   └── [id]/
│       ├── page.tsx                # Detalhes do projeto
│       └── editar/page.tsx         # Editar projeto
├── publicacoes/
│   └── page.tsx                    # Publicações com formulário dinâmico
├── dashboard/
│   └── page.tsx                    # Dashboard do usuário
└── auth/
    ├── login/page.tsx
    └── register/page.tsx

components/
├── layout/
│   └── Navbar.tsx                  # Navbar responsiva com sino de notificações
├── sections/
│   ├── HeroBanner.tsx              # Banner condicional (logado/deslogado)
│   ├── QuickAccess.tsx             # Acesso rápido condicional por auth
│   └── ProjectsPreview.tsx         # Preview de projetos na home
└── ui/
    ├── index.tsx                   # Badge, Button, Input, Avatar, Skeleton...
    ├── ProjectCard.tsx             # Card de projeto (default + compact)
    └── PublicationCard.tsx         # Card de publicação

lib/
├── api/
│   └── axios.ts                    # Instância Axios + interceptors JWT + refresh automático
├── hooks/
│   └── useQueries.ts               # Todos os hooks TanStack Query
├── schemas.ts                      # Schemas Zod de validação de formulários
└── utils.ts                        # cn(), label maps (AREA_LABELS, STATUS_LABELS...)

contexts/
└── auth.tsx                        # Contexto de autenticação global

types/
└── index.ts                        # Todos os tipos TypeScript
```

---

## 🔐 Autenticação

O Axios (`lib/api/axios.ts`) gerencia os tokens automaticamente:

- Injeta `Authorization: Bearer <token>` em todas as requisições autenticadas
- Ao receber `401`, tenta renovar o access token via `/auth/refresh` automaticamente
- Requisições pendentes durante o refresh são enfileiradas e re-executadas após renovação
- Tokens armazenados em `localStorage` com as chaves `@labex:access_token` e `@labex:refresh_token`

---

## 🎨 Design System

- **Paleta:** cores institucionais `brand` (azul), com variantes para status (`success`, `warning`, `danger`, `neutral`)
- **Tipografia:** Syne (display/títulos) + DM Sans (corpo)
- **Sombras customizadas:** `shadow-card`, `shadow-card-md`
- Configurado em `tailwind.config.ts`

---

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feat/nome-da-feature`
2. Faça as alterações e commit: `git commit -m "feat: descrição"`
3. Abra um Pull Request para `main`
