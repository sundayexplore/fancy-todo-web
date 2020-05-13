<template>
  <v-app>
    <Header
      v-if="
        !$store.state.signedIn &&
          $route.name != 'SignIn' &&
          $route.name != 'SignUp'
      "
    />
    <v-snackbar
      v-model="generalSnackbar.status"
      :color="generalSnackbar.color"
      multi-line
      right
      :timeout="6000"
      top
      @abort="handleCloseSnackbar"
    >
      {{ generalSnackbar.message }}
      <v-btn dark text @click="handleCloseSnackbar">
        Close
      </v-btn>
    </v-snackbar>
    <router-view />
    <Footer
      v-if="
        !$store.state.signedIn &&
          $route.name != 'SignIn' &&
          $route.name != 'SignUp'
      "
    />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { AxiosResponse } from "axios";

import { Header, Footer } from "@/components";

export default Vue.extend({
  name: "App",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async checkAll() {
      if (localStorage.getItem("user")) {
        this.loading = true;
        try {
          const { data } = await this.$userAPI.get("/sync");
          this.$store.dispatch("sync", data);
          this.loading = false;
        } catch (err) {
          if (err.response.status == 401) {
            this.$userAPI
              .post("/refresh")
              .then(() => {
                return this.$userAPI.get("/sync");
              })
              .then((res: AxiosResponse) => {
                this.$store.dispatch("sync", res.data);
                this.loading = false;
              })
              .catch(() => {
                const errMessage =
                  "You are not signed in, please sign in again to continue!";
                this.$store.dispatch("setGeneralSnackbar", {
                  event: "open",
                  type: "info",
                  message: errMessage
                });
                this.$userAPI
                  .post("/signout")
                  .then()
                  .catch();
                this.$store.dispatch("signOut");
                this.$router.push("/signin");
                this.loading = false;
              });
          } else if (err.response.status == 500) {
            this.$store.dispatch("setGeneralSnackbar", {
              event: "open",
              message: err.response.data.message,
              type: "error"
            });
            this.loading = false;
          }
        }
      }
    },
    handleCloseSnackbar() {
      this.$store.dispatch("setGeneralSnackbar", { event: "dismiss" });
    }
  },
  computed: {
    ...mapState(["generalSnackbar"])
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
