<template>
  <v-container class="container">
    <v-card class="mx-auto signUpForm" max-height="400" outlined>
      <v-form ref="form" @submit.prevent="signUp">
        <v-text-field
          v-model="userData.firstName"
          label="First Name"
          required
          type="text"
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
    }
  }),
  methods: {
    async signUp() {
      this.isLoading = true;
      try {
        console.log(this.userData);
        const { data } = await this.$userAPI.post("/signup", this.userData);
        // Currently, we ask user to sign in after signing up.
        this.$router.push({ name: "SignIn" });
        this.isLoading = false;
      } catch (err) {
        console.log(err.response);
        this.isLoading = false;
      }
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
