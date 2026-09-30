// Templates dinâmicos: funções que retornam HTML reutilizável
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export const cartaoProjeto = ({ titulo, descricao, status }) => `
  <article class="cartao col-4">
    <div class="cartao__corpo">
      <span class="badge">${esc(status)}</span>
      <h3 class="cartao__titulo">${esc(titulo)}</h3>
      <p>${esc(descricao)}</p>
      <a class="btn cartao__acao" href="#/cadastro">Participar</a>
    </div>
  </article>`;

export const itemInscrito = ({ id, nome, email }) => `
  <li class="inscrito">
    <span><strong>${esc(nome)}</strong><br><small>${esc(email)}</small></span>
    <button class="btn btn--contorno" type="button" data-remover="${id}">Remover</button>
  </li>`;

export const paginaInicio = (total) => `
  <section class="hero">
    <h1>Transformando vidas com educação e cidadania</h1>
    <p>Já temos <span class="contador" id="contador">${total}</span> apoiadores cadastrados.</p>
    <a class="btn" href="#/cadastro">Quero apoiar</a>
  </section>`;

export const paginaProjetos = (projetos) => `
  <h1>Nossos projetos</h1>
  <div class="grid">${projetos.map(cartaoProjeto).join("")}</div>`;

export const paginaCadastro = (inscritos) => `
  <h1>Seja um apoiador</h1>
  <div class="grid">
    <form class="formulario col-6" id="form-cadastro" novalidate>
      <div class="campo">
        <label for="nome">Nome completo *</label>
        <input type="text" id="nome" name="nome" autocomplete="name">
        <span class="campo__erro" id="erro-nome" role="alert"></span>
      </div>
      <div class="campo">
        <label for="email">E-mail *</label>
        <input type="email" id="email" name="email" autocomplete="email">
        <span class="campo__erro" id="erro-email" role="alert"></span>
      </div>
      <div class="campo">
        <label for="telefone">Telefone *</label>
        <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" autocomplete="tel">
        <span class="campo__erro" id="erro-telefone" role="alert"></span>
      </div>
      <button class="btn" type="submit">Enviar cadastro</button>
    </form>
    <section class="col-6" aria-labelledby="titulo-lista">
      <h2 id="titulo-lista">Apoiadores cadastrados</h2>
      <ul class="lista-inscritos" id="lista-inscritos">${inscritos.map(itemInscrito).join("")}</ul>
    </section>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
