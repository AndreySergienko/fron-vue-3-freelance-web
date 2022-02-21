<template>
  <div class="validate">
    <div class="validate__icon">
      <svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_557_148)">
          <path d="M49 7C26.9087 7 9 24.9087 9 47C9 69.0913 26.9087 87 49 87C71.0913 87 89 69.0915 89 47C89 24.9085 71.0913 7 49 7ZM55.6666 72.6278C55.6666 74.1367 54.4433 75.36 52.9344 75.36H45.4386C43.9297 75.36 42.7064 74.1367 42.7064 72.6278V42.2134C42.7064 40.7045 43.9296 39.4812 45.4386 39.4812H52.9344C54.4433 39.4812 55.6666 40.7043 55.6666 42.2134V72.6278ZM49 34.3043C45.2541 34.3043 42.2174 31.2677 42.2174 27.5217C42.2174 23.7758 45.2541 20.7391 49 20.7391C52.7459 20.7391 55.7826 23.7758 55.7826 27.5217C55.7826 31.2677 52.7459 34.3043 49 34.3043Z" fill="#FFD699"/>
        </g>
        <defs>
          <filter id="filter0_d_557_148" x="0" y="0" width="98" height="98" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="4.5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_557_148"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_557_148" result="shape"/>
          </filter>
        </defs>
      </svg>
    </div>
    <div class="validate__title">Инфо</div>
    <hr class="validate__line">
    <div class="validate__errors">
      <span class="validate__error" v-for="error in errors">{{ error }}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    errors: {
      type: Array,
      required: true
    },
  },
  setup(props) {
  }
}
</script>

<style></style>
