<template>
  <div class="auth-layout">

    <transition name="message">
      <AppMessage/>
    </transition>

    <div class="container">
      <AppLogo classes="logo-auth" />
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="component-fade">
            <component :is="Component" :key="Component"/>
          </transition>
        </router-view>
    </div>
  </div>
</template>

<script>
import AppMessage from "../components/UI/AppMessage"
import AppLogo from "../components/AppLogo"
export default {
  components: {
    AppMessage,
    AppLogo
  }
}
</script>

<style lang="scss">
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity .2s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>
