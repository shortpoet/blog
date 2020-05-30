<template>
  <PostWriter :post="post" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './Navbar.vue'
import PostWriter from './PostWriter.vue'
import { Post } from './types'
import moment from 'moment'

export default defineComponent({
  name: 'NewPost',
  components: {
    NavBar,
    PostWriter
  },
  setup () {
    const post: Post = {
      // set id to -1 to represent post that has not yet been created in db
      id: -1,
      title: 'New Post',
      markdown: '## New Post\nEnter your post here...',
      html: '',
      created: moment(),
      authorId: 0
    }
    return {
       post
    }
  }
})
</script>
