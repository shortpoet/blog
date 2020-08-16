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
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export const makeRouter = () => createRouter({
  history: createWebHistory(),
  routes: routes
})

const localStorage = useStorage();

router.beforeEach(async (to, from, next) => {
  colorLog('Check Session Storage', 1)
  const currentUserId = localStorage.get(CURRENT_USER_ID_STORAGE_KEY);
  if (currentUserId) {
    const res = await store.getUserById(parseInt(currentUserId))
    store.setCurrentUser(res.userById)
  }
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
