<template>
  <div class="guildOverview">
    <div class="data" v-if="loaded && config !== undefined">
      <h1>{{$store.state.selectedGuildName}}</h1>
      <div class="info-cards">
        <img :src="`https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.webp?size=512`" alt="Szerver ikon" class="guild-icon" @click="openIcon"/>
        <InfoCard title="Ekkor csatlakozott a bot" :value="format(new Date(config.guild[`joined_at`]))"/>
        <InfoCard title="Egyenleged" :value="`${config.wallet.balance}$`"/>
        <InfoCard title="Szinted" :value="`${config.wallet.level}`"/>
        <InfoCard title="Xp-d" :value="`${config.wallet.xp}`"/>
        <InfoCard title="Adminisztrátor" :value="config.guild[`bot_admins`].includes($store.state.login.id) ? `Igen` : `Nem`"/>
        <InfoCard title="Üdvözlő csatorna" :value="`${channelNames.welcome}`"/>
        <InfoCard title="Távozó csatorna" :value="`${channelNames.leave}`"/>
        <InfoCard title="Napló csatorna" :value="`${channelNames.log}`"/>
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
    loaded: false,
    channelNames: {
      welcome: `Nincs megadva.`,
      leave: `Nincs megadva.`,
      log: `Nincs megadva.`
    }
  }),
  async mounted() {
    if (!this.$store.state.login.loggedIn) {
      await this.$router.push({ path: "/login" });
      return;
    }
    this.guildId = this.$route.params.id
    if (this.$store.state.guildConfigs[this.guildId] == null) await this.$store.dispatch("fetchGuildConfig", this.guildId)
    this.config = this.$store.state.guildConfigs[this.guildId]
    this.guild = this.$store.state.guilds.find((g: any) => g.guild_id == this.guildId)
    this.$store.commit("setSelectedGuildName", (this.guild as any).name)
    this.loaded = true
    if ((this.config as any).guild.welcome_channel != 0) {
      this.channelNames.welcome = `#${(this.config as any).channels.find((e: any) => e.id == (this.config as any).guild.welcome_channel)?.name}` || `Nincs megadva.`
    }
    if ((this.config as any).guild.leave_channel != 0) {
      this.channelNames.leave = `#${(this.config as any).channels.find((e: any) => e.id == (this.config as any).guild.leave_channel)?.name}` || `Nincs megadva.`
    }
    if ((this.config as any).guild.log_channel != 0) {
      this.channelNames.log = `#${(this.config as any).channels.find((e: any) => e.id == (this.config as any).guild.log_channel)?.name}` || `Nincs megadva.`
    }
  },
  methods: {
    format(d: Date): string {
      return formatDate(d)
    },
    openIcon() {
      window.open(`https://cdn.discordapp.com/icons/${this.guildId}/${(this.guild as any).icon}.webp?size=2048`)
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