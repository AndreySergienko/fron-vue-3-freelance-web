<template>
  <div class="auth-block">
    <form @submit.prevent="onSubmit" :class="['form form-auth', {invalid: cError || formError}]">
      <div class="form__title">Код доступа</div>

      <div class="form__control" :class="{invalid: cError}">
        <input type="number" placeholder=" " v-model="code" @blur="cBlur" class="input input-code" id="code">
      </div>


      <div class="form__buttons">
        <router-link class="btn btn-to" :to="{name: 'login'}">Назад</router-link>

        <button class="btn btn-primary" :disabled="isSubmitting" v-if="!isLoading">
          Войти
        </button>
        <AppLoader v-else />
      </div>

      <div v-if="cError || formError" class="form__errors">
        <span v-if="cError" class="form__error">{{ cError }}</span>
        <span v-if="formError"  class="form__error form_error-large">{{ formError }}</span>
      </div>
    </form>
  </div>
</template>

<script>
import {useStore} from "vuex"
import {useLoginCodeForm} from "../../use/login-code-form"
import AppLoader from "../../components/UI/AppLoader"
import {computed} from "vue"

export default {
  setup() {
    const store = useStore()

    const isLoading = computed(() => {
      return store.getters.getIsLoading
    })

    const testJump = (x) => {
      let ml = ~~x.getAttribute('maxlength');
      if(ml && x.value.length >= ml){
        do{
          x = x.nextSibling;
        }
        while(x && !(/text/.test(x.type)));
        if(x && /text/.test(x.type)){
          x.focus();
        }
      }
    }

    return {
      ...useLoginCodeForm(store.getters["auth/getEmailFormFactor"]),
      isLoading,
      testJump
    }
  },
  components: {
    AppLoader
  }
}
</script>

<!--  <div class="auth">-->
<!--    <form @submit.prevent="onSubmit" class="form">-->
<!--      <h2  class="form__title">Ваш код</h2>-->
<!--      <div class="form__control" :class="{invalid: cError}">-->
<!--        <input type="number" v-model="code" @blur="cBlur" class="input input-code" id="code" autocomplete="off" maxlength="6" :disabled="maxLength">-->
<!--        <div class="code">-->
<!--          <div class="code__items"></div>-->
<!--          <div class="code__items"></div>-->
<!--          <div class="code__items"></div>-->
<!--          <div class="code__items"></div>-->
<!--          <div class="code__items"></div>-->
<!--          <div class="code__items"></div>-->
<!--        </div>-->
<!--        <small v-if="cError" class="form__error">* {{ cError }}</small>-->
<!--      </div>-->

<!--      <div class="form__buttons form__buttons-code">-->
<!--        <button class="btn btn-usually" :disabled="isSubmitting || isTooManyAttempts" v-if="!isLoading">Войти</button>-->
<!--        <AppLoader v-else />-->

<!--        <router-link class="btn btn-link" :to="{name: 'login'}">Назад</router-link>-->
<!--      </div>-->
<!--      <span v-if="isTooManyAttempts">Вы слишком часто пытаетесь войти в систему. Попробуйте позже.</span>-->
<!--      <span v-if="!isTooManyAttempts && formError"  class="form__message form__message-error">{{ formError }}</span>-->
<!--    </form>-->
<!--  </div>-->
