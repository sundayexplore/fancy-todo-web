<template>
  <v-container class="container">
    <v-snackbar
      v-model="snackbar"
      :color="color"
      multi-line
      right
      :timeout="6000"
      top
    >
      {{ message }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-card class="mx-auto signInForm" max-width="400" outlined>
      <v-form ref="form" @submit.prevent="signIn">
        <v-text-field
          v-model="userData.userIdentifier"
          label="Email or username"
          required
          type="text"
        />
        <v-text-field
          v-model="userData.password"
          label="Password"
          required
          type="password"
        />
        <v-btn outlined type="submit" @click.prevent="signIn">Sign In</v-btn>
        <div class="questionContainer">
          <p class="subtitle-2 questionParagraph">Don't have an account?</p>
          <router-link to="SignUp" class="subtitle-2 questionParagraph">
            Sign Up!
          </router-link>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import { colors } from "@/utils";

export default Vue.extend({
  name: "SignInForm",
  data: () => ({
    isLoading: false,
    userData: {
      userIdentifier: "",
      password: ""
    },
    message: "",
    snackbar: false,
    color: ""
  }),
  methods: {
    async signIn() {
      this.isLoading = true;
      try {
        const { data } = await this.$userAPI.post("/signin", this.userData);
        localStorage.setItem("token", data.token);
        this.$store.dispatch("signIn", data.user);
        this.$router.push({
          name: "Dashboard",
          params: { username: data.user.username }
        });
        this.isLoading = false;
      } catch (err) {
        this.setSnackbar(err.response.data.message, colors.error);
        this.isLoading = false;
      }
    },
    setSnackbar(message: string, color: string) {
      this.message = message;
      this.color = color;
      this.snackbar = true;
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  place-items: center center;
  height: 100vh;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.signInForm {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 5vh;
}

.questionContainer {
  display: flex;
  justify-content: center;
  margin-top: 3vh;
}

.questionParagraph {
  margin: 3px;
}
</style>
