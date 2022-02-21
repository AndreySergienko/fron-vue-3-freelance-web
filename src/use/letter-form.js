import {useForm, useField} from "vee-validate"
import * as yup from "yup"
import {computed, ref, watch} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"


export function useLetterForm() {
  const store = useStore()
  const router = useRouter()
  const { handleSubmit, isSubmitting } = useForm()

  const MIN_LENGTH = 5
  const MAX_LENGTH = 180

  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    "title",
    yup
      .string()
      .trim()
      .required("Заголовок - обязательное поле")
      .min(MIN_LENGTH, `Заголовок не может быть короче ${MIN_LENGTH} символов`)
  )

  const { value: subtitle, errorMessage: stError, handleBlur: stBlur } = useField(
    "subtitle",
    yup
      .string()
      .trim()
      .required("Подзаголовок - обязательное поле")
      .min(MIN_LENGTH, `Подзаголовок не может быть короче ${MIN_LENGTH} символов`)
  )

  const { value: text, errorMessage: txtError, handleBlur: txtBlur } = useField(
    "text",
    yup
      .string()
      .trim()
      .required("Описание - обязательное поле")
      .min(MIN_LENGTH, `Описание не может быть короче ${MIN_LENGTH} символов`)
      .max(MAX_LENGTH, `Описание не может быть длиннее ${MAX_LENGTH} символов`)
  )

  const printText = (e) => {
    text.value = e
  }

  const changeValueInput = computed(() => {
    return text.value || subtitle.value || title.value
  })

  watch(changeValueInput, val => {
    if (val) {
      formError.value = ''
    }
  })


  let formError = ref('')

  const onSubmit = handleSubmit(async values => {
    try {
      store.commit("setIsLoading", true)
      await store.dispatch('letter/createLetter', {...values})
    } catch (e) {
      formError.value = e.response?.data?.message
    } finally {
      store.commit("setIsLoading", false)
    }
  })

  return {
    title,
    tError,
    tBlur,
    text,
    txtBlur,
    txtError,
    subtitle,
    stBlur,
    stError,
    onSubmit,
    isSubmitting,
    formError,
    printText
  }
}
