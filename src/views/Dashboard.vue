<template>
  <div>
    <UserHeader />
    <main id="dashboardContainer">
      <todo-list id="todoList"></todo-list>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

import { TodoList, UserHeader } from "@/components";

export default Vue.extend({
  name: "UserPage",
  components: {
    TodoList,
    UserHeader
  },
  computed: mapState(["currentUser"]),
  watch: {
    currentUser(currentUserData) {
      const { username } = this.$route.params;
      const { firstName, lastName } = currentUserData;
      document.title = `${username} (${firstName} ${lastName}) | Fancy Todo`;
    }
  }
});
</script>

<style lang="scss" scoped>
$defaultDarker: #1f1f1f;

#dashboardContainer {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  height: 100vh;
  justify-items: center;
  background-color: $defaultDarker;
}

#todoList {
  grid-column: 1;
}
</style>
