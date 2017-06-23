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
                        <v-btn  text="新增会员" type="success" size="large" :path="{ url: '/member/add' }" ></v-btn>
                        <v-commonItems v-model="filters.time" startText="beginTime" type="dateRange"></v-commonItems>
                        <v-commonItems v-model="filters.memberName" type="memberName"></v-commonItems>
                        <v-commonItems v-model="filters.mcCode" type="autoReadCard"></v-commonItems>
                        <el-input placeholder="联系电话" v-model="filters.phone"></el-input>
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
                <el-table-column prop="memberName" label="姓名"> </el-table-column>
                <el-table-column prop="mcCode" label="会员卡号"> </el-table-column>
                <el-table-column label="微信绑定">
                    <template scope="scope">
                        {{scope.row.wxOpenid | weixinBind }}
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="联系电话"> </el-table-column>
                <el-table-column prop="point" label="积分"> </el-table-column>
                <el-table-column label='办卡日期'><template scope='scope'>{{ scope.row.createdTime | formatDate('YYYY-MM-DD')}}</template></el-table-column>
                <el-table-column label="状态"><template scope='scope'>{{ scope.row.available | availableFilter }}</template></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <v-btn text="修改" type="warning" size="small" :path="{ url: '/member/add' }"></v-btn>
                        <v-btn text="删除" type="danger" size="small" @handleClick="handleDelete" v-model="scope"></v-btn>
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
                beginTime: '',
                endTime: '',
                mcCode: '',
                memberName: '',
                phone: '',
                time: ''
            },
            tableData: []
        }
    },
    props: ['service'],
    methods: {
        handleDelete(row) {
            let options = { id: row.row.id }
            this.service.memberDelete(options).then(res => {
                if (!res) return
                this.tableData.splice(row.$index, 1)
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
            this.service.memberList(result).then(res => {
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
