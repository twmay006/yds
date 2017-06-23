<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <!-- filters start -->
            <div class="filters">
                <div class="tip">
                    日期:{{ result.billDate }}
                </div>
            </div>
            <!-- filters end -->

            <!-- table start  -->
            <el-table :data="tableData.data" stripe element-loading-text="拼命加载中" v-loading="loading" width="100%">
                <el-table-column label="序号" width="90px">
                    <template scope="scope">
                        <div>
                            {{(pagination.pageIndex - 1) * pagination.pageSize + scope.$index + 1}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="账单日期">
                    <template scope='scope'>
                        <span>{{ scope.row.createAt | formatDate('YYYY-MM-DD')}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类型">
                    <template scope='scope'>
                        <span>{{ scope.row.payCode | payFilter }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderCode" label="商户订单号"> </el-table-column>
                <el-table-column prop="sellMoney" label="订单金额"> </el-table-column>
                <el-table-column prop="serviceMoney" label="服务费"> </el-table-column>
                <el-table-column prop="totleMoney" label="结算金额"> </el-table-column>
                <el-table-column label='状态'>
                    <template scope='scope'>
                        <span>{{ result.status | clearingFilter }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- table end  -->

            <!-- pagination start  -->
            <v-pagination @onPageChange="changePg" :loading="loading" :record-count="totalItems" >
            </v-pagination>
            <!-- pagination end  -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            status: '',
            addressList: [],
            totalItems: 0,
            loading: true,
            tableData: [],
            result: {}
        }
    },
    props: ['service'],
    methods: {
        changePg(v) {
            this.pagination.pageIndex = v
            this.render()
        },
        render() {
            this.loading = true
            this.result = Object.assign({}, this.pagination, this.$route.query)
            this.result.billDate = moment(Number(this.result.billDate)).format('YYYY-MM-DD')
            this.service.reconciliationDetail(this.result).then(res => {
                this.loading = false
                if (!res) return
                this.totalItems = Number(res.data.pagination.totalItems)
                this.tableData = res.data
            })
        }
    },
    mounted() {
        this.render()
    }
}
</script>
