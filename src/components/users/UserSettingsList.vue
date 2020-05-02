<template>
  <v-list class="settingsMenuList">
    <v-list-item class="settingsMenuListItemCenter">
      <v-avatar color="blue">
        <span class="white--text headline">{{ initialName }}</span>
      </v-avatar>
    </v-list-item>
    <v-list-item class="settingsMenuListItemName">
      <h3>{{ fullName }}</h3>
      <span>{{ currentUser.username }}</span>
    </v-list-item>
    <v-list-item class="settingsMenuListItem">
      <SettingsSVG class="settingsMenuSVG" />
      <span class="settingsMenuItem">Settings</span>
    </v-list-item>
    <v-list-item class="settingsMenuListItem">
      <SignOutSVG class="settingsMenuSVG" />
      <span class="settingsMenuItem">Sign Out</span>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "UserSettingsList",
  props: {
    currentUser: Object
  },
  components: {
    SettingsSVG: () => import("-!vue-svg-loader!@/assets/users/settings.svg"),
    SignOutSVG: () => import("-!vue-svg-loader!@/assets/users/sign-out.svg")
  },
  computed: {
    fullName() {
      const { firstName, lastName } = this.currentUser;
      return `${firstName} ${lastName}`;
    },
    initialName() {
      const { firstName, lastName } = this.currentUser;
      return `${firstName[0]}${lastName[0]}`;
    }
  }
});
</script>

<style lang="scss" scoped>
.settingsMenuList {
  padding: 14px 0;

  .settingsMenuListItemCenter {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .settingsMenuListItemName {
    display: block;
    text-align: center;
    padding: 8px 0;
  }

  .settingsMenuListItem {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;

    .settingsMenuSVG {
      width: auto;
      height: 16px;
    }

    .settingsMenuItem {
      padding-left: 10px;
    }
  }
}
</style>
