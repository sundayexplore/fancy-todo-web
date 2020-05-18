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

<style lang="scss" scoped></style>
