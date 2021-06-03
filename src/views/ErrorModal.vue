<template>
  <div class="error-modal" v-bind:class="{ modalContHidden : !$store.state.error.visible }">
    <div class="modal elevation-6" v-bind:class="{ modalHidden : !$store.state.error.visible, modalShown: $store.state.error.visible }" v-click-outside="close">
      <h1>{{$store.state.error.title}}</h1>
      <p>{{$store.state.error.content}}</p>
      <v-btn elevation="6" large color="#ee5253" @click="close(true)">Bezárás</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "ErrorModal",
  data: () => ({
    one: false
  }),
  methods: {
    close(a?: boolean) {
      if (!this.one && !a) {
        this.one = true;
        return
      }
      this.$store.commit("setErrorVisible", false)
      this.one = false;
    }
  }
})
</script>

<style lang="scss">
$darker-back: #222f3e;

@keyframes modal-closing {
  0% {
    top: 50%;
  }


  100% {
    top: 120%;
  }
}

@keyframes modal-opening {
  0% {
    top: 0px;
    transform: translateY(-120%) !important;
  }


  100% {
    top: 50%;
    transform: translate(-50%, -50%) !important;
  }
}

@keyframes hiding-modal {
  0% {
    visibility: visible;
  }

  99% {
    visibility: visible;
  }

  100% {
    visibility: hidden;
  }
}

@keyframes showing-modal {
  0% {
    visibility: hidden;
  }

  1% {
    visibility: visible;
    opacity: 0;
  }

  100% {
    visibility: hidden;
    opacity: 1;
  }
}

.modalShown {
  animation: modal-opening 250ms forwards ease-in-out;
  animation-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
}

.modalHidden {
  position: absolute !important;
  animation: modal-closing 250ms forwards ease-in-out;
  animation-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
}

.modalContHidden {
  animation: hiding-modal 250ms forwards ease-in-out;
  animation-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
}

.modalContShown {
  animation: showing-modal 250ms forwards ease-in-out;
  animation-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
}

.error-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(darken($darker-back, 10), 0.7);
  overflow: hidden;
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    height: 300px;
    width: 500px;
    display: flex;
    background-color: $darker-back;
    flex-direction: column;
    padding: 15px;
    color: #fff;
    h1 {
      text-align: center;
      flex-grow: 1;
    }
    p {
      flex-grow: 7;
    }
  }
}
</style>