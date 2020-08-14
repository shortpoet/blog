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
    <!-- <Signup />
    <Signin /> -->

    <teleport to="#modal" v-if="modal.visible">
      <component :is="modal.component" />
    </teleport>

  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef, computed, markRaw, nextTick } from 'vue'
import {useModal} from '../composables/useModal'
import Signup from './Signup.vue'
import Signin from './Signin.vue'
import { useStore } from '../store'

export default defineComponent({
  name: 'NavBar',
  components: {
    Signup,
    Signin
  },
  setup() {
    const modal = useModal()
    const store = useStore()
    const authenticated = computed(() => store.getState().authors.currentId)
    const onSignUp = async () => {
      console.log("on signup");
      modal.component = markRaw(Signup)
      modal.showModal()
    }
    const onSignIn = async () => {
      console.log("on signin");
      // const user = await store.getUser('username')
      // console.log(user);

      modal.component = markRaw(Signin)
      modal.showModal()
    }
    const onSignOut = () => {}
    const componentComputed = computed(() => {
      console.log('computing component');
      console.log(modal.component);
      return `${modal.component}`
    })
    return {
      modal,
      onSignUp,
      onSignIn,
      onSignOut,
      authenticated,
      // Signin,
      // Signup,
      componentComputed
      // modalComponent
    }
  }
})
</script>