import { mount } from "@vue/test-utils"
import Home from './Home.vue'
import { nextTick } from "vue"
import flushPromises from 'flush-promises'
import { today, thisWeek, thisMonth } from "./mocks"

// wrapping the curly brackets in parentheses makes the function 'return'
jest.mock(('axios'), () => ({
  get: (url: string) => ({
    data: [today, thisWeek, thisMonth]
  })
}))

// vs
// jest.mock(('axios'), () => {
//   get: (url: string) => {
//   }
// })



describe('Home.vue', () => {
  it('renders a loader ', () => {
    const wrapper = mount(Home)
    console.log(wrapper.html())
    expect(wrapper.find('[data-test="progress"]').exists()).toBe(true)
  })

  // adding done callback and commenting out assertion enables the axios network error to be logged
  // otherwise test fails before it happens 
  it('renders 3 time periods', async () => {
    const wrapper = mount(Home)
    await flushPromises()
    console.log(wrapper.html())

    expect(wrapper.findAll('[data-test="period"]')).toHaveLength(3)
  })

  it('updated the period when clicked', async () => {
    const wrapper = mount(Home)

    // to not get stuck on load state call
    await flushPromises()

    // using $ to represent DOM elements, going back to jQuery days
    const $today = wrapper.findAll('[data-test="period"]')[0]
    expect($today.classes()).toContain('is-active')
    
    const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
    await $thisWeek.trigger('click')

    expect($today.classes()).not.toContain('is-active')
    expect($thisWeek.classes()).toContain('is-active')

    const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
    await $thisMonth.trigger('click')

    expect($thisWeek.classes()).not.toContain('is-active')
    expect($thisMonth.classes()).toContain('is-active')

  })

  it('renders todays post by default', async () => {
    const wrapper = mount(Home)

    await flushPromises()

    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(1)

    const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
    await $thisWeek.trigger('click')

    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(2)

    const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
    await $thisMonth.trigger('click')

    expect(wrapper.findAll('[data-test="post"]')).toHaveLength(3)
  })

})
