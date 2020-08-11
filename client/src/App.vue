<template>
  <div class="modal" :style="style">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="modal.hideModal"></button>
  </div>

  <section class="section">
    <div class="container">
      <NavBar />
      <router-view />
    </div>
  </section>

</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import FormInput from './components/FormInput.vue'
import { useModal } from './composables/useModal'
import { required, length, validate, Status } from '../utils/validators'
import { provideStore, useStore } from './store'
import NavBar from './components/NavBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    FormInput
  },

  setup () {

    provideStore()
    const modal = useModal()
    const username = ref('username')
    
    // derive validity of username in computed property
    // typed as status
    const usernameStatus = computed<Status>(() => {
      return validate(
        username.value, 
        [
          required(),
          length({
            min: 5,
            max: 20
          })
        ]
      )
    })

    const style = computed(() => ({
      display: modal.visible.value ? 'block' : 'none'
    }))

    return {
      style,
      modal,
      username,
      usernameStatus
    }
  }
})
</script>
