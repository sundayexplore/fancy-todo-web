<template>
  <div
    @mouseover="handleMouseHover"
    @mouseleave="handleMouseLeave"
    class="todoItemContainer"
  >
    <div v-if="!showUpdateForm" class="todoWrapper">
      <div class="todoLeftDetails">
        <h3 class="todoTitle">{{ todo.name }}</h3>
        <p
          :class="{
            todoDueTime: true,
            todoOverDue: decideOverDue(),
            todoUndone: decideUndone()
          }"
        >
          {{ todo.displayDueTime }}
        </p>
      </div>
      <div v-if="showRightOptions" class="todoRightOptions">
        <EditSVG class="todoOption" type="button" @click="handleUpdateForm" />
      </div>
    </div>

    <UpdateTodoInlineForm
      v-if="showUpdateForm"
      :todo="todo"
      class="updateTodoInlineForm"
      @dismiss="dismissUpdateTodoInlineForm"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

import UpdateTodoInlineForm from "./UpdateTodoInlineForm.vue";

export default Vue.extend({
  name: "TodoItem",
  props: {
    todo: Object
  },
  components: {
    EditSVG: () => import("-!vue-svg-loader!@/assets/todos/edit.svg"),
    UpdateTodoInlineForm
  },
  data() {
    return {
      showRightOptions: false,
      showUpdateForm: false
    };
  },
  methods: {
    handleMouseHover() {
      this.showRightOptions = true;
    },
    handleMouseLeave() {
      this.showRightOptions = false;
    },
    decideOverDue() {
      const timeNow = moment().format("LT");
      if (timeNow >= this.todo.displayDueTime) {
        return true;
      }
      return false;
    },
    decideUndone() {
      const timeNow = moment().format("LT");
      if (timeNow <= this.todo.displayDueTime) {
        return true;
      }
      return false;
    },
    handleUpdateForm() {
      this.showUpdateForm = true;
    },
    dismissUpdateTodoInlineForm() {
      this.showUpdateForm = false;
    }
  },
  beforeMount() {
    const todoDueTime = document.getElementsByClassName("todoDueTime");

    for (const key in todoDueTime) {
      console.log(key);
    }
  }
});
</script>

<style lang="scss" scoped>
$defaultGrey: #888888;
$defaultFontColor: hsla(0, 0%, 100%, 0.87);
$defaultGreen: #8cba51;
$defaultRed: #fd5e53;

.todoItemContainer {
  display: flex;
  grid-template-rows: auto;
  padding: 5px 0;
  border-bottom: 1px solid $defaultGrey;
  margin: 5px 0;

  .todoWrapper {
    flex-grow: 1;
    display: flex;

    .todoLeftDetails {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: flex-start;

      > * {
        margin: 5px 0;
      }

      .todoTitle {
        color: $defaultFontColor;
        font-size: 15px;
        line-height: 1;
        padding: 4px 0;
      }

      .todoDueTime {
        font-size: 14px;
        line-height: 1;
      }

      .todoOverDue {
        color: $defaultRed;
      }

      .todoUndone {
        color: $defaultGreen;
      }
    }

    .todoRightOptions {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      align-content: center;
      align-items: center;

      .todoOption {
        color: $defaultGrey;
        height: 20px;
        width: auto;
      }
    }
  }

  .updateTodoInlineForm {
    flex-grow: 1;
    padding: 10px 0;
  }
}
</style>
