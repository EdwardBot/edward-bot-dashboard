<template>
  <div class="home">
    <div class="container" v-if="$store.state.fetchedGuilds">
      <h1>Szerverek:</h1>
      <div v-bind:key="g.guild_id" v-for="g in this.$store.state.guilds" class="guild-card" @click="goToGuild(g.guild_id)">
        <img :src="`https://cdn.discordapp.com/icons/${g.guild_id}/${g.icon}.webp?size=128`" :alt="`${g.name} ikonja`">
        <h1>{{g.name}}</h1>
      </div>
    </div>
    <div class="container" v-if="!$store.state.fetchedGuilds">
      <h1>Betöltés...</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {},
  methods: {
    checkLogin(): boolean {
      if (!this.$store.state.login.loggedIn) {
        this.$router.push({ path: "/login" });
        return true;
      }
      return false
    },
    goToGuild(id: string) {
      this.$router.push({
        path: `/guild/${id}`
      })
      this.$store.commit("setSelectedGuild", id)
    }
  },
  mounted: function() {
    if (this.checkLogin()) return
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
