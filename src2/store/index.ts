import Vue from "vue";
import Vuex from "vuex";

import { Todo, User, SyncData, colors } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: ([] || localStorage.getItem("todos")) as Array<Todo>,
    currentUser: (null || localStorage.getItem("user")) as User | null,
    signedIn: false,
    loading: false,
    generalSnackbar: {
      status: false,
      message: "",
      type: "",
      color: ""
    }
  },
  mutations: {
    FETCH_ALL_TODOS(state, todos) {
      state.todos = [...todos];
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    SIGN_IN(state) {
      state.signedIn = true;
    },
    SIGN_OUT(state) {
      state.signedIn = false;
      state.currentUser = null;
    },
    SET_LOADING(state, target: boolean) {
      state.loading = target;
    },
    ADD_TODO(state, todo) {
      state.todos = state.todos.concat(todo);
    },
    UPDATE_TODO(state, todoIn: Todo) {
      state.todos = state.todos.map((todo: Todo) => {
        if (todo._id == todoIn._id) {
          todo = todoIn;
        }
        return todo;
      });
    },
    DELETE_TODO(state, todoId: string) {
      state.todos = state.todos.filter((todo: Todo) => {
        return todo._id != todoId;
      });
    },
    SET_SNACKBAR_STATUS(state, target: boolean) {
      state.generalSnackbar.status = target;
    },
    SET_SNACKBAR_MESSAGE(state, mssage: string) {
      state.generalSnackbar.message = mssage;
    },
    SET_SNACKBAR_TYPE(state, target: "error" | "success" | "info") {
      state.generalSnackbar.type = target;
    },
    SET_SNACKBAR_COLOR(state, target: string) {
      state.generalSnackbar.color = target;
    }
  },
  actions: {
    fetchAllTodos({ commit }, todos: Array<Todo>) {
      commit("FETCH_ALL_TODOS", todos);
    },
    signIn({ commit }, currentUser: User) {
      localStorage.setItem("user", JSON.stringify(currentUser));
      commit("SIGN_IN");
      commit("SET_CURRENT_USER", currentUser);
    },
    sync({ commit }, syncData: SyncData) {
      const { user, todos } = syncData;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("todos", JSON.stringify(todos));
      commit("SIGN_IN");
      commit("FETCH_ALL_TODOS", todos);
      commit("SET_CURRENT_USER", user);
    },
    signOut({ commit }) {
      localStorage.clear();
      commit("SIGN_OUT");
    },
    addTodo({ commit }, todo: Todo) {
      commit("ADD_TODO", todo);
    },
    updateTodo({ commit }, todo: Todo) {
      commit("UPDATE_TODO", todo);
    },
    deleteTodo({ commit }, todoId: string) {
      commit("DELETE_TODO", todoId);
    },
    setGeneralSnackbar({ commit }, snackbarConfig: SetGeneralSnackbarConfig) {
      const { message, type, event }: SetGeneralSnackbarConfig = snackbarConfig;
      const snackbarColor =
        type == "success"
          ? colors.success
          : type == "info"
          ? colors.info
          : colors.error;
      switch (event) {
        case "open":
          commit("SET_SNACKBAR_MESSAGE", message);
          commit("SET_SNACKBAR_TYPE", type);
          commit("SET_SNACKBAR_COLOR", snackbarColor);
          commit("SET_SNACKBAR_STATUS", true);
          break;

        case "dismiss":
          commit("SET_SNACKBAR_MESSAGE", "");
          commit("SET_SNACKBAR_TYPE", "");
          commit("SET_SNACKBAR_COLOR", "");
          commit("SET_SNACKBAR_STATUS", false);
          break;
      }
    }
  },
  modules: {}
});

export interface SetGeneralSnackbarConfig {
  event: "open" | "dismiss";
  type?: "error" | "success" | "info";
  message?: string;
}
