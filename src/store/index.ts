import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: {
      loggedIn: false,
      username: ''
    },
    hasDrawer: false,
    showDrawer: true
  },
  mutations: {
    hideDrawer(state: any) {
      state.hasDrawer = false
    },
    showDrawer(state: any) {
      state.hasDrawer = true
    },
    toggleDrawer(state: any) {
      state.showDrawer = !state.showDrawer
    }
  },
  actions: {
  },
  modules: {
  }
})
