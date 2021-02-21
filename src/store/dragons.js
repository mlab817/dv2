import { firebaseFs } from 'boot/firebase'

const collection = firebaseFs.collection('dragons')

const state = () => {
  return {
    dragons: []
  }
}

const actions = {
  loadDragons({ commit }) {
    collection
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            commit('ADD_DRAGON', {
              key: change.doc.id,
              ...change.doc.data()
            })
          }
          if (change.type === 'modified') {
            commit('UPDATE_DRAGON', {
              id: change.doc.id,
              data: {
                key: change.doc.id,
                ...change.doc.data()
              }
            })
          }
          if (change.type === 'removed') {
            commit('REMOVE_DRAGON', change.doc.id)
          }
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
    state.dragons.push(value)
  },
  UPDATE_DRAGON(state, value) {
    const index = state.dragons.findIndex(d => d.key === value.id)
    state.dragons.splice(index, 1, value.data)
  },
  REMOVE_DRAGON(state, value) {
    delete state.dragons[value.id]
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
