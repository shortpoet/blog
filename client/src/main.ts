import 'highlight.js/styles/solarized-dark.css'
import { router } from './router'
import App from './App.vue'
import { IPost } from "./interfaces/IPost"
import { createApp } from 'vue'
// import vue from 'vue'
// vue.createApp()
// technically correct method for vite due to native ES imports not supporting bare module imports
// but vue has special treatment and will error if you do it the other way
// https://github.com/vitejs/vite#bare-module-resolving 

import random from 'lodash/random'
import axios from 'axios'

import * as mockData from '../tests/mocks'

// axios vs fetch with implementations
// https://blog.logrocket.com/axios-or-fetch-api/
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// override axios get for mock/development purposes
// ignore ts compiler because actual get is quite complex
// @ts-ignore
// axios.get = async (url: string) => {
//   if (url === '/posts') {
//     await delay(1000)
//     return Promise.resolve({
//       data: [mockData.today, mockData.thisWeek, mockData.thisMonth]
//     })
//   }
// }

// // @ts-ignore
// axios.post = async (url: string, payload: (IPost | IUser)) => {
//   if (url === '/posts') {
//     await delay(1000)
//     const id = random(100, 10000)
//     return Promise.resolve({
//       data: {id, ...payload}
//     })
//   }
// // @ts-ignore
// axios.put = async (url: string, payload: (IPost | IUser)) => {
//   if (url === '/posts') {
//     await delay(1000)
//     return Promise.resolve({
//       data: payload
//     })
//   }

//   if (url === '/users') {
//     console.log('users endpoint');
//     console.log(payload);
//     await delay(1000)
//     const id = random(100, 10000)
//     // trick to pluck out an entry from an object
//     const { id: oldId, password, ...rest } = payload
    
//     return Promise.resolve({
//       data: {id, ...rest}
//     })
//   }

// }

// console.log(App)

const app = createApp(App)
app.use(router)
app.mount('#app')
