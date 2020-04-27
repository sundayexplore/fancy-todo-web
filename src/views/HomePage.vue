<template>
  <main class="homeContainer">
    <section class="mainSection">
      <section id="heroSection">
        <h1 id="mainTitle">Fancy Todo</h1>
        <h3 id="mainDescription">
          From a bootcamp project, to fancily open source.
        </h3>
      </section>
      <form id="signUpPromoSection" @submit.prevent="handleSignUpPromo">
        <v-text-field
          class="emailTextField"
          v-model="email"
          placeholder="Email"
          solo
          type="email"
          height="10vh"
        ></v-text-field>
        <button
          id="signUpPromoBtn"
          @submit.prevent="handleSignUpPromo"
          @click="handleSignUpPromo"
        >
          Sign Up - It's Free!
        </button>
      </form>
    </section>

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
  </main>
</template>

<script lang="ts">
import Vue from "vue";

import EasyToUseSVG from "-!vue-svg-loader!@/assets/easy-to-use.svg";
import OpenSourceSVG from "-!vue-svg-loader!@/assets/open-source.svg";

export default Vue.extend({
  name: "Home",
  components: {
    EasyToUseSVG,
    OpenSourceSVG
  },
  data() {
    return {
      userPath: "/signup",
      email: "",
      animateSections: {
        easyToUse: false,
        openSource: false
      }
    };
  },
  methods: {
    handleSignUpPromo() {
      if (this.email.length == 0) {
        return this.$router.push({ name: "SignUp" });
      }

      return this.$router.push({
        name: "SignUp",
        query: { email: this.email }
      });
    },
    animateSection(sectionName: string) {
      switch (sectionName) {
        case "easyToUse":
          return (this.animateSections.easyToUse = true);
      }
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      const sectionScrollPositions = {
        easyToUse: Math.floor(
          document
            .getElementsByClassName("easyToUseSection")[0]
            .getBoundingClientRect().y
        ),
        openSource: Math.floor(
          document
            .getElementsByClassName("openSourceSection")[0]
            .getBoundingClientRect().y
        )
      };
      if (scrollPosition >= sectionScrollPositions.easyToUse - 200) {
        this.animateSections.easyToUse = true;
      } else if (scrollPosition >= sectionScrollPositions.openSource - 200) {
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

.homeContainer {
  .mainSection {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    height: 100vh;
    background-color: rgba(20, 40, 80, $fullOpacity);
    align-items: center;

    #heroSection {
      grid-column: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;

      > * {
        text-align: left;
        padding-left: 10vw;
      }

      #mainTitle {
        width: 50vw;
        color: $defaultWhite;
        font-weight: bold;
        font-size: 64px;
        line-height: 1;
        animation-name: mainTitleIn;
        animation-duration: 2s;
        animation-direction: normal;
      }

      @keyframes mainTitleIn {
        0% {
          opacity: 0;
          transform: translateX(-200%);
        }
        100% {
          opacity: 1;
          transform: translateX(0%);
        }
      }

      #mainDescription {
        margin-top: 3vh;
        width: 50vw;
        color: $defaultWhite;
        font-size: 32px;
        font-weight: 400;
        line-height: 1;
        animation: mainDescriptionIn 1s ease;
      }

      @keyframes mainDescriptionIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }

    #signUpPromoSection {
      grid-column: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: flex-start;

      .emailTextField {
        width: 45vw;
        font-size: 1.5em;
        line-height: 1.5;
        font-weight: 550;
      }

      #signUpPromoBtn {
        background-color: #00bcd4;
        border-radius: 4px;
        color: $defaultWhite;
        font-size: 1.4em;
        line-height: 1.4;
        font-weight: 550;
        height: 44px;
        padding: 0 2vw;
        margin-top: -2vh;
      }

      #signUpPromoBtn:hover {
        background-color: #00909e;
      }
    }
  }

  .easyToUseSection {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 15vh auto;
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 15vh auto;

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
