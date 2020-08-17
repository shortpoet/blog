<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons">

        <router-link to="/" class="button">Home</router-link>

        <div v-if="currentUserId">
          <!-- <router-link class="button" :to="{path: '/posts/new', params: {userId: currentUserId}}">New Post</router-link> -->
          <router-link class="button" :to="{path: '/posts/new'}">New Post</router-link>
          <button class="button" @click="onSignOut">Sign Out</button>
        </div>

        <div v-else>
          <button class="button" @click="onSignIn">Sign In</button>
          <button class="button" @click="onSignUp">Sign Up</button>
        </div>
        
      </div>
      </div>

    <teleport to="#modal" v-if="modal.visible">
      <component :is="component" :modal="modal"/>
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
  setup() {
    const modal = useModal()
    const store = useStore()
    store.getState().authors.currentId
    const currentUserId = computed(() => store.getState().authors.currentId)
    const onSignUp = async () => {
      console.log("on signup");
      modal.component.value = markRaw(Signup)
      modal.showModal()
    }
    const onSignIn = async () => {
      console.log("on signin");
      modal.component.value = markRaw(Signin)
      modal.showModal()
    }
    const onSignOut = () => {
      console.log("on signout");
      store.logout();
    }
    return {
      modal,
      onSignUp,
      onSignIn,
      onSignOut,
      currentUserId,
      component: modal.component
    }
  }
})
</script>