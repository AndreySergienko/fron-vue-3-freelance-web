import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {useField, useForm} from "vee-validate"
import * as yup from "yup"
import {computed, ref, watch} from "vue"

export function usePersonalForm(email) {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting} = useForm()

  const MIN_LENGTH = 7
  const MAX_LENGTH = 32

  const { value: currentPassword, errorMessage: pError, handleBlur: pBlur } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("Текущий пароль - Обязательное поле")
      .min(MIN_LENGTH, `Пароль не может быть короче ${MIN_LENGTH} символов`)
      .max(MAX_LENGTH, `Пароль не может быть длиннее ${MAX_LENGTH} символов`)
  )

  const { value: newPassword, errorMessage: npError, handleBlur: npBlur } = useField(
    "newPassword",
    yup
      .string()
      .trim()
      .required("Новый пароль - Обязательное поле")
      .min(MIN_LENGTH, `Пароль не может быть короче ${MIN_LENGTH} символов`)
      .max(MAX_LENGTH, `Пароль не может быть длиннее ${MAX_LENGTH} символов`)
  )

  const changeValueInput = computed(() => {
    return currentPassword.value || newPassword.value
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
      await store.dispatch('auth/changeCurrentPassword',
        {email, currentPassword: values.password, newPassword: values.newPassword})
      await store.dispatch('auth/logout')
      await router.push({name: 'login'})
    } catch (e) {
      formError.value = e.response?.data?.message
    } finally {
      store.commit('setIsLoading', false)
    }
  })

  return {
    pError,
    npError,
    npBlur,
    pBlur,
    newPassword,
    currentPassword,
    onSubmit,
    isSubmitting,
    formError
  }
}
