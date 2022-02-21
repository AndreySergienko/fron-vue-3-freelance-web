import {useStore} from "vuex"
import {useField, useForm} from "vee-validate"
import * as yup from "yup"
import {computed, ref, watch} from "vue"

export function useSaleForm(items, type) {
  const store = useStore()
  const {handleSubmit, isSubmitting} = useForm()


  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    "title",
    yup
      .string()
      .trim()
      .required("Название - Обязательное поле")
  )

  const { value: price, errorMessage: pError, handleBlur: pBlur } = useField(
    "price",
    yup
      .string()
      .trim()
      .required("Скидки - Обязательное поле")
      .max(2, 'Скидка не может быть больше 99%')
  )

  const changeValueInput = computed(() => {
    return title.value || price.value
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
      const data = await store.dispatch('sales/createSale', {title: values.title, price: values.price, items, type})
      await store.dispatch('setMessage', {
        type: 'primary',
        value: `Акция ${data.description} создана`
      })
    } catch (e) {
      formError.value = e.response?.data?.message
    } finally {
      store.commit('setIsLoading', false)
    }
  })

  return {
    tError,
    tBlur,
    title,
    pBlur,
    pError,
    price,
    onSubmit,
    isSubmitting,
    formError,

  }
}
