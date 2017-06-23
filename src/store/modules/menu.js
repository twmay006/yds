import * as types from '../types'

import * as config from '@/router/config'

function assignRouter(menuItems) {
    for (let parent of menuItems) {
        parent.component = config.default[parent.component]
        for (let child of parent.children) {
            child.component = config.default[child.component]
        }
    }
    return menuItems
}

const state = {
    items: []
}

const actions = {
    addMenu({ commit }, menuItems) {
        if (menuItems.length > 0) {
            commit(types.ADD_MENU, menuItems)
        }
    }
}

const getters = {
    items: state => state.items
}

const mutations = {
    [types.ADD_MENU](state, menuItems) {
        if (menuItems.length === 0) {
            state.items = []
        }
        else {
            state.items = assignRouter(menuItems)
        }
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
