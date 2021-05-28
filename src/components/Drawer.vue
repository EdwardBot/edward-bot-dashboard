<template>
  <div class="drawer" v-bind:class="{ 'drawer-open': show, 'drawer-closed': !show }">
    <h4 class="category-name">Általános</h4>
    <DrawerButton :data="d" v-for="d in items" v-bind:key="d.name" @click="selected = d.id" :selected="selected == d.id"/>
    <div class="space"></div>
    <h4 class="category-name">{{$store.state.selectedGuildName}}</h4>
    <DrawerButton :data="d" v-for="d in gOnlyItems" v-bind:key="d.name"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DrawerButton from "@/components/DrawerButton.vue";
export default Vue.extend({
  name: "Drawer",
  components: {DrawerButton},
  data: () => ({
    items: [{
      name: `Szerverek`,
      path: `/`,
      icon: `database`,
      id: 0
    }, {
      name: `Profil`,
      path: `/profile`,
      icon: `account-circle`,
      id: 1
    }],
    selected: 0
  }),
  computed: {
    show: function(): boolean {
      return this.$store.state.showDrawer && this.$store.state.hasDrawer;
    },
    gOnlyItems: function(): Array<any> {
      if (this.$store.state.selectedGuild == ``) return []
      return [{
        name: `Áttekintés`,
        path: `/guild/${this.$store.state.selectedGuild}`,
        icon: `newspaper-variant-outline`,
        id: 100
      }, {
        name: `Parancsok`,
        path: `/guild/${this.$store.state.selectedGuild}/custom-commands`,
        icon: `animation-outline`,
        id: 101
      }]
    }
  }
});
</script>

<style lang="scss">
:root {
  --drawer-width: 12vw;
}
.drawer {
  display: flex;
  flex-direction: column;
  background-color: #36393f;
  z-index: 30;
  overflow: hidden;
  height: 100%;
  color: #fff;
  .category-name {
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.drawer-open {
  width: var(--drawer-width);
  animation: opening 1s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.drawer-closed {
  width: 0;
  animation: closing 1s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

@keyframes closing {
  0% {
    width: var(--drawer-width);
  }

  100% {
    width: 0;
  }
}

@keyframes opening {
  100% {
    width: var(--drawer-width);
  }

  0% {
    width: 0;
  }
}
</style>
