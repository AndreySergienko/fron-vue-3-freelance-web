<template>
  <div class="modal" @click.prevent="closeModalOutSideDialog">
    <div class="modal__dialog modal__dialog-category">
      <div class="modal__inner">
        <div class="category">
          <div :class="['category__items category__items-back', {mb: getCategories.length}]">
            <div class="form__control form__control-category">
              <input type="text" placeholder=" " class="input input-category" id="category" v-model="category" @keydown.enter="createCategory"/>
              <label for="category" class="label label-category">Создать категорию</label>
              <div class="form__click" @click="createCategory">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.38338 0 0 5.38292 0 12C0 18.6171 5.38338 24 12 24C18.6166 24 24 18.6171 24 12C24 5.38292 18.6166 0 12 0ZM17.7692 12.9231H12.9231V18C12.9231 18.5095 12.5095 18.9231 12 18.9231C11.4905 18.9231 11.0769 18.5095 11.0769 18V12.9231H6.23077C5.72123 12.9231 5.30769 12.5095 5.30769 12C5.30769 11.4905 5.72123 11.0769 6.23077 11.0769H11.0769V6.46154C11.0769 5.952 11.4905 5.53846 12 5.53846C12.5095 5.53846 12.9231 5.952 12.9231 6.46154V11.0769H17.7692C18.2788 11.0769 18.6923 11.4905 18.6923 12C18.6923 12.5095 18.2788 12.9231 17.7692 12.9231Z" fill="#DDDDDD"/>
                </svg>
              </div>
            </div>
          </div>
          <div :class="['category__items category__items-active active', {mb: getCategories.length}]" data-cat="all" @click="closeModal">
            <div class="category__description">Показать все</div>
          </div>

          <hr class="category__line" v-if="getCategories.length">

          <div class="category__items" v-for="cat in getCategories" :data-cat="cat._id" @click="closeModal">
            <div class="category__description">{{ cat.category }}</div>
            <div class="category__img" @click="deleteCategory">
              <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="setNameForDelete(cat.category)">
                <path d="M16.0546 2.48656H12.2032C12.0778 1.09415 10.9277 0 9.5316 0C8.13547 0 6.98545 1.09415 6.85996 2.48656H3.00859C1.87035 2.48656 0.944336 3.43187 0.944336 4.59382C0.944336 5.72749 1.82596 6.65445 2.926 6.69894V17.448C2.926 18.8191 4.01869 19.9346 5.36181 19.9346H13.7013C15.0445 19.9346 16.1372 18.8191 16.1372 17.448V6.6989C17.2372 6.65445 18.1188 5.72749 18.1188 4.59377C18.1188 3.43182 17.1928 2.48656 16.0546 2.48656ZM6.84634 16.4189C6.84634 16.768 6.56907 17.0511 6.22709 17.0511C5.88507 17.0511 5.60784 16.768 5.60784 16.4189V8.10943C5.60784 7.76028 5.88511 7.47728 6.22709 7.47728C6.56911 7.47728 6.84634 7.76033 6.84634 8.10943V16.4189ZM10.1509 16.4189C10.1509 16.768 9.87358 17.0511 9.5316 17.0511C9.18958 17.0511 8.91235 16.768 8.91235 16.4189V8.10943C8.91235 7.76028 9.18962 7.47728 9.5316 7.47728C9.87362 7.47728 10.1509 7.76033 10.1509 8.10943V16.4189ZM13.4554 16.4189C13.4554 16.768 13.1781 17.0511 12.8361 17.0511C12.4941 17.0511 12.2168 16.768 12.2168 16.4189V8.10943C12.2168 7.76028 12.4941 7.47728 12.8361 7.47728C13.1781 7.47728 13.4554 7.76033 13.4554 8.10943V16.4189Z" fill="#2D2D2D"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
      <span class="form__error form__error-cat" v-if="cError">{{ cError }}</span>
    </div>
    <teleport to="body">
      <ModalConfirm v-show="modalConfirm.name === 'category-webinar-delete' && modalConfirm.open === true" :text="setConfirmMessage" />
    </teleport>
  </div>
</template>

<script>
import {useStore} from "vuex"
import ModalConfirm from "./ModalConfirm"
import {computed, ref, watch} from "vue"

export default {
  emits: ['change'],
  setup(props, {emit}) {
    const store = useStore()
    const category = ref('')
    const cError = ref('')
    const id = ref('')
    const text = ref('')
    const element = ref('')

    // element for delete
    const elementName = ref('')


    const changeValueInput = computed(() => {
      return category.value
    })

    watch(changeValueInput, val => {
      if (val) {
        cError.value = ''
      }
    })

    const createCategory = async () => {
      if (!category.value) {
        return cError.value = 'Категория - не может быть пустой'
      }
      try {
        await store.dispatch('categoryWeb/createCategoryWebinars', category.value)
        category.value = ''
      } catch (e) {
        await store.dispatch('setMessage', {
          value: e.response.message,
          type: 'error'
        }, {root: true})
      }
    }

    const closeModalOutSideDialog = (e) => {
      if (!e.target.classList.contains('modal') ) return
      store.commit('setModal', {
        open: false,
        name: ''
      })
    }

    const closeModal = (e) => {
      const itemsContains = e.target.classList.contains('category__items')
      const categoryContains = e.target.classList.contains('category__description')
      if (itemsContains || categoryContains) {
        store.commit('setModal', {
          open: false,
          name: ''
        })
        if (itemsContains) {
          text.value = e.target.querySelector('.category__description').textContent
          id.value = e.target.dataset.cat
        } else {
          text.value = e.target.textContent
          id.value = e.target.closest('.category__items').dataset.cat
        }
        emit('change', id.value)
        store.dispatch('setMessage', {
          value: `Выбрана категория: ${text.value}`,
          type: 'primary'
        })
      }
    }

    const setConfirmMessage = computed(() => {
      return `Удалить категорию: - ${elementName.value} - и все вебинары в ней`
    })

    const getCategories = computed(() => {
      return store.getters['categoryWeb/getCategoryWebinars']
    })

    const modalConfirm = computed(() => {
      return store.getters['getModalConfirm']
    })

    watch(modalConfirm, async (val) => {
      if (modalConfirm.value.name === 'category-webinar-delete') {
        if (modalConfirm.value.isResult !== true) return
        await removeCategory()
      }
    })

    const removeCategory = async () => {
      console.log(element.value)
      await store.dispatch('categoryWeb/deleteCategory', element.value)
      await store.dispatch('webinar/getWebinars')
      store.commit('setModalConfirm', {
        isResult: false,
        open: false,
        name: 'none'
      })
    }

    const setNameForDelete = (value) => {
      elementName.value = value
    }

    const deleteCategory = async (e) => {
      element.value = e.target.closest('.category__items').dataset.cat
      store.commit('setModalConfirm', {
        isResult: false,
        open: true,
        name: 'category-webinar-delete'
      })
    }

    return {
      deleteCategory,
      closeModalOutSideDialog,
      category,
      createCategory,
      cError,
      getCategories,
      modalConfirm,
      setNameForDelete,
      closeModal,
      setConfirmMessage
    }
  },
  components: {
    ModalConfirm
  }
}
</script>
