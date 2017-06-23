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
                    <el-form :model="formTable" label-width="150px">
                        <el-form-item label="账户名" prop="account">
                            <el-input v-model="formTable.account"></el-input>
                        </el-form-item>
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="formTable.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="formTable.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ" prop="qq">
                            <el-input v-model="formTable.qq"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="formTable.email"></el-input>
                        </el-form-item>
                        <el-form-item label="数量上限" prop="userCountMax">
                            <el-input v-model="formTable.userCountMax"></el-input>
                        </el-form-item>
                        <el-form-item label="二级代理商上限" prop="agentCountMax">
                            <el-input v-model="formTable.agentCountMax"></el-input>
                        </el-form-item>
                        <el-form-item label="代理商归属">
                            <el-radio class="radio" v-model="formTable.belongTo" label="sponsor">官方</el-radio>
                            <el-radio class="radio" v-model="formTable.belongTo" label="other">第三方</el-radio>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('formTable')" :loading="isBtnLoading" >{{btnText}}</el-button>
                            <el-button @click="resetForm('formTable')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { isEmptyObject } from '../../../utils/helper'
export default {
    data() {
        return {
            isBtnLoading: false,
            formTable: {
                account: '',
                belongTo: 'sponsor',
                email: '',
                name: '',
                phone: '',
                userCountMax: '',
                agentCountMax: '',
                qq: ''
            }
        }
    },
    computed: {
        btnText() {
            if (this.isBtnLoading) return '创建中...'
            return '立即创建'
        }
    },
    props: ['service'],
    methods: {
        submitForm() {
            this.isBtnLoading = true
            let result = isEmptyObject(this.formTable)
            if (this.$route.query) {
                this.service.agentUpdate(result).then(res => {
                    this.isBtnLoading = false
                    if (!res) return
                    this.$message.success(res.msg)
                    this.$refs['formTable'].resetFields()
                })
            }
            else {
                this.service.agentSave(result).then(res => {
                    this.isBtnLoading = false
                    if (!res) return
                    this.$message.success(res.msg)
                    this.$refs['formTable'].resetFields()
                })
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    },
    mounted() {
        if (this.$route.query.id) {
            this.service.agentFind(this.$route.query).then(res => {
                if (!res) return
                this.formTable = res.data
            })
        }
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
