<template>
  <div class="modal" @click.prevent="closeModalOutSideDialog">
    <div class="container" @click.prevent>
      <div class="modal__dialog">
        <div class="close" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.0637 12L23.1581 4.90619C24.2806 3.78367 24.2806 1.96396 23.1581 0.842009C22.0367 -0.279937 20.2158 -0.279937 19.0945 0.842009L12.0001 7.93694L4.90574 0.842009C3.78437 -0.279937 1.96351 -0.279937 0.842135 0.842009C-0.280386 1.96453 -0.280386 3.78425 0.842135 4.90619L7.93592 12L0.842135 19.0938C-0.280386 20.2163 -0.280386 22.036 0.842135 23.1579C1.40253 23.7195 2.13881 23.9994 2.87394 23.9994C3.60849 23.9994 4.34534 23.7195 4.90574 23.1579L12.0001 16.0642L19.0945 23.1585C19.6554 23.7201 20.3911 24 21.1263 24C21.8614 24 22.5977 23.7201 23.1581 23.1585C24.2806 22.036 24.2806 20.2163 23.1581 19.0943L16.0637 12Z" fill="url(#paint0_linear_474_395)"/>
            <defs>
              <linearGradient id="paint0_linear_474_395" x1="14.7226" y1="11.3163" x2="20.5694" y2="19.1585" gradientUnits="userSpaceOnUse">
                <stop stop-color="#E6C44C"/>
                <stop offset="1" stop-color="#A58A2B"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="counter">
          Количество символов: {{getNumberWords}}
        </div>
        <textarea class="modal__textarea" v-model="textarea" @input="changeTextarea">{{ loadDescriptionChangeElement }}</textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex"
import {computed, ref} from "vue"

export default {
  props: ['text'],
  setup(props, {emit}) {
    const store = useStore()
    const textarea = ref('')

    const getNumberWords = computed(() => {
      if (!textarea.value) {
        return 0
      }
      return textarea.value.length
    })

    const loadDescriptionChangeElement = computed( () => {
      if (props.text) {
        return textarea.value = props.text
      } else {
        textarea.value = ''
        return 'Описание'
      }
    })


    const changeTextarea = computed(() => {
      if (textarea.value) {
        emit('print', textarea.value)
      }
    })

    const closeModalOutSideDialog = (e) => {
      if (!e.target.classList.contains('modal') ) return
      store.commit('setModal', {
        open: false,
        name: ''
      })
      store.dispatch('setMessage', {
        value: 'Изменения сохранены',
        type: 'primary'
      })
    }

    const closeModal = () => {
      store.commit('setModal', {
        open: false,
        name: ''
      })
      store.dispatch('setMessage', {
        value: 'Изменения сохранены',
        type: 'primary'
      })
    }

    return {
      closeModalOutSideDialog,
      closeModal,
      textarea,
      getNumberWords,
      changeTextarea,
      loadDescriptionChangeElement
    }
  }
}
</script>
