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
      window.location.assign("https://discord.com/api/oauth2/authorize?client_id=747157043466600477&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin&response_type=code&scope=identify%20email%20guilds");
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.$store.commit("hideDrawer");
      if (this.$route.query.code) {
          this.completeing = true
          const resp = await axios.get(`http://localhost:3000/auth/login?code=${this.$route.query.code}&redirect=${encodeURIComponent(window.location.href)}`, {
              headers: {
                  'Access-Control-Allow-Origin': '*'
              }
          })
          if (resp.status != 200) {
              alert(`Hiba történt!`)
              return
          }
          alert(`Sikeres bejelentkezés\nkód:${resp.data.token}`)
      }
    });
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
