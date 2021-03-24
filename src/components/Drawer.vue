<template>
  <div class="drawer" v-if="show" v-bind:class="{ 'drawer-open': show, 'drawer-closed': !show }">
      <h1>cucc</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Drawer",
  computed: {
    show: function(): boolean {
      return this.$store.state.showDrawer && this.$store.state.hasDrawer;
    }
  }
});
</script>

<style lang="scss">
.drawer {
  background-color: #36393f;
  z-index: 30;
  overflow: hidden;
  height: 100%;
  color: #fff;
}

.drawer-open {
  width: 260px;
  animation: opening 1s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.drawer-closed {
  width: 0px;
  animation: closing 1s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

@keyframes closing {
  0% {
    width: 260px;
  }

  100% {
    width: 0px;
  }
}

@keyframes opening {
  100% {
    width: 260px;
  }

  0% {
    width: 0px;
  }
}
</style>
