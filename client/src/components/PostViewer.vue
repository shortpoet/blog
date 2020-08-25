<template>
  <div class="columns">
    <div class="column"/>
    <div class="column is-two-thirds">
      <router-link data-test="can-edit" v-if="canEdit" :to="to" class="button is-pulled-right is-rounded is-link">
        <i class="fas fa-edit" />
      </router-link>
      <h1>
        Post Title is: {{ post.title }}
      </h1>
      <div class="post-body" v-html="html"></div>
    </div>
    <div class="column"/>
  </div>
</template>

<script lang="ts">
import { IPeriod } from '../interfaces/IPeriod'
import { IPost } from '../interfaces/IPost'
import TimelinePost from './TimelinePost.vue'
import { ref, computed, defineComponent } from 'vue'
import { useStore } from '../store'
import { useMarkdown } from '../composables/useMarkdown'

import marked from "marked"
import hljs from "highlight.js"

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
    
    const markdown = useMarkdown().update

    const options : marked.MarkedOptions =  {
      // takes function that return code with syntax hightlighting
      highlight: (code: string) => hljs.highlightAuto(code).value
    }

    const update = (value: string) => marked.parse(value, options)

    const html = ref(update(post.html))

return {
      post,
      to: `/posts/${post.id}/edit`,
      canEdit,
      markdown,
      html
    }
  }
})
</script>