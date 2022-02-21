import {createCategory, deleteCategory, getCategory} from "../../http/documentsApi"


export default {
  namespaced: true,
  state() {
    return {
      categoryDocuments: [],
    }
  },
  getters: {
    getCategoryDocuments(state) {
      return state.categoryDocuments
    },
  },
  mutations: {
    setCategoryDocuments(state, categoriesPayload) {
      if (!state.categoryDocuments.length) {
        return state.categoryDocuments = categoriesPayload
      } else {
        return state.categoryDocuments.push(...categoriesPayload)
      }
    },
    deleteCategoryDocuments(state, id) {
      let newArr = state.categoryDocuments.filter((cat) => { return cat._id !== id})
      return state.categoryDocuments = newArr
    }
  },
  actions: {
    async setCategoryDocuments({commit}) {
      const data = await getCategory()
      commit('setCategoryDocuments', data)
    },
    async createCategoryDocuments({dispatch, commit}, category) {
      try {
        const data = await createCategory(category)
        commit('setCategoryDocuments', [{category: category, _id: data.id}])
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
        commit('deleteCategoryDocuments', id)
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
