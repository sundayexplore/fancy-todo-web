<template>
  <header id="userHeaderContainer">
    <nav id="headerMenu">
      <BarsSVG id="navIcon" type="button" />
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
    <v-dialog v-model="showAddTodoModal" max-width="800px">
      <AddTodoInlineForm
        class="addTodoInlineModal"
        @dismiss="dismissAddTodoModal"
      />
    </v-dialog>
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

import AddTodoInlineForm from "../todos/AddTodoInlineForm.vue";

export default Vue.extend({
  name: "UserHeader",
  components: {
    SettingsSVG: () => import("-!vue-svg-loader!@/assets/users/settings.svg"),
    PlusSVG: () => import("-!vue-svg-loader!@/assets/todos/plus.svg"),
    BarsSVG: () => import("-!vue-svg-loader!@/assets/bars.svg"),
    AddTodoInlineForm
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
      this.settings.x = e.screenX;
      this.settings.y = e.screenY - 72;
      this.$nextTick(() => {
        this.showSettings = true;
      });
    },
    dismissAddTodoModal() {
      this.showAddTodoModal = false;
    }
  }
});
</script>

<style lang="scss" scoped>
$defaultBlue: #3282b8;
$defaultWhite: rgb(252, 248, 243);
$defaultGrey: #f1f1f6;
$defaultDarker: #1f1f1f;
$defaultDark: #393e46;

#userHeaderContainer {
  background-color: $defaultBlue;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 6px 0 $defaultBlue;

  #headerMenu {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    padding: 0 3vw;
    align-items: center;

    #navIcon {
      height: 30px;
      width: auto;
      color: $defaultWhite;
      transition: background 0.5s ease 0s;
      padding: 6px;
      border-radius: 4px;
    }

    #navIcon:hover {
      background: $defaultGrey;
      color: $defaultBlue;
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
        color: $defaultBlue;
      }
    }
  }
}

.addTodoInlineModal {
  background: $defaultDark;
  padding: 16px 16px;
}
</style>
