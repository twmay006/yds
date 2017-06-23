<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <el-tabs v-model='filters.type' type='card' @tab-click='handleClick'>
                <el-tab-pane label='场租订单' name='first'> </el-tab-pane>
                <el-tab-pane label='票券订单' name='TICKET'> </el-tab-pane>
                <el-tab-pane label='会员订单' name='MEMBER'> </el-tab-pane>
                <el-tab-pane label='商品订单' name='GOODS'> </el-tab-pane>
                <el-tab-pane label='其他收入开支订单' name='OTHER'> </el-tab-pane>
            </el-tabs>

            <!-- filters start -->
            <div class='filters'>
                <div class='filter'>
                    <form @submit.prevent='handleSearch'>
                        <v-commonItems v-model="filters.time" startText="beginTime" type="dateRange"></v-commonItems>
                        <v-commonItems v-model="filters.payStyle" type="payStyle"></v-commonItems>
                        <el-select v-model='filters.state' placeholder='订单状态' clearable >
                            <el-option v-for='item in state' :label='item.name' :value='item.keyword' :disabled="filters.type != 'first' && item.disabled">
                            </el-option>
                        </el-select>
                        <el-select v-model='filters.orderType' placeholder='项目类型' clearable v-if="filters.type == 'OTHER'">
                            <el-option v-for='item in state3' :label='item.value' :value='item.key'>
                            </el-option>
                        </el-select>
                        <v-commonItems v-model="filters.whId" type="warehouse"></v-commonItems>
                        <el-select v-model='filters.courtType' placeholder='场地类型' clearable v-if="filters.type == 'first'">
                            <el-option v-for='item in state4' :label='item.courtTypeName' :value='item.id'>
                            </el-option>
                        </el-select>
                        <!-- <v-club :service="service" v-model='filters.clubId'></v-club> -->
                        <v-commonItems v-model="filters.mcCode" type="autoReadCard"></v-commonItems>
                        <el-input v-model="filters.orderCode" placeholder="订单号" v-if="filters.type == 'GOODS'" ></el-input>
                        <el-button native-type='submit' type='primary' icon='search'>搜索</el-button>
                    </form>
                </div>
            </div>
            <!-- filters end -->

            <!-- table start  -->
            <div v-if="filters.type == 'first'">
                <el-table :data='tableData' stripe element-loading-text='拼命加载中' v-loading='loading'>
                    <el-table-column label='序号' width='90px'>
                        <template scope='scope'>
                            {{(pagination.pageIndex - 1) * pagination.pageSize + scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop='orderCode' label='订单号'> </el-table-column>
                    <el-table-column prop='memberCardNumber' label='会员卡号'> </el-table-column>
                    <el-table-column prop='memberName' label='会员姓名'> </el-table-column>
                    <el-table-column prop='courtTypeName' label='场地类型'> </el-table-column>
                    <el-table-column prop='court' label='场地号'> </el-table-column>
                    <el-table-column prop='courtNum' label='数量'> </el-table-column>
                    <el-table-column prop='amount' label='总价'> </el-table-column>
                    <el-table-column label='创建时间'><template scope='scope'>{{ scope.row.createdTime | formatDate('YYYY-MM-DD')}}</template></el-table-column>
                    <el-table-column label='操作时间'><template scope='scope'>{{ scope.row.operatorDate | formatDate('YYYY-MM-DD')}}</template></el-table-column>
                    <el-table-column prop='operatorNameOpen' label='开场'> </el-table-column>
                    <el-table-column label='来源'><template scope='scope'>{{ scope.row.orderFrom | sourceFilter }}</template></el-table-column>
                    <el-table-column label='状态'><template scope='scope'>{{ scope.row.status | orderFilter }}</template></el-table-column>
                </el-table>
            </div>

            <template v-else>
                <el-table :data='tableData' stripe element-loading-text='拼命加载中' v-loading='loading'>
                    <el-table-column label='序号' width='90px'>
                        <template scope='scope'>
                            {{(pagination.pageIndex - 1) * pagination.pageSize + scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop='orderCode' label='订单号'> </el-table-column>
                    <el-table-column prop='mcCode' label='会员卡号'> </el-table-column>
                    <el-table-column prop='goodsName' label='项目'> </el-table-column>
                    <el-table-column prop='sellPrice' label='总价'> </el-table-column>
                    <el-table-column label='创建时间'><template scope='scope'>{{ scope.row.createBy | formatDate('YYYY-MM-DD')}}</template></el-table-column>
                    <el-table-column label='修改时间'><template scope='scope'>{{ scope.row.updateBy | formatDate('YYYY-MM-DD')}}</template></el-table-column>
                    <el-table-column label='状态'><template scope='scope'>{{ scope.row.orderState | orderFilter}}</template></el-table-column>
                    <el-table-column prop='operateName' label='操作人'> </el-table-column>
                </el-table>
            </template>
            <!-- table end -->

            <!-- pagination start  -->
            <v-pagination @onPageChange="changePg" :loading="loading" :record-count="totalItems" :exclude="exclude" :searching="searching">
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
            exclude: ['type'],
            loading: false,
            searching: false,
            filters: {
                clubId: '',
                beginTime: '',
                endTime: '',
                time: [],
                state: '',
                payStyle: '',
                mcCode: '',
                orderCode: '',
                whId: '',
                orderType: '',
                courtType: '',
                type: 'first'
            },
            totalItems: 0,
            state: [
                {
                    name: '已支付',
                    keyword: 0
                },
                {
                    name: '未支付',
                    keyword: 1
                },
                {
                    name: '已取消',
                    keyword: 2
                },
                {
                    name: '已退单',
                    keyword: 3
                },
                {
                    name: '现租场未支付',
                    keyword: 4,
                    disabled: true
                },
                {
                    name: '全部订单',
                    keyword: '0,1,2,4',
                    disabled: true
                }
            ],
            state2: [],
            state3: [
                { key: '18', value: '其他收入' },
                { key: '19', value: '其他支出' },
                { key: '20', value: '其他收入退单' },
                { key: '21', value: '其他支出退单' }
            ],
            state4: [],
            tableData: []
        }
    },
    props: ['service'],
    methods: {
        handleClick(tab, event) {
            this.filters = Object.assign({}, this.$options.data().filters, { type: tab.name })
            this.handleSearch()
        },
        changePg(v) {
            this.pagination.pageIndex = v
            this.render()
        },
        handleSearch() {
            this.pagination.pageIndex = 1
            this.searching = true
            bindFilter(isEmptyObject(this.filters, ['time', 'type']))
            this.render()
        },
        getCourttype() {
            // this.service.getCourttype().then(res => {
            //     if (!res) return
            //     this.state4 = res.data
            // })
        },
        render() {
            let exclude = this.filters.type === 'first' ? ['time', 'type'] : ['time'],
                result = isEmptyObject(this.filters, exclude),
                api = {}
            this.loading = true
            result = Object.assign({}, this.pagination, result)
            api = {
                method: 'get',
                url: this.filters.type === 'first' ? 'order/getAllOrder' : 'goodOrders/getAllOrder',
                options: result
            }
            this.service.selectApi(api).then(res => {
                if (!res) return
                this.totalItems = Number(res.pagination.totalItems)
                this.tableData = res.data
                this.loading = false
            })
        }
    },
    mounted() {
        this.render()
        this.getCourttype()
    }
}
</script>
