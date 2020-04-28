<template>
  <header id="userHeaderContainer">
    <nav id="headerMenu">
      <OpenSourceSVG id="headerLogo" />
      <section id="userPanel">
        <PlusSVG
          type="button"
          class="panelIcon"
          @click.stop="showAddTodoModal = true"
        />
        <SettingsSVG
          type="button"
          id="settingsBtn"
          class="panelIcon"
          @click="handleShowSettings"
        />
      </section>
    </nav>
    <AddTodoModal
      @dismiss="showAddTodoModal = false"
      :showAddTodoModal="showAddTodoModal"
      data-app
    />
    <v-menu
      v-model="showSettings"
      :position-x="settings.x"
      :position-y="settings.y"
      @click:outside="showSettings = false"
    >
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </header>
</template>

<script lang="ts">
import Vue from "vue";

import AddTodoModal from "../todos/AddTodoModal.vue";

export default Vue.extend({
  name: "UserHeader",
  components: {
    OpenSourceSVG: () => import("-!vue-svg-loader!@/assets/open-source.svg"),
    SettingsSVG: () => import("-!vue-svg-loader!@/assets/users/settings.svg"),
    PlusSVG: () => import("-!vue-svg-loader!@/assets/todos/plus.svg"),
    AddTodoModal
  },
  data() {
    return {
      showAddTodoModal: false,
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],
      showSettings: false,
      settings: {
        y: 0,
        x: 0
      }
    };
  },
  methods: {
    handleShowSettings(e: MouseEvent) {
      e.preventDefault();
      this.showSettings = false;
      this.settings.x = e.clientX;
      this.settings.y = e.clientY;
      this.$nextTick(() => {
        this.showSettings = true;
      });
    }
  }
});
</script>

<style lang="scss" scoped>
$defaultDark: #222831;
$defaultWhite: rgb(252, 248, 243);
$defaultGrey: #84a9ac;

#userHeaderContainer {
  background-color: $defaultDark;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 6px 0 $defaultDark;

  #headerMenu {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    padding: 0 3vw;

    #headerLogo {
      height: 25px;
      width: auto;
    }
    #userPanel {
      display: flex;
      align-items: center;
      clear: both;
      justify-content: space-between;
      width: 6vw;
      align-content: center;

      .panelIcon {
        height: 30px;
        width: auto;
        color: $defaultWhite;
        transition: background 0.5s ease 0s;
        padding: 6px;
        border-radius: 4px;
      }

      .panelIcon:hover {
        background: $defaultGrey;
      }
    }
  }
}
</style>
