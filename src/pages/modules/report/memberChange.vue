<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <el-tabs v-model='currentTag' type='card' @tab-click='handleClick'>
                <el-tab-pane label='常规业务办理总表' name='first'> </el-tab-pane>
                <el-tab-pane label='常规业务办理明细表' name='second'> </el-tab-pane>
                <el-tab-pane label='特殊业务办理明细表' name='third'> </el-tab-pane>
            </el-tabs>

            <!-- filters start -->
            <div class='filters'>
                <div class='filter'>
                    <form @submit.prevent='handleSearch' >
                        <v-dateRange v-model="filters.time"></v-dateRange>
                        <v-club :service="service" v-model='filters.clubId'></v-club>
                        <el-button native-type='submit' type='primary' icon='search'>搜索</el-button>
                    </form>
                </div>
            </div>
            <!-- filters end -->

            <el-table :data='tableData'  border element-loading-text='拼命加载中' v-loading="loading"  class="total" :class="currentTag == 'first' ? 'first ' : currentTag == 'second' ? 'second' : ''" show-summary :row-class-name="classFilter">
                <el-table-column label='操作类型' >
                    <template scope='scope'>
                        <span v-if="currentTag == 'second' && scope.row.operateNum >= 0" class="bor"></span>
                        <span class="content" :style="currentTag == 'second' && (scope.row.operateNum >= 0 ? 'transform:translateY(-' + scope.row.operateNum + '%);' : '')">
                            {{ currentTag == 'second' ? scope.row.operteName : scope.row.operateTypeName  }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label='卡类型' v-if="currentTag != 'third' " >
                    <template scope='scope'>
                        <span v-if="currentTag == 'second' && scope.row.cardNum >= 0" class="bor"></span>
                        <span class="content" :style="currentTag == 'second' && (scope.row.cardNum >= 0 ? 'transform:translateY(-' + scope.row.cardNum + '%);' : '')">
                            {{ scope.row.valueType | cardTypeFilter(' ') }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop='number' label='数量'> </el-table-column>
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
                <el-table-column prop='total' label='总金额'> </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { isEmptyObject } from '@/utils/helper'
export default {
    data() {
        return {
            currentTag: 'first',
            tableData: [],
            loading: false,
            filters: {
                clubId: '',
                beginDate: '',
                endDate: '',
                time: []
            },
            condition: {
                operateTypeName: ''
            }
        }
    },
    props: ['service'],
    methods: {
        classFilter(e) {
            if (this.currentTag === 'first') {
                return e.operateTypeName ? 'singeLight' : ''
            }
        },
        handleClick(tab, event) {
            this.render()
        },
        handleSearch() {
            this.render()
        },
        combine(tableData) {
            // 让最后一个有个对比....
            tableData.push({ operteName: '', valueType: '' })
            let operateNum = 0, cardNum = 0
            for (let i = 0, len = tableData.length; i < len; i++) {
                if (i === len - 1) {
                    tableData.pop()
                    return tableData
                }

                if (tableData[i].operteName === tableData[i + 1].operteName) {
                    operateNum++
                }
                else {
                    tableData[i].operateNum = (operateNum) / 2 * 100
                    operateNum = 0
                }

                if (tableData[i].operteName === tableData[i + 1].operteName && tableData[i].valueType === tableData[i + 1].valueType) {
                    cardNum++
                }
                else {
                    tableData[i].cardNum = (cardNum) / 2 * 100
                    cardNum = 0
                }
            }
        },
        render() {
            let api = {}
            switch (this.currentTag) {
                case 'first':
                    api = {
                        method: 'get',
                        url: 'report/getMemberPayStyleTotal',
                        options: ''
                    }
                    break
                case 'second':
                    api = {
                        method: 'get',
                        url: 'report/getMemberPayStyleCost',
                        options: ''
                    }
                    break
                default:
                    api = {
                        method: 'get',
                        url: 'report/getSpecialMember',
                        options: ''
                    }
                    break
            }
            this.loading = true
            api.options = isEmptyObject(this.filters, ['time'])
            this.service.selectApi(api).then(res => {
                if (!res) return

                Object.keys(res.data).forEach(k => {
                    res.data[k] = Object.assign({}, res.data[k], res.data[k].list[0])
                })

                if (this.currentTag === 'second') {
                    this.tableData = this.combine(res.data)
                }
                else {
                    this.tableData = res.data
                }
                this.loading = false
            })
        }
    },
    mounted() {
        this.render()
    }
}
</script>

<style lang="scss">
.second{
    .el-table__row{
        td:first-child,td:nth-child(2){
            border-bottom: 0 none;
            background: #f0fae9 !important;
            .content{
                height: 100%;
                text-indent: -99999px;
                display: block;
                display: flex;
                align-items: center;
                &[style]{
                    text-indent: 0;
                }
            }
            .bor{
                position: absolute;
                display: block;
                height: 100%;
                width: 100%;
                left: 0;
                box-sizing: border-box;
                border-bottom: 1px solid #dfe6ec;
                &:before{
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    width: 100%;
                    right: -100%;
                    height: 1px;
                    background: #dfe6ec;
                    z-index: 2;
                }
            }
            >div{
                overflow: visible;
                height: 100%;
            }
        }
    }
}

.first{
    .el-table__row{
        &:not(.singeLight){
            td:first-child{
                background: #f4f3f4;
            }
        }
        &.singeLight{
            td{
                background: #f0fae9;
            }
        }
    }
}
</style>
