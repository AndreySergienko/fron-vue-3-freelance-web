import {computed, ref} from "vue"
import {useStore} from "vuex"

export function useSlider(max = 0, start = 0, end = 2) {
  const currentStep = ref(0)
  const maxStep = ref(max)
  const startIndexForArray = ref(start)
  const endIndexForArray = ref(end)
  const isDisabledBack = ref(true)
  const isDisabledNext = ref(false)
  const items = ref([])
  const itemsSlide = ref([])
  const store = useStore()

  const getItems = computed(() => {
    items.value = store.getters['sales/getSales']
    itemsSlide.value = items.value.slice(startIndexForArray.value, endIndexForArray.value)
    let num = items.value.length / 4
    if (num === 0) return maxStep.value = num
    if (num % 1 === 0) {
      maxStep.value = num + 1
    } else {
      maxStep.value = Math.ceil(num)
    }
    return itemsSlide.value
  })

  const nextArrow = () => {
    if (maxStep.value > currentStep.value + 1) {
      currentStep.value++
      startIndexForArray.value = endIndexForArray.value
      endIndexForArray.value += 4
      itemsSlide.value = items.value.slice(startIndexForArray.value, endIndexForArray.value)
      isDisabledBack.value = false

      if (maxStep.value < currentStep.value + 2) isDisabledNext.value = true

    }
  }

  const backArrow = () => {
    if (currentStep.value > 0) {
      isDisabledNext.value = false
      if (currentStep.value === 1) {
        startIndexForArray.value = 0
      } else {
        startIndexForArray.value -=4
      }
      currentStep.value--
      endIndexForArray.value -= 4
      itemsSlide.value = items.value.slice(startIndexForArray.value, endIndexForArray.value)
    }
    if (currentStep.value === 0) isDisabledBack.value = true
  }

  const lessThanThree = computed(() => {
    return items.value.length < 4
  })

  const howManyIndicator = computed(() => {
    return maxStep.value
  })

  return {
    currentStep,
    isDisabledNext,
    isDisabledBack,
    nextArrow,
    backArrow,
    lessThanThree,
    howManyIndicator,
    getItems
  }
}
