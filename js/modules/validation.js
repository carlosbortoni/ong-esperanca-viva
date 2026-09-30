// Regras de validação de formulário
export const regras = {
  nome: (v) => (v.trim().split(/\s+/).length >= 2 ? "" : "Informe nome e sobrenome."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Informe um e-mail válido."),
  telefone: (v) => (/^\(\d{2}\) \d{4,5}-\d{4}$/.test(v) ? "" : "Use o formato (00) 00000-0000."),
};

export function validarCampo(nome, valor) {
  return regras[nome] ? regras[nome](valor) : "";
}

export function mascararTelefone(valor) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
