import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {useField, useForm} from "vee-validate"
import * as yup from "yup"
import {computed, ref, watch} from "vue"

export function useLoginCodeForm(email) {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting} = useForm()


  const MIN_LENGTH = 6
  const MAX_LENGTH = 6

  const {value: code, errorMessage: cError, handleBlur: cBlur} = useField(
    "code",
    yup
      .string()
      .trim()
      .required("Обязательное поле")
      .min(MIN_LENGTH, `Код не может быть короче ${MIN_LENGTH} символов`)
      .max(MAX_LENGTH, `Код не может быть длиннее ${MAX_LENGTH} символов`)
  )

  const changeValueInput = computed(() => {
    return code.value
  })

  watch(changeValueInput || email.value, val => {
    if (val) {
      formError.value = ''
    }
  })

  const maxLength = computed(() => {
    return String(code.value).length === 6
  })

  let formError = ref('')

  const onSubmit = handleSubmit(async values => {
    try {
      store.commit('setIsLoading', true)
      await store.dispatch('auth/loginCode', {email, ...values})
      await router.push({name: 'admin'})
    } catch (e) {
      formError.value = e.response?.data?.message
    } finally {
      store.commit('setIsLoading', false)
    }
  })


  watch(maxLength, async val => {
    if (val) {
      await onSubmit()
      code.value = ''
    }
  })

  return {
    cError,
    cBlur,
    code,
    onSubmit,
    isSubmitting,
    maxLength,
    formError
  }
}
