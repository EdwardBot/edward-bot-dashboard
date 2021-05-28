<template>
  <div class="home">
    <div class="container">
      <h1>Szerverek:</h1>
      <div v-bind:key="g.ID" v-for="g in this.$store.state.guilds" class="guild-card" @click="goToGuild(g.GID)">
        <img :src="`https://cdn.discordapp.com/icons/${g.GID}/${g.Icon}.webp?size=128`" :alt="`${g.Name} ikonja`">
        <h1>{{g.Name}}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {},
  methods: {
    checkLogin() {
      if (!this.$store.state.login.loggedIn) this.$router.push({ path: "/login" });
    },
    goToGuild(id: string) {
      this.$router.push({
        path: `/guild/${id}`
      })
      this.$store.commit("setSelectedGuild", id)
    }
  },
  mounted: function() {
    this.checkLogin();
    this.$nextTick(async () => {
      this.$store.commit("showDrawer");
      if (!this.$store.state.fetchedGuilds) await this.$store.dispatch(`fetchGuilds`);
      this.$store.commit("setSelectedGuild", "")
      this.$store.commit("setSelectedGuildName", "")
    });
  }
});
</script>

<style lang="scss">

.home {
  display: flex;
  width: 100%;
  background-color: var(--darker-back);
  color: #fff;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .container {
    width: 50%;
    display: flex;
    flex-direction: column;
    h1 {
      text-align: center;
      margin-bottom: 15px;
    }
    .guild-card {
      cursor: pointer;
      background-color: lighten(#23272d, 10);
      display: flex;
      flex-direction: row;
      margin: 5px;
      border-radius: 5px;
      overflow: hidden;
      transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
      &:hover {
        transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
        box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
        transform: translateY(-5px);
      }
      h1 {
        margin-left: 10px;
      }
    }
  }
}
</style>
