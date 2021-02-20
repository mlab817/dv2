import { firebaseFs } from 'boot/firebase'

const collection = firebaseFs.collection('dragons')

const state = () => {
  return {
    dragons: {}
  }
}

const actions = {
  loadDragons({ commit }) {
    collection
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id)
          console.log(doc.data())
          commit('ADD_DRAGON', {
            id: doc.id,
            data: doc.data()
          })
        })
      }, err => console.log(err.message))
  },
  addDragon({}, payload) {
    collection
      .add(payload)
      .then(docRef => {
        console.log('Added item')
      })
      .catch(err => console.log(err.message))
  }
}

const mutations = {
  ADD_DRAGON(state, value) {
    state.dragons[value.id] = value.data
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
