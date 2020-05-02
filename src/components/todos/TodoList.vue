<template>
  <v-container class="todoListContainer">
    <div
      v-for="todoSet in mockTodos"
      :key="todoSet.dueDate"
      class="todoSetContainer"
    >
      <h2 class="todoSetTitle">
        {{ moment(todoSet.dueDate).calendar() }}
        <small class="todoSetSubtitle">{{
          handleTodoSetSubtitle(todoSet.dueDate)
        }}</small>
      </h2>
      <ul class="todoList">
        <li v-for="todo in todoSet.todos" :key="todo._id" class="todoListItem">
          <TodoItem :todo="todo" />
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import moment, { Moment } from "moment";

import TodoItem from "./TodoItem.vue";

import { Todo } from "@/utils";

interface TodoSet {
  dueDate?: string | Date | Moment;
  todos?: Array<Todo>;
}

moment.updateLocale("en", {
  calendar: {
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    lastWeek: "[Last] dddd",
    nextWeek: "[Next] dddd",
    sameElse: "LL"
  }
});

export default Vue.extend({
  name: "TodoList",
  components: {
    TodoItem
  },
  data() {
    return {
      moment,
      showAddTodoModal: false,
      showUpdateTodoModal: false,
      canUpdateTodo: false,
      currentTodoId: "",
      localTodos: [] as Array<TodoSet>,
      mockTodos: [
        {
          dueDate: moment().toISOString(),
          todos: [
            {
              name: "Mock Todo",
              displayDueTime: moment().format("LT")
            },
            {
              name: "Mock Todo 2",
              displayDueTime: moment().format("LT")
            }
          ]
        },
        {
          dueDate: moment("20200403").toISOString(),
          todos: [
            {
              name: "Mock Todo",
              displayDueTime: moment().format("LT")
            },
            {
              name: "Mock Todo 2",
              displayDueTime: moment().format("LT")
            }
          ]
        }
      ]
    };
  },
  computed: mapState(["todos"]),
  watch: {
    todos(newTodos: Array<Todo>) {
      let finalTodos: Array<TodoSet> = [];
      let dates: Array<Date | string> = [];

      newTodos.forEach((todo: Todo) => {
        dates.push(todo.dueDate as string);
      });

      dates = dates.filter((date, idx) => dates.indexOf(date) === idx);

      dates.forEach((date: string | Date | Moment) => {
        finalTodos.push({ dueDate: date });
      });

      finalTodos = finalTodos.map((todoSet: TodoSet) => {
        const todos: Array<Todo> = [];
        newTodos.forEach((todo: Todo) => {
          if (
            moment(todo.dueDate).format("LL") ==
            moment(todoSet.dueDate).format("LL")
          ) {
            todoSet.todos!.push(todo);
          }
        });
        todoSet.todos = todos;
        return todoSet;
      });

      this.localTodos = finalTodos.map((todoSet: TodoSet) => {
        todoSet.todos = todoSet.todos!.map((todo: Todo) => {
          todo.displayDueDate = moment(todo.dueDate).format("LL");
          todo.displayDueTime = moment(todo.dueDate).format("LT");
          return todo;
        });
        return todoSet;
      });
    }
  },
  methods: {
    dismissUpdateTodoModal() {
      this.showUpdateTodoModal = false;
    },
    handleTodoSetSubtitle(date: string) {
      const calendarDate = moment(date).calendar();
      const formattedDate = moment(date).format("LL");

      if (calendarDate == formattedDate) {
        return "";
      }

      return formattedDate;
    }
  }
});
</script>

<style lang="scss" scoped>
$defaultGrey: #888888;
$defaultFontColor: hsla(0, 0%, 100%, 0.87);

.todoListContainer {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  justify-items: center;

  .todoSetContainer {
    grid-column: 1;
    width: 100%;
    margin: 15px 0;

    .todoSetTitle {
      color: $defaultFontColor;
      font-size: 20px;
      padding: 5px 0;

      .todoSetSubtitle {
        font-size: 12px;
        color: $defaultGrey;
        padding: 0 10px;
      }
    }

    .todoList {
      padding: 0;
      list-style-type: none;
    }
  }
}
</style>
