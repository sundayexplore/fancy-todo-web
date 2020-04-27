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
    <v-card class="mx-auto signUpForm" max-height="400" outlined>
      <v-form ref="form" @submit.prevent="signUp">
        <v-text-field
          v-model="userData.firstName"
          label="First Name"
          required
          type="text"
          autofocus
        />
        <v-text-field
          v-model="userData.lastName"
          label="Last Name"
          type="text"
        />
        <v-text-field
          v-model="userData.username"
          label="Username"
          required
          type="text"
        />
        <v-text-field
          v-model="userData.email"
          label="Email"
          required
          type="email"
        />
        <v-text-field
          v-model="userData.password"
          label="Password"
          required
          type="password"
        />
        <v-btn outlined type="submit" @click.prevent="signUp">Sign Up</v-btn>
        <div class="questionContainer">
          <p class="subtitle-2 questionParagraph">Already have an account?</p>
          <router-link to="SignIn" class="subtitle-2 questionParagraph">
            Sign In!
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
  name: "SignUpForm",
  data: () => ({
    isLoading: false,
    userData: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    },
    message: "",
    color: "",
    snackbar: false
  }),
  beforeMount() {
    const { email } = this.$route.query;
    if (email) {
      this.userData.email = email + "";
    }
  },
  methods: {
    async signUp() {
      this.isLoading = true;
      try {
        const signInData = {
          userIdentifier: this.userData.username,
          password: this.userData.password
        };
        await this.$userAPI.post("/signup", this.userData);
        const { data } = await this.$userAPI.post("/signin", signInData);
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
  height: 100vh;
  justify-content: center;
  align-content: center;
  align-items: center;
  place-items: center center;
}

.signUpForm {
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
