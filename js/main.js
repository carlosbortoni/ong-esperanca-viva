// Ponto de entrada da aplicação
import { iniciarRoteador } from "./modules/router.js";

// "Pular para o conteúdo": não pode alterar o hash (ele é usado pelo roteador)
document.addEventListener("click", (e) => {
  if (!e.target.closest("[data-pular]")) return;
  e.preventDefault();
  document.getElementById("app").focus();
});

document.addEventListener("DOMContentLoaded", iniciarRoteador);
