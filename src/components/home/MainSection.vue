<template>
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
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MainSection",
  data() {
    return {
      email: ""
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
    }
  }
});
</script>

<style lang="scss" scoped>
$fullOpacity: 1;
$halfOpacity: 0.5;
$defaultWhite: rgb(252, 248, 243);

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
</style>
