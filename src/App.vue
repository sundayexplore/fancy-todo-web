<template>
  <div>
    <Header v-if="this.$store.isSignedIn" />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Header } from "@/components";

export default Vue.extend({
  name: "App",

  components: {
    Header
  },

  data: () => ({
    //
  })
});
</script>
