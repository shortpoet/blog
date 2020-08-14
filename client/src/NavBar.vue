<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="authenticated">
        <router-link class="button" to="/posts/new">New Post</router-link>
        <button class="button" @click="">Sign out</button>
      </div>

      <div class="buttons" v-else>
        <button class="button" @click="signin">Sign in</button>
        <button class="button" @click="signup">Signup</button>
      </div>
    </div>
    <teleport to="#modal" v-if="modal.visible">
      <component :is="componentComputed" />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useModal } from './useModal'
import Signup from './Signup.vue'
import Signin from './Signin.vue'
import { useStore } from './store'

export default defineComponent({
  setup() {
    const modal = useModal()
    const store = useStore()

    const authenticated = computed(() => store.getState().authors.currentUserId)
    const signup = () => {
      console.log("on signup");
      modal.component = Signup
      console.log(modal);
      console.log(modal.component);
      console.log(modal.visible.value);
      
      modal.showModal()
      console.log(modal.visible.value);
    }
    const signin = () => {
      console.log("on signin");
      modal.component = Signin
      console.log(modal);
      console.log(modal.component);
      console.log(modal.visible.value);
      
      modal.showModal()
      console.log(modal.visible.value);
    }
    const componentComputed = computed(() => {
      console.log('computing component');
      console.log(modal.component);
      
      return modal.component
    })

    return {
      modal,
      authenticated,
      signup,
      signin,
      componentComputed
    }
  }
})
</script>
