import { firebaseFs } from 'boot/firebase'

const state = () => {
  return {
    elements: {},
    dragonTypes: {}
  }
}

const actions = {
  loadOptions({ commit }, payload) {
    firebaseFs
      .collection(payload)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          commit('ADD_OPTION', {
            id: doc.id,
            data: doc.data(),
            type: payload
          })
        })
      })
  }
}

const mutations = {
  ADD_OPTION(state, value) {
    state[value.type][value.id] = value.data
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
