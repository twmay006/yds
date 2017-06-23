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
                        <v-dateRange v-model="filters.time" ></v-dateRange>
                        <el-select v-model="filters.memcardtypeid"  placeholder="卡类型" clearable>
                            <el-option
                                v-for="item in cardList"
                                :label="item.cardTypeName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="filters.type"  placeholder="操作类型" clearable>
                            <el-option
                                v-for="item in operateList"
                                :label="item.value"
                                :value="item.key">
                            </el-option>
                        </el-select>
                        <el-select v-model="filters.payStyle"  placeholder="支付方式" clearable>
                            <el-option
                                v-for="item in payList"
                                :label="item.value"
                                :value="item.key">
                            </el-option>
                        </el-select>
                        <el-select v-model="filters.operatorId"  placeholder="操作人" clearable>
                            <el-option
                                v-for="item in userList"
                                :label="item.username"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <v-club :service="service" v-model='filters.clubId'></v-club>
                        <el-input v-model="filters.mcCode" placeholder="会员卡号" ></el-input>
                        <el-button native-type="submit" type="primary" icon="search">搜索</el-button>
                    </form>
                </div>
            </div>
            <!-- filters end -->

            <!-- table start  -->
            <el-table :data="tableData"  stripe element-loading-text="拼命加载中" v-loading="loading">
                <el-table-column label="序号" width="90px">
                    <template scope="scope">
                        <div>
                            {{(pagination.pageIndex - 1) * pagination.pageSize + scope.$index + 1}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="cardTypeName" label="卡类型"> </el-table-column>
                <el-table-column prop="mcCode" label="卡号"> </el-table-column>
                <el-table-column prop="memberName" label="姓名"> </el-table-column>
                <el-table-column prop="operateTypeName" label="操作类型"> </el-table-column>
                <el-table-column prop="num" label="次数"> </el-table-column>
                <el-table-column prop="days" label="天数"> </el-table-column>
                <el-table-column prop="billMoney" label="金额"> </el-table-column>
                <el-table-column label="支付方式" ><template scope="scope">{{ scope.row.payCode | payFilter }}</template></el-table-column>
                <el-table-column label="操作日期" >
                    <template scope="scope">{{ scope.row.createdAt | formatDate('YYYY-MM-DD')}}</template>
                </el-table-column>
                <el-table-column prop="operateName" label="操作人"> </el-table-column>
            </el-table>
            <!-- table end  -->

            <!-- pagination start  -->
            <v-pagination @onPageChange="changePg" :loading="loading" :record-count="totalItems" :searching="searching" :strToNum="strToNum" >
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
            strToNum: ['memcardtypeid'],
            totalItems: 0,
            loading: true,
            searching: false,
            filters: {
                clubId: '',
                startTime: '',
                endTime: '',
                mcCode: '',
                memcardtypeid: '',
                operatorId: '',
                payStyle: '',
                type: '',
                time: []
            },
            tableData: [],
            userList: [],
            cardList: [],
            payList: [],
            operateList: []
        }
    },
    props: ['service'],
    methods: {
        changePg(v) {
            this.pagination.pageIndex = v
            this.render()
        },
        handleSearch() {
            this.pagination.pageIndex = 1
            this.searching = true
            bindFilter(isEmptyObject(this.filters, ['time']))
            this.render()
        },
        getUser() {
            this.service.getUser().then(res => {
                if (!res) return
                this.userList = res.data
            })
        },
        getClubConstant() {
            this.service.getClubConstant().then(res => {
                if (!res) return
                this.payList = res.data.PAY_STYLE
                this.operateList = res.data.MEM_RECORD
            })
        },
        getCard() {
            this.service.getCard().then(res => {
                if (!res) return
                this.cardList = res.data
            })
        },
        render() {
            let result = isEmptyObject(this.filters, ['time'])
            this.loading = true
            result = Object.assign({}, this.pagination, result)
            this.service.getOperateLog(result).then(res => {
                if (!res) return
                this.totalItems = Number(res.data.mypagination.totalItems)
                this.tableData = res.data.memRecords
                this.loading = false
            })
        }
    },
    mounted() {
        this.getUser()
        this.getClubConstant()
        this.getCard()
        this.render()
    }
}
</script>

<style lang="scss" scoped>
.link{
    text-decoration: underline;
}
</style>
