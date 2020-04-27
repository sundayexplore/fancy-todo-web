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

    <router-link to="/">
      <OpenSourceSVG id="openSourceSVG" />
    </router-link>

    <v-card class="mx-auto signInFormContainer" outlined>
      <h2 id="formTitle">Welcome Back</h2>
      <p id="questionParagraph">
        Don't have an account?
        <router-link to="SignUp">
          Sign Up!
        </router-link>
      </p>
      <v-form ref="form" @submit.prevent="signIn" id="signInForm">
        <v-text-field
          v-model="userData.userIdentifier"
          label="Email or username"
          required
          type="text"
          color="rgba(7, 121, 228, 1)"
          autofocus
        />
        <v-text-field
          v-model="userData.password"
          label="Password"
          required
          type="password"
          color="rgba(7, 121, 228, 1)"
        />
        <v-btn outlined type="submit" @click.prevent="signIn" id="signInBtn"
          >Sign In</v-btn
        >
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import OpenSourceSVG from "-!vue-svg-loader!@/assets/open-source.svg";
import { colors } from "@/utils";

export default Vue.extend({
  name: "SignInForm",
  components: {
    OpenSourceSVG
  },
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
$defaultGrey: #c2c2c2;
$defaultBlue: rgba(7, 121, 228, 1);

.container {
  display: grid;
  grid-template-rows: auto;
  place-items: center center;
  height: auto;
  justify-content: center;
  align-content: center;
  align-items: center;

  #openSourceSVG {
    height: 120px;
    width: auto;
    margin: 3vh 0;
  }

  .signInFormContainer {
    grid-row: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 8vh 5vw;
    box-shadow: 0 5px 10px $defaultGrey;

    #formTitle {
      text-align: left;
      font-weight: bold;
      width: 100%;
    }

    #questionParagraph {
      text-align: left;
      text-decoration: none;
      align-self: flex-start;
      margin-top: 1.5vh;
      color: #888888;

      > * {
        text-decoration: none;
        color: $defaultBlue;
        font-weight: bold;
      }
    }

    #signInForm {
      margin-top: 4vh;
      width: 100%;

      #signInBtn {
        margin-top: 3vh;
        height: auto;
        padding: 1.1vh 0;
        width: 100% !important;
        font-size: 1.2em;
        line-height: 1;
        background-color: $defaultBlue;
        color: #fff;
      }
    }
  }
}
</style>
