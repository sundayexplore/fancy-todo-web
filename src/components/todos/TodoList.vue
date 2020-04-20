<template>
  <v-container class="todoListContainer">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="todos"
      class="elevation-1 todoListTable"
      show-select
      group-by="Due Date"
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
import { Todo } from "@/utils";

export default Vue.extend({
  name: "TodoList",
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
      // const todos = this.$store.state.todos;
      const todos = [
        {
          name: "check",
          dueDate: moment()
        },
        {
          name: "check2",
          dueDate: moment("05/05/1973")
        }
      ];

      todos.forEach((todo: Todo) => {
        const currentDueDate = todo.dueDate;
        todo["Todo"] = todo.name;
        todo["Due Date"] = currentDueDate.format("LL");
        todo["Due Time"] = currentDueDate.format("LT");
      });

      return todos;
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
