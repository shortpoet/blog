<template>
  <router-link data-test="post" :to="to" class="panel-block">
    <div>

      <!-- 
        exercise for listener
        title rendered correctly 
      -->

      <a>{{ post.title }}</a>
      <div>{{ post.created.format('Do MMM HH:mm:ss') }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IPost } from "../interfaces/IPost";

export default defineComponent({
  props: {
    post: {
      type: Object as () => IPost,
      required: true
    }
  },
  setup(props) {
    return {
      to: `/posts/${props.post.id}`
    }
  }
})
</script>
