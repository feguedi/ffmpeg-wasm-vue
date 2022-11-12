<script setup>
import { useHome } from '../hooks';

const { videoSrc, handleImagenArchivo, handleSonidoArchivo, crearVideo } = useHome();
</script>


<template>
  <div class="mi-app">
    <video :src="videoSrc" controls></video>

    <input type="file" id="imagen" accept="image/*" :onChange="handleImagenArchivo">

    <input type="file" id="sonido" accept="sound/*" :onChange="handleSonidoArchivo">

    <button :onClick="crearVideo">Crear video</button>
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
