import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: () => import('../views/RechercheLivre.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/page3',
      name: 'ListeLivres',
      component: () => import('../views/AboutUs.vue')
    },
    {
      path: '/page2',
      name: 'AjoutLivre',
      component: () => import('../views/AjoutLivre.vue')
    },
    {
      path: '/page1',
      name: 'RechercheLivre',
      component: () => import('../views/RechercheLivre.vue')
    }
  ]
})

export default router
