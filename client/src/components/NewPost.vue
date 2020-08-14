<template>
  <PostWriter :post="post" @save="save"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostWriter from './PostWriter.vue'
import { IPost } from '../interfaces/IPost'
import moment from 'moment'
import { useStore } from '../store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NewPost',
  components: {
    PostWriter
  },
  setup () {
    const post: IPost = {
      // set id to -1 to represent post that has not yet been created in db
      id: -1,
      title: 'New IPost',
      markdown: '## New IPost\nEnter your post here...',
      html: '',
      created: moment(),
      userId: 0
    }

    // composition functions
    // useRouter internally use inject and provide
    // if moved to within a different context eg nested function get error
    // inject can only be used within setup function

    const store = useStore()

    const router = useRouter()

    const save = async (post: IPost) => {
      await store.createPost(post)
      router.push('/')
    }
    
    return {
       post,
       save
    }
  }
})
</script>
