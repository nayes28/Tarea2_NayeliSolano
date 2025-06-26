import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProyectsView.vue'
import ResumenProyectos from '@/views/ResumenProyectos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'projects',
      component: ProjectsView,
    },
    {
  path: '/resumen',
  name: 'resumen',
  component: ResumenProyectos
},
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router
