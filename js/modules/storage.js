// Camada de persistência: encapsula o localStorage
const CHAVE = "ong-inscritos";

export function listar() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) ?? [];
  } catch {
    return [];
  }
}

export function salvar(inscrito) {
  const lista = listar();
  lista.push({ id: Date.now(), ...inscrito });
  localStorage.setItem(CHAVE, JSON.stringify(lista));
  return lista;
}

export function remover(id) {
  const lista = listar().filter((i) => i.id !== id);
  localStorage.setItem(CHAVE, JSON.stringify(lista));
  return lista;
}
