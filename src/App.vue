<template>
  <div class="main-layout" v-if="isPreLoading">
    <AppPreLoader></AppPreLoader>
  </div>

  <component :is="layout + '-layout'" v-if="!isPreLoading"></component>

</template>

<script>
import AuthLayout from "./layout/AuthLayout"
import AppPreLoader from "./components/UI/AppPreLoader"
import MainLayout from "./layout/MainLayout"
import {useRoute} from "vue-router"
import {computed, onBeforeMount, onMounted} from "vue"
import {useStore} from "vuex"
import {csrfAuth} from "./http/userApi"

import ModalCreateLetter from "./components/modal/ModalCreateLetter"
export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    onBeforeMount( async () => {
      await store.dispatch('sales/getSales')
      const accessToken = localStorage.getItem('session')
      await csrfAuth()
      if (accessToken) {
        await store.dispatch('auth/refresh')
      }
    })

    onMounted(async () => {
      await store.dispatch('category/setCategoryDocuments')
      await store.dispatch('categoryWeb/setCategoryWebinars')
    })

    const isPreLoading = computed(() => {
      return store.getters.getIsPreLoading
    })

    return {
      layout: computed(() => route.meta.layout),
      isPreLoading,
    }
  },
  components: {
    AuthLayout,
    MainLayout,
    AppPreLoader,
    ModalCreateLetter,
  }
}
</script>

<style lang="scss">
</style>
