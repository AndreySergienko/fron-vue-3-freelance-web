import {createCategory, deleteCategory, getCategory} from "../../http/webinarApi"

export default {
  namespaced: true,
  state() {
    return {
      categoryWebinars: [],
    }
  },
  getters: {
    getCategoryWebinars(state) {
      return state.categoryWebinars
    },
  },
  mutations: {
    setCategoryWebinars(state, categoriesPayload) {
      if (!state.categoryWebinars.length) {
        return state.categoryWebinars = categoriesPayload
      } else {
        return state.categoryWebinars.push(...categoriesPayload)
      }
    },
    deleteCategoryWebinars(state, id) {
      let newArr = state.categoryWebinars.filter((cat) => { return cat._id !== id})
      return state.categoryWebinars = newArr
    }
  },
  actions: {
    async setCategoryWebinars({commit}) {
      const data = await getCategory()
      commit('setCategoryWebinars', data)
    },
    async createCategoryWebinars({dispatch, commit}, category) {
      try {
        const data = await createCategory(category)
        commit('setCategoryWebinars', [{category: category, _id: data.id}])
        await dispatch('setMessage', {
          value: data.message,
          type: 'primary'
        }, {root: true})
      } catch (e) {
        await dispatch('setMessage', {
          value: e.response?.data?.message,
          type: 'error'
        }, {root: true})
      }
    },
    async deleteCategory({dispatch, commit}, id) {
      try {
        const data = await deleteCategory(id)
        commit('deleteCategoryWebinars', id)
        await dispatch('setMessage', {
          value: data,
          type: 'primary'
        }, {root: true})
      } catch (e) {
        await dispatch('setMessage', {
          value: e.response?.data?.message,
          type: 'error'
        }, {root: true})
      }
    }
  }
}
