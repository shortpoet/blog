<template>
  <div>Post Editor</div>
  <PostWriter :post="post" @save="save"/>
</template>

<script lang="ts">
import { IPeriod } from '../interfaces/IPeriod'
import { IPost } from '../interfaces/IPost'
import TimelinePost from './TimelinePost.vue'
import { ref, computed, defineComponent } from 'vue'
import { useStore } from '../store'
import PostWriter from './PostWriter.vue'

import moment from 'moment'


import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'PostEditor',
  components: {
    PostWriter
  },

  async setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    const id = route.params.id as string
    const post = store.getState().posts.all[route.params.id as string]
    // const post = store.getState().posts.all[id]
    const canEdit = post.userId == parseInt(store.getState().authors.currentId, 10)
    if (!canEdit) {
      router.push('/')
    }

    const save = async (post: IPost) => {
      console.log('save');
      
      await store.updatePost(post)
      router.push('/')
    }

    return {
      post,
      to: `/posts/${post.id}/edit`,
      save
    }
  }
})
</script>