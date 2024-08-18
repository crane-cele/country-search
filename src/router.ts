import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import CountryDetail from './pages/CountryDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/country/:id', component: CountryDetail }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
