<template>
  <form @submit.prevent="onSubmit" :class="['form form-letter form-letter-stonks', {invalid: pError || tError || formError}]">
    <div class="form__title">{{ getTitleForm }}</div>

    <div class="form__inner">
      <div class="form__control form__control-stock-title">
        <input placeholder=" " class="input" id="title" v-model="title" @blur="tBlur">
        <label for="title" class="label">Введите название</label>
      </div>

      <div class="form__control form__control-stock-price">
        <input placeholder=" " class="input" id="price" v-model="price" @blur="pBlur" maxlength="2">
        <label for="price" class="label">% скидки</label>
      </div>
    </div>

    <div class="menu__inner menu__inner-form">
      <div :class="['menu__el menu__el-form', getZeroActiveIndex]"  @click="changeActiveIndex(0)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.07689 2.41025C8.35894 2.20513 7.23074 2 6.41023 2C5.58973 2 4.46153 2.20513 3.74358 2.41025C3.02564 2.51282 2.51282 3.02564 2.41025 3.74358C2.20513 4.46153 2 5.58973 2 6.41023C2 7.23074 2.20513 8.35894 2.30769 9.07689C2.41025 9.79483 3.02564 10.3076 3.64102 10.4102C4.35896 10.5128 5.48716 10.7179 6.30767 10.7179C7.12818 10.7179 8.25638 10.5128 8.97432 10.4102C9.69227 10.3076 10.2051 9.69227 10.3077 9.07689C10.4102 8.35894 10.6153 7.23074 10.6153 6.41023C10.6153 5.58973 10.4102 4.46153 10.3077 3.74358C10.3077 3.02564 9.79483 2.51282 9.07689 2.41025Z" fill="#DDDDDD"/>
          <path d="M9.07687 13.6922C8.35892 13.5896 7.23072 13.3845 6.41021 13.3845C5.58971 13.3845 4.46151 13.5896 3.74356 13.6922C3.02562 13.7948 2.5128 14.4101 2.41023 15.0255C2.30767 15.7435 2.10254 16.8717 2.10254 17.6922C2.10254 18.5127 2.30767 19.6409 2.41023 20.3588C2.5128 21.0768 3.12818 21.5896 3.74356 21.6922C4.46151 21.7947 5.58971 21.9999 6.41021 21.9999C7.23072 21.9999 8.35892 21.7947 9.07687 21.6922C9.79481 21.5896 10.3076 20.9742 10.4102 20.3588C10.5127 19.6409 10.7179 18.5127 10.7179 17.6922C10.7179 16.8717 10.5127 15.7435 10.4102 15.0255C10.3076 14.3076 9.79481 13.7948 9.07687 13.6922Z" fill="#DDDDDD"/>
          <path d="M15.0258 10.4104C15.7438 10.513 16.872 10.7181 17.6925 10.7181C18.513 10.7181 19.6412 10.513 20.3591 10.4104C21.0771 10.3078 21.5899 9.69248 21.6924 9.0771C21.795 8.35916 22.0001 7.23096 22.0001 6.41045C22.0001 5.58994 21.795 4.46174 21.6924 3.74379C21.5899 3.02585 20.9745 2.51303 20.3591 2.41047C19.6412 2.3079 18.513 2.10278 17.6925 2.10278C16.872 2.10278 15.7438 2.3079 15.0258 2.41047C14.3079 2.51303 13.795 3.12841 13.6925 3.74379C13.5899 4.46174 13.3848 5.58994 13.3848 6.41045C13.3848 7.23096 13.5899 8.35916 13.6925 9.0771C13.795 9.79505 14.3079 10.3078 15.0258 10.4104Z" fill="#DDDDDD"/>
          <path d="M20.3591 13.6922C19.6412 13.5896 18.513 13.3845 17.6925 13.3845C16.872 13.3845 15.7438 13.5896 15.0258 13.6922C14.3079 13.7948 13.795 14.4101 13.6925 15.0255C13.5899 15.7435 13.3848 16.8717 13.3848 17.6922C13.3848 18.5127 13.5899 19.6409 13.6925 20.3588C13.795 21.0768 14.4104 21.5896 15.0258 21.6922C15.7438 21.7947 16.872 21.9999 17.6925 21.9999C18.513 21.9999 19.6412 21.7947 20.3591 21.6922C21.0771 21.5896 21.5899 20.9742 21.6924 20.3588C21.795 19.6409 22.0001 18.5127 22.0001 17.6922C22.0001 16.8717 21.795 15.7435 21.6924 15.0255C21.5899 14.3076 21.0771 13.7948 20.3591 13.6922Z" fill="#DDDDDD"/>
        </svg>
        <span :class="getZeroActiveIndex">Категории</span>
      </div>

      <div :class="['menu__el menu__el-form', getOneActiveIndex]" @click="changeActiveIndex(1)">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_505_159)">
            <path d="M9 12C6.2 12 4 14.2 4 17C4 19.8 6.2 22 9 22C11.8 22 14 19.8 14 17C14 14.2 11.8 12 9 12ZM13 7C10.6 7 8.4 8.5 7.5 10.7C11 9.8 14.5 12 15.3 15.4C15.6 16.4 15.6 17.5 15.3 18.5C18.4 17.2 19.8 13.7 18.5 10.7C17.6 8.5 15.4 7 13 7ZM23.2 5.8C22.1 3.5 19.6 2 17 2C14.4 2 11.9 3.5 10.8 5.8C14.8 4.6 19 6.8 20.2 10.7C20.7 12.2 20.7 13.7 20.2 15.2C23.6 13.5 25 9.3 23.2 5.8Z" fill="#DDDDDD"/>
          </g>
          <defs>
            <filter id="filter0_d_505_159" x="-2" y="-2" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="2"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_505_159"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_505_159" result="shape"/>
            </filter>
          </defs>
        </svg>
        <span :class="getOneActiveIndex">Товары</span>
      </div>
      <div :class="['menu__active menu__active-form', getActiveClass]"></div>
    </div>

    <div class="form__control" v-if="getZeroActiveIndex">
      <input type="text" placeholder=" " class="input input-search" id="category" list="category1" v-model="category" @keydown.enter="createElement('category')">
      <label for="title" class="label">Поиск категории</label>
      <datalist id="category1">
        <option v-for="category in getDataListCategory">{{ category.category }}</option>
      </datalist>
      <div class="icon__visible" @click="createElement('category')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.38338 0 0 5.38292 0 12C0 18.6171 5.38338 24 12 24C18.6166 24 24 18.6171 24 12C24 5.38292 18.6166 0 12 0ZM17.7692 12.9231H12.9231V18C12.9231 18.5095 12.5095 18.9231 12 18.9231C11.4905 18.9231 11.0769 18.5095 11.0769 18V12.9231H6.23077C5.72123 12.9231 5.30769 12.5095 5.30769 12C5.30769 11.4905 5.72123 11.0769 6.23077 11.0769H11.0769V6.46154C11.0769 5.952 11.4905 5.53846 12 5.53846C12.5095 5.53846 12.9231 5.952 12.9231 6.46154V11.0769H17.7692C18.2788 11.0769 18.6923 11.4905 18.6923 12C18.6923 12.5095 18.2788 12.9231 17.7692 12.9231Z" fill="#DDDDDD"/>
        </svg>
      </div>
    </div>

    <div class="form__control" v-else>
      <input placeholder=" " class="input input-search" id="product" list="category2" v-model="products" @keydown.enter="createElement('product')">
      <label for="product" class="label">Поиск по товарам</label>
      <datalist id="category2" class="datalist">
        <option v-for="product in getDataListProducts">{{ product.title }}</option>
      </datalist>
      <div class="icon__visible" @click="createElement('product')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.38338 0 0 5.38292 0 12C0 18.6171 5.38338 24 12 24C18.6166 24 24 18.6171 24 12C24 5.38292 18.6166 0 12 0ZM17.7692 12.9231H12.9231V18C12.9231 18.5095 12.5095 18.9231 12 18.9231C11.4905 18.9231 11.0769 18.5095 11.0769 18V12.9231H6.23077C5.72123 12.9231 5.30769 12.5095 5.30769 12C5.30769 11.4905 5.72123 11.0769 6.23077 11.0769H11.0769V6.46154C11.0769 5.952 11.4905 5.53846 12 5.53846C12.5095 5.53846 12.9231 5.952 12.9231 6.46154V11.0769H17.7692C18.2788 11.0769 18.6923 11.4905 18.6923 12C18.6923 12.5095 18.2788 12.9231 17.7692 12.9231Z" fill="#DDDDDD"/>
        </svg>
      </div>
    </div>

    <div class="sales sales-category" v-if="items.length">
      <stock-element v-for="(item, i) in items" :text="item.text" :id="i" @delete="deleteElement"></stock-element>
    </div>
    <div class="sales-category" v-else>
      {{ ifCategoryIsEmpty }}
    </div>

    <div class="form__buttons form__buttons-stock-info">

      <button class="btn btn-primary" type="button" @click="setActiveSales">
        Назад
      </button>

      <button class="btn btn-primary" :disabled="isSubmitting || !items.length" v-if="!isLoading" >
        Создать
      </button>
      <AppLoader v-else />
    </div>

    <div v-if="tError || pError || textError || formError" class="form__errors">
      <span v-if="tError" class="form__error">{{ tError }}</span>
      <span v-if="pError" class="form__error">{{ pError }}</span>
      <span v-if="textError" class="form__error">{{ textError }}</span>
      <span v-if="formError"  class="form__error form_error-large">{{ formError }}</span>
    </div>


  </form>
</template>
<script>
import {useStore} from "vuex"
import {computed, onBeforeMount, onMounted, ref, watch} from "vue"
import {getCategory} from "../../../http/documentsApi"
import {useSaleForm} from "../../../use/sale-form"
import SalesPriceElement from "../../UI/SalesPriceElement"
import AppLoader from "../../UI/AppLoader"

export default {
  emits: ['click'],
  props: {
    activeForm: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const activeIndex = ref(0)
    const items = ref([])
    const category = ref('')
    const products = ref('')
    const textError = ref('')

    const listCategory = ref([])
    const listProducts = ref([])

    onBeforeMount(async () => {
      if (props.activeForm === 'webinar') {
        await store.dispatch('webinar/getWebinars')
      } else {
        await store.dispatch('document/getDocuments')
      }
    })

    const getTitleForm = computed(() => {
      if (props.activeForm === 'webinar') {
        return 'Акция для вебинаров'
      } else {
        return 'Акция для документов'
      }
    })

    const ifCategoryIsEmpty = computed(() => {
      if (!activeIndex.value) {
        return 'Выберите категорию'
      } else {
        return 'Выберите товар'
      }
    })

    const getDataListCategory = computed(() => {
      if (props.activeForm === 'webinar') {
        listCategory.value = store.getters['categoryWeb/getCategoryWebinars']
      } else {
        listCategory.value = store.getters['category/getCategoryDocuments']
      }
      return listCategory.value
    })

    const getDataListProducts = computed(() => {
      if (props.activeForm === 'webinar') {
        listProducts.value = store.getters['webinar/getWebinars']
      } else {
        listProducts.value = store.getters['document/getDocuments']
      }
      return listProducts.value
    })

    const isLoading = computed(() => {
      return store.getters['getIsLoading']
    })

    const getItems = computed(() => {
      return items.value
    })

    const deleteElement = (value) => {
      items.value.splice(value, 1)
    }

    const createElement = (typeCategoryOrProducts) => {
      const isNotEmptyField = products.value + category.value
      if (!isNotEmptyField) return textError.value = 'Поле не может быть пустым'
      textError.value = ''
      if (typeCategoryOrProducts === 'category') {
        const data = listCategory.value.filter(cat => cat.category === category.value)
        if (!data.length) {
          return textError.value = 'Такой категории не существует'
        }
        items.value.push({text: category.value, type: 'category'})
      } else {
        const data = listProducts.value.filter(product => product.title === products.value)
        if (!data.length) {
          return textError.value = 'Такого товара не существует'
        }
        items.value.push({text: products.value, type: 'products'})
      }

      category.value = ''
      products.value = ''
    }

    const setActiveSales = () => {
      emit('click', '')
    }

    const changeActiveIndex = (index) => {
      activeIndex.value = index
    }

    const getActiveClass = computed(() => {
      if (activeIndex.value === 0) {
        return 'category'
      } else {
        return 'price'
      }
    })

    const getOneActiveIndex = computed(() => {
      return activeIndex.value === 1 ? 'active' : ''
    })

    const getZeroActiveIndex = computed(() => {
      return activeIndex.value === 0 ? 'active' : ''
    })



    return {
      ifCategoryIsEmpty,
      setActiveSales,
      changeActiveIndex,
      getTitleForm,
      getActiveClass,
      getDataListProducts,
      getZeroActiveIndex,
      getOneActiveIndex,
      items,
      category,
      products,
      deleteElement,
      createElement,
      textError,
      isLoading,
      getDataListCategory,
      ...useSaleForm(getItems.value, props.activeForm)
    }
  },
  components: {
    'stock-element': SalesPriceElement,
    AppLoader
  }
}
</script>

<style></style>
