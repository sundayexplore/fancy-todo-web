import Vue from "vue";
import Vuex from "vuex";

import { Todo, User } from "@/utils";

Vue.use(Vuex);

const todos: Array<Todo> = [];

export default new Vuex.Store({
  state: {
    todos,
    currentUser: null,
    isSignedIn: false,
    isLoading: false,
    generalError: {
      snackbar: false,
      message: ""
    }
  },
  mutations: {
    FETCH_ALL_TODOS(state, todos) {
      state.todos = [...todos];
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
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
    SET_ERROR_SNACKBAR(state, target: boolean) {
      state.generalError.snackbar = target;
    },
    SET_ERROR_MESSAGE(state, errorMessage: string) {
      state.generalError.message = errorMessage;
    }
  },
  actions: {
    fetchAllTodos({ commit }, todos: Array<Todo>) {
      commit("FETCH_ALL_TODOS", todos);
    },
    signIn({ commit }, currentUser: User) {
      commit("SIGN_IN");
      commit("SET_CURRENT_USER", currentUser);
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
    setGeneralError({ commit }, message: string | undefined = "") {
      if (message == undefined) {
        commit("SET_ERROR_SNACKBAR", false);
        commit("SET_ERROR_MESSAGE", "");
      } else {
        commit("SET_ERROR_SNACKBAR", true);
        commit("SET_ERROR_MESSAGE", message);
      }
    }
  },
  modules: {}
});
