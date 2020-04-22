<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      multi-line
      right
      :timeout="6000"
      top
    >
      {{ message }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-dialog
      persistent
      v-model="showAddTodoModal"
      width="500"
      @click:outside="dismiss"
    >
      <v-card>
        <v-card-title class="headline lighten-2" primary-title>
          Add Todo
        </v-card-title>

        <add-todo-form
          v-if="!isLoading"
          @change="handleAddTodoData"
        ></add-todo-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="!isLoading" color="primary" text @click="addTodo">
            Add Todo
          </v-btn>
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import AddTodoForm from "./AddTodoForm.vue";
import moment from "moment";

interface AddTodoData {
  name: string;
  dueDate: string;
}

export default Vue.extend({
  name: "AddTodoModal",
  components: {
    AddTodoForm
  },
  props: {
    showAddTodoModal: Boolean
  },
  data() {
    return {
      addTodoData: {
        name: "",
        dueDate: moment().toISOString()
      },
      isLoading: false,
      snackbar: false,
      message: "",
      color: "",
      colors: {
        error: "#F44336",
        success: "#4CAF50"
      }
    };
  },
  methods: {
    handleAddTodoData(addTodoData: AddTodoData) {
      this.addTodoData = addTodoData;
    },
    async addTodo() {
      this.isLoading = true;
      const addTodoData = this.addTodoData;
      const username = this.$store.state.currentUser.username;
      const token = localStorage.getItem("token");
      if (addTodoData.name.length == 0) {
        this.setSnackbar("Please fill out all the fields!", this.colors.error);
        this.isLoading = false;
      } else {
        try {
          const { data } = await this.$todoAPI.post(
            `/${username}`,
            addTodoData,
            { headers: { token } }
          );
          this.setSnackbar(data.message, this.colors.success);
          this.dismiss();
          this.$store.dispatch("addTodo", data.todo);
        } catch (err) {
          this.setSnackbar(err.response.data.message, this.colors.error);
        }
        this.isLoading = false;
      }
    },
    setSnackbar(message: string, color: string) {
      this.message = message;
      this.color = color;
      this.snackbar = true;
    },
    dismiss() {
      this.$emit("dismiss");
    }
  }
});
</script>

<style lang="scss" scoped></style>
