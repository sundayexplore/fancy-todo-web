<template>
  <v-card class="profileCard">
    <v-card-title>{{ fullName }}</v-card-title>
    <v-card-subtitle>{{ currentUser.username }}</v-card-subtitle>
    <v-card-subtitle>{{ currentUser.email }}</v-card-subtitle>
    <v-card-actions class="profileCardActions">
      <v-btn outlined class="profileCardBtn" small>Update Profile</v-btn>
      <v-btn outlined class="profileCardBtn" small>Change Password</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export default {
  name: "UserProfileCard",
  data() {
    return {
      currentUser:
        this.$store.state.currentUser ||
        JSON.parse(localStorage.getItem("currentUser")!)
    };
  },
  computed: {
    fullName() {
      return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.profileCard {
  display: flex;
  flex-direction: column;
  padding: 3vh;
  width: fit-content;
  height: fit-content;
  box-sizing: border-box;
  align-items: center;
}

.profileCardActions {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-content: space-between;
  align-content: space-between;
  align-items: center;
  grid-gap: 2vh;
}

.profileCardBtn {
  margin: auto auto;
  width: 12vw;
}
</style>
