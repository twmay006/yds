import * as types from '../types'

const state = {
    FormItems: {}
}

const actions = {
    addFormItems({ commit }, FormItems) {
        commit(types.FORM_STATUS, FormItems)
    }
}

const getters = {
    FormItems: state => state.FormItems
}

const mutations = {
    [types.FORM_STATUS](state, FormItems) {
        state.FormItems = Object.assign({}, state.FormItems, FormItems)
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
