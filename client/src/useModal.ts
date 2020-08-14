
import { ref, readonly } from 'vue'

const visible = ref(false)
let count = 0

export function useModal() {
  return {
    id: count++,
    component: null,
    visible: readonly(visible),
    showModal: () => visible.value = true,
    hideModal: () => visible.value = false,
  }
}
