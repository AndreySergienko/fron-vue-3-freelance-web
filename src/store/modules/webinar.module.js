import {changeWebinar, deleteWebinar, webinarCreate, getWebinars} from "../../http/webinarApi"

export default {
  namespaced: true,
  state() {
    return {
      webinars: [],
      isCreate: false,
    }
  },
  getters: {
    getWebinars(state) {
      return state.webinars
    },
    getIsCreate(state) {
      return state.isCreate
    },
  },
  mutations: {
    setWebinars(state, webinars) {
      if (Array.isArray(webinars)) {
        return state.webinars = webinars
      } else {
        return state.webinars.push(webinars)
      }
    },
    deleteWebinar(state, id) {
      const newArr = state.webinars.filter(web => web._id !== id)
      state.webinars = newArr
    },
    setIsCreate(state, boolean) {
      state.isCreate = boolean
    },
  },
  actions: {
    async createWebinar({dispatch, commit}, formData) {
      const data = await webinarCreate(formData)
      await commit('setWebinars', data.webinar)
      await commit('setIsCreate', true)
      await dispatch('setMessage', {
        value: data.message,
        type: 'primary'
      }, {root: true})
    },
    async getWebinars({ commit }) {
      const data = await getWebinars()
      commit('setWebinars', data)
    },
    async changeWebinar({dispatch}, formData) {
      const data = await changeWebinar(formData)
      await dispatch('getWebinars', {root: true})
      await dispatch('setMessage', {
        value: data,
        type: 'primary'
      }, {root: true})
    },
    async deleteWebinar({dispatch, commit}, id) {
      const data = await deleteWebinar(id)
      commit('deleteWebinar', id)
      await dispatch('setMessage', {
        value: data,
        type: 'primary',
      }, {root: true})
    }
  }
}
