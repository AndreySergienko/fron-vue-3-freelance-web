<template>
  <div>
    <div class="board-documents">
      <div class="panel">
        <div class="panel__inner">
          <div class="panel__control">
            <TheWebinars @render="renderWebinar" @selectWebinar="selectWebinar" />

            <form class="form form-create-documents backdrop-filter-auto" enctype="multipart/form-data" @submit.prevent="onSubmit">
              <div class="form__inner">
                <div class="form__control form__control-create">
                  <input type="text" placeholder=" " class="input" id="title" v-model="title" @blur="tBlur">
                  <label for="title" class="label">Введите название</label>
                </div>
                <div class="form__control form__control-price">
                  <input type="number" placeholder=" " class="input" id="price" v-model="price" @blur="pBlur">
                  <label for="price" class="label">Цена</label>
                </div>
                <div class="form__control form__control-create-max">
                  <button type="button" class="btn btn-nav-specify form__button-create" @click="openModalDescription">Добавить описание</button>
                  <div class="input input-textarea input-textarea-create"></div>
                </div>
              </div>

              <div class="form__buttons form__buttons-create">
                <button class="btn btn-primary-category btn-primary-category-big" @click="openModalCategory" v-if="!getCategoryName" type="button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.07689 2.41025C8.35894 2.20513 7.23074 2 6.41023 2C5.58973 2 4.46153 2.20513 3.74358 2.41025C3.02564 2.51282 2.51282 3.02564 2.41025 3.74358C2.20513 4.46153 2 5.58973 2 6.41023C2 7.23074 2.20513 8.35894 2.30769 9.07689C2.41025 9.79483 3.02564 10.3076 3.64102 10.4102C4.35896 10.5128 5.48716 10.7179 6.30767 10.7179C7.12818 10.7179 8.25638 10.5128 8.97432 10.4102C9.69227 10.3076 10.2051 9.69227 10.3077 9.07689C10.4102 8.35894 10.6153 7.23074 10.6153 6.41023C10.6153 5.58973 10.4102 4.46153 10.3077 3.74358C10.3077 3.02564 9.79483 2.51282 9.07689 2.41025Z" fill="#DDDDDD"/>
                    <path d="M9.07687 13.6922C8.35892 13.5896 7.23072 13.3845 6.41021 13.3845C5.58971 13.3845 4.46151 13.5896 3.74356 13.6922C3.02562 13.7948 2.5128 14.4101 2.41023 15.0255C2.30767 15.7435 2.10254 16.8717 2.10254 17.6922C2.10254 18.5127 2.30767 19.6409 2.41023 20.3588C2.5128 21.0768 3.12818 21.5896 3.74356 21.6922C4.46151 21.7947 5.58971 21.9999 6.41021 21.9999C7.23072 21.9999 8.35892 21.7947 9.07687 21.6922C9.79481 21.5896 10.3076 20.9742 10.4102 20.3588C10.5127 19.6409 10.7179 18.5127 10.7179 17.6922C10.7179 16.8717 10.5127 15.7435 10.4102 15.0255C10.3076 14.3076 9.79481 13.7948 9.07687 13.6922Z" fill="#DDDDDD"/>
                    <path d="M15.0258 10.4104C15.7438 10.513 16.872 10.7181 17.6925 10.7181C18.513 10.7181 19.6412 10.513 20.3591 10.4104C21.0771 10.3078 21.5899 9.69248 21.6924 9.0771C21.795 8.35916 22.0001 7.23096 22.0001 6.41045C22.0001 5.58994 21.795 4.46174 21.6924 3.74379C21.5899 3.02585 20.9745 2.51303 20.3591 2.41047C19.6412 2.3079 18.513 2.10278 17.6925 2.10278C16.872 2.10278 15.7438 2.3079 15.0258 2.41047C14.3079 2.51303 13.795 3.12841 13.6925 3.74379C13.5899 4.46174 13.3848 5.58994 13.3848 6.41045C13.3848 7.23096 13.5899 8.35916 13.6925 9.0771C13.795 9.79505 14.3079 10.3078 15.0258 10.4104Z" fill="#DDDDDD"/>
                    <path d="M20.3591 13.6922C19.6412 13.5896 18.513 13.3845 17.6925 13.3845C16.872 13.3845 15.7438 13.5896 15.0258 13.6922C14.3079 13.7948 13.795 14.4101 13.6925 15.0255C13.5899 15.7435 13.3848 16.8717 13.3848 17.6922C13.3848 18.5127 13.5899 19.6409 13.6925 20.3588C13.795 21.0768 14.4104 21.5896 15.0258 21.6922C15.7438 21.7947 16.872 21.9999 17.6925 21.9999C18.513 21.9999 19.6412 21.7947 20.3591 21.6922C21.0771 21.5896 21.5899 20.9742 21.6924 20.3588C21.795 19.6409 22.0001 18.5127 22.0001 17.6922C22.0001 16.8717 21.795 15.7435 21.6924 15.0255C21.5899 14.3076 21.0771 13.7948 20.3591 13.6922Z" fill="#DDDDDD"/>
                  </svg>
                  Добавить категорию
                </button>
                <button class="btn btn-primary btn-primary-edit" @click="openModalCategory" v-else type="button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.7285 4.26403L19.7361 0.271184C19.5625 0.0975128 19.327 0 19.0814 0C18.8359 0 18.6004 0.0975128 18.4269 0.271061L14.4338 4.26415C14.4333 4.26464 14.4328 4.26538 14.4322 4.26588L6.77336 11.9247C6.6066 12.0916 6.50983 12.3155 6.50267 12.5513L6.37738 16.6691C6.36961 16.9243 6.46761 17.1713 6.64807 17.3518C6.82199 17.5256 7.0575 17.6229 7.30264 17.6229C7.31202 17.6229 7.32153 17.6228 7.33091 17.6224L11.4487 17.4968C11.6843 17.4896 11.9083 17.3928 12.0751 17.2262L23.7285 5.57304C24.09 5.21175 24.09 4.62556 23.7285 4.26403ZM19.0811 7.60193L16.3976 4.91884L19.0814 2.23502L21.7647 4.9186L19.0811 7.60193ZM11.0254 15.6576L8.2579 15.7421L8.34208 12.9745L15.0884 6.22811L17.7719 8.91131L11.0254 15.6576Z" fill="#FFD699"/>
                    <path d="M16.3165 14.4532C15.8052 14.4532 15.3907 14.8675 15.3907 15.3789V22.1485H1.85151V8.60932H8.62112C9.13239 8.60932 9.54688 8.19495 9.54688 7.68357C9.54688 7.17218 9.13239 6.75781 8.62112 6.75781H0.925755C0.414491 6.75781 0 7.17218 0 7.68357V23.0742C0 23.5856 0.414491 23.9999 0.925755 23.9999H16.3164C16.8276 23.9999 17.2421 23.5856 17.2421 23.0742V15.3788C17.2422 14.8675 16.8278 14.4532 16.3165 14.4532Z" fill="#FFD699"/>
                  </svg>
                  {{ getCategoryName }}
                </button>
                <div class="form__control">
                  <input type="text" placeholder=" " class="input" id="linkFile" v-model="file" @blur="fBlur">
                  <label for="linkFile" class="label">Ссылка на файл</label>
                </div>
              </div>

              <hr class="create__line">

              <div :class="['form__buttons form__buttons-create', {'one-btn': isCreate || !getCurrentWebinar}]">
                <button class="btn btn-important btn-important-delete" type="button" @click="removeWebinar" v-if="!isCreate && !!getCurrentWebinar">Удалить вебинар</button>
                <button class="btn btn-important btn-important-access" v-if="!isLoading">Сохранить</button>
                <AppLoader v-else />
              </div>

              <div v-if="formError" class="form__errors">
                <span class="form__error form_error-large">{{ formError }}</span>
              </div>

            </form>
            <teleport to="body">
              <ModalConfirm v-show="modalConfirm.name === 'webinar-delete' && modalConfirm.open === true" :text="setConfirmMessage" />
              <ModalVariablesCategoryOnlyRead v-show="isModal === 'variables-category-webinar-read'" @change="entryCategory" products="webinar"/>
              <ModalCreateDescriptionProducts v-show="isModal === 'modal-description-products'" @print="printText" :text="text"/>
            </teleport>
          </div>

          <div class="panel__info backdrop-filter-auto">
            <InfoBlock :errors="[tError, pError, textError, catError, fError]" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, reactive, ref, watch} from "vue"
import {useStore} from "vuex"
import ModalVariablesCategory from "../components/modal/ModalVariablesCategory"
import TheWebinars from "../components/boardWebinars/TheWebinars"
import InfoBlock from "../components/InfoBlock"
import ModalVariablesCategoryOnlyRead from "../components/modal/ModalVariablesCategoryOnlyRead"
import ModalCreateDescriptionProducts from "../components/modal/ModalCreateDescriptionProducts"
import AppLoader from "../components/UI/AppLoader"
import ModalConfirm from "../components/modal/ModalConfirm"
import {useWebinarsForm} from "../use/webinar-form"

export default {
  setup() {
    const store = useStore()
    const isCreate = ref(false)
    const currentWebinar = reactive({})

    const isLoading = computed(() => {
      return store.getters.getIsLoading
    })

    const modalConfirm = computed(() => {
      return store.getters.getModalConfirm
    })

    watch(modalConfirm, (val) => {
      if (modalConfirm.value.name === 'webinar-delete') {
        if (modalConfirm.value.isResult !== true) return
        deleteWebinarOnClick()
      }
    })

    const isModal = computed(() => {
      return store.getters.getModal.name
    })

    const getCurrentWebinar = computed(() => {
      return currentWebinar.value
    })

    const setConfirmMessage = computed(() => {
      return `Удалить вебинар:  ${currentWebinar.value?.title}`
    })

    const deleteWebinarOnClick = async () => {
      await store.dispatch('webinar/deleteWebinar', currentWebinar.value.id)
      currentWebinar.value = {}
    }

    const openModalDescription = () => {
      store.commit('setModal', {
        open: true,
        name: 'modal-description-products'
      })
    }


    const openModalCategory = () => {
      store.commit('setModal', {
        open: true,
        name: 'variables-category-webinar-read'
      })
    }

    const selectWebinar = (obj) => {
      currentWebinar.value = obj
    }

    const removeWebinar = () => {
      store.commit('setModalConfirm', {
        isResult: false,
        open: true,
        name: 'webinar-delete'
      })
    }

    return {
      ...useWebinarsForm(),
      isModal,
      openModalDescription,
      openModalCategory,
      isCreate,
      isLoading,
      removeWebinar,
      selectWebinar,
      getCurrentWebinar,
      setConfirmMessage,
      modalConfirm
    }
  },
  components: {
    ModalConfirm,
    InfoBlock,
    ModalVariablesCategory,
    ModalVariablesCategoryOnlyRead,
    ModalCreateDescriptionProducts,
    TheWebinars,
    AppLoader
  }
}
</script>
