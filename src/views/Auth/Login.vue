<template>
    <div class="auth-block">
      <form @submit.prevent="onSubmit" :class="['form form-auth', {invalid: pError || eError || formError}]">
        <div class="form__title">Авторизация</div>

        <div class="form__control" :class="{invalid: eError}">
          <input type="email" placeholder=" " v-model="email" @blur="eBlur" class="input" id="email">
          <label for="email" class="label">Email</label>
        </div>

        <div class="form__control" :class="{invalid: pError}">
          <input :type="typePasswordInput" placeholder=" " v-model="password" @blur="pBlur" class="input" id="password">
          <label for="password" class="label">Пароль</label>
          <div class="icon__visible" @click="changeTypePasswordInput">
            <img :src="imagesTypePasswordInput" alt="показать/скрыть">
          </div>
        </div>

        <div class="form__buttons">
          <router-link class="btn btn-to" :to="{name: 'reset'}">Забыли пароль?</router-link>

          <button class="btn btn-primary" :disabled="isSubmitting" v-if="!isLoading">
            Войти
          </button>
          <AppLoader v-else />
        </div>

        <div v-if="pError || eError || formError" class="form__errors">
          <span v-if="eError" class="form__error">{{ eError }}</span>
          <span v-if="pError" class="form__error">{{ pError }}</span>
          <span v-if="formError"  class="form__error form_error-large">{{ formError }}</span>
        </div>
      </form>
    </div>
</template>

<script>
import {useLoginForm} from "../../use/login-form"
import {computed, ref} from "vue"
import hiddenEye from "../../assets/img/eye-hidden.svg"
import visibleEye from "../../assets/img/eye-visible.svg"
import {useStore} from "vuex"
import AppLoader from "../../components/UI/AppLoader"

export default {
  components: {AppLoader},
  setup() {
    let isHidden = ref(false)
    const store = useStore()

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
      ...useLoginForm(),
      imagesTypePasswordInput,
      typePasswordInput,
      changeTypePasswordInput,
      isLoading,
    }
  }
}
</script>
