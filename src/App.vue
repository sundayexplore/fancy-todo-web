<template>
  <v-app>
    <Header
      v-if="
        !$store.state.isSignedIn &&
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
        !$store.state.isSignedIn &&
          $route.name != 'SignIn' &&
          $route.name != 'SignUp'
      "
    />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

import { Header, Footer } from "@/components";
import { User, colors } from "@/utils";

export default Vue.extend({
  name: "App",
  components: {
    Header,
    Footer
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
      try {;
        const { data } = await this.$userAPI.get("/sync");
        this.$store.dispatch("sync", data);
      } catch (err) {
        if (this.$route.path == "/dashboard") {
          const errMessage: string = err.response.data.message;
          this.setSnackbar(errMessage, colors.error);
          this.$userAPI.post("/signout");
          this.$store.dispatch("signOut");
          this.$router.push("/");
        }
        this.isLoading = false;
      }
    },
    setSnackbar(message: string, color: string) {
      this.message = message;
      this.color = color;
      this.snackbar = true;
    },
    handleCloseSnackbar() {
      this.$store.dispatch("setGeneralSnackbar", { event: "dismiss" });
    }
  },
  computed: {
    ...mapState([
      "generalSnackbar" 
    ])
  },
  created() {
    this.checkAll();
  },
  watch: {
    generalSnackbar(val: any) {
      const snackbarColor = val.type == "error" ? colors.error : colors.success;
      this.setSnackbar(val.message, snackbarColor);
    }
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
