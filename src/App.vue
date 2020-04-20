<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Header } from "@/components";
import { IUser } from "@/utils";

export default Vue.extend({
  name: "App",
  components: {
    Header
  },
  methods: {
    async checkAll() {
      const token: string = localStorage.getItem("token")!;
      const currentUser: IUser = JSON.parse(
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
          console.log(err.response);
        }
      } else {
        this.$router.push({ path: "/signin" });
      }
    }
  },
  created() {
    this.checkAll();
  }
});
</script>
