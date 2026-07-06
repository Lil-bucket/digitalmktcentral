# Digital MKT Central — Unified Platform

React + TypeScript + Supabase SPA para gerenciamento unificado de projetos e orçamentos.

## Setup

1. **Clone o repo**
   ```bash
   git clone https://github.com/Lil-bucket/digitalmktcentral.git
   cd digitalmktcentral
   ```

2. **Instale dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   # Edite .env.local com seu VITE_SUPABASE_ANON_KEY
   ```
   
   Você encontra a chave em: Supabase Dashboard → Settings → API → Project URL & Keys → `anon` key.

4. **Rode localmente**
   ```bash
   npm run dev
   ```

5. **Build para produção**
   ```bash
   npm run build
   npm run preview
   ```

6. **Deploy no GitHub Pages**
   ```bash
   npm run deploy
   ```
   (push automático para `gh-pages` branch)

## Estrutura

- `src/lib/supabase.ts` — Cliente Supabase + RPCs
- `src/types.ts` — TypeScript interfaces
- `src/components/Auth.tsx` — Login/Signup
- `src/components/Dashboard.tsx` — Layout principal
- `src/components/Sidebar.tsx` — Menu de módulos
- `src/components/modules/` — Work & Budget

## Próximos passos

1. Integrar os modais (projetos, campanhas, POs) da UI prototype
2. Implementar RLS policies (schema.sql §5)
3. Conectar todas as RPCs (papel_atual, classificar, etc)
4. Testar cada fluxo por papel (admin, marketing, financeiro, agencia)

## Suporte

- Docs Supabase: https://supabase.com/docs
- Docs React: https://react.dev
- GitHub Pages: https://pages.github.com
