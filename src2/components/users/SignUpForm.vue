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

    <v-card class="mx-auto signUpFormContainer" outlined>
      <h2 id="formTitle">Create Fancy Todo account.</h2>
      <p id="questionParagraph">
        Already have an account?
        <router-link to="SignIn">
          Sign In!
        </router-link>
      </p>
      <v-form ref="form" @submit.prevent="signUp" id="signUpForm">
        <v-text-field
          v-model="userData.firstName"
          label="First Name"
          required
          type="text"
          autofocus
          color="rgba(7, 121, 228, 1)"
        />
        <v-text-field
          v-model="userData.lastName"
          label="Last Name"
          type="text"
          color="rgba(7, 121, 228, 1)"
        />
        <v-text-field
          v-model="userData.username"
          label="Username"
          required
          type="text"
          color="rgba(7, 121, 228, 1)"
        />
        <v-text-field
          v-model="userData.email"
          label="Email"
          required
          type="email"
          color="rgba(7, 121, 228, 1)"
        />
        <v-text-field
          v-model="userData.password"
          label="Password"
          required
          type="password"
          color="rgba(7, 121, 228, 1)"
        />
        <v-btn type="submit" @click.prevent="signUp" id="signUpBtn"
          >Sign Up</v-btn
        >
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import { colors } from "@/utils";

export default Vue.extend({
  name: "SignUpForm",
  components: {
    OpenSourceSVG: () => import("-!vue-svg-loader!@/assets/open-source.svg")
  },
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
        this.$store.dispatch("signIn", data.user);
        this.$router.push({
          name: "Dashboard"
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
  grid-template-rows: auto;
  height: auto;
  justify-content: center;
  align-content: center;
  align-items: center;
  place-items: center center;

  #openSourceSVG {
    height: 120px;
    width: auto;
    margin: 3vh 0;
  }

  .signUpFormContainer {
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

    #signUpForm {
      margin-top: 4vh;
      width: 100%;

      #signUpBtn {
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
