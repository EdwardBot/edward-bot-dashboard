<template>
  <div class="navbar">
    <div class="branding" v-on:click="clickBtn(0)">
      <img
        src="https://cdn.discordapp.com/avatars/747157043466600477/d6139e59d1d99c29f58f1422930d616d.png"
        alt="logo"
        class="brandLogo"
      />
      <p class="brandName">EdwardBot</p>
    </div>
    <div class="showDrawerBtn" v-if="shouldOpenDrawer">
      <v-btn elevation="0" v-on:click="toggleDrawer()"
        ><v-icon>mdi-menu</v-icon></v-btn
      >
    </div>
    <v-spacer></v-spacer>
    <div class="btnGroup">
      <v-btn elevation="0" v-on:click="clickBtn(0)" color="#10ac84"
        >Főoldal</v-btn
      >
      <v-btn elevation="0" v-on:click="clickBtn(1)">{{
        isLoggedIn ? displayName : "Bejelentkezés"
      }}</v-btn>
      <v-btn elevation="0" v-on:click="clickBtn(5)"
        ><v-icon>mdi-logout</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Navbar",
  data: function() {
    return {
      showUserDropdow: false
    };
  },
  computed: {
    isLoggedIn: function(): boolean {
      return this.$store.state.login.loggedIn;
    },
    displayName: function(): string {
      return `${this.$store.state.login.username}#${this.$store.state.login.discriminator}`;
    },
    shouldOpenDrawer: function(): boolean {
      return this.$store.state.hasDrawer;
    }
  },
  methods: {
    clickBtn(id: number) {
      switch (id) {
        case 0:
          this.$router.push("/");
          break;
        case 3:
          if (this.isLoggedIn) this.showUserDropdow = !this.showUserDropdow;
          else this.$router.push("/login");
          break;
        case 4:
          this.$router.push("/login");
          break;
        case 5:
          this.$store.dispatch("logout")
            if (!this.$store.state.login.loggedIn) this.$router.push("/login");
          break;
      }
    },
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    }
  }
});
</script>

<style lang="scss">
.navbar {
  background-color: #10ac84;
  height: 50px;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  max-height: 290px;
  overflow: hidden;
  z-index: 50;
  .branding {
    display: inline-flex;
    flex-direction: row;
    cursor: pointer;
    padding-right: 10px;
    background-color: #1dd1a1;
    .brandLogo {
      display: inline-flex;
      width: 50px;
      height: 50px;
    }
    .brandName {
      display: inline-flex;
      color: #fff;
      font-weight: 800;
      font-size: 25px;
      margin-top: 8px;
      margin-left: 10px;
      padding: 0px;
    }
  }
  .showDrawerBtn {
    margin-left: 5px;
    margin-right: -40px;
    button {
      margin-top: 6px;
      margin-right: 5px;
      color: #fff;
      background-color: #10ac84 !important;
    }
  }
  .btnGroup {
    display: inline-flex;
    justify-content: center;
    button {
      margin-top: 6px;
      margin-right: 5px;
      color: #fff;
      background-color: #10ac84 !important;
    }
    .cart {
      .badge {
        z-index: 100;
        p {
          z-index: 200;
        }
      }
    }
  }
  .showNav {
    button {
      background-color: #10ac84 !important;
      color: #fff;
      margin-top: 6px;
      margin-right: 5px;
    }
    display: none;
    margin-left: -10px;
  }
}

@keyframes showNav {
  from {
    height: 50px;
  }

  to {
    height: 280px;
  }
}

@keyframes hideNav {
  from {
    height: 280px;
  }

  to {
    height: 50px;
  }
}

@media screen and (max-width: 700px) {
  .btnGroup {
    flex-direction: column;
    margin-top: 155px;
    margin-right: 20%;
    flex-grow: 3;
    justify-content: flex-end !important;
    height: 110px;
    z-index: 999;
  }

  .navbarHiding {
    animation-name: hideNav;
    animation-duration: 0.5s;
  }

  .navbarActive {
    height: 280px;
    animation-name: showNav;
    animation-duration: 0.5s;
  }
  .showNav {
    display: block !important;
  }
}
</style>
