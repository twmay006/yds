<template>
    <aside :class="siderState ? 'menu-collapsed' : 'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="activeMenu" unique-opened router v-show="!siderState">
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                <el-submenu :index="item.name" v-if="!item.leaf">
                    <template slot="title"><i :class="item.iconClass"></i>{{item.name}}</template>
                    <el-menu-item :route="child"  v-for="child in item.children" :index="child.name" v-if="!child.hidden">{{child.name}}</el-menu-item>
                </el-submenu>
                <el-menu-item :route="item.children[0]" v-if="item.leaf && item.children.length > 0" :index="item.children[0].name"><i :class="item.iconClass"></i>{{item.children[0].name}}</el-menu-item>
            </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu collapsed" v-show="siderState" ref="menuCollapsed">
            <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
                <template v-if="!item.leaf">
                    <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconClass"></i></div>
                    <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                        <li v-for="child in item.children" v-if="!child.hidden" class="el-menu-item" style="padding-left: 40px;height: 56px;line-height: 56px;" :class="$route.path == child.path ? 'is-active':''" @click="jump(child)">{{child.name}}</li>
                    </ul>
                </template>
                <template v-else>
                    <li class="el-submenu">
                        <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path == item.children[0].path ? 'is-active' : ''" @click="$router.push(item.children[0].path);activeMenu = item.children[0].name"><i :class="item.iconClass"></i></div>
                    </li>
                </template>
            </li>
        </ul>
    </aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            activeMenu: ''
        }
    },
    computed: {
        ...mapGetters([
            'siderState'
            // ,
            // 'items'
        ])
    },
    methods: {
        showMenu(i, status) {
            let target = this.$refs.menuCollapsed.getElementsByClassName(`submenu-hook-${ i }`)[0],
                childH = 56, // 子菜单高度
                browserH = document.documentElement.clientHeight,
                childL = target.children.length,
                listH = childL * childH,
                cssText = ''

            // header高度...

            if (browserH - i * 56 - 60 < listH) {
                cssText = `display:${ status ? 'block' : 'none' };bottom: 0; top:initial`
            }
            else {
                cssText = `display:${ status ? 'block' : 'none' };top: ${ i * 56 }px`
            }

            target.style.cssText = cssText
        },
        toggleMenu() {
            if (this.$route.meta.deep) {
                this.activeMenu = JSON.parse(localStorage.getItem('breadcrumbs')).splice(1, 1)[0].name // this.$route.meta.deep
                return
            }
            this.activeMenu = this.$route.name
        },
        jump(child) {
            this.$router.push(child.path)
            this.activeMenu = child.name
        }
    },
    mounted() {
        this.toggleMenu()
    }
}
</script>

<style lang="scss">

aside {
    flex:0 0 230px;
    width: 230px;
    position: relative;
    height: 100%;
    >.el-menu{
        height: 100%;
        overflow-y: auto;
        position: initial;
    }
    .collapsed{
        width:60px;
        .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
        }
    }
}
.menu-collapsed{
    flex:0 0 60px;
    width: 60px;
}
.menu-expanded{
    flex:0 0 230px;
    width: 230px;
}
</style>
