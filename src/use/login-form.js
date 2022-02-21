import {useForm, useField} from "vee-validate"
import * as yup from "yup"
import {computed, ref, watch} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()
  const { handleSubmit, isSubmitting } = useForm()

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("Email - обязательное поле")
      .email("Email должен быть корректным")
  )

  const MIN_LENGTH = 7
  const MAX_LENGTH = 32

  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("Пароль - обязательное поле")
      .min(MIN_LENGTH, `Пароль не может быть короче ${MIN_LENGTH} символов`)
      .max(MAX_LENGTH, `Пароль не может быть длиннее ${MAX_LENGTH} символов`)
  )

  const changeValueInput = computed(() => {
    return password.value || email.value
  })

  watch(changeValueInput || email.value, val => {
    if (val) {
      formError.value = ''
    }
  })

  let formError = ref('')

  const onSubmit = handleSubmit(async values => {
    try {
      store.commit("setIsLoading", true)
      await store.dispatch('auth/loginPassword', {...values})
      await router.push({name: 'auth-code'})
    } catch (e) {
      formError.value = e.response?.data?.message
    } finally {
      store.commit("setIsLoading", false)
    }
  })

  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    formError
  }
}
