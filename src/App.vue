<script setup>
import { computed, onMounted, ref, unref } from 'vue';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const imagenArchivo = ref();
const sonidoArchivo = ref();
const videoSrc = ref('');
const ffmpeg = ref(null);

const ffmpegLoaded = computed(() => ffmpeg.value?.isLoaded());

function handleImagenArchivo(e) {
  e.preventDefault();
  console.log('handleImagenArchivo');
  const file = e.target.files[0];
  imagenArchivo.value = file;
}

function handleSonidoArchivo(e) {
  e.preventDefault();
  console.log('handleSonidoArchivo');
  const file = e.target.files[0];
  sonidoArchivo.value = file;
}

async function crearVideo() {
  try {
    console.log('crearVideo inicio');

    ffmpeg.value.FS('writeFile', 'image.png', await fetchFile(new Blob([unref(imagenArchivo)], { type: 'image/*' })));
    ffmpeg.value.FS('writeFile', 'sound.mp3', await fetchFile(new Blob([unref(sonidoArchivo)], { type: 'sound/*' })));

    await ffmpeg.value.run('-framerate', '1/10', '-i', 'image.png', '-i', 'sound.mp3', '-vcodec', 'libx264', '-t', '00:00:10', '-pix_fmt', 'yuv420p', '-vf', 'scale=1920:1080', 'test.mp4');
    const data = await ffmpeg.value.FS('readFile', 'test.mp4');

    videoSrc.value = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    console.log('crearVideo fin');
  } catch (error) {
    console.error('crearVideo error:', error.message || error);
    throw new Error();
  }
}

async function initFFmpeg() {
  try {
    if (!ffmpegLoaded.value) {
      await ffmpeg.value.load();
    }
  } catch (error) {
    throw new Error(error);
  }
}

onMounted(async () => {
  ffmpeg.value = createFFmpeg({
    log: true,
    corePath: '/ffmpeg-core.js',
  });

  initFFmpeg()
    .catch(e => console.error(e));
});
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
