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
      <v-btn elevation="6" large color="#7289da" v-on:click="redirect()"
        ><v-icon>mdi-discord</v-icon> Bejelentkezés discorddal</v-btn
      >
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {BASE_URL} from "@/utils/format";

export default Vue.extend({
  name: `Login`,
  methods: {
    redirect() {
      const win = window.open(`https://discord.com/api/oauth2/authorize?client_id=747157043466600477&redirect_uri=${encodeURI(`${BASE_URL}/v1/auth/oauth`)}&response_type=code&scope=identify%20guilds`, `OAuth2`, "status=0,width=530,height=850");

      if (win == null) {
        console.log(`Error opening window`)
        this.$store.dispatch(`triggerError`, {
          title: `Hiba!`,
          content: `Nem sikerült megnyitni a bejelentkezési ablakot! Próbáld meg engedélyezni a felugró ablakokat a böngésződben.`
        })
      }
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.$store.commit("hideDrawer");
      this.$store.commit("setSelectedGuild", "")
      window.onmessage = (e: MessageEvent) => {
        if ((e.data as string).startsWith && (e.data as string)?.startsWith("d")) {
          this.$store.dispatch("login", JSON.parse((e.data as string).substring(1)))
          if (this.$store.state.login.loggedIn) this.$router.push({path: "/"})
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
