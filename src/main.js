// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebaseApp from './firebaseConfig';

createApp(App).use(router).use(firebaseApp).mount('#app');
