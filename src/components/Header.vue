<template>
  <header class="fixedTop">
    <nav class="navbar">
      <router-link to="/" class="iconLink">
        <OpenSourceSVG class="iconSVG" />
      </router-link>
      <div class="buttons">
        <router-link to="/signin" class="signInBtn customBtn"
          >Sign In</router-link
        >
        <router-link to="/signup" class="signUpBtn customBtn"
          >Sign Up</router-link
        >
      </div>
    </nav>
  </header>
  <!-- <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title>Fancy Todo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined @click.prevent="redirect">{{ decision.text }}</v-btn>
    </v-app-bar>
  </div> -->
</template>

<script lang="ts">
import Vue from "vue";

import OpenSourceSVG from "-!vue-svg-loader!@/assets/open-source.svg";

export default Vue.extend({
  name: "Header",
  components: {
    OpenSourceSVG
  },
  data() {
    return {
      decision: {
        name: "SignIn",
        path: "/signin",
        text: "Sign In"
      }
    };
  },
  methods: {
    async decideUserStatus() {
      const token = localStorage.getItem("token");
      if (token) {
        await this.$userAPI.get("/check", {
          headers: { token }
        });
        this.decision.text = "Sign Out";
      } else if (this.$router.currentRoute.name == "SignIn") {
        this.decision.name = "SignUp";
        this.decision.path = "/signup";
        this.decision.text = "Sign Up";
      } else if (this.$router.currentRoute.name == "SignUp") {
        this.decision.name = "SignIn";
        this.decision.path = "/signin";
        this.decision.text = "Sign In";
      }
    },
    redirect() {
      if (this.decision.text == "Sign Out") {
        this.$store.dispatch("signOut");
        this.decision.path = "/signin";
      }
      this.$router.push(this.decision.path);
    }
  },
  mounted() {
    this.decideUserStatus();
  },
  watch: {
    $route() {
      this.decideUserStatus();
    }
  }
});
</script>

<style lang="scss" scoped>
$baseBgColor: rgba(20, 40, 80, 1);

.fixedTop {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  padding: 2vh 3vw;

  .navbar {
    transition: background 1s ease 0s;
    background-color: rgba(0, 121, 191, 0);
  }

  .iconLink {
    float: left;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    height: 15vh;

    .iconSVG {
      height: 15vh;
      width: 10vw;
    }
  }

  .buttons {
    float: right;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    height: 15vh;

    .customBtn {
      padding: 2vh 1vw;
      font-size: 1.2rem;
      line-height: 1;
      text-decoration: none;
      color: #fff;
    }

    .signInBtn:hover {
      text-decoration: underline;
    }

    .signUpBtn {
      color: $baseBgColor;
      background-color: #fff;
      border-radius: 4px;
    }
  }
}
</style>
