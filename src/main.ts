import { createApp } from 'vue'
import axios from 'axios'
import * as mockData from './mocks'
import { router } from './router'
import random from 'lodash/random'

import 'highlight.js/styles/solarized-dark.css'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// override axios get for mock/development purposes
// ignore ts compiler because actual get is quite complex
// @ts-ignore
axios.get = async (url: string) => {
  if (url === '/posts') {
    await delay(1000)
    return Promise.resolve({
      data: [mockData.today, mockData.thisWeek, mockData.thisMonth]
    })
  }
}

// @ts-ignore
axios.post = async (url: string, payload: Post) => {
  if (url === '/posts') {
    await delay(1000)
    const id = random(100, 10000)
    return Promise.resolve({
      data: {id, ...payload}
    })
  }
}

import App from './App.vue'
import { Post } from './types'
console.log(App)

const app = createApp(App)
app.use(router)
app.mount('#app')

