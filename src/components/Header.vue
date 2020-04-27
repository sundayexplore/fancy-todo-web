<template>
  <header :class="{ fixedTop: true, scroll: scrollPosition > 50 }">
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
      },
      scrollPosition: 0
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
    },
    updateScrollPosition() {
      this.scrollPosition = window.scrollY;
    }
  },
  mounted() {
    this.decideUserStatus();
    window.addEventListener("scroll", this.updateScrollPosition);
  },
  destroyed() {
    window.removeEventListener("scroll", this.updateScrollPosition);
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
$transparentBgColor: rgba(0, 121, 191, 0);

.fixedTop {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;

  .navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    transition: background 2s ease 0s;
    background-color: $transparentBgColor;
    padding: 0 36px;
  }

  .iconLink {
    float: left;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 14px;

    .iconSVG {
      height: 48px;
      width: auto;
    }
  }

  .buttons {
    float: right;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;

    .customBtn {
      padding: 8px 16px;
      font-size: 1.2em;
      line-height: 1.2;
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

.scroll nav.navbar {
  background-color: #27496d;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
