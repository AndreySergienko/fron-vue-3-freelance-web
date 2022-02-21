<template>
  <div class="modal" @click.prevent="closeModalOutSideDialog">
    <div class="modal__dialog modal__dialog-category">
      <div class="modal__inner">
        <div class="category" v-if="getCategories.length">
          <div class="category__items" v-for="cat in getCategories" :data-cat="cat._id" @click="closeModal">
            <div class="category__description">{{ cat.category }}</div>
          </div>
        </div>
        <div class="category" v-else>
          <div class="category__items">
            <div class="category__description">Добавьте категорию</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex"
import {computed, ref} from "vue"

export default {
  emits: ['change', 'validate'],
  props: {
    products: {
      type: String,
      required: true
    }
  },
  setup(props, {emit}) {
    const store = useStore()
    const categoryId = ref(null)
    const text = ref('')
    const id = ref('')

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
        emit('change', {text: text.value, id: id.value})
        store.dispatch('setMessage', {
          value: `Выбрана категория: ${text.value}`,
          type: 'primary'
        })
      }
    }

    const getCategories = computed(() => {
      if (props.products === 'webinar') {
        return store.getters['categoryWeb/getCategoryWebinars']
      } else {
        return store.getters['category/getCategoryDocuments']
      }
    })


    return {
      closeModalOutSideDialog,
      getCategories,
      closeModal,
      categoryId
    }
  }
}
</script>
