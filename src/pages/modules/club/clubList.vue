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
                        <v-btn role="add" text="新增场馆" type="success" size="large" :path="{ url: '/club/clubAdd' }"></v-btn>
                        <el-select v-model="filters.cityId"  placeholder="请选择" clearable>
                            <el-option
                                v-for="item in addressList"
                                :label="item.city"
                                :value="item.cityid">
                            </el-option>
                        </el-select>
                        <!-- <el-input placeholder="会员卡" icon="picture" v-model="input2" :on-icon-click="handleIconClick">
                        </el-input> -->
                        <el-button native-type="submit" type="primary" icon="search">搜索</el-button>
                    </form>
                </div>
            </div>
            <!-- filters end -->

            <!-- table start  -->
            <el-table :data="tableData.bsClubs"  stripe element-loading-text="拼命加载中" v-loading="loading">
                <el-table-column label="序号" width="90px">
                    <template scope="scope">
                        <div>
                            {{(pagination.pageIndex - 1) * pagination.pageSize + scope.$index + 1}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="clubName" label="场馆名称"> </el-table-column>
                <el-table-column prop="bsProvince.province" label="省份"> </el-table-column>
                <el-table-column label="创建日期" >
                    <template scope="scope">{{ scope.row.createAt | formatDate('YYYY-MM-DD')}}</template>
                </el-table-column>
                <el-table-column label="场馆链接">
                    <template scope="scope">
                        <a class="link" target="_blank" :href="'http://' + scope.row.domainName">{{ scope.row.domainName }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <v-btn role="delete" text="删除场馆" type="danger" size="small" v-model="scope"  ></v-btn>
                        <v-btn role="edit" text="设置" type="info" size="small" :path="{ url: '/club/clubAdd', options: { id : scope.row.id } }"></v-btn>
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
                cityId: ''
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
            bindFilter(this.filters)
            this.render()
        },
        render() {
            let result = isEmptyObject(this.filters)
            this.loading = true
            result = Object.assign({}, this.pagination, result)
            this.service.clubList(result).then(res => {
                this.loading = false
                if (!res) return
                this.totalItems = Number(res.data.mypagination.totalItems)
                this.tableData = res.data
            })

            this.service.clubAddress().then(res => {
                if (!res) return
                this.addressList = res.data
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
