<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <el-tabs v-model='currentTag' type='card' @tab-click='handleClick'>
                <el-tab-pane label='今日' name='first'>
                </el-tab-pane>
                <el-tab-pane label='日报' name='second'>
                </el-tab-pane>
                <el-tab-pane label='月报' name='third'></el-tab-pane>
            </el-tabs>

            <!-- filters start -->
            <div class='filters'>
                <div class='filter'>
                    <form @submit.prevent='handleSearch' >
                        <el-date-picker
                            v-show="['first', 'second'].indexOf(currentTag) > -1"
                            v-model="filters.beginTime"
                            type="date"
                            @change="pickTime"
                            placeholder="选择日期"
                            :disabled='currentTag == "first"'>
                        </el-date-picker>
                        <el-date-picker
                            v-show="['first', 'second'].indexOf(currentTag) === -1"
                            v-model="value2"
                            type="month"
                            @change="pickTime"
                            placeholder="选择月">
                          </el-date-picker>
                        <el-button native-type='submit' type='primary' icon='search'>搜索</el-button>
                    </form>
                </div>
            </div>
            <!-- filters end -->

            <!-- table end -->
            <el-table :data='tableData' stripe element-loading-text='拼命加载中' v-loading="loading" show-summary class="total">
                <el-table-column prop='clubName' label='场馆'> </el-table-column>
                <el-table-column prop='RECIEPT' label='招待'> </el-table-column>
                <el-table-column prop='FREE' label='赠送'> </el-table-column>
                <el-table-column prop='CREDIT' label='银行卡'> </el-table-column>
                <el-table-column prop='MEMBER' label='一卡通'> </el-table-column>
                <el-table-column prop='TANSFER' label='团购'> </el-table-column>
                <el-table-column prop='WX' label='微信'> </el-table-column>
                <el-table-column prop='YDG_WX' label='运动时微信'> </el-table-column>
                <el-table-column prop='CASH' label='现金'> </el-table-column>
                <el-table-column prop='CARD' label='会员卡'> </el-table-column>
                <el-table-column prop='ACCOUNT' label='挂账'> </el-table-column>
                <el-table-column prop='YDG_ALIPAY' label='运动时支付宝'> </el-table-column>
                <el-table-column prop='totalMoney' label='合计'> </el-table-column>
            </el-table>
            <!-- table end -->

        </div>
    </div>
</template>

<script>
import { isEmptyObject } from '@/utils/helper'
export default {
    data() {
        return {
            currentTag: 'first',
            value2: '',
            tableData: [],
            loading: true,
            filters: {
                beginTime: moment().format('YYYY-MM-DD'),
                endTime: ''
            }
        }
    },
    props: ['service'],
    methods: {
        pickTime(v) {
            if (this.currentTag !== 'third') {
                this.filters.beginTime = v
            }
            else {
                this.filters.beginTime = moment(v).startOf('month').format('YYYY-MM-DD')
                this.filters.endTime = moment(v).endOf('month').format('YYYY-MM-DD')
            }
        },
        handleClick(tab, event) {
            if (this.currentTag === 'third') {
                this.value2 = moment().format('YYYY-MM')
                this.pickTime(this.value2)
            }
            else {
                this.filters.beginTime = moment().format('YYYY-MM-DD')
                this.filters.endTime = ''
            }
            this.render()
        },
        handleSearch() {
            this.render()
        },
        render() {
            let result = isEmptyObject(this.filters)
            this.service.getPayStyleCostOfDay(result).then(res => {
                this.loading = false
                if (!res || !res.data.length) {
                    this.tableData = []
                    return
                }
                Object.keys(res.data).forEach(k => {
                    res.data[k] = Object.assign({}, res.data[k], res.data[k].payList)
                })
                this.tableData = res.data
            })
        }
    },
    mounted() {
        this.render()
    }
}
</script>
