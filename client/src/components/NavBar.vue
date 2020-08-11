<template>
  <nav class="navbar">
    <div class="navbar-end">

      <div class="buttons" v-if="authenticated">
        <router-link class="button" to="/posts/new">New IPost</router-link>
        <button class="button" @click="onSignOut">Sign Out</button>
      </div>

      <div class="buttons" v-else>
        <button class="button" @click="onSignIn">Sign In</button>
        <button class="button" @click="onSignUp">Sign Up</button>
      </div>


    </div>

    <teleport to="#modal" v-if="modal.visible">
      <component :is="modal.component" />
    </teleport>

  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {useModal} from '../composables/useModal'
import Signup from './Signup.vue'
import { useStore } from '../store'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const modal = useModal()
    const store = useStore()
    const authenticated = store.getState().authors.currentId
    const onSignUp = () => {
      console.log("on signup");
      
      modal.component = Signup
      
      modal.showModal()
    }
    const onSignIn = () => {
      modal.component = Signup
      modal.showModal()
    }
    const onSignOut = () => {}
    return {
      modal,
      onSignUp,
      onSignIn,
      onSignOut,
      authenticated,
      // Signup
    }
  }
})
</script>