# ONG Esperança Viva

Plataforma web (SPA em JavaScript puro) para a ONG Esperança Viva: apresenta a equipe e os projetos e permite cadastrar voluntários, com validação de formulário e armazenamento local.

## Funcionalidades

- Navegação entre páginas sem recarregar (roteamento por hash: `#/`, `#/projetos`, `#/cadastro`)
- Formulário de cadastro com validação (nome, e-mail, telefone com máscara)
- Bloqueio de e-mails duplicados
- Inscrições salvas no `localStorage` do navegador
- Layout responsivo com design system em CSS (custom properties, grid e flexbox)

## Tecnologias

HTML5 semântico, CSS3 e JavaScript (ES Modules), sem frameworks nem build.

## Estrutura

```
html/index.html            página única da aplicação
css/reset.css              reset de estilos
css/styles.css             design system e layout
js/main.js                 ponto de entrada
js/modules/router.js       roteamento por hash
js/modules/templates.js    templates das páginas
js/modules/validation.js   regras de validação e máscara
js/modules/events.js       eventos do formulário
js/modules/storage.js      persistência no localStorage
imagens/                   imagens do projeto
```

## Como executar

Os módulos ES exigem um servidor HTTP (não funcionam abrindo o arquivo direto):

```bash
git clone git@github.com:carlosbortoni/ong-esperanca-viva.git
cd ong-esperanca-viva
python3 -m http.server 8000
```

Depois acesse http://localhost:8000/html/index.html

## Fluxo de versionamento (GitFlow)

- `main`: versões estáveis, marcadas com tags (`v0.1.0`, `v1.0.0`...)
- `develop`: integração das funcionalidades
- `feature/*`: novas funcionalidades, mergeadas em `develop` via Pull Request
- `hotfix/*`: correções urgentes a partir de `main`

Commits seguem Conventional Commits (`feat`, `fix`, `docs`, `chore`) e as versões seguem versionamento semântico.

## Versões

- v0.1.0: SPA com roteamento, validação de formulário e localStorage

## Autor

Carlos Bortoni