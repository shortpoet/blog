import { mount } from "@vue/test-utils"
import NewPost from '../src/components/NewPost.vue'
import { createStore, initialState, State, initialStoreState, iSS } from "../src/store"
import { IPost } from "../src/interfaces/IPost"
import { today, thisWeek, thisMonth } from "./mocks"
import { chalkLog } from "../utils/chalkLog"
import { IAuthor } from "../src/interfaces/IAuthor"
import { AxiosRequestConfig } from "axios"

process.on('unhandledRejection', (error) => {
  // Will print "unhandledRejection err is not defined"
  console.error('unhandledRejection', error);
});


// simple mock implementation of vue router
const mockRoutes = []
// (again) not wrapping the returned object in parens causes fail!
// (again) both nested functions need wrapping
// (clue) is greyed out XD
jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: (url: string) => {mockRoutes.push(url)}
  })
}))

jest.mock(('axios'), () => ({
  get: (url: string) => ({
    posts: [today, thisWeek, thisMonth]
  }),
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

describe('NewPost.vue', () => {
  it('creates a post and routes', async () => {
    const store = createStore({
      ...initialState(),
      authors: {
        ...initialState().authors,
        // ...iSS<IAuthor>(),
        currentId: 1
      }
    })
    const wrapper = mount(
      NewPost,
      {
        global: {
          provide: {
            store
          }
        }
      }  
    )
    // store.setCurrentUser({ id: 1, username: 'u', password: 'p' })
    chalkLog('green', store.getState().authors.currentId)
    expect(store.getState().posts.ids).toHaveLength(0)
    
    await wrapper.find('[data-test="submit-post"]').trigger('click')
    await wrapper.vm.$nextTick()
        
    expect(store.getState().posts.ids).toHaveLength(1)
    expect(mockRoutes).toEqual(['/'])


  })
})