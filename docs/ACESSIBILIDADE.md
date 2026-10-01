# Relatório de acessibilidade (WCAG 2.1 nível AA)

Branch: `feature/acessibilidade` · Issue: #2 · Milestone: v1.0.0

## Alterações realizadas

### Semântica e landmarks
- Landmarks nativos: `<header>`, `<nav aria-label="Navegação principal">`, `<main id="app">` e `<footer>`.
- Link "Pular para o conteúdo principal" como primeiro item da tabulação (WCAG 2.4.1). Ele move o foco para o `<main>` sem alterar o hash, que é usado pelo roteador.
- Hierarquia de títulos corrigida: `h1` por página e `h2` nos cartões de projeto (antes eram `h3`, pulando um nível).
- Página 404 com `h1` e link de retorno; `<title>` descritivo em cada rota.

### WAI-ARIA e leitores de tela
- Removido `aria-live` do `<main>` (anunciava a página inteira a cada troca). No lugar, uma região `role="status"` oculta visualmente anuncia "Página X" após cada navegação.
- `aria-current="page"` no item ativo do menu.
- Formulário: `required` + `aria-required`, `aria-describedby` ligando cada campo à ajuda e à mensagem de erro, `aria-invalid` conforme a validação, `inputmode="tel"` e `autocomplete` nos campos.
- Mensagens de erro em `aria-live="polite"` (sem `role="alert"`, que interrompia a leitura).
- Botões "Remover" e links "Participar" com `aria-label` que inclui o nome do item.
- Toast de confirmação com `role="status"` e `aria-atomic`.

### Navegação por teclado
- Todos os elementos interativos são nativos (`a`, `button`, `input`), logo focáveis e acionáveis por Enter/Espaço.
- Ao enviar o formulário inválido, o foco vai para o primeiro campo com erro e um aviso diz quantos campos têm erro.
- Ao remover um cadastro, o foco vai para o título da lista (o botão clicado deixa de existir).
- Após trocar de página, o foco vai para o conteúdo; na carga inicial o foco não é movido.
- Alvos de clique com no mínimo 44 px de altura.

### Contraste e apresentação
- Foco visível com contorno de 3 px em `#a85508` (4,9:1) e em branco sobre cabeçalho e rodapé.
- Borda dos campos de `#c9d1d9` (1,54:1) para `#6b7280` (4,8:1), atendendo o critério 1.4.11 (componentes de interface, mínimo 3:1).
- Erros não dependem só de cor: ganham o prefixo "Erro:".
- `prefers-reduced-motion` e `forced-colors` (alto contraste do sistema) respeitados.

## Testes e resultados

| Teste | Método | Resultado |
|---|---|---|
| Regras WCAG 2.0/2.1 A e AA e boas práticas | axe-core 4 via Playwright, em 4 rotas, 1280 px e 375 px | Antes: 1 violação (`heading-order`). Depois: 0 violações |
| Navegação só com teclado | Playwright (Tab, Shift+Tab, Enter) | Ordem lógica: pular > Início > Projetos > Cadastro > conteúdo; sem armadilhas de foco |
| Foco após ações | Playwright | Erro de formulário foca o 1º campo inválido; remoção foca o título da lista; navegação foca o `<main>` |
| Reflow (1.4.10) | Viewport de 320 px | Sem rolagem horizontal (`scrollWidth` = 320) |
| Contraste de texto | Cálculo da razão de luminância WCAG | Todos os pares acima de 4,5:1 (menor: 5,29:1, botão) |
| Contraste de componentes | Cálculo | Foco 4,9:1 e borda de campo 4,8:1 (mínimo 3:1) |

### Contrastes medidos

| Par | Razão |
|---|---|
| Texto / fundo | 13,75:1 |
| Texto suave / fundo | 7,04:1 |
| Link / fundo | 6,47:1 |
| Menu (branco sobre azul) | 6,94:1 |
| Botão (branco sobre laranja escuro) | 5,29:1 |
| Erro / branco | 6,54:1 |
| Foco / fundo | 4,93:1 |
| Borda de campo / branco | 4,83:1 |

## Limitações

- Os testes automáticos cobrem apenas parte dos critérios da WCAG. Recomenda-se uma verificação manual com leitor de tela real (NVDA, VoiceOver) antes da publicação.
- O teste de zoom foi feito por reflow a 320 px, equivalente a 400% em tela de 1280 px.
