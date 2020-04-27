<template>
  <div>
    <Header v-if="!$store.state.isSignedIn" />
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
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Header } from "@/components";
import { User, colors } from "@/utils";

export default Vue.extend({
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      message: "",
      color: "",
      snackbar: false,
      isLoading: false
    };
  },
  methods: {
    async checkAll() {
      this.isLoading = true;
      const token: string = localStorage.getItem("token")!;
      const currentUser: User = JSON.parse(
        localStorage.getItem("currentUser")!
      );

      if (token && currentUser) {
        try {
          await this.$userAPI.get("/check", { headers: { token } });
          const { data } = await this.$todoAPI.get(`/${currentUser.username}`, {
            headers: { token }
          });
          this.$store.dispatch("signIn", currentUser);
          this.$store.dispatch("fetchAllTodos", data.todos);
        } catch (err) {
          const errMessage: string = err.response.data.message;
          if (errMessage != "User is not verified!") {
            this.setSnackbar(errMessage, colors.error);
          }
        }
      }
      this.isLoading = false;
    },
    setSnackbar(message: string, color: string) {
      this.message = message;
      this.color = color;
      this.snackbar = true;
    }
  },
  created() {
    this.checkAll();
  },
  updated() {
    this.checkAll();
  }
});
</script>

<style lang="scss" scoped>
* {
  font-family: roboto, sans-serif;
}

.addTodoFormContainer {
  width: 300px;
  height: 60px;
}
</style>
