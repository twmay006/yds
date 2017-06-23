<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <!-- filters start -->
            <div class="filters">
                <div class="filter">
                    <form @submit.prevent="handleSearch">
                        <v-btn text="新增" type="success" size="large" @handleClick="toggleDialog"></v-btn>
                        <!-- <v-btn text="保存" type="info" size="large" :disabled="disabled" @handleClick="handleSave"></v-btn> -->
                        <v-btn text="删除" type="danger" size="large" :disabled="disabled" @handleClick="handleDelete"></v-btn>
                    </form>
                </div>
            </div>
            <!-- filters end -->

            <!-- table start  -->
            <el-table :data="tableData"  stripe element-loading-text="拼命加载中" v-loading="loading" tooltip-effect="dark" @selection-change="handleSelectionChange">
                 <el-table-column type="selection" width="55"> s</el-table-column>
                <el-table-column prop="courtTypeName" label="场地类型"> </el-table-column>
                <el-table-column prop="courtName" label="场地名称"> </el-table-column>
                <el-table-column prop="courtTypeName" label="灯控器名称"> </el-table-column>
                <el-table-column prop="lightOrderLine" label="灯控器线路"> </el-table-column>
                <el-table-column prop="lightOrderOpen" label="开灯命令"> </el-table-column>
                <el-table-column prop="lightOrderClose" label="关灯命令"> </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <v-btn text="修改" type="warning" size="small" @handleClick="toggleDialog" ></v-btn>
                    </template>
                </el-table-column>
            </el-table>
            <!-- table end  -->

            <el-dialog :title="dialogText + '灯控'" v-model="dialog" :modal="true" >
                <v-form @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule" :data="data" :inline="true" :text="dialogText" width="200px"  > </v-form>
            </el-dialog>

        </div>
    </div>
</template>

<script>
// import { isEmptyObject, bindFilter } from '@/utils/helper'
export default {
    data() {
        return {
            totalItems: 0,
            loading: true,
            dialog: false,
            operation: true,
            data: {},
            tableData: [],
            seletData: [],
            formRule: {
                lightId: {
                    type: 'cascader',
                    label: '灯控器名称/灯控器线路',
                    options: [],
                    props: { label: 'lightName', value: 'id', children: 'lines' },
                    rules: ['array']
                }
            }
        }
    },
    props: ['service'],
    computed: {
        disabled() {
            if (this.seletData.length >= 1) {
                return false
            }
            return true
        },
        dialogText() {
            return this.operation ? '修改' : '新增'
        }
    },
    methods: {
        onSubmit() {

        },
        toggleDialog() {
            console.log(this.formRule)
            this.dialog = true
            this.operation = !this.operation
        },
        handleSelectionChange(e) {
            this.seletData = e
        },
        handleDelete() {
            for (let i = this.seletData.length - 1; i >= 0; i--) {
                this.tableData.splice(this.tableData.indexOf(this.seletData[i]), 1)
            }
            // this.service.agentDelete(rows[index]).then(res => {
            //     if (!res) return
            //     rows.splice(index, 1)
            //     this.$message.success(res.msg)
            // })
        },
        getlightAutoAll() {
            this.service.lightAutoAll().then(res => {
                this.loading = false
                if (!res) return
                this.formRule.lightId.options = res.data
            })
        },
        render() {
            let options = { id: this.$route.params.id }
            this.service.lightCourtSetList(options).then(res => {
                this.loading = false
                if (!res) return
                this.tableData = res.data
            })
        }
    },
    mounted() {
        this.render()
        this.getlightAutoAll()
    }
}
</script>

<style lang="scss" scoped>
.link{
    text-decoration: underline;
}
</style>
