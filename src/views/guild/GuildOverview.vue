<template>
  <div class="guildOverview">
    <div class="data" v-if="loaded && config != undefined">
      <h1>{{$store.state.selectedGuildName}}</h1>
      <div class="info-cards">
        <InfoCard title="Ekkor csatlakozott a bot" :value="format(new Date(config.guild.JoinedAt))"/>
        <InfoCard title="Egyenleged" :value="`${config.wallet.Balance}$`"/>
        <InfoCard title="Szinted" :value="`${config.wallet.Lvl}`"/>
        <InfoCard title="Xp-d" :value="`${config.wallet.Xp}`"/>
      </div>
    </div>
    <div class="loading" v-if="!loaded || config == undefined">
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
    loaded: false
  }),
  async mounted() {
    this.guildId = this.$route.params.id
    if (this.$store.state.guildConfigs[this.guildId] == null) await this.$store.dispatch("fetchGuildConfig", this.guildId)
    this.config = this.$store.state.guildConfigs[this.guildId]
    this.$store.commit("setSelectedGuildName", this.$store.state.guilds.find((g: any) => g.GID == this.guildId).Name)
    this.loaded = true
  },
  methods: {
    format(d: Date): string {
      return formatDate(d)
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
    }
  }
}
</style>