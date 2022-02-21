import {changeDocument, deleteDocument, documentCreate, getDocuments} from "../../http/documentsApi"

export default {
  namespaced: true,
  state() {
    return {
      documents: [],
      isCreate: false,
    }
  },
  getters: {
    getDocuments(state) {
      return state.documents
    },
    getIsCreate(state) {
      return state.isCreate
    },
  },
  mutations: {
    setDocuments(state, documents) {
      if (Array.isArray(documents)) {
        return state.documents = documents
      } else {
        return state.documents.push(documents)
      }
    },
    deleteDocument(state, id) {
      const newArr = state.documents.filter(doc => doc._id !== id)
      state.documents = newArr
    },
    setIsCreate(state, boolean) {
      state.isCreate = boolean
    },
  },
  actions: {
    async createDocument({dispatch, commit}, formData) {
      const data = await documentCreate(formData)
      await commit('setDocuments', data.document)
      await commit('setIsCreate', true)
      await dispatch('setMessage', {
        value: data.message,
        type: 'primary'
      }, {root: true})
    },
    async getDocuments({ commit }) {
      const data = await getDocuments()
      commit('setDocuments', data)
    },
    async changeDocument({dispatch}, formData) {
      const data = await changeDocument(formData)
      await dispatch('getDocuments', {root: true})
      await dispatch('setMessage', {
        value: data,
        type: 'primary'
      }, {root: true})
    },
    async deleteDocument({dispatch, commit}, id) {
      const data = await deleteDocument(id)
      commit('deleteDocument', id)
      await dispatch('setMessage', {
        value: data,
        type: 'primary',
      }, {root: true})
    }
  }
}
