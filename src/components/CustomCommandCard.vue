<template>
  <div class="c-cmd-card">
    <h2>{{name}}</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "CustomCommandCard",
  props: {
    name: String,
    response: String
  }
})
</script>

<style lang="scss">

</style>