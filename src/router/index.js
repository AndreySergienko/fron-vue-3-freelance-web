import { createRouter, createWebHistory } from 'vue-router'
import BoardAdmin from '../views/BoardAdmin.vue'
import store from '../store'
import {permissionLoginCode, permissionResetPassword} from "../http/userApi"
const routes = [
  {
    path: '/',
    name: 'admin',
    component: BoardAdmin,
    meta: {
      layout: 'main',
      auth: true
    },
  },
  {
    path: '/webinar',
    name: 'web',
    component: () => import('../views/BoardWebinar'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/documents',
    name: 'doc',
    component: () => import('../views/BoardDocuments'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Auth/Login'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/login/code',
    name: 'auth-code',
    component: () => import('../views/Auth/Login-code'),
    meta: {
      layout: 'auth',
      auth: false
    },
    async beforeEnter(to, from, next) {
      try {
        const data = await permissionLoginCode()
        store.commit('auth/setEmailFormFactor', data.email)
        next()
      } catch (e) {
        next({name: 'login'})
      }
    }
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import('../views/Auth/Reset/ResetAuthEmail'),
    meta: {
      layout: 'auth',
      auth: false
    },
  },
  {
    path: '/reset/password',
    name: 'reset-password',
    component: () => import('../views/Auth/Reset/ResetSaveNewPassword'),
    meta: {
      layout: 'auth',
      auth: false
    },
    async beforeEnter(to, from, next) {
      try {
        const data = await permissionResetPassword()
        store.commit('auth/setEmailFormFactor', data.email)
        next()
      } catch (e) {
        next({name: 'login'})
      }
    }
  },
  {
    path: '/:notFound(.*)',
    redirect:
      store.getters['auth/isAuth']
      ? '/'
      : {name: 'login'}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass:'active'
})

function beforeEach(to, from, next) {
  const isSession = localStorage.getItem('session')
  const requireAuth = to.meta.auth
  if (!store.getters['auth/isRequest'] && !!isSession) {
    setTimeout(() => {
      return beforeEach(to, from, next)
    }, 500)
  } else {
    store.commit('setIsPreLoader')
    if (requireAuth && store.getters['auth/isAuth']) {
      return next()
    } else if (requireAuth && !store.getters['auth/isAuth']) {
      return next({name: 'login'})
    } else if (!requireAuth && store.getters['auth/isAuth']) {
      return next({name: 'admin'})
    } else {
      return next()
    }
  }

}

router.beforeEach( (to, from, next) => {
  const requireAuth = to.meta.auth


  if (store.getters['getIsPreLoading']) {
    return beforeEach(to, from, next)
  } else {
    if (requireAuth && store.getters['auth/isAuth']) {
      return next()
    } else if (requireAuth && !store.getters['auth/isAuth']) {
      return next({name: 'login'})
    } else if (!requireAuth && store.getters['auth/isAuth']) {
      return next({name: 'admin'})
    } else {
      return next()
    }
  }
})

export default router
