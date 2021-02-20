import { firebaseFs } from 'boot/firebase'

const docs = firebaseFs.collection('seals')

const state = () => {
  return {
    seals: {}
  }
}

const actions = {
  loadSeals({ commit }) {
    docs
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          commit('ADD_SEAL', {
            id: doc.id,
            data: doc.data()
          })
        })
      }, err => {
        console.log(err.message)
      })
  }
}

const mutations = {
  ADD_SEAL(state, value) {
    state.seals[value.id] = value.data
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
