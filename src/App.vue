<template>
  <v-app>
    <Navbar/>

    <v-main class="app">
      <Drawer/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './components/Navbar.vue'
import Drawer from './components/Drawer.vue'

export default Vue.extend({
  name: 'App',

  components: {
    Navbar,
    Drawer
  },
  mounted() {
    if (localStorage.getItem("token") && localStorage.getItem("s_id")) {
      this.$store.commit(`setToken`, localStorage.getItem(`token`))
      this.$store.commit(`setId`, localStorage.getItem("s_id"))
      this.$store.dispatch(`refresh`)
      this.$store.dispatch(`fetchUserInfo`)
    }
  }
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
.app {
  display: inline-flex;
  flex-direction: row;
}
.v-main__wrap {
  display: inline-flex;
  flex-direction: row;
}

* {
  font-family: 'Nunito', sans-serif;
}
</style>
