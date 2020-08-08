<template>
<form action="submit" @submit.prevent="submit">
  <FormInput type="text" name="Username" v-model="username" :error="usernameStatus.message"/>
  <FormInput type="password" name="Password" v-model="password" :error="passwordStatus.message"/>
  <button class="button is-success" :disabled="!usernameStatus.valid || !passwordStatus.valid ">Submit</button>
</form>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import FormInput from './FormInput.vue'
import { required, length, validate, Status } from '../../utils/validators'
import { useStore } from '../store'
import { useModal } from '../composables/useModal'
import  { User } from '../interfaces/User'

export default defineComponent({
  name: 'Signup',
  components: {
    FormInput
  },

  setup () {
    const username = ref('username')
    const password = ref('password')

    

    // derive validity of username in computed property
    // typed as status
    const usernameStatus = computed<Status>(() => {
      return validate(
        username.value, 
        [
          required(),
          length({
            min: 5,
            max: 20
          })
        ]
      )
    })

    const passwordStatus = computed<Status>(() => {
      return validate(
        password.value, 
        [
          required(),
          length({
            min: 10,
            max: 40
          })
        ]
      )
    })

    const store = useStore()
    const modal = useModal()

    const submit = (e: any) => {
      // this is a ref so use value
      if (!usernameStatus.value.valid || !passwordStatus.value.valid) {
        return 
      }

      const user: User = {
        // use -1 to represent user that has not yet been persisted in a db
        id: -1,
        username: username.value,
        password: password.value
      }

      store.createUser(user)
      // createUser logs user in by default
      modal.hideModal()

    }

    return {
      username,
      usernameStatus,
      password,
      passwordStatus,
      submit
    }
  }
})
</script>

<style  scoped>
form {
  background: white;
  padding: .5rem;
}
</style>