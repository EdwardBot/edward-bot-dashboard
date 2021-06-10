import Vue from 'vue'
import Vuex from 'vuex'
import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "@/utils/format";
import VueRouter from "vue-router";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: {
            loggedIn: false,
            token: '',
            id: -1,
            user: {},
            sessionId: -1
        },
        hasDrawer: false,
        showDrawer: true,
        guilds: [],
        guildConfigs: {},
        users: {},
        fetchedGuilds: false,
        selectedGuild: "",
        selectedGuildName: "",
        guidCommands: {},
        error: {
            title: "Hiba!",
            content: "Lorem ipsum dolor sit amet.",
            visible: false
        },
        lastUrl: ``
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
        setUser(state: any, user: any) {
            state.login.user = user
        },
        setSessionId(state: any, id: number) {
            state.login.sessionId = id
            localStorage.setItem("s_id", id + "")
        },
        setGuilds(state: any, guilds: Array<any>) {
            state.guilds = guilds
        },
        setGuildConfig(state: any, gConfig: any) {
            state.guildConfigs[gConfig.guild[`guild_id`]] = gConfig
        },
        cacheUser(state: any, user: any) {
            state.users[user.UserId] = user
        },
        setGuildsLoaded(state: any) {
            state.fetchedGuilds = true
        },
        setSelectedGuild(state: any, id: string) {
            state.selectedGuild = id
        },
        setSelectedGuildName(state: any, name: string) {
            state.selectedGuildName = name
        },
        setGuildCommands(state: any, data: any) {
            state.guidCommands[data.id] = data.data
        },
        setErrorVisible(state: any, visible: boolean) {
            state.error.visible = visible
        },
        setErrorDetails(state: any, error: Error) {
            state.error.title = error.title
            state.error.content = error.content
        },
        setLastUrl(state: any, url: string) {
            state.lastUrl = url
        }
    },
    actions: {
        login(store, payload) {
            if (payload.status != "success") {
                store.dispatch(`triggerError`, {
                    title: `Hiba!`,
                    content: `Hiba a bejelentkezés közben! Kérlek jelezd a support discord szerveren, vagy a github issu trackeren!`
                })
                return
            }
            store.commit("setToken", payload.token)
            store.commit(`setId`, payload.id)
            store.commit(`setLoggedIn`, true)
            store.commit(`setUserName`, payload.username)
            store.commit(`setDiscriminator`, payload.discriminator)
            store.commit(`setSessionId`, payload.session_id)
        },
        logout(store) {
            store.commit("setToken", "")
            store.commit(`setId`, -1)
            store.commit(`setLoggedIn`, false)
            store.commit(`setUserName`, ``)
            store.commit(`setDiscriminator`, ``)
            store.commit(`setSessionId`, -1)
        },
        async refresh(store, router: VueRouter) {
            try {
                const res = await axios.post(`${BASE_URL}/v1/auth/refresh`, {
                    id: store.state.login.id
                }, {
                    headers: {
                        "Authorization": `Bearer ${store.state.login.token}`
                    }
                })
                if (res.status != 200) {
                    store.dispatch(`triggerError`, {
                        title: `Hiba!`,
                        content: `A munkameneted lejárt. Jelentkezz be újra.`
                    })
                } else {
                    const payload = res.data
                    store.commit("setToken", payload.token)
                    store.commit(`setId`, payload.id)
                    store.commit(`setSessionId`, payload.sessionId)
                    store.commit(`setLoggedIn`, true)
                    if (store.state.lastUrl != `` && store.state.lastUrl != router.currentRoute.path && store.state.lastUrl != `/login`) {
                        await router.push({path: store.state.lastUrl})
                    }
                }
                await store.dispatch(`fetchGuilds`)
            } catch (e) {
                store.dispatch(`triggerError`, {
                    title: `Hiba!`,
                    content: `A munkameneted lejárt. Jelentkezz be újra.`
                })
                console.log(e)
            }
        },
        async fetchUserInfo(store) {
            const res = await axios.get(`${BASE_URL}/v1/auth/user`, {
                headers: {
                    "Authorization": `Bearer ${store.state.login.token}`
                }
            })
            if (res.status != 200) {
                store.dispatch(`triggerError`, {
                    title: `Hiba!`,
                    content: `Ismeretlen hiba történt!`
                })
                store.dispatch(`logout`, false)
            } else {
                const payload = res.data
                store.commit(`setUser`, payload)
            }
        },
        async fetchGuilds(store) {
            axios.get(`${BASE_URL}/v1/guild/guilds/${store.state.login.id}`, {
                headers: {
                    "Authorization": `Bearer ${store.state.login.token}`
                }
            }).then(res => {
                if (res.status != 200) {
                    store.dispatch(`triggerError`, {
                        title: `Hiba!`,
                        content: `Ismeretlen hiba történt!`
                    })
                    store.dispatch(`logout`, false)
                } else {
                    store.commit(`setGuilds`, res.data)
                    store.commit(`setGuildsLoaded`)
                }
            }).catch(() => {
                store.dispatch(`triggerError`, {
                    title: `Hiba!`,
                    content: `Ismeretlen hiba történt!`
                })
            })
        },
        async fetchGuildConfig(store, id) {
            const res = await axios.get(`${BASE_URL}/v1/guild/guild/${id}`, {
                headers: {
                    "Authorization": `Bearer ${store.state.login.token}`
                }
            })
            if (res.status != 200) {
                store.dispatch(`triggerError`, {
                    title: `Hiba!`,
                    content: `Ismeretlen hiba történt!`
                })
            } else {
                store.commit("setGuildConfig", res.data)
            }
        },
        async fetchUser(store, data: { gId: string; uId: string }) {
            const res = await axios.get(`${BASE_URL}/v1/guild/guild/${data.gId}/user/${data.uId}`, {
                headers: {
                    "Authorization": `Bearer ${store.state.login.token}`
                }
            })
            if (res.status != 200) {
                store.dispatch(`triggerError`, {
                    title: `Hiba!`,
                    content: `Ismeretlen hiba történt!`
                })
            } else {
                store.commit("setGuildConfig", res.data)
            }
        },
        async fetchCustomCommands(store, id: string) {
            try {
                const res = await axios.get(`${BASE_URL}/v1/guild/guild/${id}/commands`, {
                    headers: {
                        "Authorization": `Bearer ${store.state.login.token}`
                    }
                })
                if (res.status != 200) {
                    await store.dispatch(`triggerError`, {
                        title: `Hiba!`,
                        content: `Ismeretlen hiba történt!`
                    })
                } else {
                    store.commit("setGuildCommands", {
                        id: id,
                        data: res.data
                    })
                }
            } catch (e) {
                await store.dispatch(`triggerError`, {
                    title: `Hiba!`,
                    content: `Ismeretlen hiba történt!`
                })
            }

        },
        async deleteCommand(store, data: { name: string; guildId: string }) {
            try {
                const res = await axios.delete(`${BASE_URL}/v1/guild/guild/${data.guildId}/commands/${data.name}`, {
                    headers: {
                        Authorization: `Bearer ${store.state.login.token}`
                    }
                })
                if (res.status != 200) {
                    store.dispatch(`triggerError`, {
                        title: `Hiba!`,
                        content: `Ismeretlen hiba történt!`
                    })
                } else {
                    await store.dispatch(`fetchCustomCommands`, data.guildId)
                }
            }catch (e) {
                store.dispatch(`triggerError`, {
                    title: `Hiba!`,
                    content: `Ismeretlen hiba történt!`
                })
            }
        },
        triggerError(store, error: Error) {
            store.commit(`setErrorVisible`, true)
            store.commit(`setErrorDetails`, error)
        }
    },
    modules: {}
})

export type Error = {
    title: string;
    content: string;
}
