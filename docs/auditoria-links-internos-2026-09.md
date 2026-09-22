# Auditoria — páginas "deslinkadas" (Alfa Construction)

**Data:** 22/09/2026 · **Método:** build de produção em 9 pontos do histórico (fev→set/2026), inventário de URLs (`prerender-manifest`) e grafo de links internos extraído do HTML gerado de cada build.

## Causa raiz

Em **01/09/2026, commit `f0d4860`**, o rodapé passou de **109 cidades para 12** (o resto virou um link para `/massachusetts`). O rodapé aparece nas 1.133 páginas, então ele era a principal fonte de autoridade interna das páginas de cidade.

| Métrica | Jul/2026 (`022c2f2`) | Antes da correção | Depois da correção |
|---|---|---|---|
| Links internos por página (média) | 138 | 43,6 | 138 |
| Links para cada página de cidade (mín/mediana) | 1.131 / 1.131 | **14 / 20** | 1.132 / 1.132 |
| Cidades a 1 clique da home | 109 | **12** | 109 |
| Cidades rebaixadas para 2 cliques | 0 | **97** | 0 |

**97 páginas de cidade perderam ~98% dos links internos**, incluindo **Bellingham, a cidade-sede**, que ficou fora das 12. As 981 páginas cidade × serviço herdam a autoridade das páginas de cidade, então a perda se propagou para elas.

## Outras URLs perdidas

Comparação de todas as URLs que o site já publicou (2.322) com o build atual:

| Situação | Qtde | Status |
|---|---|---|
| Ainda publicadas | 1.133 | ✅ |
| Com 301 para página viva | 1.177 | ✅ ok (pivôs de posicionamento, ver abaixo) |
| **Davam 404, sem redirect** | **12** | ✅ corrigido: 301 adicionado |

Os 12 casos de 404: 3 posts de pintura (removidos em abr), 8 slugs de projeto antigos (fev) e `/sms-opt-in`, que pode estar no cadastro A2P.

Redirects intencionais (decisões de negócio, não mexi):

| Grupo removido | Páginas | Quando | Destino |
|---|---|---|---|
| `/cities/*` → `/massachusetts/*` | 624 | mar | mesma página ✅ |
| cidade × painting | 109 | abr | hub da cidade |
| cidade × carpentry / remodeling / windows-doors | 327 | 03/jun | hub da cidade |
| cidade × siding-repair | 109 | 03/jul | hub da cidade |
| posts off-positioning | 3 | jun | `/services/siding` |

## Fatores que coincidem com a queda (a confirmar no GSC)

No mesmo dia **01/09**, além do rodapé, saíram:
- `40466d6` — reescrita de titles/metas em todas as páginas
- `262a1be` — texto novo em 872 páginas
- `eb3123e` — schema `Service` alterado em 981 páginas

Pelo repositório não dá para separar o efeito de cada um. Para isso: **GSC → Desempenho → comparar 18/ago–31/ago vs. 02/set–15/set, filtro de página `/massachusetts/`**. Se a queda estiver concentrada nas 97 cidades que saíram do rodapé (e nos cidade × serviço delas), a causa confirmada é o rodapé.

## O que foi feito

1. **Rodapé restaurado** com as 109 cidades (`components/Footer.tsx`), mais o link para o hub `/massachusetts`.
2. **12 redirects 301** para as URLs que davam 404 (`next.config.ts`).
3. **Trava de deploy:** `scripts/audit-links.mjs` roda no `postbuild`. Se falhar, o build falha e a Vercel não publica. Ele verifica:
   - toda URL de `scripts/url-baseline.json` (2.322 URLs históricas) responde 200 ou 301 para uma página viva;
   - toda cidade indexável recebe ≥ 500 links internos e fica a 1 clique da home;
   - nenhuma página indexável fica órfã;
   - todo item do sitemap existe e nenhum está como `noindex`.

   Testada contra o build com o rodapé cortado: **bloqueou**, apontando as 97 cidades e as 12 URLs com 404.

## Próximos passos

| # | Ação | Quem |
|---|---|---|
| 1 | Deploy desta branch e **GSC → Sitemaps → reenviar** `sitemap.xml` | RHAI |
| 2 | GSC → Inspeção de URL → solicitar indexação de Bellingham, Milford, Franklin, Medway e Wrentham (principais do raio) | RHAI |
| 3 | Comparar no GSC os períodos acima, para confirmar a causa | Luiz |
| 4 | Reavaliar em 14 e em 28 dias (impressões de `/massachusetts/*`) | RHAI |
| 5 | Se uma página nova entrar no site, rodar `node scripts/audit-links.mjs --update-baseline` depois do build | quem publicar |
