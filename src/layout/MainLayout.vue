<template>
  <transition name="message">
    <AppMessage/>
  </transition>

  <div class="main-layout">
    <TheNavbar />
    <div class="container">
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="component-fade">
          <div>
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import TheNavbar from "../components/TheNavbar"
import AppMessage from "../components/UI/AppMessage"
export default {
  components: {
    AppMessage,
    TheNavbar
  }
}
</script>
