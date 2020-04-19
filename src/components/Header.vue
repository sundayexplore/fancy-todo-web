<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title>Fancy Todo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined @click.prevent="redirect">{{ decision.text }}</v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Header",
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
        try {
          await this.$userAPI.get("/check", {
            headers: { token }
          });
          this.decision.text = "Sign Out";
        } catch (err) {
          console.log(err.response);
        }
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
    $route(to, from) {
      this.decideUserStatus();
    }
  }
});
</script>

<style></style>
