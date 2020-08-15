import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store'
import Home from '../views/Home.vue'
import NewPost from '../components/NewPost.vue'
import ShowPost from '../components/ShowPost.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
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
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
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