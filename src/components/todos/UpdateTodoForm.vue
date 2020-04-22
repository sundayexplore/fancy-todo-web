<template>
  <v-container class="updateTodoFormContainer">
    <v-form ref="form" @submit.prevent="updateTodo">
      <v-text-field
        v-model="localTodoName"
        @input="updateTodo"
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
          v-model="localDueDate"
          @change="updateTodo"
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
          v-model="localDueTime"
          @change="updateTodo"
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
  localTodoName: string;
  localDueDate: string;
  localDueTime: string;
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
  updateTodo: () => void;
}

interface Props {
  todoName: string;
  dueDate: string;
  dueTime: string;
}

export default Vue.extend<Data, Methods, Computed, Props>({
  name: "UpdateTodoForm",
  props: {
    todoName: String,
    dueDate: String,
    dueTime: String
  },
  data() {
    return {
      localTodoName: this.todoName,
      localDueDate: this.dueDate,
      localDueTime: this.dueTime,
      datePickerMenu: false,
      timePickerMenu: false,
      modal: false
    };
  },
  computed: {
    computedDueDate() {
      return moment(this.localDueDate).format("LL");
    },
    computedDueTime() {
      return moment(`${this.localDueDate} ${this.localDueTime}`).format("LT");
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
      this.$emit("updateDueDate", newDueDate);
      this.datePickerMenu = false;
    },
    setTime(newDueTime) {
      this.$emit("updateDueTime", newDueTime);
      this.timePickerMenu = false;
    },
    updateTodo() {
      const name = this.localTodoName;
      const dueDate = moment(
        `${this.localDueDate} ${this.localDueTime}`
      ).toISOString();
      this.$emit("change", { name, dueDate });
    }
  },
  watch: {
    todoName(newTodoName: string) {
      this.localTodoName = newTodoName;
    },
    dueDate(newDueDate: string) {
      this.localDueDate = newDueDate;
    },
    dueTime(newDueTime: string) {
      this.localDueTime = newDueTime;
    }
  }
});
</script>

<style lang="scss" scoped>
.updateTodoFormContainer {
  padding: 5vh;
}
</style>
