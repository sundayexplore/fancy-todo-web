<template>
  <v-card class="mx-auto signUpForm" max-height="400" outlined>
    <v-form ref="form" @submit.prevent="signUp">
      <v-text-field v-model="firstName" label="First Name" required />
      <v-text-field v-model="lastName" label="Last Name" />
      <v-text-field v-model="username" label="Username" required />
      <v-text-field v-model="email" label="Email" required />
      <v-text-field v-model="password" label="Password" required />
      <div class="questionContainer">
        <p class="subtitle-2 questionParagraph">Already have an account?</p>
        <router-link to="SignIn" class="subtitle-2 questionParagraph">
          Sign In!
        </router-link>
      </div>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { userAPI } from "@/utils";

export default {
  name: "SignUpForm",
  data: () => ({
    isLoading: false,
    userData: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    }
  }),
  methods: {
    async signUp() {
      try {
        this.isLoading = true;
        const { data } = await userAPI.post("/signup", this.userData);
        console.log({ data });
      } catch (err) {
        this.isLoading = false;
        console.log(err.response);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
