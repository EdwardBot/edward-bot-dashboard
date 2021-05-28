<template>
  <div class="guild-custom-commands">
    <h1>Egyedi parancsok:</h1>
    <div v-bind:key="cmd.Name" v-for="cmd in $store.state.guidCommands[$route.params.id]">
      Parancs: {{cmd.Name}}<br>
      Válasz: {{cmd.Response}}<br><br>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "GuildCustomCommands",
  async mounted() {
    if (this.$store.state.guidCommands[this.$route.params.id] == undefined) await this.$store.dispatch("fetchCustomCommands", this.$route.params.id)
  }
})
</script>

<style lang="scss">
.guild-custom-commands {
  background-color: var(--darker-back);
  color: #fff;
  width: 100%;
  padding: 5px;
}
</style>