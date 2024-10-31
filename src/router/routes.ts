import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', redirect: '/mask' },
      { path: '/mask', component: () => import('pages/MaskPage.vue') },
      { path: '/meta', component: () => import('pages/MetaPage.vue') },
      { path: '/explore', component: () => import('pages/ExplorePage.vue') },
      { path: '/graph', component: () => import('pages/GraphPage.vue') },
      {
        path: '/proof_request',
        component: () => import('pages/ProofRequestPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
