<template>
  <SalesList @click="setActiveSales" v-if="!getActiveSales.length"/>
  <SalesForm @click="setActiveSales" v-else :activeForm="getActiveSales"/>
</template>

<script>
import SalesForm from "./Sales/SalesForm"
import SalesList from "./Sales/SalesList"
import {computed, ref} from "vue"

export default {
  setup() {
    const activeSales = ref('')

    const setActiveSales = (products) => {
      activeSales.value = products
    }

    const getActiveSales = computed(() => {
      return activeSales.value
    })

    return {
      activeSales,
      setActiveSales,
      getActiveSales
    }
  },
  components: {
    SalesForm,
    SalesList
  }
}
</script>



