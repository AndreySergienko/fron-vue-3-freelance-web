<template>
  <BoardAdminMenu
    @action="changeActiveIndex"
  />

  <div class="board">
    <transition :name="changeTransitionAnimation" mode="out-in">
      <div class="backdrop-filter" v-if="activeIndex === 0">
        <PersonalArea key="personalArea" />
      </div>
      <div class="backdrop-filter" v-else-if="activeIndex === 1" >
        <CreateLetter key="createLetter" />
      </div>
      <div v-else>
        <SalesInfo key="SalesInfo" />
      </div>
    </transition>

    <transition :name="changeTransitionAnimationButton" mode="out-in">
      <div class="board__button" v-if="activeIndex === 0">
        <button class="btn btn-important btn-important-delete" @click="logoutAllDevice">Выйти из всех устройств</button>
      </div>
    </transition>

    <teleport to="body">
      <ModalConfirm v-show="modalConfirm.name === 'logout' && modalConfirm.open === true" :text="setConfirmMessage" />
    </teleport>
  </div>

</template>

<script>
import BoardAdminMenu from "../components/boardAdmin/BoardAdminMenu"
import ModalConfirm from "../components/modal/ModalConfirm"
import PersonalArea from "../components/boardAdmin/PersonalArea"
import SalesInfo from "../components/boardAdmin/SalesInfo"
import CreateLetter from "../components/boardAdmin/CreateLetter"
import {computed, ref, watch} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {deleteSale} from "../http/salesApi"
export default {
  setup() {
    const activeIndex = ref(0)
    const math = ref('')
    const store = useStore()
    const router = useRouter()

    const changeActiveIndex = (value, value2) => {
      math.value = value2
      activeIndex.value = value
    }

    const changeTransitionAnimation = computed(() => {
      if (math.value === 'sum') {
        return 'no-mode-fade'
      } else {
        return 'mode-fade'
      }
    })

    const changeTransitionAnimationButton = computed(() => {
      if (math.value === 'sum') {
        return 'animation-button-left'
      } else {
        return 'animation-button-right'
      }
    })

    const logoutAllDevice = () => {
      store.commit('setModalConfirm', {
        isResult: false,
        open: true,
        name: 'logout'
      })
    }

    const modalConfirm = computed(() => {
      return store.getters['getModalConfirm']
    })

    watch(modalConfirm, async (val) => {
      if (modalConfirm.value.name === 'logout') {
        if (modalConfirm.value.isResult !== true) return
        await deleteAllTokenOnClick()
      }
    })

    const setConfirmMessage = computed(() => {
      return `Вы уверены что хотите выйти со всех устройств? Активные ссесси завершаться через 5 минут.`
    })

    const deleteAllTokenOnClick = async () => {
      try {
        const email = store.getters["auth/getUser"].email
        await store.dispatch('auth/deleteAllTokens', email)
        await store.dispatch('auth/logout')
        router.push({name: 'login'})
      } catch (e) {
        await store.dispatch('setMessage', {
          value: e.response.message,
          type: 'error'
        })
      }
    }

    const removeSale = async () => {
      try {
        const data = await deleteSale()
        await store.dispatch('setMessage', {
          value: data,
          type: 'primary'
        })
      } catch (e) {
        await store.dispatch('setMessage', {
          value: e.response.message,
          type: 'error'
        })
      }
    }

    return {
      logoutAllDevice,
      setConfirmMessage,
      activeIndex,
      changeActiveIndex,
      modalConfirm,
      changeTransitionAnimation,
      changeTransitionAnimationButton,
      removeSale
    }
  },
  components: {
    BoardAdminMenu,
    PersonalArea,
    CreateLetter,
    SalesInfo,
    ModalConfirm
  }
}
</script>

<style scoped lang="scss">
.no-mode-fade-enter-active, .no-mode-fade-leave-active {
  animation: blur-in .1s ease-in forwards;
  transition: all .2s ease;
}
.no-mode-fade-enter-from, .no-mode-fade-leave-to {
  transform: translateX(-1000px);
}

.mode-fade-enter-active, .mode-fade-leave-active {
  animation: blur-in .1s ease-in forwards;
  transition: all .2s ease;
}

.mode-fade-enter-from, .mode-fade-leave-to {
  transform: translateX(1000px);
}

.animation-button-left-enter-active, .animation-button-left-leave-active {
  transition: all .2s ease;
}

.animation-button-right-enter-from, .animation-button-right-leave-to {
  transform: translateX(1000px);
}

.animation-button-right-enter-active, .animation-button-right-leave-active {
  transition: all .5s ease;
}

.animation-button-left-enter-from, .animation-button-left-leave-to {
  transform: translateX(-1200px);
}

@keyframes blur-in {
  from {
    backdrop-filter: blur(0px);
  }
  to {
    backdrop-filter: blur(20px);
  }
}

@keyframes blur-out {
  from {
    backdrop-filter: blur(20px);
  }
  to {
    backdrop-filter: blur(0px);
  }
}
</style>
