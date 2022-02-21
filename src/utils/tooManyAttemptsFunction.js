import {computed, watch} from "vue"
import {useForm} from "vee-validate"

export function tooManyAttemptsFunction(isTooManyAttempts, delay = 15000) {
  const {submitCount} = useForm()

  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), delay)
    }
  })

  console.log(isTooManyAttempts)
  return isTooManyAttempts
}
