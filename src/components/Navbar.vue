<template>
  <div class="navbar">
    <div class="branding" v-on:click="clickBtn(0)">
      <img
        src="https://cdn.discordapp.com/avatars/747157043466600477/d6139e59d1d99c29f58f1422930d616d.png"
        alt="logo"
        class="brandLogo"
      />
      <p class="brandName">EdwardBot Dashboard</p>
    </div>
    <div class="spacer"></div>
    <TextButton text="Főoldal"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
//import IconButton from "../components/IconButton.vue";
import TextButton from "../components/TextButton.vue";

export default Vue.extend({
  name: "Navbar",
  components: {
    TextButton
  }
});
</script>

<style lang="scss">
.navbar {
  margin: 0px;
  padding: 0px;
  display: inline-flex;
  flex-direction: row;
  height: 50px;
  width: 100%;
  background-color: #2f3136;
  .spacer {
    flex-grow: 30;
  }
  .branding {
    flex-grow: 1;
    margin: 0px;
    padding: 0px;
    display: inline-flex;
    flex-direction: row;
    .brandName {
      font-size: 28px;
      top: 0px;
      margin-top: 0px;
      padding-top: 5px;
      justify-content: center;
      align-content: center;
      text-align: center;
      margin-left: 15px;
    }
    img {
      height: 50px;
      width: 50px;
    }
  }
}
</style>
