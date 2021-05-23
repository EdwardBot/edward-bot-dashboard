<template>
  <div class="info-card">
    <h2 class="title">{{title}}</h2>
    <h3 class="value">{{value}}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "InfoCard",
  props: {
    title: String,
    value: String
  }
})
</script>

<style lang="scss">
.info-card {
  display: flex;
  background-color: var(--lighter-green);
  flex-direction: column;
  max-width: 300px;
  border-radius: 8px;
  padding: 5px;
  min-height: 50px;
  .value {
    margin-top: 15px;
    text-align: right;
  }
}
</style>