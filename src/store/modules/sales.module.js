import {createSale, deleteSale, getSales} from "../../http/salesApi"

export default {
  namespaced: true,
  state() {
    return {
      sales: [],
    }
  },
  getters: {
    getSales(state) {
      return state.sales
    }
  },
  mutations: {
    setSales(state, sales) {
      return state.sales = sales
    },
    setSale(state, sale) {
      return state.sales.push(sale)
    },
    deleteSale(state, id) {
      return state.sales = state.sales.filter(sale => sale._id !== id)
    },
  },
  actions: {
    async deleteSale ({dispatch, commit, getters}, id) {
      const name = getters['getSales'].filter(sale => sale._id === id)[0].description
      await deleteSale(id)
      commit('deleteSale', id)
      await dispatch('setMessage', {
        value: `Акция ${name} удалена`,
        type: 'primary'
      }, {root: true})
    },
    async getSales({ commit }) {
      const data = await getSales()
      commit('setSales', data)
    },
    async createSale({dispatch, commit}, {title, price, items, type}) {
      const data = await createSale(title, price, items, type)
      console.log(data)
      commit('setSale', data)
      return data
    }
  },
}
