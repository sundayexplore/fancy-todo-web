import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    currentUser: null,
    isSignedIn: false,
    isLoading: false
  },
  mutations: {
    FETCH_ALL_TODOS(state, todos) {
      state.todos.concat(todos);
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
    },
    SET_LOADING_TRUE(state) {
      state.isLoading = true;
    },
    SET_LOADING_FALSE(state) {
      state.isLoading = false;
    }
  },
  actions: {
    fetchAllTodos({ commit }, todos) {
      commit("FETCH_ALL_TODOS", todos);
    },
    signIn({ commit }, currentUser) {
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
    }
  },
  modules: {}
});
