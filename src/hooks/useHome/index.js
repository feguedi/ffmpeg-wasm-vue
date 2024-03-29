import { computed, onMounted, ref, unref } from 'vue';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export function useHome() {
  const imagenArchivo = ref();
  const sonidoArchivo = ref();
  const videoSrc = ref(null);
  const progressMessage = ref('');
  const logMessage = ref('');
  const ffmpeg = ref(new FFmpeg());

  const ffmpegLoaded = computed(() => ffmpeg.value?.loaded);

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

      const blobImagen = new Blob([unref(imagenArchivo)], { type: 'image/*' });
      const blobSonido = new Blob([unref(sonidoArchivo)], { type: 'sound/*' });

      ffmpeg.value.writeFile('image.png', await fetchFile(blobImagen));
      ffmpeg.value.writeFile('sound.mp3', await fetchFile(blobSonido));

      await ffmpeg.value.exec(['-framerate', '1/10', '-i', 'image.png', '-i', 'sound.mp3', '-vcodec', 'libx264', '-t', '00:00:10', '-pix_fmt', 'yuv420p', '-vf', 'scale=1920:1080', 'test.mp4']);
      const data = await ffmpeg.value.readFile('test.mp4');

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
        await ffmpeg.value.load({
          coreURL: await toBlobURL('/ffmpeg-core.js', 'text/javascript'),
          wasmURL: await toBlobURL('/ffmpeg-core.wasm', 'application/wasm'),
        });

        ffmpeg.value.on('log', ({ type, message }) => {
          logMessage.value = `LOG [${type}] ${message}`;
        });
        ffmpeg.value.on('progress', ({ progress, time }) => {
          progressMessage.value = `progress: ${progress * 100} % (transcoded time: ${time / 1000000} s)`;
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  onMounted(async () => {
    initFFmpeg()
      .then(() => console.log('onMounted initFFmpeg'))
      .catch(e => console.error(e));
  });

  return {
    crearVideo,
    handleImagenArchivo,
    handleSonidoArchivo,
    videoSrc,
    progressMessage,
    logMessage,
  };
}
