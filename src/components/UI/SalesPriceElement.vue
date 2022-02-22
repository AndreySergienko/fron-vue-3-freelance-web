<template>
  <div class="sales__el" id="id">
    {{ text }}
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="btn" @click="deleteElement">
      <path d="M8.03173 5.99996L11.5789 2.45307C12.1402 1.8918 12.1402 0.981947 11.5789 0.420974C11.0182 -0.139999 10.1078 -0.139999 9.54711 0.420974L5.99993 3.96844L2.45275 0.420974C1.89206 -0.139999 0.981631 -0.139999 0.420945 0.420974C-0.140315 0.982235 -0.140315 1.89209 0.420945 2.45307L3.96784 5.99996L0.420945 9.54685C-0.140315 10.1081 -0.140315 11.018 0.420945 11.5789C0.701145 11.8597 1.06928 11.9997 1.43685 11.9997C1.80412 11.9997 2.17255 11.8597 2.45275 11.5789L5.99993 8.03205L9.54711 11.5792C9.82759 11.86 10.1954 12 10.563 12C10.9306 12 11.2987 11.86 11.5789 11.5792C12.1402 11.018 12.1402 10.1081 11.5789 9.54714L8.03173 5.99996Z" fill="#EEE"/>
    </svg>

  </div>
</template>

<script>
export default {
  emits: ['delete'],
  props: {
    text: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const deleteElement = () => {
      emit('delete', props.id)
    }

    return {
      deleteElement
    }
  }
}
</script>
