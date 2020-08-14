<template>
  <div class="field">
    <label :for="name" class="label">{{name}}</label>
    <div class="control"><input :type="type" class="input" :id="name" @input="handleInput" :value="modelValue"></div>
    <p class="help is-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({

    props: {
      // optional validation
      error: {
        type: String
      },
      type: {
        type: String,
        default: 'text'
      },
      name: {
        type: String,
        requred: true
      },
      modelValue: {
        type: String,
        required: true
      },
    },

    setup(props, ctx) {
      const handleInput = (event: any) => {
        // emitting special update event with modifier called modelValue updated the prop which is v-model
        ctx.emit('update:modelValue', event.target.value)
      }

      return {
        handleInput
      }

    }

  })

</script>

<style scoped>

</style>