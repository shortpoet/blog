<template>
<form action="submit" @submit.prevent="submit">
  <FormInput type="text" name="Username" v-model="username" :error="usernameStatus.message"/>
  <span v-if="availableUsername"></span>
  <span v-else>&otimes; Username not available</span>
  <FormInput type="password" name="Password" v-model="password" :error="passwordStatus.message"/>
  <FormInput type="password" name="Confirm Password" v-model="confirmPass" :error="confirmStatus.message"/>
  <button class="button is-success" :disabled="!usernameStatus.valid || !passwordStatus.valid ">Submit</button>
</form>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import FormInput from './FormInput.vue'
import { required, length, validate, Status, match } from '../../utils/validators'
import { useStore } from '../store'
import { useModal } from './useModal'
import  { IUser } from '../interfaces/IUser'

export default defineComponent({
  name: 'Signin',
  components: {
    FormInput
  },

  setup () {
    const username = ref('username')
    const password = ref('password')
    const confirmPass = ref('')

    const availableUsername = computed(async()=> {
      // const user = await store.getUser(username.value);
      // console.log(user);
      // if(user) {
      //   console.log('has user');
      //   return false
      // } else {
      //   console.log('available');
      //   return true
      // }
      return true
    })

    const store = useStore()
    const modal = useModal()

    watch(username, async (uname) => {
      if (!uname) return; // defensive programming: null checks
      const user = await store.getUser(uname);
      console.log(user);
    });
 
    
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
    const confirmStatus = computed<Status>(() => {
      return validate(
        password.value, 
        [
          required(),
          length({
            min: 10,
            max: 40
          }),
          match(confirmPass.value)
        ]
      )
    })


    const submit = (e: any) => {
      // this is a ref so use value
      if (!usernameStatus.value.valid || !passwordStatus.value.valid || !confirmStatus.value.valid) {
        return 
      }

      // const user = store.getUser(user)
      // createUser logs user in by default
      modal.hideModal()

    }

    return {
      username,
      usernameStatus,
      availableUsername,
      password,
      passwordStatus,
      confirmPass,
      confirmStatus,
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