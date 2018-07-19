import Vue from 'vue'
import Vuex from 'vuex'

import todo from './modules/todo'

Vue.use(Vuex)
const state = {
  showAddTodoForm: false
}
const getters= {
  showAddTodoForm: state =>{
    return state.showAddTodoForm
  }
}
const mutations = {
  TOGGLE_ADD_TODO_FORM(state) {
      state.showAddTodoForm = !state.showAddTodoForm
  },

}

const actions = {
  toggleAddTodoForm({
      commit
  }) {
      // do something async
      commit('TOGGLE_ADD_TODO_FORM')
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
