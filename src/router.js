// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomePage.vue';
import Auth from './views/AuthPage.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'login',
    path: '/login',
    component: Auth
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
