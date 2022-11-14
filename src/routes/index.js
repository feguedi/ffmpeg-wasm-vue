import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        transition: 'slide-left',
      },
      component: HomeView,
    },
    {
      path: '/cap',
      name: 'capturer',
      meta: {
        transition: 'slide-left',
      },
      component: () => import('../views/CapturerView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: {
        transition: 'fade-out',
      },
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

export default router;
