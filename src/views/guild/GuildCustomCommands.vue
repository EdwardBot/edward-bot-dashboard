<template>
  <div class="guild-custom-commands">
    <h1>Egyedi parancsok({{commands.length}}):</h1>
    <div v-bind:key="cmd.Name" v-for="cmd in commands">
      Parancs: {{cmd.Name}}<br>
      Válasz: {{cmd.Response}}<br><br>
      <v-btn @click="$store.dispatch('deleteCommand', {name: cmd.Name, guildId: cmd.GuildId})">Törlés</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "GuildCustomCommands",
  async mounted() {
    if (this.$store.state.guidCommands[this.$route.params.id] == undefined) await this.$store.dispatch("fetchCustomCommands", this.$route.params.id)
  },
  computed: {
    commands: function(): any {
      return this.$store.state.guidCommands[this.$route.params.id]
    }
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