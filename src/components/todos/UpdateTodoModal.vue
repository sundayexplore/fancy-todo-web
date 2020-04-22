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
    <v-app>
      <div class="text-center">
        <v-dialog
          persistent
          @click:outside="dismiss"
          v-model="showUpdateTodoModal"
          width="500"
        >
          <v-card>
            <v-card-title class="headline lighten-2" primary-title>
              Update Todo
            </v-card-title>

            <update-todo-form
              v-if="!isLoading"
              :todoName="updateTodoData.name"
              :dueDate="updateTodoData.dueDate"
              :dueTime="updateTodoData.dueTime"
              @change="handleUpdateTodoData"
              @updateDueDate="handleUpdateDueDate"
              @updateDueTime="handleUpdateDueTime"
            ></update-todo-form>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-if="!isLoading" color="primary" text @click="updateTodo">
                Update Todo
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
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

import UpdateTodoForm from "./UpdateTodoForm.vue";
import { Todo } from "@/utils";

interface UpdateTodoData {
  name: string;
  dueDate: string;
}

export default Vue.extend({
  name: "UpdateTodoModal",
  components: {
    UpdateTodoForm
  },
  props: {
    todoId: String,
    showUpdateTodoModal: Boolean
  },
  data() {
    return {
      updateTodoData: {
        name: "",
        dueDate: moment()
          .toISOString()
          .substr(0, 10),
        dueTime: moment().format("HH:mm")
      },
      finalUpdateTodoData: {
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
    handleUpdateTodoData(updateTodoData: UpdateTodoData) {
      this.finalUpdateTodoData = updateTodoData;
    },
    async updateTodo() {
      this.isLoading = true;
      const updateTodoData = this.updateTodoData;
      const username = this.$store.state.currentUser.username;
      const token = localStorage.getItem("token");
      if (updateTodoData.name.length == 0) {
        this.setSnackbar("Please fill out all the fields!", this.colors.error);
        this.isLoading = false;
      } else {
        try {
          const {
            data
          } = await this.$todoAPI.put(
            `/${username}/${this.todoId}`,
            updateTodoData,
            { headers: { token } }
          );
          this.setSnackbar(data.message, this.colors.success);
          this.dismiss();
          this.$store.dispatch("updateTodo", data.todo);
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
    },
    handleUpdateDueDate(newDueDate: string) {
      this.updateTodoData.dueDate = newDueDate;
    },
    handleUpdateDueTime(newDueTime: string) {
      this.updateTodoData.dueTime = newDueTime;
    }
  },
  watch: {
    todoId() {
      const todos = this.$store.state.todos;
      const updateTodoData = todos.filter((todo: Todo) => {
        return todo._id == this.todoId;
      })[0];
      const currentDueDate = updateTodoData.dueDate;
      updateTodoData.dueDate = moment(currentDueDate)
        .toISOString()
        .substr(0, 10);
      updateTodoData.dueTime = moment(currentDueDate).format("HH:mm");
      this.updateTodoData = updateTodoData;
    }
  }
});
</script>

<style lang="scss" scoped></style>
