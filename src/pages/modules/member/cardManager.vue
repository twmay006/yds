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
                        <v-btn text="新增场馆" type="success" size="large" :path="{ url: '/club/clubAdd' }"></v-btn>
                        <el-input placeholder="名称" v-model="filters.cardTypeName"></el-input>
                        <v-commonItems v-model="filters.valueType" type="valueType"></v-commonItems>
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
                <el-table-column prop="cardTypeName" label="类型名称"> </el-table-column>
                <el-table-column label="储值类型">
                    <template scope="scope">
                        {{ scope.row.valueType | cardTypeFilter}}
                    </template>
                </el-table-column>
                <el-table-column label="延期计算方式">
                    <template scope="scope">{{scope.row.putOffStyle | putoffStyleFilter }}</template>
                </el-table-column>
                <el-table-column prop="valPrice" label="卡面值"> </el-table-column>
                <el-table-column prop="valNum" label="次数"> </el-table-column>
                <el-table-column prop="activateDay" label="首次激活天数"> </el-table-column>
                <el-table-column prop="valDays" label="有效天数"> </el-table-column>
                <el-table-column prop="" label="积分方式"><template scope="scope">{{scope.row.pointMethod | consumeFilter}}</template></el-table-column>
                <el-table-column prop="pointRate" label="积分比例"> </el-table-column>
                <el-table-column label="状态"><template scope="scope">{{scope.row.pointMethod | availableFilter}}</template></el-table-column>
                <el-table-column prop="isNet" label="在线购买"><template scope="scope">{{scope.row.isNet | availableFilter}}</template></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <v-btn text="修改" type="danger" size="small" v-model="scope"  ></v-btn>
                        <v-btn text="删除" type="info" size="small" :path="{ url: '/club/clubAdd', options: { id : scope.row.id } }"></v-btn>
                    </template>
                </el-table-column>
            </el-table>
            <!-- table end  -->

            <!-- pagination start  -->
            <v-pagination @onPageChange="changePg" :loading="loading" :record-count="totalItems" :searching="searching" >
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
            addressList: [],
            totalItems: 0,
            loading: true,
            searching: false,
            filters: {
                cardTypeName: '',
                valueType: ''
            },
            tableData: []
        }
    },
    props: ['service'],
    methods: {
        handleDelete(index, rows) {
            this.service.agentDelete(rows[index]).then(res => {
                if (!res) return
                rows.splice(index, 1)
                this.$message.success(res.msg)
            })
        },
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
        render() {
            let result = isEmptyObject(this.filters, ['time'])
            this.loading = true
            result = Object.assign({}, this.pagination, result)
            this.service.memCardTypeList(result).then(res => {
                this.loading = false
                if (!res) return
                this.totalItems = Number(res.pagination.totalItems)
                this.tableData = res.data
            })
        }
    },
    mounted() {
        this.render()
    }
}
</script>

<style lang="scss" scoped>
.link{
    text-decoration: underline;
}
</style>
