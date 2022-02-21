<template>
  <div :class="['logo', classes]">
    <img src="../assets/img/logo.svg" alt="Логотип" class="logo__img">
    <div class="logo__description">
      <span class="logo-span">Т</span>атьяна
      <br>
      <span class="logo-span">Т</span>окмакова
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      required: false
    }
  }
}
</script>
