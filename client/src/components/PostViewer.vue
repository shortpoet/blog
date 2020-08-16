<template>
  <router-link data-test="can-edit" v-if="canEdit" :to="to" class="button is-rounded is-link">
    <i class="fas fa-edit" />
  </router-link>
  <div>Post Title is: {{ post.title }}</div>
</template>

<script lang="ts">
import { IPeriod } from '../interfaces/IPeriod'
import { IPost } from '../interfaces/IPost'
import TimelinePost from './TimelinePost.vue'
import { ref, computed, defineComponent } from 'vue'
import { useStore } from '../store'

import moment from 'moment'
import { useRoute } from 'vue-router'
import { chalkLog } from '../../utils/chalkLog'

export default defineComponent({
  name: 'PostViewer',
  components: {
    TimelinePost
  },
  async setup() {
    const route = useRoute()
    const store = useStore()

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }


    const id = route.params.id as string
    const post = store.getState().posts.all[route.params.id as string]
    // console.log('post viewer');
    
    // chalkLog('green', `id: ${id}`)
    // chalkLog('blue', `path: ${route.path}`)
    // chalkLog('cyan', post)
    // chalkLog('green', id)
    const canEdit = post.userId == parseInt(store.getState().authors.currentId, 10)
    // const post = store.getState().posts.all[id]
    return {
      post,
      to: `/posts/${post.id}/edit`,
      canEdit
    }
  }
})
</script>