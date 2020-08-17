<template>
  <div style="display: flex; flex-direction: row; justify-content: space-between">
    <router-link data-test="post" :to="to" class="panel-block" style="flex-grow: 2">
      <div>

        <!-- 
          exercise for listener
          title rendered correctly 
        -->

        <a>{{ post.title }}</a>
        <div>{{ post.created.format('Do MMM HH:mm:ss') }}</div>
      </div>
    </router-link>
    <button class="button is-pulled-right is-rounded" @click.prevent="onDelete" style="">
      <i class="fa fa-trash"></i>
    </button>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IPost } from "../interfaces/IPost";
import { useStore } from "../store";

export default defineComponent({

  props: {
    post: {
      type: Object as () => IPost,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const onDelete = () => store.deletePost(props.post.id)

    return {
      to: `/posts/${props.post.id}`,
      onDelete
    }
  }
})
</script>
