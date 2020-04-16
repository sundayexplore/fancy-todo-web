<template>
  <v-card class="mx-auto signInForm" max-width="400" outlined>
    <v-form ref="form" @submit.prevent="signIn">
      <v-text-field
        v-model="userIdentifier"
        label="Email or username"
        required
      />
      <v-text-field v-model="password" label="Password" required />
      <v-btn outlined type="submit">Sign In</v-btn>
      <div class="questionContainer">
        <p class="subtitle-2 questionParagraph">Don't have an account?</p>
        <router-link to="SignUp" class="subtitle-2 questionParagraph">
          Sign Up!
        </router-link>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { userAPI } from "@/utils";

export default {
  name: "SignInForm",
  data: () => ({
    isLoading: false,
    userData: {
      userIdentifier: "",
      password: ""
    }
  }),
  methods: {
    async signIn() {
      this.isLoading = true;
      try {
        const signInData = {
          userIdentifier: this.userData.userIdentifier,
          password: this.userData.password
        };
        const { data } = await userAPI.post("/signin", signInData);
        console.log(data);
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err.response);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
