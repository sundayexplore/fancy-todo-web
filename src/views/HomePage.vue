<template>
  <main class="homeContainer">
    <MainSection />
    <WhySection />
  </main>
</template>

<script lang="ts">
import Vue from "vue";

import { MainSection, WhySection } from "@/components";

export default Vue.extend({
  name: "Home",
  components: {
    MainSection,
    WhySection
  }
});
</script>

<style lang="scss" scoped>
$fullOpacity: 1;
$halfOpacity: 0.5;
$defaultWhite: rgb(252, 248, 243);
</style>
