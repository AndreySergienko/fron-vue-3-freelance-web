import {
  changeCurrentPassword,
  deleteAllTokens,
  loginCode,
  loginPassword,
  logout,
  refresh,
  reset,
  savePassword
} from "../../http/userApi"
import TokenService from "../../services/token-service"

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      isRequest: false,
      emailFormFactor: ''
    }
  },
  getters: {
    isAuth() {
      return TokenService.isAccessToken
    },
    isRequest(state) {
      return state.isRequest
    },
    getEmailFormFactor(state) {
      return state.emailFormFactor
    },
    getUser(state) {
      return state.user
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setIsRequest(state) {
      return state.isRequest = true
    },
    setEmailFormFactor(state, email) {
      return state.emailFormFactor = email
    }
  },
  actions: {
    async loginPassword({ commit, dispatch }, {email, password}) {
      const data = await loginPassword(email, password)
      commit('setEmailFormFactor', email)
      await dispatch('setMessage', {
        value: data,
        type: 'primary'
      }, {root: true})
    },
    async loginCode({ commit }, {email, code}) {
      const data = await loginCode(email, code)
      commit('setUser', data.user)
      TokenService.accessToken = data.accessToken
      localStorage.setItem('session', 'true')
    },
    async logout({ commit }) {
      await logout()
      TokenService.accessToken = ''
      localStorage.removeItem('session')
    },
    async reset({ commit, dispatch }, email) {
      const data = await reset(email)
      commit('setEmailFormFactor', email)
      await dispatch('setMessage', {
        value: data,
        type: 'primary'
      }, {root: true})
    },
    async savePassword({ commit, dispatch }, {email, password}) {
      const data = await savePassword(email, password)
      await dispatch('setMessage', {
        value: data,
        type: 'primary'
      }, {root: true})
      return data
    },
    async refresh({ commit }) {
      try {
        const data = await refresh()
        commit('setUser', data.user)
        TokenService.accessToken = data.accessToken
        localStorage.setItem('session', 'true')
        commit('setIsRequest')
      } catch (e) {
         commit('setIsRequest')
      }
    },
    async changeCurrentPassword({ commit, dispatch }, {email, currentPassword, newPassword}) {
      const data = await changeCurrentPassword(email, currentPassword, newPassword)
      await dispatch('setMessage', {
        value: data,
        type: 'primary'
      }, {root: true})
      return data
    },
    async deleteAllTokens({commit, dispatch}, email) {
      const data = await deleteAllTokens(email)
      await dispatch('setMessage', {
        value: data,
        type: 'primary'
      }, {root: true})
      return data
    }
  }
}
