# Digital MKT Central — Unified Platform

Plataforma unificada de gestão de projetos (Work) e orçamento/POs (Budget), servida em
**https://central.po-control.com.br**.

**O app é o `index.html` da raiz** — um único arquivo, sem build step. Supabase, Chart.js e
xlsx entram por CDN; toda a UI é renderizada por template literals em JS. Não há bundler no
caminho de produção.

## Rodar localmente

```bash
npm run dev
```

Sobe um servidor estático em http://localhost:8000 (é só `python3 -m http.server`, sem
dependências). Acrescente `?demo=1` na URL para entrar no modo demo — dados falsos, nada é
gravado, e o seletor no canto inferior direito troca de papel (admin / marketing / finance /
agência) para testar permissões.

## Deploy

```bash
npm run deploy
```

O GitHub Pages serve o branch **`main`, path `/`** (com `CNAME` → `central.po-control.com.br`),
então publicar é literalmente commitar e dar push no `main` — sem build, sem branch
intermediário. O build costuma levar ~1 min; dá para acompanhar com
`gh api repos/Lil-bucket/digitalmktcentral/pages/builds/latest`.

> O branch `gh-pages` é resquício de um fluxo antigo (parado desde 07/2026) e **não é servido
> por nada** — ignore-o.

## Backend

Dois projetos Supabase, configurados no topo do `index.html`. As policies de RLS vivem no
Supabase, não no repo — o frontend só reflete as permissões, não as define.

## Legado

`src/`, `vite.config.ts`, `tsconfig*.json` e as dependências React/Vite do `package.json` são
de um scaffold SPA que nunca chegou a ser usado: não há `node_modules`, o `package-lock.json`
é um stub sem pacotes resolvidos e o `base` do Vite aponta para um path que não é o do domínio
atual. Nada disso participa do app em produção.

## Suporte

- Docs Supabase: https://supabase.com/docs
- Docs React: https://react.dev
- GitHub Pages: https://pages.github.com
