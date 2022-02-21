<template>
  <div class="auth-block">
    <form @submit.prevent="onSubmit" :class="['form form-auth form-small', {invalid: pError  || formError}]">
      <div class="form__title">Сменить пароль</div>

      <div class="form__control" :class="{invalid: pError}">
        <input :type="typePasswordInput" placeholder=" " v-model="password" @blur="pBlur" class="input" id="password">
        <label for="password" class="label">Пароль</label>
        <div class="icon__visible" @click="changeTypePasswordInput">
          <img :src="imagesTypePasswordInput" alt="показать/скрыть">
        </div>
      </div>

      <div class="form__buttons">
        <button class="btn btn-primary" :disabled="isSubmitting" v-if="!isLoading">
          Сменить пароль
        </button>
<!--        <AppLoader v-else />-->
      </div>

      <div v-if="pError || formError" class="form__errors">
        <span v-if="pError" class="form__error">{{ pError }}</span>
        <span v-if="formError"  class="form__error form_error-large">{{ formError }}</span>
      </div>
    </form>
  </div>
</template>

<script>
import {usePasswordForm} from "../../../use/password-form"
import {useStore} from "vuex"
import {computed, ref} from "vue"
import visibleEye from "../../../assets/img/eye-visible.svg"
import hiddenEye from "../../../assets/img/eye-hidden.svg"

export default {
  setup() {
    const store = useStore()

    let isHidden = ref(false)

    const changeTypePasswordInput = () => {
      return isHidden.value = !isHidden.value
    }

    const imagesTypePasswordInput = computed(() => {
      return isHidden.value ? visibleEye : hiddenEye
    })

    const typePasswordInput = computed(() => {
      return isHidden.value ? 'text' : 'password'
    })

    const isLoading = computed(() => {
      return store.getters.getIsLoading
    })
    return {
      ...usePasswordForm(store.getters['auth/getEmailFormFactor']),
      changeTypePasswordInput,
      imagesTypePasswordInput,
      typePasswordInput,
      isLoading
    }
  }
}
</script>
