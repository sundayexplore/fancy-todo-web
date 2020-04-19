<template>
  <v-container class="container">
    <user-profile-card class="userProfileCard" />
    <router-view class="routerView"></router-view>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import { UserProfileCard } from "@/components";

export default Vue.extend({
  name: "UserPage",
  components: {
    UserProfileCard
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  grid-template-areas: "UserProfileCard RouterView";
  height: 100vh;
  justify-content: center;
  align-content: center;
  align-items: center;
  place-items: center center;
}

.userProfileCard {
  grid-area: UserProfileCard;
}

.routerView {
  grid-area: RouterView;
}
</style>
