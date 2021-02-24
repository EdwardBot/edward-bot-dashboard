<template>
  <div class="button">
    <button>{{ this.$props.text }}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: `TextButton`,
  props: {
    text: String
  }
});
</script>

<style lang="scss">
.button {
  min-height: 30px;
  min-width: 100px;
  button {
    min-height: 30px;
    min-width: 100px;
    border-radius: 5px;
    border-style: solid;
    background-color: #1dd1a1;
    border-color: #1dd1a1;
    transition: 1s;
    &:hover {
      background-color: #10ac84;
      border-color: #10ac84;
      transition: 1s;
    }
    &:active {
      background-color: #10ac84;
      border-color: #10ac84;
    }
  }
}
</style>
