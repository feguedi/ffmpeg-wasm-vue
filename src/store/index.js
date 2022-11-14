import { createStore } from 'vuex';
import capturer from '../modules/capturer/store';

const store = createStore({
  modules: {
    capturer,
  },
});

export default store;
