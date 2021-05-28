<template>
  <div class="profile-container">
    <h1>Profil</h1>
    <div class="cards">
      <img :src="`https://cdn.discordapp.com/avatars/${$store.state.login.id}/${$store.state.login.user.AvatarID}.png?size=128`" alt="Profilkép">
      <InfoCard title="Felhasználónév" :value="$store.state.login.user.UserName"/>
      <InfoCard title="Sorozatszám" :value="$store.state.login.user.Discriminator"/>
      <InfoCard title="Bottal közös szerverek" :value="$store.state.guilds.length"/>
      <InfoCard title="Nitró típusa" :value="nitroType"/>
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
      switch (this.$store.state.login.user.PremiumType) {
        default:
        case 0:
          return `Nincs`
        case 1:
          return `Classic`
        case 2:
          return `Sima`
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