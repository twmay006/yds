<template lang="html">
  <el-breadcrumb separator="/">
        <span class="db-breadcrumb-loc">位置：</span>
        <el-breadcrumb-item v-for="item in breadcrumbs">
            {{ item.name }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    data() {
        return {
            breadcrumbs: []
        }
    },
    methods: {
        render() {
            let breadcrumbs = (this.$parent && this.$parent.$route && this.$parent.$route.matched) || [],
                options = [],
                // 有就拿到之前的面包屑
                oldBreadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs')),
                index
            if (breadcrumbs[breadcrumbs.length - 1].meta.deep && oldBreadcrumbs) {
                index = oldBreadcrumbs.findIndex(value => {
                    return value.name === breadcrumbs[breadcrumbs.length - 1].name
                })
                if (index > -1) {
                    oldBreadcrumbs.splice(index + 1)
                    this.breadcrumbs = oldBreadcrumbs
                    return
                }
                oldBreadcrumbs.push({ name: breadcrumbs.pop().name })
                this.breadcrumbs = oldBreadcrumbs
                localStorage.setItem('breadcrumbs', JSON.stringify(oldBreadcrumbs))
                return
            }

            Object.keys(breadcrumbs).forEach(k => {
                options.push({ name: breadcrumbs[k].name })
            })
            this.breadcrumbs = options

            localStorage.setItem('breadcrumbs', JSON.stringify(options))
        }
    },
    mounted() {
        this.render()
    }
}
</script>

<style lang="css">
.db-breadcrumb-loc {
    float: left;
}
</style>
