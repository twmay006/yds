<template lang="html">
    <div>
        <!-- filters start -->
        <div class="filters">
            <div class="filter">
                <v-btn  text="新增票券" type="success" size="large" @handleClick="dialog = true"></v-btn>
            </div>
        </div>
        <!-- filters end -->

        <!-- table start  -->
        <el-table :data="tableData" stripe element-loading-text="拼命加载中" v-loading="loading">
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="itemName" label="票券项目类型名称"> </el-table-column>
            <el-table-column label="所属运动项目">
                <template scope="scope">{{ scope.row.sportType | sportFilter}}</template>
            </el-table-column>
            <el-table-column label="闸机设置">
                <template scope="scope">
                    <v-btn  text="闸机" type="info" size="small" @handleClick="dialog = true"></v-btn>
                </template>
            </el-table-column>
            <el-table-column prop="businessStartTime" label="价格方案">
                <template scope="scope">
                    <v-btn  text="票券明细" type="info" size="small" :path="{ url: '/base/ticketItemDetail/' + scope.row.id  }"></v-btn>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <v-btn  text="修改" type="info" size="small" @handleClick="dialog = true"></v-btn>
                    <v-btn  text="删除" type="danger" size="small" v-model="scope"></v-btn>
                </template>
            </el-table-column>
        </el-table>
        <!-- table end  -->
        <el-dialog title="新增票券" v-model="dialog" :modal="true">
            <v-form @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule" :data="data" :inline="true">
            </v-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            tableData: [],
            dialog: false,
            data: {},
            formRule: {
                itemName: {
                    type: 'input',
                    label: '名称',
                    message: '基本信息',
                    value: '',
                    rules: ['required', '2-']
                },
                sportType: {
                    type: 'input',
                    label: '运动类型',
                    value: '',
                    rules: ['required', '2-']
                }
            }
        }
    },
    props: ['service'],
    methods: {
        onSubmit() {

        },
        render() {
            this.loading = true
            this.service.ticketItemConfigList().then(res => {
                this.loading = false
                if (!res) return
                this.tableData = res.data
            })
        }
    },
    mounted() {
        this.render()
    }
}
</script>

<style lang="scss">
</style>
