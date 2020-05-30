<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Post Title</div>
          <div class="control">
            <input type="text" v-model="title" class="input" />
            <!-- vue automatically calls .value on a ref -->
            {{ title }}
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-half">
        <!-- input only uses text on one line
        textarea does not implement syntax highlighting and other features
        contentEditable allows to write any text in div
        but can't use with v-model - implementation here -->

        <!-- new kind of ref 'template ref' to keep track of user entered value instead of v-model -->
        <div contenteditable id="markdown" ref="contentEditable" @input="handleEdit">
        </div>
      </div>
      <div class="column is-one-half">
        <div v-html="html"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import NavBar from './Navbar.vue'
import { Post } from './types'
import { parse } from 'marked'

export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  },
  setup(props) {
    const title = ref(props.post.title)

    // declare new ref with initial value null
    // because needs to execute setup first
    const contentEditable = ref<null | HTMLDivElement>(null)

    const markdown = ref(props.post.markdown)

    const html = ref('')

    const handleEdit = () => {
      markdown.value = contentEditable.value.innerText
    }

    watch(
      () => markdown.value, 
      (value) => html.value = parse(value),
      // use optional 3rd arguement to have watch function called onMounted instead of manually copying logic in that hook
      { immediate: true }
    )

    // need to use on mounted hook to manually update a dom element to ensure it isn't null
    onMounted(() => {
      contentEditable.value.innerText = markdown.value
    })

    return {
      title,
      contentEditable,
      handleEdit,
      markdown,
      html
    }
  }
})
</script>
