# ONG Esperança Viva

Plataforma web (SPA em JavaScript puro) para a ONG Esperança Viva: apresenta a equipe e os projetos e permite cadastrar voluntários, com validação de formulário e armazenamento local.

Site publicado: https://carlosbortoni.github.io/ong-esperanca-viva/

## Funcionalidades

- Navegação entre páginas sem recarregar (roteamento por hash: `#/`, `#/projetos`, `#/cadastro`)
- Formulário de cadastro com validação (nome, e-mail, telefone com máscara)
- Bloqueio de e-mails duplicados
- Inscrições salvas no `localStorage` do navegador
- Layout responsivo com design system em CSS (custom properties, grid e flexbox)
- Acessibilidade WCAG 2.1 AA: navegação por teclado, link para pular ao conteúdo, ARIA, leitores de tela e modo escuro automático

## Tecnologias

HTML5 semântico, CSS3 e JavaScript (ES Modules), sem frameworks. Vite (build e minificação), sharp (imagens) e GitHub Actions (deploy) como ferramentas de desenvolvimento.

## Estrutura

```
html/index.html            página única da aplicação
css/reset.css              reset de estilos
css/styles.css             design system, layout e modo escuro
js/main.js                 ponto de entrada
js/modules/router.js       roteamento por hash
js/modules/templates.js    templates das páginas
js/modules/validation.js   regras de validação e máscara
js/modules/events.js       eventos do formulário
js/modules/storage.js      persistência no localStorage
imagens/                   imagens originais e otimizadas
scripts/                   otimização de imagens e minificação do HTML
docs/                      relatórios de acessibilidade e desempenho
.github/workflows/         deploy automático
```

## Como executar

Pré-requisito: Node.js 20 ou superior.

```bash
git clone git@github.com:carlosbortoni/ong-esperanca-viva.git
cd ong-esperanca-viva
npm install
npm run dev
```

Acesse o endereço mostrado no terminal (normalmente http://localhost:5173).

## Build e deploy

```bash
npm run imagens   # gera as imagens otimizadas (WebP e JPEG)
npm run build     # gera dist/ com HTML, CSS e JS minificados
npm run preview   # serve o resultado de dist/ localmente
```

A cada push em `main`, o GitHub Actions faz a build e publica no GitHub Pages. Detalhes e números da otimização em [docs/DESEMPENHO.md](docs/DESEMPENHO.md). O relatório de acessibilidade está em [docs/ACESSIBILIDADE.md](docs/ACESSIBILIDADE.md).

## Fluxo de versionamento (GitFlow)

- `main`: versões estáveis, marcadas com tags (`v0.1.0`, `v1.0.0`...)
- `develop`: integração das funcionalidades
- `feature/*`: novas funcionalidades, mergeadas em `develop` via Pull Request
- `hotfix/*`: correções urgentes a partir de `main`

Commits seguem Conventional Commits (`feat`, `fix`, `docs`, `chore`, `perf`, `build`, `ci`) e as versões seguem versionamento semântico.

## Versões

- v0.1.0: SPA com roteamento, validação de formulário e localStorage
- v1.0.0: acessibilidade WCAG 2.1 AA, modo escuro, build otimizado e deploy no GitHub Pages

## Autor

Carlos Bortoni
