<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <!-- filters start -->
            <div class="filters">
                <div class="filter">
                    <div class="tip">提示:带<span>*</span>号必填</div>
                </div>
            </div>
            <!-- filters end -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <v-form name="form" @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule" :data="data"  :loadding="loadding">
                    </v-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formRule: {
                password: {
                    type: 'password',
                    label: '密码',
                    value: '',
                    rules: ['required']
                },
                confirmPass: {
                    type: 'password',
                    label: '确认密码',
                    value: '',
                    rules: ['required', 'validatePass']
                }
            },
            loadding: false,
            data: {}
        }
    },
    props: ['service'],
    methods: {
        onSubmit(data) {
            if (!data) {
                this.loadding = false
                return
            }
            this.loadding = true
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
.tip {
    span {
        color: red;
        vertical-align: middle;
        padding: 0 5px;
    }
}
</style>
