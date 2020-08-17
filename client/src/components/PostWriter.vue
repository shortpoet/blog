<template>
  <div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Post Title</div>
          <div class="control">
            <input type="text" v-model="title" class="input" data-test="post-title" />
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
        <!-- box panel message card content textarea input -->
        <div contenteditable id="markdown" class="box" ref="contentEditable" @input="handleEdit" data-test="markdown">
        </div>
      </div>
      <div class="column is-one-half">
        <div v-html="html"></div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <button @click="submit" class="button is-primary is-pulled-right" data-test="submit-post">
          Submit
        </button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { IPost } from '../interfaces/IPost'
import marked from 'marked'
import hljs from 'highlight.js'
import debounce from 'lodash/debounce'

export default defineComponent({
  name: 'PostWriter',

  props: {
    post: {
      type: Object as () => IPost,
      required: true
    }
  },
  
  setup(props, ctx) {
    const title = ref(props.post.title)

    // declare new ref with initial value null
    // because needs to execute setup first
    const contentEditable = ref<null | HTMLDivElement>(null)

    const markdown = ref(props.post.markdown)

    const html = ref('')

    const options : marked.MarkedOptions =  {
      // takes function that return code with syntax hightlighting
      highlight: (code: string) => hljs.highlightAuto(code).value
    }

    const handleEdit = () => {
      markdown.value = contentEditable.value.innerText
    }

    // debouncing
    // pass a timer
    // calls function
    // if function called again during duration
    // restarts timer
    // only calls function after time has passed
    
    // wrap function in debounce for added performance
    // const update = debounce(
    //   (value: string) => html.value = parse(value, options),
    //   500
    // )

    // watch(
    //   () => markdown.value, 
    //   (value) => update(value),
    //   // use optional 3rd arguement to have watch function called onMounted instead of manually copying logic in that hook
    //   { immediate: true }
    // )

    // when passing same variable to diff functions - good chance to refactor

    const update = (value: string) => html.value = marked.parse(value, options)

    watch(
      () => markdown.value,
      // still a function with same signature - just a func returning string so can pass in like this
      debounce(update, 500),
      // use optional 3rd arguement to have watch function called onMounted instead of manually copying logic in that hook
      { immediate: true }
    )


    const submit = () => {

      const post: IPost = {
        // spread 
        ...props.post,
        title: title.value,
        markdown: markdown.value,
        html: html.value
      }

      ctx.emit(
        'save',
        post
      )

    }

    // need to use on mounted hook to manually update a dom element to ensure it isn't null
    onMounted(() => {
      contentEditable.value.innerText = markdown.value
    })

    return {
      title,
      contentEditable,
      handleEdit,
      markdown,
      html,
      submit
    }
  }
})
</script>
