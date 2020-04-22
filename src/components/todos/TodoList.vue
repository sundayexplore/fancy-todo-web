<template>
  <v-container class="todoListContainer">
    <v-container class="actionPanel">
      <v-btn
        color="primary lighten-2"
        dark
        @click.stop="showAddTodoModal = true"
      >
        Add Todo
      </v-btn>
      <v-btn
        v-if="canUpdateTodo"
        color="secondary lighten-2"
        dark
        @click.stop="showUpdateTodoModal = true"
      >
        Update Todo
      </v-btn>
      <add-todo-modal
        @dismiss="dismissAddTodoModal"
        :showAddTodoModal="showAddTodoModal"
      ></add-todo-modal>
      <update-todo-modal
        @dismiss="dismissUpdateTodoModal"
        :showUpdateTodoModal="showUpdateTodoModal"
        :todoId="currentTodoId"
      ></update-todo-modal>
    </v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="localTodos"
      class="elevation-1 todoListTable"
      show-select
      group-by="Due Date"
      item-key="_id"
      show-group-by
    >
      <template v-slot:no-data>
        <p>No todos. Let's create one!</p>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import moment from "moment";

import AddTodoModal from "./AddTodoModal.vue";
import UpdateTodoModal from "./UpdateTodoModal.vue";
import { Todo } from "@/utils";

export default Vue.extend({
  name: "TodoList",
  components: {
    AddTodoModal,
    UpdateTodoModal
  },
  data() {
    return {
      showAddTodoModal: false,
      showUpdateTodoModal: false,
      canUpdateTodo: false,
      currentTodoId: "",
      selected: [] as Array<Todo>,
      localTodos: [] as Array<Todo>,
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
  computed: mapState(["todos"]),
  watch: {
    todos(newTodos: Array<Todo>) {
      this.localTodos = newTodos.map((todo: Todo) => {
        todo["Todo"] = todo.name;
        todo["Due Date"] = moment(todo.dueDate).format("LL");
        todo["Due Time"] = moment(todo.dueDate).format("LT");
        return todo;
      });
    },
    selected(newSelected: Array<Todo>) {
      if (newSelected.length == 1) {
        this.canUpdateTodo = true;
        this.currentTodoId = newSelected[0]._id;
      } else {
        this.canUpdateTodo = false;
        this.currentTodoId = "";
      }
    }
  },
  methods: {
    dismissAddTodoModal() {
      this.showAddTodoModal = false;
    },
    dismissUpdateTodoModal() {
      this.showUpdateTodoModal = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.todoListContainer {
  display: grid !important;
  grid-template-areas: "ActionPanel TodoListTable" !important;
  grid-template-columns: 1fr 2fr !important;
  grid-template-rows: auto !important;
  justify-items: center !important;
}

.actionPanel {
  grid-area: ActionPanel;
  display: flex;
  flex-direction: column;
}

.todoListTable {
  grid-area: TodoListTable;
  width: 50vw;
}
</style>
