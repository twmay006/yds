<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <!-- filters start -->
            <div class="filters">
                <div class="filter">
                    <v-btn role="add" text="新增场地" type="success" size="large" @handleClick="dialog = true" ></v-btn>
                </div>
            </div>
            <!-- filters end -->

            <!-- table start  -->
            <el-table :data="tableData"  stripe element-loading-text="拼命加载中" v-loading="loading">
                <el-table-column prop="id" label="编号"> </el-table-column>
                <el-table-column prop="courtTypeName" label="场地类型"> </el-table-column>
                <el-table-column label="所属运动项目">
                    <template scope="scope">{{ scope.row.sportType | sportFilter}}</template>
                </el-table-column>
                <el-table-column label="状态" >
                    <template scope="scope">启用</template>
                </el-table-column>
                <el-table-column prop="businessStartTime" label="营业开始时间"></el-table-column>
                <el-table-column prop="businessEndTime" label="营业结束时间"></el-table-column>
                <el-table-column prop="remindMinutes" label="提醒分钟"></el-table-column>
                <el-table-column label="价格方案">
                    <template scope="scope">
                        <v-btn text="价格方案" type="info" size="small" :path="{ url: '/club/clubAdd', options: { id : scope.row.id } }"></v-btn>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <v-btn role="add" text="修改" type="info" size="small" @handleClick="dialog = true" ></v-btn>
                        <v-btn role="edit" text="场地" type="success" size="small" :path="{ url: '/club/clubAdd', options: { id : scope.row.id } }"></v-btn>
                        <v-btn role="delete" text="删除" type="danger" size="small" v-model="scope"  ></v-btn>
                    </template>
                </el-table-column>
            </el-table>
            <!-- table end  -->

            <el-dialog title="新增场地" v-model="dialog" :modal="true" >
                <v-form @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule" :data="data" :inline="true">
                </v-form>
            </el-dialog>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            totalItems: 0,
            loading: true,
            tableData: [],
            dialog: false,
            data: {},
            formRule: {
                courtTypeName: {
                    type: 'input',
                    label: '场地类型名称',
                    message: '基本信息',
                    value: '',
                    rules: ['required', '2-']
                },
                sportType: {
                    type: 'input',
                    label: '运动类型',
                    value: '',
                    rules: ['required']
                },
                amount: {
                    type: 'input',
                    label: '初始场地数量',
                    value: '',
                    rules: ['required', 'password']
                },
                minSpace: {
                    type: 'input',
                    label: '预定时间段',
                    value: '',
                    rules: ['required', 'password']
                },
                businessStartTime: {
                    type: 'password',
                    label: '开始时间',
                    value: '',
                    rules: ['required', 'password']
                },
                businessEndTime: {
                    type: 'password',
                    label: '结束时间',
                    value: '',
                    rules: ['required', 'password']
                },
                webReserve: {
                    type: 'switch',
                    label: '允许网络预定',
                    value: '',
                    rules: ['required', 'password']
                },
                isTour: {
                    type: 'switch',
                    label: '允许散客预定',
                    value: '',
                    rules: ['required', 'password']
                },
                timeoutBuffer: {
                    type: 'input',
                    label: '缓冲分钟',
                    value: '',
                    message: '收费信息',
                    rules: ['required', 'password']
                },
                timeoutBillingType: {
                    type: 'input',
                    label: '计费方式',
                    value: '',
                    rules: ['required', 'password']
                },
                minConsume: {
                    type: 'input',
                    label: '最低消费分钟数',
                    value: '',
                    rules: ['required', 'password']
                },
                remindMinutes: {
                    type: 'input',
                    label: '到时提醒分钟数',
                    value: '',
                    rules: ['required', 'password']
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
            this.service.siteTypeConfigList().then(res => {
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
