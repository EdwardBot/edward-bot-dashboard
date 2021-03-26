import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: {
      loggedIn: false,
      username: '',
      token: '',
      id: -1
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
    },
    setToken(state: any, token: string) {
      state.login.token = token
    },
    setId(state: any, id: number) {
      state.login.id = id
    },
    setLoggedIn(state: any, loggedIn: boolean) {
      state.login.loggedIn = loggedIn
    }
  },
  actions: {
    login(store, payload) {
      if (payload.status != "success") {
        //show error
        return
      }
      store.commit("setToken", payload.token)
      store.commit(`setId`, payload.id)
      store.commit(`setLoggedIn`, true)
    }
  },
  modules: {
  }
})
