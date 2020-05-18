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
      <v-form
        ref="form"
        @submit.prevent="signIn"
        id="signInForm"
        lazy-validation
      >
        <v-text-field
          v-model="userData.userIdentifier"
          label="Email or username"
          required
          :rules="userIdentifierRules"
          type="text"
          color="rgba(7, 121, 228, 1)"
          autofocus
          class="textField"
        />
        <v-text-field
          v-model="userData.password"
          label="Password"
          required
          :rules="passwordRules"
          type="password"
          color="rgba(7, 121, 228, 1)"
          class="textField"
        />
        <v-btn
          outlined
          type="submit"
          @submit.prevent="signIn"
          @click.prevent="signIn"
          id="signInBtn"
          >Sign In</v-btn
        >
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import { colors, Validate } from "@/utils";

export default Vue.extend({
  name: "SignInForm",
  components: {
    OpenSourceSVG: () => import("-!vue-svg-loader!@/assets/open-source.svg")
  },
  data: () => ({
    isLoading: false,
    userData: {
      userIdentifier: "",
      password: ""
    },
    message: "",
    snackbar: false,
    color: "",
    valid: true,
    userIdentifierRules: [(v: string) => Validate.userIdentifier(v)],
    passwordRules: [(v: string) => Validate.password(v)]
  }),
  methods: {
    async signIn() {
      this.isLoading = true;
      try {
        const { data } = await this.$userAPI.post("/signin", this.userData);
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

<style lang="scss">
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
    padding: 5ch;
    box-shadow: $defaultBoxShadow;
    max-width: 45ch;
    width: 45ch;

    #formTitle {
      text-align: left;
      font-weight: bold;
      width: 100%;
    }

    #questionParagraph {
      text-align: left;
      text-decoration: none;
      align-self: flex-start;
      color: #888888;

      > * {
        text-decoration: none;
        color: $defaultBlue;
        font-weight: bold;
      }
    }

    #signInForm {
      width: 100%;

      .textField {
        margin: 1.8ch 0;
      }

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

.v-messages__message {
  line-height: 1.5;
}

.v-application p {
  margin-bottom: 0;
}
</style>
