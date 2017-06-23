<template lang="html">
    <div>
        <!-- filters start -->
        <div class="filters">
            <div class="filter">
                <v-btn role="add" text="新增超时方案" type="success" size="large" @handleClick="dialog = true"></v-btn>
            </div>
        </div>
        <!-- filters end -->

        <!-- table start  -->
        <el-table :data="tableData" stripe element-loading-text="拼命加载中" v-loading="loading" >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="name" label="方案名称"> </el-table-column>
            <el-table-column label="消费方式">
                <template scope="scope">{{ scope.row.consumeStyleName | consumeFilter}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <v-btn role="add" text="修改" type="info" size="small" @handleClick="dialog = true"></v-btn>
                    <v-btn role="delete" text="删除" type="danger" size="small" v-model="scope"></v-btn>
                </template>
            </el-table-column>
        </el-table>
        <!-- table end  -->
        <el-dialog title="新增超时方案" v-model="dialog" :modal="true">
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
                name: {
                    type: 'input',
                    label: '方案名称',
                    value: '',
                    rules: ['required', '2-']
                },
                consumeStyleName: {
                    type: 'select',
                    label: '票券消费方式',
                    options: [{
                        label: '显示',
                        value: 1
                    }, {
                        label: '显示',
                        value: 2
                    }],
                    rules: ['required', 'object']
                },
                bufferTime: {
                    type: 'input',
                    label: '首次缓冲分钟数',
                    value: '',
                    rules: ['required', '2-']
                },
                minutes: {
                    type: 'input',
                    label: '超时',
                    value: '',
                    rules: ['required', '2-']
                },
                charge: {
                    type: 'input',
                    label: '补',
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
            this.service.timeOutList().then(res => {
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
