import { ref } from 'vue';

export function useCapturer() {
  const capturas = ref([]);

  function addCaptura({ nombre, url }) {
    const idx = capturas.value.lastIndexOf(e => {});
  }

  return {
    capturas,
  };
}
