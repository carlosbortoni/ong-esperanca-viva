// Templates dinâmicos: funções que retornam HTML reutilizável
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export const cartaoProjeto = ({ titulo, descricao, status }) => `
  <article class="cartao col-4">
    <div class="cartao__corpo">
      <span class="badge"><span class="visualmente-oculto">Situação: </span>${esc(status)}</span>
      <h2 class="cartao__titulo">${esc(titulo)}</h2>
      <p>${esc(descricao)}</p>
      <a class="btn cartao__acao" href="#/cadastro" aria-label="Participar do projeto ${esc(titulo)}">Participar</a>
    </div>
  </article>`;

export const itemInscrito = ({ id, nome, email }) => `
  <li class="inscrito">
    <span><strong>${esc(nome)}</strong><br><small>${esc(email)}</small></span>
    <button class="btn btn--contorno" type="button" data-remover="${id}" aria-label="Remover cadastro de ${esc(nome)}">Remover</button>
  </li>`;

export const paginaInicio = (total) => `
  <section class="hero">
    <h1>Transformando vidas com educação e cidadania</h1>
    <p>Já temos <span class="contador" id="contador">${total}</span> apoiadores cadastrados.</p>
    <a class="btn" href="#/cadastro">Quero apoiar</a>
  </section>`;

export const paginaNaoEncontrada = () => `
  <h1>Página não encontrada</h1>
  <p>O endereço acessado não existe. <a href="#/">Voltar para o início</a>.</p>`;

export const paginaProjetos = (projetos) => `
  <h1>Nossos projetos</h1>
  <div class="grid">${projetos.map(cartaoProjeto).join("")}</div>`;

export const paginaCadastro = (inscritos) => `
  <h1>Seja um apoiador</h1>
  <div class="grid">
    <form class="formulario col-6" id="form-cadastro" novalidate aria-describedby="ajuda-form">
      <p class="campo__ajuda" id="ajuda-form">Campos marcados com * são obrigatórios.</p>
      <div class="campo">
        <label for="nome">Nome completo *</label>
        <input type="text" id="nome" name="nome" autocomplete="name" required aria-required="true" aria-describedby="erro-nome">
        <span class="campo__erro" id="erro-nome" ></span>
      </div>
      <div class="campo">
        <label for="email">E-mail *</label>
        <input type="email" id="email" name="email" autocomplete="email" required aria-required="true" aria-describedby="erro-email">
        <span class="campo__erro" id="erro-email" ></span>
      </div>
      <div class="campo">
        <label for="telefone">Telefone *</label>
        <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" autocomplete="tel" inputmode="tel" required aria-required="true" aria-describedby="ajuda-telefone erro-telefone">
        <span class="campo__ajuda" id="ajuda-telefone">Formato: (00) 00000-0000</span>
        <span class="campo__erro" id="erro-telefone" ></span>
      </div>
      <button class="btn" type="submit">Enviar cadastro</button>
    </form>
    <section class="col-6" aria-labelledby="titulo-lista">
      <h2 id="titulo-lista" tabindex="-1">Apoiadores cadastrados</h2>
      <ul class="lista-inscritos" id="lista-inscritos" aria-label="Lista de apoiadores cadastrados">${inscritos.map(itemInscrito).join("")}</ul>
    </section>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true"></div>`;
