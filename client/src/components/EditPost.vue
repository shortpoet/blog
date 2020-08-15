<template>
  <Suspense>
    <template #default>
      <PostEditor />
    </template>
    <template #fallback>
      <Progress />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostEditor from './PostEditor.vue'
import Progress from './Progress.vue'
export default defineComponent({
  name: 'ShowPost',
  components: {
    PostEditor,
    Progress
  }
})
</script>