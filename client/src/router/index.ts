import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import NewPost from '../components/NewPost.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
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
  console.log(to);
  next()
})