<template lang="html">
    <span>
        <template v-if="access" lang="html">
            <el-button
                :type="type"
                class="href"
                :size="size"
                :disabled="disabled"
                v-if="path" >
                    <router-link :to="{ path: path.url, query: path.options }">{{ text }}</router-link>
            </el-button>

            <el-button
                :type="type"
                :size="size"
                :icon="icon"
                :disabled="disabled"
                @click.native="handleClick"
                v-else>{{ text }}
            </el-button>
        </template>
    </span>
</template>

<script>
export default {
    data() {
        return {
            switch: false // 是否开启验证该用户的按钮权限
        }
    },
    computed: {
        access() {
            return !this.switch || !this.role || this.$route.meta.access.indexOf(this.role) > -1
        }
    },
    props: {
        value: Object,
        type: {
            type: String,
            default: 'info'
        },
        text: {
            type: String
        },
        icon: String,
        size: {
            type: String,
            default: 'size'
        },
        path: Object,
        disabled: Boolean,
        role: String
    },
    methods: {
        handleClick() {
            if (this.text.indexOf('删除') > -1) {
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(123)
                    this.$emit('handleClick', this.value)
                }).catch(() => {})
            }
            else {
                this.$emit('handleClick', this.value)
            }
        }
    },
    mounted() {
        // console.log('load btn.vue success')
    }
}
</script>

<!-- <style lang="scss">
.el-button{
    margin-left: 0 !important;
}
</style> -->
