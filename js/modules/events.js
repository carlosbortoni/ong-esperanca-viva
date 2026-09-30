// Controle de eventos do formulário e da lista (DOM)
import { validarCampo, mascararTelefone } from "./validation.js";
import { salvar, remover, listar } from "./storage.js";
import { itemInscrito } from "./templates.js";

function mostrarErro(campo, msg) {
  document.getElementById(`erro-${campo.name}`).textContent = msg;
  campo.setAttribute("aria-invalid", msg ? "true" : "false");
}

function avisar(texto) {
  const toast = document.getElementById("toast");
  toast.textContent = texto;
  toast.classList.add("visivel");
  setTimeout(() => toast.classList.remove("visivel"), 3000);
}

function desenharLista() {
  document.getElementById("lista-inscritos").innerHTML = listar().map(itemInscrito).join("");
}

export function ligarFormulario() {
  const form = document.getElementById("form-cadastro");
  if (!form) return;

  form.addEventListener("input", (e) => {
    if (e.target.name === "telefone") e.target.value = mascararTelefone(e.target.value);
  });
  form.addEventListener("blur", (e) => {
    if (e.target.name) mostrarErro(e.target, validarCampo(e.target.name, e.target.value));
  }, true);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;
    const dados = {};
    for (const campo of form.querySelectorAll("input[name]")) {
      const erro = validarCampo(campo.name, campo.value);
      mostrarErro(campo, erro);
      if (erro) valido = false;
      dados[campo.name] = campo.value.trim();
    }
    if (!valido) return;
    if (listar().some((i) => i.email.toLowerCase() === dados.email.toLowerCase())) {
      mostrarErro(form.elements.email, "Este e-mail já está cadastrado.");
      return;
    }
    salvar(dados);
    form.reset();
    for (const campo of form.querySelectorAll("input[name]")) mostrarErro(campo, "");
    form.querySelectorAll("input[name]").forEach((c) => c.removeAttribute("aria-invalid"));
    desenharLista();
    avisar("Cadastro salvo com sucesso!");
  });

  document.getElementById("lista-inscritos").addEventListener("click", (e) => {
    const id = e.target.dataset.remover;
    if (!id) return;
    remover(Number(id));
    desenharLista();
    avisar("Cadastro removido.");
  });
}
