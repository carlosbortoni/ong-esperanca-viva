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

export function renderizar() {
  const rota = location.hash.slice(1) || "/";
  const pagina = rotas[rota] ?? (() => "<h1>Página não encontrada</h1>");
  const app = document.getElementById("app");
  app.innerHTML = pagina();
  document.title = `${rota === "/" ? "Início" : rota.slice(1)} | ONG Esperança Viva`;
  document.querySelectorAll("[data-rota]").forEach((a) => {
    if (a.dataset.rota === rota) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  app.focus();
  ligarFormulario();
}

export function iniciarRoteador() {
  window.addEventListener("hashchange", renderizar);
  renderizar();
}
