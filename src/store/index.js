import { createStore } from 'vuex'

import dragons from './dragons'
import options from './options'
import seals from './seals'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      dragons,
      options,
      seals
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
