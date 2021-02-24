<template>
  <div class="login">
      <h1>Bejelentkezés</h1>
      <TextButton text="Bejelentkezés Discordal"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TextButton from '../components/TextButton.vue'

export default Vue.extend({
    name: `Login`,
    components: {
        TextButton
    },
    data: () =>{
        return ({
            asd: 1
        })
    }
})
</script>

<style lang="scss">
    .login {
        background-color: #2f3136;
        width: 100%;
        height: 100%;
    }
</style>
