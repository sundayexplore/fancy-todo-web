import Vue from "vue";
import Vuex from "vuex";

import { Todo, User, SyncData, colors } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [] as Array<Todo>,
    currentUser: null as User | any,
    isSignedIn: false,
    isLoading: false,
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
      state.isSignedIn = true;
    },
    SIGN_OUT(state) {
      state.isSignedIn = false;
      state.currentUser = null;
      localStorage.clear();
    },
    SET_LOADING_TRUE(state) {
      state.isLoading = true;
    },
    SET_LOADING_FALSE(state) {
      state.isLoading = false;
    },
    ADD_TODO(state, todo) {
      state.todos = state.todos.concat(todo);
    },
    UPDATE_TODO(state, todoIn: Todo) {
      state.todos = state.todos.map(todo => {
        if (todo._id == todoIn._id) {
          todo = todoIn;
        }
        return todo;
      });
    },
    DELETE_TODO(state, todoId: string) {
      state.todos = state.todos.filter(todo => {
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
      commit("FETCH_ALL_TODOS", todos);
      commit("SIGN_IN");
      commit("SET_CURRENT_USER", user);
    },
    signOut({ commit }) {
      commit("SIGN_OUT");
    },
    setLoadingTrue({ commit }) {
      commit("SET_LOADING_TRUE");
    },
    setLoadingFalse({ commit }) {
      commit("SET_LOADING_FALSE");
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
      const snackbarColor = type == "error" ? colors.error : colors.success;
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
