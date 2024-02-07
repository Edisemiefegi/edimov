// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/home.vue'; // import your components

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
