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
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

import UpdateTodoForm from "./UpdateTodoForm.vue";
import { Todo, colors } from "@/utils";

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
      minDate: moment().toISOString(),
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
      color: ""
    };
  },
  methods: {
    handleUpdateTodoData(finalUpdateTodoData: UpdateTodoData) {
      this.finalUpdateTodoData = finalUpdateTodoData;
    },
    async updateTodo() {
      this.isLoading = true;
      const finalUpdateTodoData = this.finalUpdateTodoData;
      const username = this.$store.state.currentUser.username;
      const token = localStorage.getItem("token");
      if (finalUpdateTodoData.name.length == 0) {
        this.setSnackbar("Please fill out all the fields!", colors.error);
        this.isLoading = false;
      } else if (
        finalUpdateTodoData.dueDate < this.minDate &&
        finalUpdateTodoData.name.length != 0
      ) {
        this.setSnackbar(
          `Cannot set the date and time, please review the date and time!
          As the minimum date is ${moment(this.minDate).format("LL")}.
          And the minimum time is ${moment(this.minDate).format("LT")}`,
          colors.error
        );
        this.updateTodoData.name = finalUpdateTodoData.name;
        this.updateTodoData.dueDate = moment(finalUpdateTodoData.dueDate)
          .toISOString()
          .substr(0, 10);
        this.updateTodoData.dueTime = moment(
          finalUpdateTodoData.dueDate
        ).format("HH:mm");
        this.isLoading = false;
      } else {
        try {
          const {
            data
          } = await this.$todoAPI.put(
            `/${username}/${this.todoId}`,
            finalUpdateTodoData,
            { headers: { token } }
          );
          this.setSnackbar(data.message, colors.success);
          this.dismiss();
          this.$store.dispatch("updateTodo", data.todo);
        } catch (err) {
          this.setSnackbar(err.response.data.message, colors.error);
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
      if (this.todoId.length > 0) {
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
        this.finalUpdateTodoData = {
          name: updateTodoData.name,
          dueDate: currentDueDate
        };
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
