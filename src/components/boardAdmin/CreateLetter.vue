<template>
    <form :class="['form form-letter', {invalid: tError || stError || txtError || formError}]" @submit.prevent="onSubmit">
      <div class="form__title">Отправить письма</div>

      <div class="form__control" :class="{invalid: tError}">
        <input placeholder=" " v-model="title" @blur="tBlur" class="input" id="currentPassword">
        <label for="currentPassword" class="label">Заголовок</label>
      </div>

      <div class="form__control" :class="{invalid: stError}">
        <input placeholder=" " v-model="subtitle" @blur="stBlur" class="input" id="newPassword">
        <label for="newPassword" class="label">Подазголовок</label>
      </div>

      <div class="form__control" :class="{invalid: txtError}">
        <button type="button" class="btn btn-nav-specify form__button-textarea" @click="openModal">Изменить описание</button>
        <div class="input input-textarea"></div>
        <teleport to="body">
          <ModalCreateLetter v-show="isModal === 'createLetter'" :model="text" @print="printText" />
        </teleport>
        <label for="newPassword" class="label">Описание</label>
      </div>

      <div class="form__buttons">
        <button class="btn btn-primary" :disabled="isSubmitting" v-if="!isLoading">
          Отправить
        </button>
        <AppLoader v-else />
      </div>
      <div v-if="tError || stError || txtError || formError" class="form__errors">
        <span v-if="tError" class="form__error">{{ tError }}</span>
        <span v-if="stError" class="form__error">{{ stError }}</span>
        <span v-if="txtError" class="form__error">{{ txtError }}</span>
        <span v-if="formError"  class="form__error form_error-large">{{ formError }}</span>
      </div>
    </form>
</template>

<script>
import {useLetterForm} from "../../use/letter-form"
import AppLoader from "../UI/AppLoader"
import ModalCreateLetter from "../modal/ModalCreateLetter"
import {computed} from "vue"
import {useStore} from "vuex"

export default {
  setup() {
    const store = useStore()
    const isLoading = computed(() => {
      return store.getters['getIsLoading']
    })

    const openModal = () => {
      store.commit('setModal', {
        open: true,
        name: 'createLetter'
      })
    }

    const isModal = computed(() => {
      return store.getters.getModal.name
    })

    return {
      ...useLetterForm(),
      isLoading,
      openModal,
      isModal
    }
  },
  components: {
    AppLoader,
    ModalCreateLetter
  }
}
</script>

<style></style>
