
const routes = [
  {
    path: '/',
    component: () => import('pages/Index.vue')
  },
  {
    path: '/list',
    name: 'listusers',
    component: () => import('pages/ListaUsuarios.vue')
  },
  {
    path: '/user/*',
    name: 'perfil',
    component: () => import('pages/Perfil.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
