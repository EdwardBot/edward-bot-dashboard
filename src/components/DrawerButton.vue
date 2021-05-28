<template>
  <div class="drawer-button" v-bind:class="{ selected: data.path === $route.path}" @click="navigateTo(data.path)">
    <div class="icon-container">
      <v-icon class="icon">mdi-{{data.icon}}</v-icon>
    </div>
    <h2 class="name">{{data.name}}</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "DrawerButton",
  props: {
    data: Object,
    selected: Boolean
  },
  methods: {
    navigateTo(path: string) {
      this.$router.push({
        path: path
      })
    }
  }
})
</script>

<style lang="scss">
.selected {
  background-color: var(--lighter-green);
}
.drawer-button {
  display: flex;
  color: #ffffff;
  height: 45px;
  width: 100%;
  cursor: pointer;
  flex-direction: row;
  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--darker-back);
    .icon {
      color: white !important;
    }
    width: 45px;
    height: 45px;
  }
  .name {
    font-family: 'Nunito', sans-serif;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>