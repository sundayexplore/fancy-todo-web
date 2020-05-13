<template>
  <header id="userHeaderContainer">
    <nav id="headerMenu">
      <BarsSVG id="navIcon" type="button" />
      <section id="userPanel">
        <PlusSVG
          type="button"
          class="panelIcon"
          @click.stop="showAddTodoModal = !showAddTodoModal"
        />
        <v-menu offset-y bottom dark>
          <template v-slot:activator="{ on }">
            <button id="settingsBtn" v-on="on">
              <SettingsSVG class="panelIcon" />
            </button>
          </template>
          <UserSettingsList
            @success="handleSettingsListSuccess"
            @error="handleSettingsListError"
            :currentUser="currentUser"
          />
        </v-menu>
      </section>
    </nav>
    <v-dialog v-model="showAddTodoModal" max-width="800px">
      <AddTodoInlineForm
        class="addTodoInlineModal"
        @dismiss="dismissAddTodoModal"
      />
    </v-dialog>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

import AddTodoInlineForm from "../todos/AddTodoInlineForm.vue";
import UserSettingsList from "./UserSettingsList.vue";

import { colors } from "@/utils";

export default Vue.extend({
  name: "UserHeader",
  components: {
    SettingsSVG: () => import("-!vue-svg-loader!@/assets/users/settings.svg"),
    PlusSVG: () => import("-!vue-svg-loader!@/assets/todos/plus.svg"),
    BarsSVG: () => import("-!vue-svg-loader!@/assets/bars.svg"),
    AddTodoInlineForm,
    UserSettingsList
  },
  data() {
    return {
      showAddTodoModal: false,
      snackbar: {
        status: false,
        message: "",
        color: ""
      }
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    dismissAddTodoModal() {
      this.$data.showAddTodoModal = false;
    },
    setSnackbar(type: "success" | "error", message: string) {
      switch (type) {
        case "success":
          this.snackbar.status = true;
          this.snackbar.message = message;
          this.snackbar.color = colors.success;
          break;

        case "error":
          this.snackbar.status = true;
          this.snackbar.message = message;
          this.snackbar.color = colors.error;
          break;
      }
    },
    handleSettingsListSuccess(message: string) {
      this.$store.dispatch("setGeneralSnackbar", {
        event: "open",
        type: "success",
        message
      });
      this.$router.push("/signin");
    },
    handleSettingsListError(message: string) {
      this.$store.dispatch("setGeneralSnackbar", {
        event: "open",
        type: "error",
        message
      });
      // this.$router.push("/signin");
    }
  }
});
</script>

<style lang="scss" scoped>
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

      #settingsBtn {
        display: flex;
      }
    }
  }
}

.addTodoInlineModal {
  background: $defaultDark;
  padding: 16px 16px;
}
</style>
