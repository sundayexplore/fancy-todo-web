<template>
  <v-container class="container">
    <user-profile-card class="userProfileCard" />
    <todo-list class="todoList"></todo-list>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import { UserProfileCard, TodoList } from "@/components";

export default Vue.extend({
  name: "UserPage",
  components: {
    UserProfileCard,
    TodoList
  },
  mounted() {
    console.log(this.$store.state);
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: auto;
  grid-template-areas: "UserProfileCard TodoList";
  height: 100vh;
  justify-items: center;
}

.userProfileCard {
  grid-area: UserProfileCard;
}

.todoList {
  grid-area: TodoList;
}
</style>
