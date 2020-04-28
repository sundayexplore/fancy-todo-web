<template>
  <section class="whySection">
    <section
      :class="{
        easyToUseSection: true,
        easyToUseSectionAnimation: animateSections.easyToUse
      }"
    >
      <EasyToUseSVG class="easyToUseSVG" />
      <div class="sectionBanner" id="easyToUseBanner">
        <h1 class="sectionTitle">Easy to Use</h1>
        <p class="sectionParagraph">Fancy Todo is designed for ease of use.</p>
      </div>
    </section>

    <section
      :class="{
        openSourceSection: true,
        openSourceSectionAnimation: animateSections.openSource
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

export default Vue.extend({
  name: "WhySection",
  components: {
    EasyToUseSVG: () => import("-!vue-svg-loader!@/assets/easy-to-use.svg"),
    OpenSourceSVG: () => import("-!vue-svg-loader!@/assets/open-source.svg")
  },
  data() {
    return {
      animateSections: {
        easyToUse: false,
        openSource: false
      }
    };
  },
  methods: {
    animateSection(sectionName: string) {
      switch (sectionName) {
        case "easyToUse":
          return (this.animateSections.easyToUse = true);
      }
    },
    handleScroll() {
      const scrollPos = window.scrollY;
      const whySectionScrollPos = Math.floor(
        document.getElementsByClassName("whySection")[0].getBoundingClientRect()
          .y
      );

      if (scrollPos >= whySectionScrollPos) {
        this.animateSections.easyToUse = true;
        this.animateSections.openSource = true;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
});
</script>

<style lang="scss" scoped>
$fullOpacity: 1;
$halfOpacity: 0.5;
$defaultWhite: rgb(252, 248, 243);

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
    visibility: hidden;

    .easyToUseSVG {
      grid-column: 1 / 2;
      grid-row: 1;
      height: 200px;
      width: 50vw;
    }
  }

  .easyToUseSectionAnimation {
    animation: easyToUseIn 1s linear forwards;
    visibility: visible;
  }

  @keyframes easyToUseIn {
    0% {
      opacity: 0;
      transform: translateX(-200%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
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

  .openSourceSectionAnimation {
    animation: openSourceIn 1s linear forwards;
  }

  @keyframes openSourceIn {
    0% {
      opacity: 0;
      transform: translateX(200%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
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
