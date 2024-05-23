// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomePage.vue';
import About from './views/AboutPage.vue';
import Auth from './views/AuthPage.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
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
