<template>
  <div class="auth-block">
    <form @submit.prevent="onSubmit" :class="['form form-auth form-small', {invalid: eError || formError}]">
      <div class="form__title">Ваш email</div>

      <div class="form__control" :class="{invalid: eError}">
        <input type="email" placeholder=" " v-model="email" @blur="eBlur" class="input" id="reset">
        <label for="reset" class="label">Email</label>
      </div>

      <div class="form__buttons">
        <router-link class="btn btn-to" :to="{name: 'login'}">Назад</router-link>

        <button class="btn btn-primary" :disabled="isSubmitting" v-if="!isLoading">
          Далее
        </button>
        <AppLoader v-else />
      </div>

      <div v-if="eError || formError" class="form__errors">
        <span v-if="eError" class="form__error">{{ eError }}</span>
        <span v-if="formError"  class="form__error form_error-large">{{ formError }}</span>
      </div>
    </form>
  </div>
</template>

<script>
import {useResetForm} from "../../../use/reset-form"
import AppLoader from "../../../components/UI/AppLoader"
import {useStore} from "vuex"
import {computed} from "vue"

export default {
  components: {AppLoader},
  setup() {
    const store = useStore()

    const isLoading = computed(() => {
      return store.getters.getIsLoading
    })
    return {
      ...useResetForm(),
      isLoading
    }
  }
}
</script>

