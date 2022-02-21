import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {useField, useForm} from "vee-validate"
import * as yup from "yup"
import {computed, ref, watch} from "vue"

export function useResetForm() {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting} = useForm()


  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("Обязательное поле")
      .email("Необходимо ввести корректный email")
  )

  const changeValueInput = computed(() => {
    return email.value
  })

  watch(changeValueInput, val => {
    if (val) {
      formError.value = ''
    }
  })

  let formError = ref('')

  const onSubmit = handleSubmit(async values => {
    try {
      store.commit('setIsLoading', true)
      await store.dispatch('auth/reset', values.email)
      await router.push({name: 'login'})
    } catch (e) {
      formError.value = e.response?.data?.message
    } finally {
      store.commit('setIsLoading', false)
    }
  })

  return {
    eError,
    eBlur,
    email,
    onSubmit,
    isSubmitting,
    formError
  }
}
