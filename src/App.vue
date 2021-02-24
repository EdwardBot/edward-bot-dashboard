<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from './components/Navbar.vue'

export default Vue.extend({
  name: `App`,
  components: {
    Navbar
  }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  margin: 0px;
  padding: 0px;
}

body {
  background-color: #36393f;
  margin: 0px;
  padding: 0px;
}
</style>
