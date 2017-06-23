<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <!-- filters start -->
            <div class="filters">
                <div class="filter">
                    <v-btn  text="新增场地" type="success" size="large" @handleClick="dialog = true;operation = !operation" ></v-btn>
                    <span class="tip">场地类型: {{ siteTypeName }}</span>
                </div>
            </div>
            <!-- filters end -->

            <!-- table start  -->
            <el-table :data="tableData"  stripe element-loading-text="拼命加载中" v-loading="loading">
                <el-table-column prop="id" label="场地编号"> </el-table-column>
                <el-table-column prop="courtName" label="场地名称"> </el-table-column>
                <el-table-column prop="showNum" label="显示顺序"></el-table-column>
                <el-table-column label="灯控设置">
                    <template scope="scope">
                        <v-btn text="灯控" type="info" size="small" :path="{ url: '/base/LightControl/' + scope.row.id, options: { siteTypeName: siteTypeName, siteName: scope.row.courtName } }" ></v-btn>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <v-btn text="场地关联" type="info" size="small"   ></v-btn>
                        <v-btn text="修改" type="success" size="small" @handleClick="dialog = true;operation = !operation" ></v-btn>
                        <v-btn text="删除" type="danger" size="small" @handleClick="handleDelete" v-model="scope" ></v-btn>
                    </template>
                </el-table-column>
            </el-table>
            <!-- table end  -->

            <el-dialog :title="dialogText + '场地'" v-model="dialog" :modal="true" >
                <v-form   @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule" :data="data" :inline="true" :text="dialogText" :loading="formLoading" :success="success">
                </v-form>
            </el-dialog>

        </div>
    </div>
</template>

<script>
// import { isEmptyObject, bindFilter } from '@/utils/helper'
export default {
    data() {
        return {
            loading: true,
            formLoading: true,
            success: false,
            dialog: false,
            operation: false,
            siteTypeName: '',
            data: {},
            formRule: {
                courtName: {
                    type: 'input',
                    label: '场地名称',
                    value: '',
                    rules: ['required']
                },
                showNum: {
                    type: 'input',
                    label: '显示顺序',
                    value: '',
                    rules: ['required', 'number']
                }
            },
            tableData: []
        }
    },
    computed: {
        dialogText() {
            return this.operation ? '修改' : '新增'
        }
    },
    props: ['service'],
    methods: {
        onSubmit(e) {
            if (!e) {
                this.formLoading = false
                return
            }
            this.formLoading = true
            let result = Object.assign({}, e, { courtTypeId: this.$route.params.id })
            this.service.siteMaintenanceAdd(result).then(res => {
                this.formLoading = false
                this.dialog = false
                if (!res) return
                this.$message.success(res.msg)
                this.success = true
                this.render()
            })
        },
        handleDelete(row) {
            let result = { id: row.row.id }
            this.service.siteMaintenanceDelete(result).then(res => {
                if (!res) return
                this.tableData.splice(row.$index, 1)
                this.$message.success(res.msg)
            })
        },
        render() {
            let result = { id: this.$route.params.id }
            this.service.siteMaintenance(result).then(res => {
                this.loading = false
                if (!res) return
                this.tableData = res.data
            })
        }
    },
    mounted() {
        this.siteTypeName = this.$route.query.name
        this.render()
    }
}
</script>
