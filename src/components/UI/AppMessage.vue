<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert__text">{{message.value}}</p>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'

export default {
  setup() {
    const store = useStore()
    const message = computed(() => store.state.message)

    return {
      message,
    }
  }
}
</script>

<style scoped>

</style>
