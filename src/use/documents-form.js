import {useForm, useField} from "vee-validate"
import * as yup from "yup"
import {computed, ref, watch} from "vue"
import {useStore} from "vuex"

export function useDocumentsForm() {
  const store = useStore()
  const { handleSubmit, isSubmitting } = useForm()
  const file = ref(null)
  const fileName = ref('')
  const categoryName = ref('')
  const isChange = ref(false)
  const id = ref('')


  const MIN_LENGTH = 2
  const MAX_LENGTH = 1

  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    "title",
    yup
      .string()
      .trim()
      .required("Заголовок - обязательное поле")
      .min(MIN_LENGTH, `Заголовок не может быть короче ${MIN_LENGTH} символов`)
  )

  const {value: fls, errorMessage: flsError, handleBlur: flsBlur} = useField(
    'files',
    yup
      .string()
      .trim()
      .required('Файл - обязательное поле')
      .max(MAX_LENGTH, 'Название файла не может содержать точки')
  )

  const { value: price, errorMessage: pError, handleBlur: pBlur } = useField(
    "price",
    yup
      .string()
      .trim()
      .required("Цена - обязательное поле")
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

  const entryFileName = () => {
    file.value = file.value.files[0]
    if (file.value.name.match(/[.]/g).length > 1) {
      fls.value = 'true'
    } else {
      fls.value = '1'
    }
    fileName.value = file.value.name
  }

  const getFileName = computed(() => {
    return fileName.value
  })

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
    fls.value = ''
    file.value = ''
    fileName.value = ''
    categoryName.value = ''
    text.value = ''
  }

  const createFormData = (values) => {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('price', values.price)
    formData.append('text', values.text)
    formData.append('category', values.category)
    formData.append('doc', file.value.files[0])
    if (isChange) {
      if (!file.value) {
        formData.delete('doc')
      }
      formData.append('id', id.value)
    }

    return formData
  }

  const renderDocument = (document) => {
    if (document === 'all') {
      isChange.value = false
      return clearValues()
    } else {
      isChange.value = true
      title.value = document.title
      price.value = document.currentPrice
      text.value = document.description
      category.value = document.category
      id.value = document._id
      categoryName.value = store.getters['category/getCategoryDocuments']
        .find(cat => cat._id === document.category)
        .category
      fls.value = '1'
    }
  }

  let formError = ref('')

  const onSubmit = handleSubmit(async values => {
    try {
      store.commit("setIsLoading", true)
      const formData = await createFormData(values)
      if (isChange.value) {
        await store.dispatch('document/changeDocument', formData)
      } else {
        await store.dispatch('document/createDocument', formData)
      }
      return clearValues()
    } catch (e) {
      formError.value = e.response?.data?.message
    } finally {
      store.commit("setIsLoading", false)
    }
  })

  return {
    renderDocument,
    flsError,
    file,
    entryFileName,
    getCategoryName,
    getFileName,
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
