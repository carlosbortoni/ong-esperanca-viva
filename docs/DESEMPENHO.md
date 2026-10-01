# Build de produção e desempenho

Branch: `feature/build-producao` · Issue: #3 · Milestone: v1.0.0

## Ferramenta e configuração

- **Bundler:** Vite 8 (`vite.config.js`). O `root` é `html/`, onde está o `index.html`; o `base` é `./` (caminhos relativos, o que funciona em subcaminhos como o do GitHub Pages) e a saída vai para `dist/`.
- **CSS e JS:** o Vite junta os módulos ES em um único arquivo JS e os dois CSS em um único arquivo, ambos minificados e com nome com hash (cache de longo prazo).
- **HTML:** o Vite não minifica HTML, então `scripts/minificar-html.mjs` usa o `html-minifier-terser` depois da build.
- **Imagens:** `scripts/otimizar-imagens.mjs` usa o `sharp` para gerar WebP (400 e 800 px) e JPEG progressivo de reserva.
- **Comandos:** `npm run imagens` (gera as imagens), `npm run build` (gera `dist/`), `npm run dev` e `npm run preview`.

## Resultados medidos

| Arquivos | Antes | Depois | Redução |
|---|---|---|---|
| HTML (1 arquivo) | 1.292 B | 1.141 B | 11,7% |
| CSS (2 arquivos, 1 na saída) | 13.627 B | 10.453 B | 23,3% |
| JS (6 arquivos, 1 na saída) | 10.168 B | 7.653 B | 24,7% |
| **Total de texto** | **25.087 B** | **19.247 B** | **23,3%** |

- Com gzip: CSS 3.877 B para 2.809 B e JS 4.451 B para 3.061 B.
- Requisições de código: de 9 arquivos para 3 (HTML, CSS e JS).
- Imagem: `equipe.jpg` (1200x600, 34.785 B) virou `equipe-400.webp` (2.906 B), `equipe-800.webp` (6.058 B) e `equipe-800.jpg` (9.946 B). O navegador baixa o WebP de 400 px em tela comum, ou seja, cerca de 91% menos bytes.
- A imagem é decorativa, então usa `alt=""`, `width`/`height` (evita deslocamento de layout), `decoding="async"` e `fetchpriority="high"` (está na primeira dobra).

## Desafios ao minificar

- Os módulos usam `import`/`export`, e a build precisa resolver todos eles; o Vite faz isso sem mudar a lógica.
- Os templates criam `<img>` em strings de JavaScript, então o Vite não enxergaria essas imagens. Usei `new URL("...", import.meta.url)`, que ele reconhece e reescreve para os arquivos com hash.
- Os caminhos precisam ser relativos (`base: "./"`), pois o site é publicado em `/ong-esperanca-viva/` e não na raiz do domínio.
- Para garantir que nada quebrou, a build foi testada com Playwright: as 4 rotas, o cadastro completo (validação e `localStorage`), 0 erros no console, nenhuma resposta 4xx e 0 violações no axe-core nos modos claro e escuro.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) roda `npm ci` e `npm run build` a cada push em `main` e publica `dist/` no GitHub Pages: https://carlosbortoni.github.io/ong-esperanca-viva/
