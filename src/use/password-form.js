import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {useField, useForm} from "vee-validate"
import * as yup from "yup"
import {computed, ref, watch} from "vue"

export function usePasswordForm(email) {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting} = useForm()

  const MIN_LENGTH = 7
  const MAX_LENGTH = 32

  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("Обязательное поле")
      .min(MIN_LENGTH, `Пароль не может быть короче ${MIN_LENGTH} символов`)
      .max(MAX_LENGTH, `Пароль не может быть длиннее ${MAX_LENGTH} символов`)
  )

  const changeValueInput = computed(() => {
    return password.value
  })

  watch(changeValueInput || email.value, val => {
    if (val) {
      formError.value = ''
    }
  })

  let formError = ref('')

  const onSubmit = handleSubmit(async values => {
    try {
      store.commit('setIsLoading', true)
      await store.dispatch('auth/savePassword', {email, password: values.password})
      await router.push({name: 'login'})
    } catch (e) {
      formError.value = e.response?.data?.message
    } finally {
      store.commit('setIsLoading', false)
    }
  })

  return {
    pError,
    pBlur,
    password,
    onSubmit,
    isSubmitting,
    formError
  }
}
