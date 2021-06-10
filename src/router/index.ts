import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "main" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: `/guild/:id`,
    name: `GuildOverview`,
    component: () => import(/* webpackChunkName: "main" */ '../views/guild/GuildOverview.vue')
  }, {
    path: `/profile`,
    name: `Profile`,
    component: () => import(/* webpackChunkName: "main" */ '../views/Profile.vue')
  }, {
    path: `/guild/:id/custom-commands`,
    name: `GuildCustomCommands`,
    component: () => import(/* webpackChunkName: "main" */ '../views/guild/GuildCustomCommands.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
