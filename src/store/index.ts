import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: {
      loggedIn: false,
      username: '',
      token: '',
      id: -1,
      discriminator: ``,
      sessionId: -1
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
      localStorage.setItem("token", token)
    },
    setId(state: any, id: number) {
      state.login.id = id
    },
    setLoggedIn(state: any, loggedIn: boolean) {
      state.login.loggedIn = loggedIn
    },
    setUserName(state: any, username: string) {
      state.login.username = username
    },
    setDiscriminator(state: any, discriminator: string) {
      state.login.discriminator = discriminator
    },
    setSessionId(state: any, id: number) {
      state.login.sessionId = id
      localStorage.setItem("s_id", id + "")
    }
  },
  actions: {
    login(store, payload) {
      if (payload.status != "success") {
        //TODO show error
        return
      }
      console.log(payload)
      store.commit("setToken", payload.token)
      store.commit(`setId`, payload.id)
      store.commit(`setLoggedIn`, true)
      store.commit(`setUserName`, payload.username)
      store.commit(`setDiscriminator`, payload.discriminator)
      store.commit(`setSessionId`, payload.session_id)
    },
    logout(store, payload) {
      if (payload) {
        const res = axios.post(`http://localhost:3000/v1/auth/refresh`)
      }
      store.commit("setToken", "")
      store.commit(`setId`, -1)
      store.commit(`setLoggedIn`, false)
      store.commit(`setUserName`, ``)
      store.commit(`setDiscriminator`, ``)
      store.commit(`setSessionId`, -1)
    },
    async refresh(store) {
      const res = await axios.post(`http://localhost:3000/v1/auth/refresh`, {
        id: store.state.login.id
      }, {
        headers: {
          "Authorization": `Bearer ${store.state.login.token}`
        }
      })
      if (res.status != 200) {
        //TODO: show error
      } else {
        const payload = res.data
        store.commit("setToken", payload.token)
        store.commit(`setId`, payload.id)
        store.commit(`setLoggedIn`, true)
      }
    },
    async fetchUserInfo(store) {
      const res = await axios.post(`http://localhost:3000/v1/auth/user`,  {
        id: store.state.login.id
      }, {
        headers: {
          "Authorization": `Bearer ${store.state.login.token}`
        }
      })
      if (res.status != 200) {
        //TODO show error
        store.dispatch(`logout`, false)
      } else {
        const payload = res.data
        store.commit(`setUserName`, payload.username)
        store.commit(`setDiscriminator`, payload.discriminator)
      }
    }
  },
  modules: {
  }
})
