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
                        <el-form-item label="账户名" prop="userName">
                            <el-input v-model="formTable.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="公司名称" prop="companyName">
                            <el-input v-model="formTable.companyName"></el-input>
                        </el-form-item>
                        <el-form-item label="管理员名称" prop="adminName">
                            <el-input v-model="formTable.adminName"></el-input>
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
                userName: '',
                companyName: '',
                adminName: '',
                email: '',
                phone: '',
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
        submitForm(formName) {
            this.isBtnLoading = true
            let result = isEmptyObject(this.formTable)
            this.service.logisticsSave(result).then(res => {
                this.isBtnLoading = false
                if (!res) return
                this.$message.success(res.msg)
                this.$refs[formName].resetFields()
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    },
    mounted() {
        if (this.$route.query.id) {
            this.service.logisticsFind(this.$route.query).then(res => {
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
