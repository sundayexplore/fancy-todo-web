<template>
  <v-container class="todoListContainer">
    <add-todo-modal></add-todo-modal>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="todos"
      class="elevation-1 todoListTable"
      show-select
      group-by="Due Date"
      item-key="_id"
      show-group-by
    >
      <template v-slot:no-data>
        <p>No todos. Click here to create one!</p>
        <v-btn outlined small>Create todo</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

import AddTodoModal from "./AddTodoModal.vue";
import { Todo } from "@/utils";

export default Vue.extend({
  name: "TodoList",
  components: {
    AddTodoModal
  },
  data() {
    return {
      selected: [],
      headers: [
        {
          text: "Todo",
          align: "start",
          sortable: true,
          value: "Todo"
        },
        {
          text: "Due Date",
          align: "center",
          sortable: true,
          value: "Due Date"
        },
        {
          text: "Due Time",
          align: "center",
          sortable: true,
          value: "Due Time"
        }
      ]
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos.map((todo: Todo) => {
        todo["Todo"] = todo.name;
        todo["Due Date"] = moment(todo.dueDate).format("LL");
        todo["Due Time"] = moment(todo.dueDate).format("LT");
        return todo;
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.todoListContainer {
  display: flex;
  flex-direction: column;
}

.todoListTable {
  width: 50vw;
}
</style>
