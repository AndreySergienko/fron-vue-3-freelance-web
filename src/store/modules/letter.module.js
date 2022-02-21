import {createLetter} from "../../http/letterApi"

export default {
  namespaced: true,
  state() {
    return {
    }
  },
  actions: {
    async createLetter ({dispatch}, info) {
      const data = await createLetter(info)
      await dispatch('setMessage', {
        value: data,
        type: 'primary'
      }, {root: true})
    }
  }
}
