<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col>
        <h1>This is User Auth Page</h1>
      </v-col>
      <v-col cols="6">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  name: "UserAuthPage"
};
</script>

<style lang="scss" scoped></style>
