<template>
  <v-app>
    <ErrorModal v-bind:class="{ tempHide: tempHideModal }"/>
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
import ErrorModal from "@/views/ErrorModal.vue";

export default Vue.extend({
  name: 'App',
  data: () => ({
    tempHideModal: true
  }),
  components: {
    ErrorModal,
    Navbar,
    Drawer
  },
  async mounted() {
    setTimeout(() => {
      this.tempHideModal = false
    }, 1000)
    if (localStorage.getItem("token") && localStorage.getItem("s_id")) {
      this.$store.commit(`setToken`, localStorage.getItem(`token`))
      this.$store.commit(`setId`, localStorage.getItem("s_id"))
      if (this.$route.path != `/login`) {
        this.$store.commit(`setLastUrl`, this.$route.path)
      }
      await this.$store.dispatch(`refresh`, this.$router)
      await this.$store.dispatch(`fetchUserInfo`)
    }
  }
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

.tempHide {
  opacity: 0 !important;
}

:root {
  --darker-back: #23272d;
  --main-green: #10ac84;
  --lighter-green: #1dd1a1;
}

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
