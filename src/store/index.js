import Vue from 'vue'
import Vuex from 'vuex'

import menu from './modules/menu'
import sidebar from './modules/sidebar'
import form from './modules/form'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        menu,
        sidebar,
        form
    }
})

export default store
