<template>
  <section class="whySection">
    <section
      data-aos="fade"
      :class="{
        easyToUseSection: true
      }"
    >
      <EasyToUseSVG class="easyToUseSVG" />
      <div class="sectionBanner" id="easyToUseBanner">
        <h1 class="sectionTitle">Easy to Use</h1>
        <p class="sectionParagraph">Fancy Todo is designed for ease of use.</p>
      </div>
    </section>

    <section
      data-aos="fade"
      :class="{
        openSourceSection: true
      }"
    >
      <OpenSourceSVG class="openSourceSVG" />
      <div class="sectionBanner" id="openSourceBanner">
        <h1 class="sectionTitle">Open Source</h1>
        <p class="sectionParagraph">
          Software is just like s**, it's better when it's free.
        </p>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

export default Vue.extend({
  name: "WhySection",
  components: {
    EasyToUseSVG: () => import("-!vue-svg-loader!@/assets/easy-to-use.svg"),
    OpenSourceSVG: () => import("-!vue-svg-loader!@/assets/open-source.svg")
  },
  created() {
    AOS.init();
  }
});
</script>

<style lang="scss" scoped>
.whySection {
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;

  .easyToUseSection {
    grid-row: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 10vh auto;

    .easyToUseSVG {
      grid-column: 1 / 2;
      grid-row: 1;
      height: 200px;
      width: 50vw;
    }
  }

  .openSourceSection {
    grid-row: 2;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 10vh auto;

    .openSourceSVG {
      grid-column: 2 / 2;
      grid-row: 1;
      height: 200px;
      width: 50vw;
    }
  }

  #easyToUseBanner {
    border-right: 5px solid blueviolet;
  }

  #openSourceBanner {
    border-left: 5px solid palevioletred;
  }

  .sectionTitle {
    font-size: 40px;
    line-height: 1;
    text-align: center;
  }

  .sectionParagraph {
    font-size: 20px;
    margin: 5vh 3vw;
    text-decoration: none;
    text-align: center;
  }

  .sectionBanner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin: auto 5vw;
  }
}
</style>
