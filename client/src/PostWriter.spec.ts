import { mount } from '@vue/test-utils'
import PostWriter from './PostWriter.vue'
import { basePost } from './mocks'
import { log } from './colorLog.js'
// make assertion on event that gets emitted

describe('PostWriter.vue', () => {
  it('composes a post and emits the new data', (done) => {

    const wrapper = mount(PostWriter, {
      props: {
        post: {
          ...basePost
        }
      }
    })

    
    wrapper.find('[data-test="post-title"]').setValue('New post title')
    // not all elements - eg. Buttons - have inner text
    // give a hint to typescript <> to get rid of error
    wrapper.find<HTMLDivElement>('[data-test="markdown"]').element.innerText = '### Content'
    wrapper.find('[data-test="markdown"]').trigger('input')
    
    // test passes but nothing is logged without done() call
    // jest doesn't wait for timeout to run so expectation is not run
    // tell jest to wait by passing done callback to it
    // until done is called jest will wait and test is not going to finish


    setTimeout(
      () => {
        wrapper.find('[data-test="submit-post"]').trigger('click')
        // save event first instance first payload
        expect(wrapper.emitted().save[0][0].title).toBe('New post title')
        expect(wrapper.emitted().save[0][0].markdown).toBe('### Content')
        expect(wrapper.emitted().save[0][0].html).toBe('<h3 id="content">Content</h3>\n')
        log('green', wrapper.emitted().save)
        done()
      }, 
      550
    )

  })

})