import { mount } from "@vue/test-utils"
import ShowPost from '../src/components/ShowPost.vue'
import flushPromises from 'flush-promises'
import { today, thisWeek, thisMonth } from "./mocks"
import { createStore, initialState } from "../src/store"
import { AxiosRequestConfig } from "axios"
import { makeRouter } from "../src/router"
import { chalkLog } from "../utils/chalkLog"

// process.on('unhandledRejection', (error) => {
//   // Will print "unhandledRejection err is not defined"
//   console.error('unhandledRejection', error);
// });

// wrapping the curly brackets in parentheses makes the function 'return'
jest.mock(('axios'), () => ({
  post: (url: string, query: string, config: AxiosRequestConfig) => ({
    data: {
      data: {
        createPost: today,
        posts: [today, thisWeek, thisMonth]
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
  it('does not render an edit link when no user is logged in', async () => {
    const store = createStore()
    const router = makeRouter()
    router.push('/posts/1')
    await router.isReady()
    const createShowPost = () => {
      return mount(
        ShowPost,
        {
          global: {
            provide: {
              store: store
            },
            plugins: [router]
          }
        }
      )
    }
    const wrapper = createShowPost()
    // chalkLog('green', store.getState().authors.currentId)
    // call flushpromises to ensure login state has resolved
    await flushPromises()
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false)
    // chalkLog('magentaBright', wrapper.html())

  })
  it('does not render an edit link when not authorized', async () => {
    const store = createStore({
      ...initialState(),
      authors: {
        ...initialState().authors,
        // ...iSS<IAuthor>(),
        currentId: '2'
      }
    })

    const router = makeRouter()
    router.push('/posts/1')
    await router.isReady()
    const createShowPost = () => {
      return mount(
        ShowPost,
        {
          global: {
            provide: {
              store: store
            },
            plugins: [router]
          }
        }
      )
    }

    const wrapper = createShowPost()
    // chalkLog('green', store.getState().authors.currentId)
    // call flushpromises to ensure login state has resolved
    await flushPromises()
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false)
    // chalkLog('magentaBright', wrapper.html())

  })
  it('does render an edit link when authorized', async () => {
    const store = createStore({
      ...initialState(),
      authors: {
        ...initialState().authors,
        // ...iSS<IAuthor>(),
        currentId: '1'
      }
    })

    const router = makeRouter()
    router.push('/posts/1')
    await router.isReady()
    const createShowPost = () => {
      return mount(
        ShowPost,
        {
          global: {
            provide: {
              store: store
            },
            plugins: [router]
          }
        }
      )
    }
    
    const wrapper = createShowPost()
    // chalkLog('green', store.getState().authors.currentId)
    // call flushpromises to ensure login state has resolved
    await flushPromises()
    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(true)
    // chalkLog('magentaBright', wrapper.html())


  })

})
