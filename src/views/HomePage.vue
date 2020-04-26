<template>
  <main class="homeContainer">
    <section class="mainSection">
      <section class="titleSection">
        <h1 class="mainTitle">Fancy Todo</h1>
        <div class="buttons">
          <router-link :to="userPath" id="userBtn">Get started</router-link>
          <router-link to="/signin" id="learnMoreBtn">Learn more</router-link>
        </div>
      </section>
    </section>

    <section class="easyToUseSection">
      <EasyToUseSVG class="easyToUseSVG" />
    </section>
    <section class="openSourceSection">
      <OpenSourceSVG class="openSourceSVG" />
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
      userPath: "/signup"
    };
  }
});
</script>

<style lang="scss" scoped>
$fullOpacity: 1;
$halfOpacity: 0.5;

.homeContainer {
  .mainSection {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    height: 80vh;
    background-color: rgba(20, 40, 80, $fullOpacity);
    align-items: center;

    .titleSection {
      grid-column: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;

      .mainTitle {
        color: #ffbcbc;
        font-weight: 500;
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

      .buttons {
        margin: 5vh;
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        align-items: flex-start;
        animation-name: buttonsIn;
        animation-duration: 2s;
        animation-direction: normal;

        #userBtn {
          padding: 2vh 4vh;
          font-size: 20px;
          margin: 2vh;
          text-decoration: none;
          color: rgba(20, 40, 80, $fullOpacity);
          background-color: #ffbcbc;
        }

        #userBtn:hover {
          background-color: #fff;
        }

        #learnMoreBtn {
          padding: 2vh 4vh;
          font-size: 20px;
          margin: 2vh;
          text-decoration: none;
          color: #ffbcbc;
        }

        #learnMoreBtn:hover {
          color: #fff;
        }

        @keyframes buttonsIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }
    }
  }

  .mainSection::after {
    margin-top: 10vh;
  }

  .easyToUseSection {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;

    .easyToUseSVG {
      height: 450px;
      width: 100px;
    }
  }

  .openSourceSection {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;

    .openSourceSVG {
      height: 450px;
      width: 100px;
    }
  }
}
</style>
