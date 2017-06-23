<template lang='html'>
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class='content-wrapper'>
            <el-tabs v-model='filters.flag' type='card' @tab-click='handleClick'>
                <el-tab-pane label='支付平台总账单' name='bill'> </el-tab-pane>
                <el-tab-pane label='场馆消费账单' name='consumerBill'> </el-tab-pane>
                <el-tab-pane label='打款记录' name='recordBill'></el-tab-pane>
            </el-tabs>
                <!-- filters start -->
                <div class='filters'>
                    <div class='filter'>
                        <form @submit.prevent='handleSearch' >
                            <v-dateRange  v-model="filters.time" ></v-dateRange>
                            <el-select v-model='filters.payCode'  placeholder='支付方式' clearable>
                                <el-option
                                        v-for='item in states'
                                        :label='item.name'
                                        :value='item.keyword'>
                            </el-option>
                            </el-select>
                            <el-select v-model='filters.status'  placeholder='结算方式' clearable v-if="filters.flag == 'consumerBill'" >
                                <el-option
                                        v-for='item in states1'
                                        :label='item.name'
                                        :value='item.keyword'>
                                </el-option>
                            </el-select>
                            <el-select v-model="filters.clubId" filterable clearable placeholder="场馆名称">
                                <el-option
                                  v-for="item in restaurants"
                                  :label="item.clubName"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                            <el-input v-if="filters.flag == 'recordBill'" placeholder="流水号" v-model="filters.dealNo"></el-input>
                            <el-button native-type='submit' type='primary' icon='search'>搜索</el-button>
                        </form>
                    </div>
                </div>
                <!-- filters end -->

                <!-- table start  -->
                <div v-if="['bill', 'consumerBill'].indexOf(filters.flag) > -1">
                    <el-table :data='tableData' stripe element-loading-text='拼命加载中' v-loading='loading' class="total lastChild" show-summary style="width:100%;">
                        <el-table-column label='序号' width='90px'>
                            <template scope='scope'>
                                {{(pagination.pageIndex - 1) * pagination.pageSize + scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column label='账单日期'>
                            <template scope='scope'>{{ scope.row.createBy | formatDate('YYYY-MM-DD')}}</template>
                        </el-table-column>
                        <el-table-column  label='类型'>
                            <template scope='scope'>{{ scope.row.payCode | payFilter }}</template>
                        </el-table-column>
                        <el-table-column prop='number' label='订单数'> </el-table-column>
                        <el-table-column prop='billMoney' label='订单金额'> </el-table-column>
                        <el-table-column prop='serviceMoney' label='服务费'> </el-table-column>
                        <el-table-column prop='totalMoney' label='结算金额'> </el-table-column>
                        <el-table-column prop='clubName' label='场馆名称'> </el-table-column>
                        <el-table-column v-if="filters.flag == 'consumerBill'"  label='状态'>
                            <template scope='scope'>{{ scope.row.status | clearingFilter }}</template>
                        </el-table-column>
                        <el-table-column label='操作'>
                            <template scope='scope'>
                                <el-button type="info" class="href" size="small">
                                    <router-link :to="{path: '/report/reconciliationDetail', query: { clubId : scope.row.clubId, billDate: scope.row.createBy, payCode: scope.row.payCode, status: scope.row.status}}">账单明细</router-link>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <template v-else>
                    <el-table :data='tableData' stripe element-loading-text='拼命加载中' v-loading='loading' class="exclusion total lastChild" show-summary style="width:100%;">
                        <el-table-column label='序号' width='90px'>
                            <template scope='scope'>
                                {{(pagination.pageIndex - 1) * pagination.pageSize + scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop='clubName' label='场馆名称'> </el-table-column>
                        <el-table-column label='提现申请时间'>
                            <template scope='scope'>{{ scope.row.applyDate | formatDate('YYYY-MM-DD')}}</template>
                        </el-table-column>
                        <el-table-column prop='totalMoney' label='提现现金'> </el-table-column>
                        <el-table-column label='状态'>
                            <template scope='scope'>
                                <span>{{ scope.row.status | clearingFilter }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop='bankName' label='账户名'> </el-table-column>
                        <el-table-column prop='bankAccount' label='账户号'> </el-table-column>
                        <el-table-column label='打款时间'>
                            <template scope='scope'>{{ scope.row.payDate | formatDate('YYYY-MM-DD')}}</template>
                        </el-table-column>
                        <el-table-column prop='operateName' label='操作人'> </el-table-column>
                        <el-table-column prop='dealNo' label='交易流水号'> </el-table-column>
                    </el-table>
                </template>
                <!-- table end -->

                <!-- pagination start  -->
                    <v-pagination :loading="loading" @onPageChange="changePg"  :record-count="totalItems"  :exclude="exclude" :searching="searching" >
                    </v-pagination>
                <!-- pagination end  -->
        </div>
    </div>
</template>

<script>
import { isEmptyObject, bindFilter } from '@/utils/helper'

export default {
    data() {
        return {
            exclude: ['flag'],
            loading: false,
            searching: false,
            filters: {
                clubId: '',
                startTime: '',
                endTime: '',
                time: '',
                status: '',
                payCode: '',
                dealNo: '',
                page: '',
                flag: 'bill'
            },
            totalItems: 0,
            states: [
                {
                    name: '支付宝',
                    keyword: 'YDG_ALIPAY'
                },
                {
                    name: '微信',
                    keyword: 'YDG_WX'
                }
            ],
            states1: [
                {
                    name: '已消费',
                    keyword: 'CONSUME'
                },
                {
                    name: '结算中',
                    keyword: 'APPLY'
                },
                {
                    name: '已结算',
                    keyword: 'PAY'
                }
            ],
            clubName: 'clubName',
            restaurants: [],
            tableData: []
        }
    },
    props: ['service'],
    methods: {
        handleClick(tab, event) {
            this.filters = Object.assign({}, this.$options.data().filters, { flag: tab.name })
            this.handleSearch()
        },
        changePg(v) {
            this.pagination.pageIndex = v
            this.render()
        },
        handleSearch() {
            this.pagination.pageIndex = 1
            this.searching = true
            bindFilter(isEmptyObject(this.filters, ['time', 'flag']))
            this.render()
        },
        render() {
            let result = isEmptyObject(this.filters, ['time'])
            this.loading = true
            result = Object.assign({}, result, this.pagination)
            this.service.reconciliation(result).then(res => {
                if (!res) return
                this.totalItems = Number(res.data.pagination.totalItems)
                this.tableData = res.data.data
                this.loading = false
            })
        },
        getAllClubName() {
            let options = { clubName: '' }
            this.service.findClubByName(options).then(res => {
                if (!res) return
                this.restaurants = res.data
            })
        }
    },
    mounted() {
        this.render()
        this.getAllClubName()
    }
}
</script>

<style lang="scss">
    .exclusion{
        .el-table__footer-wrapper{
            td:nth-child(7) {
                div{
                    font-size: 0;
                }
                &:before{
                    content: '-';
                    padding-left: 18px;
                    position: absolute;
                }
            }
        }
    }
</style>
