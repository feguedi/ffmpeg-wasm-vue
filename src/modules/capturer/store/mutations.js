export function agregarURL(state, { url = undefined, nombre = undefined }) {
  if (!!(url) && !!(nombre)) {
    state.capturas = [
      ...state.capturas,
      { url, nombre, capturando: true },
    ];
  }
}
