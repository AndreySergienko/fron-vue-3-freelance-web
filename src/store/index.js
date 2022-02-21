import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import doc from './modules/document.module'
import letter from './modules/letter.module'
import category from './modules/category.module'
import categoryWeb from './modules/category-webinars.module'
import webinar from './modules/webinar.module'
import sales from './modules/sales.module'

const plugins = []
const body = document.body

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state() {
    return {
      message: null,
      isLoading: false,
      isPreloading: true,
      modal: {
        isOpen: false,
        name: ''
      },
      modalConfirm: {
        isResult: false,
        name: '',
        isOpen: false
      }
    }
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading
    },
    getIsPreLoading(state) {
      return state.isPreloading
    },
    getModal(state) {
      return state.modal
    },
    getModalConfirm(state) {
      return state.modalConfirm
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    },
    setIsLoading(state, boolean) {
      state.isLoading = boolean
    },
    setIsPreLoader(state) {
      state.isPreloading = false
    },
    setModal(state, value) {
      if (value.open) {
        body.classList.add('no-scroll')
      } else {
        body.classList.remove('no-scroll')
      }
      state.modal = value
    },
    setModalConfirm(state, value) {
      if (value.open) {
        body.classList.add('no-scroll')
      } else {
        body.classList.remove('no-scroll')
      }
      state.modalConfirm = value
    }
  },
  actions: {
    setMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 5000)
    }
  },
  modules: {
    auth: auth,
    document: doc,
    letter: letter,
    category: category,
    webinar: webinar,
    categoryWeb: categoryWeb,
    sales: sales
  }
})
