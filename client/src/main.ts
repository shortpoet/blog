import 'highlight.js/styles/solarized-dark.css'
import { router } from './router'
import * as mockData from '../tests/mocks'
import App from './App.vue'
import { Post } from "./interfaces/Post"

// technically correct method for vite due to native ES imports not supporting bare module imports
// but vue has special treatment and will error if you do it the other way
// https://github.com/vitejs/vite#bare-module-resolving 

import random from 'lodash/random'
import { createApp } from 'vue'
// import vue from 'vue'
import axios from 'axios'
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

console.log(App)

const app = createApp(App)
app.use(router)
app.mount('#app')
