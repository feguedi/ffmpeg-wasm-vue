import { computed, onMounted, ref, unref } from 'vue';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export function useHome() {
  const imagenArchivo = ref();
  const sonidoArchivo = ref();
  const videoSrc = ref(null);
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

  return {
    crearVideo,
    handleImagenArchivo,
    handleSonidoArchivo,
    videoSrc,
  };
}
