import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store'
import Home from '../views/Home.vue'
import NewPost from '../components/NewPost.vue'
import EditPost from '../components/EditPost.vue'
import ShowPost from '../components/ShowPost.vue'
import { colorLog } from '../../utils/colorLog'
import { useStorage } from '../composables/useStorage'
import { CURRENT_USER_ID_STORAGE_KEY } from '../constants'

export const routes =  [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'ShowPost',
    path: '/posts/:id',
    component: ShowPost
  },
  {
    name: 'NewPost',
    path: '/posts/new',
    component: NewPost,
    meta: {
      requiresAuth: true
    },
    props: {
      currentUserId: store.getState().authors.currentId
    }
  },
  {
    name: 'EditPost',
    path: '/posts/:id/edit',
    component: EditPost,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:catchAll(.*)',
    component: Home
  }
]

// console.log("$# DOCKER @7");
// console.log(process.env);
// console.log(process.env.DOCKER);
// console.log('meta');
// console.log(import.meta.env.VITE_DOCKER);
// console.log('after');
// console.log(process.env.VITE_DOCKER);
// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_DOCKER);
// console.log(process.env.NODE_ENV);

const base = process.env.DOCKER == '1'
  ? ''
    : process.env.NODE_ENV == 'production'
    ? 'blog'
  : ''

export const router = createRouter({
  // this sets baseurl
  // https://github.com/shortpoet/blog
  // http://localhost/blog/
  // adding a 'blog' here creates an error in nginx on reload 
  // chunk doesn't seem to get done properly unexpected token '<'
  // generic error beginning of html
  // https://github.com/coreui/coreui-free-react-admin-template/issues/124
  // https://github.com/coreui/coreui-free-react-admin-template/issues/124#issuecomment-460113218
  // history: createWebHistory(base),
  history: createWebHistory(),
  routes: routes
})

export const makeRouter = () => createRouter({
  history: createWebHistory(),
  routes: routes
})

const checkSessionStorage = async () => {
  const localStorage = useStorage();
  colorLog('Check Session Storage', 1)
  const currentUserId = localStorage.get(CURRENT_USER_ID_STORAGE_KEY);
  if (currentUserId) {
    const res = await store.getUserById(parseInt(currentUserId))
    store.setCurrentUser(res.userById)
  }
}

// https://github.com/vuejs/vue-router-next/blob/master/playground/router.ts
// redirect catch-all
// router.beforeEach((to, from, next) => {
//   if (/.\/$/.test(to.path)) {
//     to.meta.redirectCode = 301
//     next(to.path.replace(/\/$/, ''))
//   } else next()
//   // next()
// })

router.beforeEach(async (to, from, next) => {
  checkSessionStorage()
  console.log('Navigate');
  // if you don't check for to.meta.requiresAuth will cause infinite loop of redirection
  if (to.meta.requiresAuth && !store.getState().authors.currentId) {
    next({
      name: 'Home'
    })
  } else {
    next()
  }
})
