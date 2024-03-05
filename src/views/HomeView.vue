<script setup>
import { useHome } from '../hooks';

const { videoSrc, handleImagenArchivo, handleSonidoArchivo, crearVideo, progressMessage, logMessage } = useHome();
</script>


<template>
  <div class="mi-app">
    <video :src="videoSrc" controls></video>

    <label for="imagen">Imagen</label>
    <input type="file" id="imagen" accept="image/*" @change="handleImagenArchivo" />
    
    <label for="sonido">Sonido</label>
    <input type="file" id="sonido" accept="sound/*" @change="handleSonidoArchivo" />

    <button :onClick="crearVideo">Crear video</button>

    <div style="display: flex; flex-direction: row; margin: auto">
      <h4>Logs</h4>
      <span>{{ logMessage }}</span>
    </div>

    <div style="display: flex; flex-direction: row; margin: auto">
      <h4>Progreso</h4>
      <span>{{ progressMessage }}</span>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.mi-app {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
