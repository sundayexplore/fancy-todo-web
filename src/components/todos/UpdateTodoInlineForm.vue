<template>
  <form
    ref="div"
    @submit.prevent="handleUpdateTodo"
    class="updateTodoInlineWrapper"
  >
    <input
      type="text"
      required
      v-model="todoName"
      class="updateTodoNameInput"
    />
    <v-menu offset-y bottom>
      <template v-slot:activator="{ on }">
        <button class="todoDateBtn" :disabled="disabledBtn" v-on="on">
          {{ todoDisplayDueDate }}
        </button>
      </template>
      <v-date-picker v-model="todoDueDate" dark scrollable></v-date-picker>
    </v-menu>
    <div class="optionsBtnWrapper">
      <button class="saveBtn" @click="handleUpdateTodo" :disabled="disabledBtn">
        Save
      </button>
      <button
        class="cancelBtn"
        @click="cancelUpdateTodo"
        :disabled="disabledBtn"
      >
        Cancel
      </button>
    </div>
    <div class="todoTimeWrapper">
      <input
        type="text"
        required
        v-model="todoDueTime"
        class="updateTodoTimeInput"
      />
      <p class="todoPreviewDueTime">{{ todoDisplayDueTime }}</p>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "UpdateTodoInlineForm",
  props: {
    todo: Object
  },
  data() {
    return {
      todoName: this.todo.name || "",
      todoDisplayDueDate: this.todo.displayDueDate || moment().format("LL"),
      todoDisplayDueTime: this.todo.displayDueTime || moment().format("LT"),
      todoDueDate: moment(this.todo.displayDueDate).format("YYYY-MM-DD"),
      todoDueTime: this.todo.displayDueTime || moment().format("LT"),
      disabledBtn: false
    };
  },
  watch: {
    todoDueDate(val: string) {
      this.todoDisplayDueDate = moment(val).format("LL");
    },
    todoDueTime(val: string) {
      this.todoDisplayDueTime = moment(val, "LT").format("LT");
    }
  },
  methods: {
    cancelUpdateTodo() {
      this.$emit("dismiss");
    },
    async handleUpdateTodo() {
      this.disabledBtn = true;
      try {
        const { currentUser } = this.$store.state;
        const { data } = await this.$todoAPI.put(
          `/${currentUser._id}/${this.todo._id}`,
          {
            name: this.todoName,
            dueDate: moment(
              `${this.todoDueDate} ${this.todoDisplayDueTime}`
            ).toISOString()
          },
          { headers: { token: localStorage.getItem("token") } }
        );
        this.$store.commit("updateTodo", data.todo);
        this.disabledBtn = false;
      } catch (err) {
        this.disabledBtn = false;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
$defaultGrey: #888888;
$defaultFontColor: hsla(0, 0%, 100%, 0.87);
$defaultGreen: #007944;
$defaultRed: #ff0000;

.updateTodoInlineWrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;
  align-content: center;

  .updateTodoNameInput {
    grid-column: 1 / span 3;
    grid-row: 1;
    color: $defaultFontColor;
    font-size: 16px;
    line-height: 1;
    border: 1px solid $defaultGrey;
    padding: 8px 8px;
  }

  .todoDateBtn {
    grid-column: 4;
    grid-row: 1;
    border: 1px solid $defaultGrey;
    font-size: 14px;
    line-height: 1;
    text-align: left;
    color: $defaultFontColor;
    padding: 8px 8px;
  }

  .updateTodoNameInput,
  .todoDateBtn {
    height: 48px;
  }

  .optionsBtnWrapper {
    grid-column: 1;
    grid-row: 2;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    padding-top: 16px;

    .saveBtn {
      padding: 8px 10px;
      color: #fff;
      background-color: #3282b8;
      font-size: 14px;
      line-height: 1;
      border-radius: 4px;
      border: 1px solid transparent;
      font-weight: bold;
    }

    .cancelBtn {
      margin-left: 15px;
      color: $defaultGrey;
      font-size: 14px;
      line-height: 1;
    }
  }

  .todoTimeWrapper {
    grid-column: 4;
    grid-row: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;

    .updateTodoTimeInput {
      border: 1px solid $defaultGrey;
      font-size: 14px;
      line-height: 1;
      text-align: left;
      color: $defaultFontColor;
      padding: 8px 8px;
    }

    .todoPreviewDueTime {
      color: $defaultFontColor;
      line-height: 1;
      font-size: 14px;
      margin-bottom: 0;
      text-align: center;
    }
  }
}
</style>
