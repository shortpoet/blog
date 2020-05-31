import { createApp } from 'vue'
import axios from 'axios'
import * as mockData from './mocks'
import { router } from './router'

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

import App from './App.vue'
console.log(App)

const app = createApp(App)
app.use(router)
app.mount('#app')

