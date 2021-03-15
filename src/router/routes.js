
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MainPage.vue') },
      { path: '/main', component: () => import('pages/MainPage.vue') }//,
      //{ path: '/config',name: 'config', component: () => import('pages/Config.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    
    component: () => import('pages/Error404.vue')
  }
]

export default routes
