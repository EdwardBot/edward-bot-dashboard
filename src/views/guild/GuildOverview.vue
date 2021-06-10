<template>
  <div class="guildOverview">
    <div class="data" v-if="loaded && config !== undefined">
      <h1>{{$store.state.selectedGuildName}}</h1>
      <div class="info-cards">
        <img :src="`https://cdn.discordapp.com/icons/${guildId}/${guild.Icon}.webp?size=512`" alt="Szerver ikon" class="guild-icon" @click="openIcon"/>
        <InfoCard title="Ekkor csatlakozott a bot" :value="format(new Date(config.guild[`joined_at`]))"/>
        <InfoCard title="Egyenleged" :value="`${config.wallet.Balance}$`"/>
        <InfoCard title="Szinted" :value="`${config.wallet.Lvl}`"/>
        <InfoCard title="Xp-d" :value="`${config.wallet.Xp}`"/>
        <InfoCard title="Adminisztrátor" :value="parseInt(guild.Permissions, 2) & 0x8 == `8` ? `Igen` : `Nem`"/>
        <InfoCard title="Üdvözlő csatorna" :value="config.guild[`welcome_channel`].id != `` ? `#${config.guild[`welcome_channel`].name}` : `Nincs megadva`"/>
        <InfoCard title="Távozó csatorna" :value="config.guild[`leave_channel`].id != `` ? `#${config.guild[`leave_channel`].name}` : `Nincs megadva`"/>
        <InfoCard title="Napló csatorna" :value="config.guild[`log_channel`].id != `` ? `#${config.guild[`log_channel`].name}` : `Nincs megadva`"/>
        {{parseInt(guild.Permissions, 2) & 0x8}}
        {{parseInt(guild.Permissions, 2) & 0x8 == `8`}}
      </div>
    </div>
    <div class="loading" v-if="!loaded || config === undefined">
      <h1>Betöltés...</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {formatDate} from "@/utils/format";
import InfoCard from "@/components/InfoCard.vue";

export default Vue.extend({
  name: `GuildOverview`,
  components: {InfoCard},
  data: () => ({
    guildId: "",
    config: {},
    guild: {},
    loaded: false
  }),
  async mounted() {
    if (!this.$store.state.login.loggedIn) {
      await this.$router.push({ path: "/login" });
      return;
    }
    this.guildId = this.$route.params.id
    if (this.$store.state.guildConfigs[this.guildId] == null) await this.$store.dispatch("fetchGuildConfig", this.guildId)
    this.config = this.$store.state.guildConfigs[this.guildId]
    this.guild = this.$store.state.guilds.find((g: any) => g.GID == this.guildId)
    this.$store.commit("setSelectedGuildName", (this.guild as any).Name)
    this.loaded = true
  },
  methods: {
    format(d: Date): string {
      return formatDate(d)
    },
    openIcon() {
      window.open(`https://cdn.discordapp.com/icons/${this.guildId}/${(this.guild as any)[`Icon`]}.webp?size=2048`)
    }
  }
})
</script>

<style lang="scss">
.guildOverview {
  display: flex;
  width: 100%;
  background-color: var(--darker-back);
  color: #fff;
  padding: 10px;
  flex-direction: column;
  .data {
    .info-cards {
      display: flex;
      flex-basis: clamp(250px, 300px, 400px);
      flex-direction: row;
      flex-wrap: wrap;
      .guild-icon {
        margin: 3px;
        height: 87px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>