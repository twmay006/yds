import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import components from './components/'

import moment from 'moment'
moment.locale('zh-cn')

import * as filters from './filters/'

import App from './app.vue'
import routes from './router/routes'
import './assets/scss/style.scss'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import 'font-awesome/css/font-awesome.css'

Vue.use(VueRouter)
Vue.use(ElementUI)

window.moment = moment

window.Vue = Vue

window.NProgress = NProgress

Object.keys(components).forEach((key) => {
    let name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
    Vue.component(`v${ name }`, components[key])
})

Object.keys(filters).forEach(k => { Vue.filter(k, filters[k]) }) // 注册过滤器

window.router = new VueRouter({
    routes,
    mode: 'history',
    // mode: 'hash',
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    },
    linkActiveClass: 'active'
})

// let permission = JSON.parse(localStorage.getItem('permission'))
// if (permission) {
//     store.commit('ADD_MENU', permission)
//     router.addRoutes(store.state.menu.items)
// }

router.beforeEach((to, from, next) => {
    document.title = to.name
    if (!to.meta.auth) {
        let user = JSON.parse(localStorage.getItem('username'))
        if (!user) {
            next({ path: '/login', query: { redirect: to.fullPath } })
        }
    }
    next()
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')

if (window.console) {
    var cons = console
    if (cons) {
        cons.log('%c', 'padding:90px;line-height:250px;background:url(http://img.mp.itc.cn/upload/20170408/06aae3f2bcb145aeb32892bf611620e5.jpeg) no-repeat;',
            '此浏览器功能专供开发者使用,请不要在此粘贴执行任何内容,这可能导致你的账户收到攻击,给你带来损失')
    }
}
