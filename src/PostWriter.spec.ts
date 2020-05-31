import { mount } from '@vue/test-utils'
import PostWriter from './PostWriter.vue'
import { basePost } from './mocks'

// make assertion on event that gets emitted

describe('PostWriter.vue', () => {
  it('composes a post and emits the new data', () => {

    const wrapper = mount(PostWriter, {
      props: {
        post: {
          ...basePost
        }
      }
    })

    console.log(wrapper.emitted())

  })

})