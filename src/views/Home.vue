<template>
  <div class="home">
    <h1>Dashboard</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  components: {
  },
  methods: {
    checkLogin() {
      if (!this.$store.state.loggedIn) this.$router.push({ path: "/login" });
    }
  },
  mounted: function() {
    this.checkLogin()
  }
});
</script>
