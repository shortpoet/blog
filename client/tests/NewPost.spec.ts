import { mount } from "@vue/test-utils"
import NewPost from '../src/components/NewPost.vue'
import { createStore } from "../src/store"
import { log } from '../utils/colorLog'
import { IPost } from "../src/interfaces/IPost"

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

jest.mock('axios', () => ({
  post: (url: string, payload: IPost) => {
    return { data: payload }
  }
}))

describe('NewPost.vue', () => {
  it('creates a post and routes', async () => {
    const store = createStore()
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
    
    expect(store.getState().posts.ids).toHaveLength(0)
    
    await wrapper.find('[data-test="submit-post"]').trigger('click')
    await wrapper.vm.$nextTick()
        
    expect(store.getState().posts.ids).toHaveLength(1)
    expect(mockRoutes).toEqual(['/'])


  })
})