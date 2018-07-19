const state = {
    showAddTodoForm: false
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

export default {
    namespaced: true,
    state,
    mutations,
    actions
}