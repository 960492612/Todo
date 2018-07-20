import Vue from "vue";
import Vuex from "vuex";

// import todo from "./modules/todo";

Vue.use(Vuex);
const state = {
  // showAddTodoForm: false,
  // currentTodoItem: null
};
const getters = {
  // showAddTodoForm: state => {
  //   return state.showAddTodoForm;
  // },
  // currentTodoItem: state => {
  //   return state.currentTodoItem;
  // }
};

const mutations = {
  // TOGGLE_ADD_TODO_FORM(state) {
  //   state.showAddTodoForm = !state.showAddTodoForm;
  // },
  // SET_TODO_ITEM(state, todo) {
  //   state.currentTodoItem = todo;
  // },
  // ADD_TODO_ITEM(state, todo){
  //   state.currentTodoItem.addTodoItem(todo)
  // }
};

const actions = {
  // toggleAddTodoForm({ commit }, todo = null) {
  //   // do something async
  //   commit("SET_TODO_ITEM", todo);
  //   commit("TOGGLE_ADD_TODO_FORM");
  // },
  // addTodoItem({commit}, todo){
  //   commit("ADD_TODO_ITEM", todo)
  // }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== "production"
});
