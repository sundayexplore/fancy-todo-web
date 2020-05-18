<template>
  <v-container class="addTodoFormContainer">
    <v-form ref="form" @submit.prevent="addTodo">
      <v-text-field
        v-model="todoName"
        @input="addTodo"
        label="Todo Name"
        required
        type="text"
      />

      <v-menu
        ref="menu"
        v-model="datePickerMenu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="computedDueDate"
            label="Due Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dueDate"
          @change="addTodo"
          no-title
          scrollable
          :min="computedMinDate"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="datePickerMenu = false"
            >Cancel</v-btn
          >
          <v-btn text color="primary" @click="setDate(dueDate)">OK</v-btn>
        </v-date-picker>
      </v-menu>

      <v-menu
        ref="menu"
        v-model="timePickerMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="computedDueTime"
            label="Due Time"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="timePickerMenu"
          v-model="dueTime"
          @change="addTodo"
          full-width
          @click:minute="setTime(dueTime)"
        ></v-time-picker>
      </v-menu>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

interface Data {
  todoName: string;
  dueDate: string;
  dueTime: string;
  datePickerMenu: boolean;
  timePickerMenu: boolean;
  modal: boolean;
}

interface Computed {
  computedDueDate: string;
  computedDueTime: string;
  computedMinDate: string;
  computedMinTime: string;
}

interface Methods {
  setDate: (newDueDate: string) => void;
  setTime: (newDueTime: string) => void;
  addTodo: () => void;
}

export default Vue.extend<Data, Methods, Computed>({
  name: "AddTodoForm",
  data() {
    return {
      todoName: "",
      dueDate: moment()
        .toISOString()
        .substr(0, 10),
      dueTime: moment().format("HH:mm"),
      datePickerMenu: false,
      timePickerMenu: false,
      modal: false
    };
  },
  computed: {
    computedDueDate() {
      return moment(this.dueDate).format("LL");
    },
    computedDueTime() {
      return moment(`${this.dueDate} ${this.dueTime}`).format("LT");
    },
    computedMinDate() {
      return moment()
        .toISOString()
        .substr(0, 10);
    },
    computedMinTime() {
      return moment().format("HH:mm");
    }
  },
  methods: {
    setDate(newDueDate) {
      this.dueDate = newDueDate;
      this.datePickerMenu = false;
    },
    setTime(newDueTime) {
      this.dueTime = newDueTime;
      this.timePickerMenu = false;
    },
    addTodo() {
      const name = this.todoName;
      const dueDate = moment(`${this.dueDate} ${this.dueTime}`).toISOString();
      this.$emit("change", { name, dueDate });
    }
  }
});
</script>

<style lang="scss" scoped>
.addTodoFormContainer {
  padding: 5vh;
}
</style>
