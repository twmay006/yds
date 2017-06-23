<template>
    <section>
        <v-head></v-head>
        <div class="main">
            <v-sidebar></v-sidebar>
            <section class="content-container">
                <transition name="router-fade" mode="out-in">
                    <router-view :service="apiList"></router-view>
                </transition>
            </section>
        </div>
        <v-scrollTool></v-scrollTool>
    </section>
</template>

<script>
import { apiList } from '@/api/'
import vHead from './header'
import vSidebar from './sidebar'
import { $ } from '@/utils/helper'

let i = 0
export default {
    data() {
        return {
            apiList
        }
    },
    components: {
        vHead, vSidebar
    },
    methods: {
        menu() {
            if (!$('el-table')[0]) return
            let target = $('el-table')[i].getBoundingClientRect()

            if (target.top < 60 && Math.abs(target.top) < target.height - 60) {
                $('el-table__header-wrapper')[i].style.cssText = `
                    position:relative;
                    z-index:2;
                    transform: translateY(${ Math.abs(60 - target.top - 1) }px);
                `
            }
            else {
                $('el-table__header-wrapper')[i].style.cssText = ''
                //  多个表格. 固定表头... 此后再写
            }
        }
    },
    mounted() {
        $('content-container')[0].addEventListener('scroll', this.menu)
    }
}

</script>

<style lang="scss">
.main{
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    width: 100%;
}
.content-container {
    -webkit-overflow-scrolling : touch;
    flex:1;
    overflow-y: auto;
    padding: 20px;
    .content-wrapper {
        padding-top: 30px;
    }
}
[v-cloak] {
  display: none;
}
.router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .2s ease;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
}

</style>
