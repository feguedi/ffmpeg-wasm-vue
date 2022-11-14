<template>
  <div class="capturer">
    <h1>Capturar video</h1>

    <video
      id="video-resultado"
    />

    <div class="url">
      <label for="url-video">URL</label>
      <input type="text" name="url-video" id="url-video">
    </div>

    <div class="url">
      <label for="nombre-video">Nombre</label>
      <input type="text" name="nombre-video" id="nombre-video">
    </div>

    <button
    >
      Iniciar
    </button>
  </div>
</template>

<script setup>
</script>

<style>
  .capturer {
    display: flex;
    flex-direction: column;
  }
</style>
