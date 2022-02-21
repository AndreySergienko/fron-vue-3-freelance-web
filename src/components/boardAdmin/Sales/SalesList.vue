<template>
  <div class="stonks">
    <div class="stonks__inner">
      <div :class="['arrow-back arrow-back-stonks', {disabled: isDisabledBack || lessThanThree}]" @click="backArrow">
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_713_151)">
            <path d="M0.952404 7.41052C1.7434 6.47852 2.8694 6.00152 4.0044 6.00152C4.9174 6.00152 5.8384 6.31352 6.5914 6.95052L15.0114 14.1025L23.4314 6.95152C25.1144 5.52152 27.6394 5.72652 29.0704 7.41052C30.5004 9.09652 30.2944 11.6185 28.6104 13.0505L17.6004 22.4015C16.1074 23.6705 13.9144 23.6705 12.4224 22.4015L1.4114 13.0505C-0.272596 11.6185 -0.477596 9.09552 0.952404 7.41052Z" fill="url(#paint0_linear_713_151)"/>
          </g>
          <defs>
            <linearGradient id="paint0_linear_713_151" x1="15.0112" y1="23.3533" x2="15.0112" y2="6.00002" gradientUnits="userSpaceOnUse">
              <stop stop-color="#DFC352"/>
              <stop offset="1" stop-color="#9D8935"/>
            </linearGradient>
            <clipPath id="clip0_713_151">
              <rect width="30.021" height="30.021" fill="white" transform="translate(30.0215 30.021) rotate(180)"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div :class="['arrow-next arrow-next-stonks', {disabled: isDisabledNext || lessThanThree}]" @click="nextArrow">
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_713_151)">
            <path d="M0.952404 7.41052C1.7434 6.47852 2.8694 6.00152 4.0044 6.00152C4.9174 6.00152 5.8384 6.31352 6.5914 6.95052L15.0114 14.1025L23.4314 6.95152C25.1144 5.52152 27.6394 5.72652 29.0704 7.41052C30.5004 9.09652 30.2944 11.6185 28.6104 13.0505L17.6004 22.4015C16.1074 23.6705 13.9144 23.6705 12.4224 22.4015L1.4114 13.0505C-0.272596 11.6185 -0.477596 9.09552 0.952404 7.41052Z" fill="url(#paint0_linear_713_151)"/>
          </g>
          <defs>
            <linearGradient id="paint0_linear_713_151" x1="15.0112" y1="23.3533" x2="15.0112" y2="6.00002" gradientUnits="userSpaceOnUse">
              <stop stop-color="#DFC352"/>
              <stop offset="1" stop-color="#9D8935"/>
            </linearGradient>
            <clipPath id="clip0_713_151">
              <rect width="30.021" height="30.021" fill="white" transform="translate(30.0215 30.021) rotate(90)"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      <div class="stonks__items-helper" v-if="currentStep === 0">
        <div class="stonks__items stonks__items-create" @click="setActiveSales('document')">
          <div class="stonks__title">Документы</div>
          <div class="stonks__img">
            <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.5 0C14.58 0 0 14.5788 0 32.5C0 50.4212 14.58 65 32.5 65C50.42 65 65 50.4212 65 32.5C65 14.5788 50.42 0 32.5 0ZM48.125 35H35V48.75C35 50.13 33.88 51.25 32.5 51.25C31.12 51.25 30 50.13 30 48.75V35H16.875C15.495 35 14.375 33.88 14.375 32.5C14.375 31.12 15.495 30 16.875 30H30V17.5C30 16.12 31.12 15 32.5 15C33.88 15 35 16.12 35 17.5V30H48.125C49.505 30 50.625 31.12 50.625 32.5C50.625 33.88 49.505 35 48.125 35Z" fill="#2D2D2D"/>
            </svg>
          </div>
        </div>

        <div class="stonks__items stonks__items-create" @click="setActiveSales('webinar')">
          <div class="stonks__title">Вебинары</div>
          <div class="stonks__img">
            <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.5 0C14.58 0 0 14.5788 0 32.5C0 50.4212 14.58 65 32.5 65C50.42 65 65 50.4212 65 32.5C65 14.5788 50.42 0 32.5 0ZM48.125 35H35V48.75C35 50.13 33.88 51.25 32.5 51.25C31.12 51.25 30 50.13 30 48.75V35H16.875C15.495 35 14.375 33.88 14.375 32.5C14.375 31.12 15.495 30 16.875 30H30V17.5C30 16.12 31.12 15 32.5 15C33.88 15 35 16.12 35 17.5V30H48.125C49.505 30 50.625 31.12 50.625 32.5C50.625 33.88 49.505 35 48.125 35Z" fill="#2D2D2D"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="stonks__items" v-for="item in getItems" :data-id="item._id">
        <div class="stonks__title">{{ item.description }}</div>
        <div class="stonks__price">{{ item.newPrice }}%</div>
        <div class="stonks__img stonks__img-delete" @click="deleteSales">
          <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.0546 2.48656H12.2032C12.0778 1.09415 10.9277 0 9.5316 0C8.13547 0 6.98545 1.09415 6.85996 2.48656H3.00859C1.87035 2.48656 0.944336 3.43187 0.944336 4.59382C0.944336 5.72749 1.82596 6.65445 2.926 6.69894V17.448C2.926 18.8191 4.01869 19.9346 5.36181 19.9346H13.7013C15.0445 19.9346 16.1372 18.8191 16.1372 17.448V6.6989C17.2372 6.65445 18.1188 5.72749 18.1188 4.59377C18.1188 3.43182 17.1928 2.48656 16.0546 2.48656ZM6.84634 16.4189C6.84634 16.768 6.56907 17.0511 6.22709 17.0511C5.88507 17.0511 5.60784 16.768 5.60784 16.4189V8.10943C5.60784 7.76028 5.88511 7.47728 6.22709 7.47728C6.56911 7.47728 6.84634 7.76033 6.84634 8.10943V16.4189ZM10.1509 16.4189C10.1509 16.768 9.87358 17.0511 9.5316 17.0511C9.18958 17.0511 8.91235 16.768 8.91235 16.4189V8.10943C8.91235 7.76028 9.18962 7.47728 9.5316 7.47728C9.87362 7.47728 10.1509 7.76033 10.1509 8.10943V16.4189ZM13.4554 16.4189C13.4554 16.768 13.1781 17.0511 12.8361 17.0511C12.4941 17.0511 12.2168 16.768 12.2168 16.4189V8.10943C12.2168 7.76028 12.4941 7.47728 12.8361 7.47728C13.1781 7.47728 13.4554 7.76033 13.4554 8.10943V16.4189Z" fill="#E5C44C"/>
          </svg>
        </div>
      </div>

    </div>

    <div class="indicators">
      <div v-for="indicator in howManyIndicator" :class="['indicator', {active: currentStep === (indicator - 1)}]"></div>
    </div>

    <teleport to="body">
      <ModalConfirm v-show="modalConfirm.name === 'sale-delete' && modalConfirm.open === true" :text="setConfirmMessage" />
    </teleport>
  </div>
</template>

<script>
import {useSlider} from "../../../use/slider"
import {useStore} from "vuex"
import {computed, ref, watch} from "vue"
import ModalConfirm from "../../modal/ModalConfirm"

export default {
  emits: ['click'],
  setup(props, { emit }) {
    const store = useStore()
    const elementName = ref('')
    const id = ref('')

    const setActiveSales = (value) => {
      emit('click', value)
    }

    const setConfirmMessage = computed(() => {
      return `Удалить акцию: - ${elementName.value}`
    })

    const modalConfirm = computed(() => {
      return store.getters['getModalConfirm']
    })

    watch(modalConfirm, async (val) => {
      if (modalConfirm.value.name === 'sale-delete') {
        if (modalConfirm.value.isResult !== true) return
        await removeSales()
      }
    })

    const removeSales = async () => {
      await store.dispatch('sales/deleteSale', id.value)
    }


    const deleteSales = (e) => {
      id.value = e.target.closest('.stonks__items').dataset.id
      elementName.value = store.getters['sales/getSales'].filter(sale => sale._id === id.value)[0].description
      store.commit('setModalConfirm', {
        isResult: false,
        open: true,
        name: 'sale-delete'
      })
    }

    return {
      ...useSlider(),
      deleteSales,
      setActiveSales,
      setConfirmMessage,
      modalConfirm,
    }
  },
  components: {
    ModalConfirm
  }
}
</script>
