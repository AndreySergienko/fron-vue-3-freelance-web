import {useForm, useField} from "vee-validate"
import * as yup from "yup"
import {computed, ref, watch} from "vue"
import {useStore} from "vuex"

export function useWebinarsForm() {
  const store = useStore()
  const { handleSubmit, isSubmitting } = useForm()
  const categoryName = ref('')
  const isChange = ref(false)
  const id = ref('')

  const MIN_LENGTH = 2

  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    "title",
    yup
      .string()
      .trim()
      .required("Заголовок - обязательное поле")
      .min(MIN_LENGTH, `Заголовок не может быть короче ${MIN_LENGTH} символов`)
  )

  const { value: price, errorMessage: pError, handleBlur: pBlur } = useField(
    "price",
    yup
      .string()
      .trim()
      .required("Цена - обязательное поле")
  )

  const { value: file, errorMessage: fError, handleBlur: fBlur } = useField(
    "file",
    yup
      .string()
      .trim()
      .required("Ссылка - обязательное поле")
      .min(MIN_LENGTH, `Ссылка не может быть короче ${MIN_LENGTH} символов`)
  )

  const { value: text, errorMessage: textError, handleBlur: textBlur } = useField(
    "text",
    yup
      .string()
      .trim()
      .required("Описание - обязательное поле")
      .min(MIN_LENGTH, `Описание не может быть короче ${MIN_LENGTH} символов`)
  )


  const { value: category, errorMessage: catError, handleBlur: cBlur } = useField(
    "category",
    yup
      .string()
      .trim()
      .required("Категория - обязательное поле")
  )

  const entryCategory = (e) => {
    categoryName.value = e.text
    category.value = e.id
  }

  const printText = (e) => {
    text.value = e
  }

  const getCategoryName = computed(() => {
    return categoryName.value
  })

  const changeValueInput = computed(() => {
    return title.value
  })

  watch(changeValueInput, val => {
    if (val) {
      formError.value = ''
    }
  })

  const clearValues = () => {
    title.value = ''
    price.value = ''
    category.value = ''
    file.value = ''
    categoryName.value = ''
    text.value = ''
  }

  const createFormData = (values) => {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('price', values.price)
    formData.append('text', values.text)
    formData.append('category', values.category)
    formData.append('file', values.file)
    if (isChange) {
      formData.append('id', id.value)
    }

    return formData
  }

  const renderWebinar = (webinar) => {
    if (webinar === 'all') {
      isChange.value = false
      return clearValues()
    } else {
      isChange.value = true
      title.value = webinar.title
      price.value = webinar.oldPrice
      text.value = webinar.description
      category.value = webinar.category
      id.value = webinar._id
      categoryName.value = store.getters['categoryWeb/getCategoryWebinars']
        .find(cat => cat._id === webinar.category)
        .category
    }
  }

  let formError = ref('')

  const onSubmit = handleSubmit(async values => {
    try {
      store.commit("setIsLoading", true)
      const formData = await createFormData(values)
      if (isChange.value) {
        await store.dispatch('webinar/changeWebinar', formData)
      } else {
        await store.dispatch('webinar/createWebinar', formData)
      }
      return clearValues()
    } catch (e) {
      formError.value = e.response?.data?.message
    } finally {
      store.commit("setIsLoading", false)
    }
  })

  return {
    file,
    fError,
    fBlur,
    renderWebinar,
    getCategoryName,
    category,
    catError,
    cBlur,
    title,
    tError,
    tBlur,
    text,
    textBlur,
    textError,
    price,
    pBlur,
    pError,
    onSubmit,
    isSubmitting,
    formError,
    printText,
    entryCategory,
  }
}
