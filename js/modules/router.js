// Roteador SPA baseado em hash (#/rota)
import * as tpl from "./templates.js";
import { listar } from "./storage.js";
import { ligarFormulario } from "./events.js";

const projetos = [
  { titulo: "Reforço escolar", descricao: "Aulas de apoio para crianças da comunidade.", status: "Vagas abertas" },
  { titulo: "Oficinas de arte", descricao: "Atividades culturais abertas a todas as idades.", status: "Em andamento" },
  { titulo: "Geração de renda", descricao: "Cursos de capacitação profissional.", status: "Últimas vagas" },
];

const rotas = {
  "/": () => tpl.paginaInicio(listar().length),
  "/projetos": () => tpl.paginaProjetos(projetos),
  "/cadastro": () => tpl.paginaCadastro(listar()),
};

const titulos = { "/": "Início", "/projetos": "Projetos", "/cadastro": "Cadastro" };
let primeiraRenderizacao = true;

export function renderizar() {
  const rota = location.hash.slice(1) || "/";
  const pagina = rotas[rota] ?? tpl.paginaNaoEncontrada;
  const titulo = titulos[rota] ?? "Página não encontrada";
  const app = document.getElementById("app");
  app.innerHTML = pagina();
  document.title = `${titulo} | ONG Esperança Viva`;
  document.querySelectorAll("[data-rota]").forEach((a) => {
    if (a.dataset.rota === rota) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  // Na carga inicial o foco fica no início do documento (para o link "pular" funcionar);
  // nas trocas de página o foco vai ao conteúdo e o leitor de tela anuncia o título.
  if (!primeiraRenderizacao) {
    app.focus();
    document.getElementById("anuncio").textContent = `Página ${titulo}`;
  }
  primeiraRenderizacao = false;
  ligarFormulario();
}

export function iniciarRoteador() {
  window.addEventListener("hashchange", renderizar);
  renderizar();
}
