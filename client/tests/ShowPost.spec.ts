import { mount } from "@vue/test-utils"
import ShowPost from '../src/components/ShowPost.vue'
import flushPromises from 'flush-promises'
import { today } from "./mocks"
import { createStore } from "../src/store"
import { AxiosRequestConfig } from "axios"
import { makeRouter } from "../src/router"

// wrapping the curly brackets in parentheses makes the function 'return'
jest.mock(('axios'), () => ({
  post: (url: string, query: string, config: AxiosRequestConfig) => ({
    data: {
      data: {
        createPost: today
      }
    },
    status: 200  
}),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() }
  }
}))



describe('ShowPost.vue', () => {

  // to inject store in each component
  // pass options object using global::provide keys

  const createShowPost = () => {
    return mount(
      ShowPost,
      {
        global: {
          provide: {
            store: createStore()
          },
          plugins: [makeRouter()]
        }
      }
    )
  }

  it.only('does not render an edit link when no user is logged in', async () => {
    // createShowPost()
  })
  it('does not render an edit link when not authorized', async () => {})
  it('does render an edit link when authorized', async () => {})

})
