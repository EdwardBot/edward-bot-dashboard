<template>
  <div class="guildOverview">
    <div class="data" v-if="loaded">
      <h1>Szerver: {{guildId}}</h1>
      <InfoCard title="Ekkor csatlakozott a bot" :value="format(new Date(config.JoinedAt))"/>
    </div>
    <div class="loading" v-if="!loaded">
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
}
</style>