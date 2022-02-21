<template>
  <div class="modal" @click.prevent="closeModalOutSideDialog">
      <div class="modal__dialog modal__dialog-confirm">
        <div class="modal__info">
          <div class="modal__title">Вы уверены?</div>
          <div class="modal__text" v-if="text">{{ text }}</div>
        </div>

        <div class="modal__buttons">
          <button class="btn btn-important btn-important-access btn-important-long" @click="resultOfTheWork(true)">Да</button>
          <button class="btn btn-important btn-important-delete btn-important-long" @click="resultOfTheWork(false)">Нет</button>
        </div>

      </div>
  </div>
</template>

<script>
import {useStore} from "vuex"

export default {
  emits: ['result'],
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup(props, {emit}) {
    const store = useStore()

    const closeModalOutSideDialog = (e) => {
      if (!e.target.classList.contains('modal') ) return
      store.commit('setModal', {
        open: false,
        name: ''
      })
    }

    const resultOfTheWork = (result) => {
      store.commit('setModalConfirm', {
        isResult: result,
        open: false,
        name: store.getters['getModalConfirm'].name
      })
    }

    return {
      closeModalOutSideDialog,
      resultOfTheWork,
    }
  }
}
</script>


<style></style>
