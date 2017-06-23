import * as types from '../types'

const state = {
    siderState: false
}

const actions = {
    changeState({ commit }, state) {
        commit(types.CHANGE_STATE, state)
    }
}

const getters = {
    siderState: state => state.siderState
}

const mutations = {
    [types.CHANGE_STATE](state, state1) {
        state.siderState = state1
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
