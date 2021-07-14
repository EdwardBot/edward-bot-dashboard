<template>
  <div class="profile-container">
    <h1>Profil</h1>
    <div class="cards">
      <img :src="avatarUri" alt="Profilkép">
      <InfoCard title="Felhasználónév" :value="$store.state.login.user.user_name"/>
      <InfoCard title="Sorozatszám" :value="$store.state.login.user.discriminator"/>
      <InfoCard title="Bottal közös szerverek" :value="$store.state.guilds != undefined ? $store.state.guilds.lenght : `0`"/>
      <InfoCard title="Nitró típusa" :value="nitroType"/>
      <router-link to="/guild/522147723651055617">Igen</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InfoCard from "@/components/InfoCard.vue";

export default Vue.extend({
  name: "Profile",
  components: {InfoCard},
  mounted() {
    this.$store.commit("setSelectedGuild", "")
    this.$store.commit("setSelectedGuildName", "")
  },
  computed: {
    nitroType: function (): string {
      switch (this.$store.state.login.user.premium_type) {
        default:
        case 0:
          return `Nincs`
        case 1:
          return `Nitró Classic`
        case 2:
          return `Nitró`
      }
    },
    avatarUri: function(): string {
      if ((this.$store.state.login.user.avatar_id as string).startsWith("a_")) {
        return `https://cdn.discordapp.com/avatars/${this.$store.state.login.user.user_id}/${this.$store.state.login.user.avatar_id}.gif?size=128`
      } else {
        return `https://cdn.discordapp.com/avatars/${this.$store.state.login.user.user_id}/${this.$store.state.login.user.avatar_id}.png?size=128`
      }
    }
  }
})
</script>

<style lang="scss">
.profile-container {
  display: flex;
  width: 100%;
  background-color: var(--darker-back);
  color: #fff;
  padding: 10px;
  flex-direction: column;
  .cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    img {
      border-radius: 10px;
      height: 85px;
      width: 85px;
      margin: 5px;
    }
  }
}
</style>