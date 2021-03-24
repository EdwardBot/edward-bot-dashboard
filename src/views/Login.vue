<template>
  <div class="login">
    <v-sheet
      color="primary"
      elevation="19"
      height="200"
      outlined
      rounded
      width="400"
      class="form"
    >
      <h1>Bejelentkezés</h1>
      <div class="spacer"></div>
      <v-btn elevation="6" large color="#7289da" v-on:click="redirect()" v-if="!completeing"
        ><v-icon>mdi-discord</v-icon> Bejelentkezés discordal</v-btn
      >
      <p v-if="completeing">Kérlek várj!</p>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: `Login`,
  components: {},
  data: () => {
    return {
      completeing: false
    };
  },
  methods: {
    redirect() {
      const win = window.open("http://localhost:3000/v1/auth/login", "OAuth2", "status=0,width=530,height=850");
      if (win != null) {
        win.onload = (e: Event) => {
          console.log(`asd`)
          console.log(win.location)
        }
        win.onstorage = (e: StorageEvent) => {
          console.log(e)
        }
      }
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.$store.commit("hideDrawer");
      window.onmessage = (e: MessageEvent) => {
        if ((e.data as string).startsWith && (e.data as string)?.startsWith("d")) {
          this.$store.dispatch("login", JSON.parse((e.data as string).substring(1)))
        }
      }
    });
  },
  beforeDestroy() {
    window.onmessage = null;
  }
});
</script>

<style lang="scss">
.login {
  display: flex;
  background-color: #2f3136;
  width: 100%;
  height: 100%;
  color: #fff;
  padding: 8px;
  text-align: center;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  .form {
    display: flex;
    color: #fff;
    align-self: center;
    padding: 10px;
    justify-content: center;
    text-align: center;
    justify-self: center;
    flex-direction: column;
    .spacer {
      flex-grow: 3;
    }
    button {
      color: #fff;
    }
  }
}
</style>
