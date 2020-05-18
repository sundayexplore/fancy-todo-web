<template>
  <form ref="div" @submit.prevent="handleAddTodo" class="addTodoInlineWrapper">
    <input
      type="text"
      required
      v-model="todoName"
      class="addTodoNameInput"
      :placeholder="placeholderTodoName"
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
      <button class="saveBtn" @click="handleAddTodo" :disabled="disabledBtn">
        Save
      </button>
      <button class="cancelBtn" @click="cancelAddTodo" :disabled="disabledBtn">
        Cancel
      </button>
    </div>
    <div class="todoTimeWrapper">
      <input
        type="text"
        required
        v-model="todoDueTime"
        class="addTodoTimeInput"
        :placeholder="placeholderDueTime"
      />
    </div>
    <div class="todoTimePreviewWrapper">
      <p class="todoPreviewDueTime">Time Preview:</p>
      <p class="todoPreviewDueTime">{{ todoDisplayDueTime }}</p>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "AddTodoInlineForm",
  data() {
    return {
      todoName: "",
      todoDisplayDueDate: moment().format("LL"),
      todoDisplayDueTime: moment("4pm", "LT").format("LT"),
      todoDueDate: "",
      todoDueTime: "",
      disabledBtn: false,
      placeholderTodoName: "e.g. Create pull request on branch dev.",
      placeholderDueDate: moment().format("LL"),
      placeholderDueTime: "e.g. 4pm"
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
    cancelAddTodo() {
      this.$emit("dismiss");
    },
    async handleAddTodo() {
      this.disabledBtn = true;
      try {
        const { currentUser } = this.$store.state;
        const { data } = await this.$todoAPI.post(
          `/${currentUser._id}`,
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

.addTodoInlineWrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;
  align-content: center;

  .addTodoNameInput {
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

  .addTodoNameInput,
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
    grid-column: 3;
    grid-row: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;

    .addTodoTimeInput {
      border: 1px solid $defaultGrey;
      font-size: 14px;
      line-height: 1;
      text-align: left;
      color: $defaultFontColor;
      padding: 8px 8px;
    }
  }

  .todoTimePreviewWrapper {
    grid-column: 4;
    grid-row: 2;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-self: center;

    .todoPreviewDueTime {
      color: $defaultFontColor;
      line-height: 1;
      font-size: 14px;
      margin-bottom: 0;
      text-align: center;
      padding: 0 8px;
    }
  }
}
</style>
