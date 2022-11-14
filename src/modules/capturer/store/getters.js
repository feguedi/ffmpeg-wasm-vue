export function getTodasCapturas(state) {
  return state.capturas;
}

export function getUrls(state) {
  return state.capturas.map(c => c.url);
}

export function getNombres(state) {
  return state.capturas.map(c => c.nombre);
}
