<template>
  <PostWriter :post="post" @save="save"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostWriter from './PostWriter.vue'
import { IPost } from '../interfaces/IPost'
import moment from 'moment'


import { useStore } from '../store'
import { useRouter, useRoute } from 'vue-router'
import { colorLog } from '../../utils/colorLog'

export default defineComponent({
  name: 'NewPost',
  components: {
    PostWriter
  },
  props: {
    currentUserId: {
      type: Number
    }
  },
  setup (props) {
    
    const store = useStore()

    const post: IPost = {
      // set id to -1 to represent post that has not yet been created in db
      id: -1,
      title: 'New Post',
      markdown: '## New Post\nEnter your post here...',
      html: '',
      created: moment(),
      userId: parseInt(store.getState().authors.currentId)

    }

    // composition functions
    // useRouter internally use inject and provide
    // if moved to within a different context eg nested function get error
    // inject can only be used within setup function


    const router = useRouter()

    const save = async (post: IPost) => {
      console.log('save');
      
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
