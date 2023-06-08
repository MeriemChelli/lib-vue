import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: () => import('../views/RechercheLivre.vue')
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
