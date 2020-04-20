<template>
  <div id="app">
    <v-app id="inspire">
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="red lighten-2" dark v-on="on">
              Add Todo
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline lighten-2" primary-title>
              Add Todo
            </v-card-title>

            <add-todo-form></add-todo-form>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import AddTodoForm from "./AddTodoForm.vue";

export default Vue.extend({
  name: "AddTodoModal",
  props: ["status"],
  components: {
    AddTodoForm
  },
  data() {
    return {};
  }
});
</script>

<style lang="scss" scoped></style>
