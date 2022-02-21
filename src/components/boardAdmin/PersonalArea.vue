<template>
  <form :class="['form', {invalid: pError || npError || formError}]" @submit.prevent="onSubmit">
    <div class="form__title">Сменить пароль</div>

    <div class="form__control" :class="{invalid: pError}">
      <input :type="typePasswordInput" placeholder=" " v-model="currentPassword" @blur="pBlur" class="input" id="currentPassword">
      <label for="currentPassword" class="label">Текущий пароль</label>
    </div>

    <div class="form__control" :class="{invalid: npError}">
      <input :type="typePasswordInput" placeholder=" " v-model="newPassword" @blur="npBlur" class="input" id="newPassword">
      <label for="newPassword" class="label">Новый пароль</label>
    </div>

    <div class="form__buttons form__buttons-personal-form">
      <div class="checkbox-container">
        Показать пароли
        <div class="checkbox" @click="changeTypePasswordInput">
          <input type="checkbox" id="unchecked" class="checkbox-input" @change="changeTypePasswordInput" />
          <label for="unchecked" class="checkbox-label"></label>
        </div>
      </div>

      <button class="btn btn-primary" :disabled="isSubmitting" v-if="!isLoading">
        Сменить
      </button>
      <AppLoader v-else />
    </div>
    <div v-if="pError || npError || formError" class="form__errors">
      <span v-if="npError" class="form__error">{{ npError }}</span>
      <span v-if="pError" class="form__error">{{ pError }}</span>
      <span v-if="formError"  class="form__error form_error-large">{{ formError }}</span>
    </div>
  </form>
</template>

<script>
import {useStore} from "vuex"
import {usePersonalForm} from "../../use/personal-form"
import {computed, ref} from "vue"
import AppLoader from "../UI/AppLoader"
import visibleEye from "../../assets/img/eye-visible.svg"
import hiddenEye from "../../assets/img/eye-hidden.svg"

export default {
  setup() {
    const isHidden = ref(false)
    const store = useStore()

    const isLoading = computed(() => {
      return store.getters.getIsLoading
    })

    const changeTypePasswordInput = () => {
      return isHidden.value = !isHidden.value
    }

    const imagesTypePasswordInput = computed(() => {
      return isHidden.value ? visibleEye : hiddenEye
    })

    const typePasswordInput = computed(() => {
      return isHidden.value ? 'text' : 'password'
    })

    return {
      ...usePersonalForm(store.getters["auth/getUser"].email),
      typePasswordInput,
      imagesTypePasswordInput,
      changeTypePasswordInput,
      isLoading,
    }
  },
  components: {
    AppLoader
  }
}
</script>

<style lang="scss">
</style>
