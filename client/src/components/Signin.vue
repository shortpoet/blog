<template>
<form action="submit" @submit.prevent="submit">
  <FormInput type="text" name="Username" v-model="username" :error="usernameStatus.message"/>
  <FormInput type="password" name="Password" v-model="password" :error="passwordStatus.message"/>
  <button class="button is-success" :disabled="!usernameStatus.valid || !passwordStatus.valid ">Submit</button>
</form>

<teleport to="#modal" v-if="successModal.visible">
  <div style="display: flex; align-items: center;">Logged in as: {{ loggedInUsername }}</div>
</teleport>

</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import FormInput from './FormInput.vue'
import { required, length, validate, Status } from '../../utils/validators'
import { useStore } from '../store'
import { useModal } from '../composables/useModal'
import  { IUser } from '../interfaces/IUser'

export default defineComponent({
  name: 'Signin',
  components: {
    FormInput
  },
  props: {
    modal: {
      type: Object
    }
  },
  setup (props) {
    const username = ref('username')
    const password = ref('password')
    const loggedInUsername = ref()

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
    const successModal = useModal('success')


    const submit = async (e: any) => {
      // this is a ref so use value
      if (!usernameStatus.value.valid || !passwordStatus.value.valid) {
        return 
      }
      const user = await store.login(username.value, password.value);
      loggedInUsername.value = user.username;
      props.modal.hideModal();
      // can't chain modal calls unless they are registered and used with id bec app modal just acts on any modal
      // successModal.showModal();
    }

    return {
      username,
      usernameStatus,
      password,
      passwordStatus,
      submit,
      successModal,
      loggedInUsername
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