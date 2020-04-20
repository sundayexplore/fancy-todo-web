<template>
  <v-container class="addTodoFormContainer">
    <v-form ref="form" @submit.prevent="addTodo">
      <v-text-field v-model="todoName" label="Todo Name" required type="text" />

      <v-menu
        ref="menu"
        v-model="datePickerMenu"
        :close-on-content-click="false"
        :return-value.sync="computedDueDate"
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
          v-model="computedDueDate"
          no-title
          scrollable
          :min="computedMinDate"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="datePickerMenu = false"
            >Cancel</v-btn
          >
          <v-btn text color="primary" @click="setDate(computedDueDate)">OK</v-btn>
        </v-date-picker>
      </v-menu>

      <v-menu
        ref="menu"
        v-model="timePickerMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="computedDueTime"
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
          v-model="computedDueTime"
          full-width
          @click:minute="setTime(computedDueTime)"
        ></v-time-picker>
      </v-menu>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "AddTodoForm",
  data() {
    return {
      todoName: "",
      dueDate: moment(),
      datePickerMenu: false,
      timePickerMenu: false,
      modal: false
    };
  },
  computed: {
    computedDueDate: {
      get() {
        return this.dueDate.toISOString().substr(0, 10);
      },
      set(newDueDate: string) {
        const newDate = moment(newDueDate);
        this.dueDate = this.dueDate.set({
          year: newDate.get("year"),
          month: newDate.get("month"),
          date: newDate.get("date")
        });
      }
    },
    computedDueTime: {
      get() {
        return this.dueDate.format("HH:mm");
      },
      set(newDueTime: string) {
        const newTime = moment(newDueTime, "HH:mm");
        this.dueDate = this.dueDate.set({
          hour: newTime.get("hour"),
          minute: newTime.get("minute"),
          second: newTime.get("second")
        });
      }
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
    setDate(newDueDate: string) {
      console.log(newDueDate);
      const newDate = moment(newDueDate);
      this.dueDate = this.dueDate.set({
        year: newDate.get("year"),
        month: newDate.get("month"),
        date: newDate.get("date")
      });
      this.datePickerMenu = false;
    },
    setTime(newDueTime: string) {
      console.log(newDueTime);
      const newTime = moment(newDueTime, "HH:mm");
      this.dueDate = this.dueDate.set({
        hour: newTime.get("hour"),
        minute: newTime.get("minute"),
        second: newTime.get("second")
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.addTodoFormContainer {
  padding: 5vh;
}
</style>
