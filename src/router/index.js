import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Router from 'vue-router';

import IndexPage from '@/pages/index/index';
import LoginPage from '@/pages/login/login';
import NewsPage from '@/pages/news/news';
import NewsFormPage from '@/pages/news/form';
import BannersPage from '@/pages/banners/banners';
import BannersFormPage from '@/pages/banners/form';
import QuestionsPage from '@/pages/questions/questions';
import QuestionsFormPage from '@/pages/questions/form';

import auth from '@/helpers/auth';

Vue.use(Router);
Vue.use(BootstrapVue);

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/news',
      name: 'NewsPage',
      component: NewsPage,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/news/add',
      name: 'NewsAddPage',
      component: NewsFormPage,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/news/:id',
      name: 'NewsEditPage',
      component: NewsFormPage,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/banners',
      name: 'BannersPage',
      component: BannersPage,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/banners/add',
      name: 'BannersAddPage',
      component: BannersFormPage,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/banners/:id',
      name: 'BannersEditPage',
      component: BannersFormPage,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/questions',
      name: 'QuestionsPage',
      component: QuestionsPage,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/questions/add',
      name: 'QuestionsAddPage',
      component: QuestionsFormPage,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/questions/:id',
      name: 'QuestionsEditPage',
      component: QuestionsFormPage,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requiresAuth) {
    if (!auth.checkIsAuth()) {
      next({
        path: '/login',
      });
      return;
    }
  }
  next();
});

export default router;
