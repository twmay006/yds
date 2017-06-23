<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->

        <div class="content-wrapper">

            <!-- filters start -->
            <div class="filters" >
                <div class="filter">
                    <form @submit.prevent="handleSearch">
                        <el-button type="success" class="href" size="large">
                            <router-link :to="{ path: '/organizeAdd' }">新增</router-link>
                        </el-button>
                        <el-input placeholder="主办方" v-model="filters.mcCode" ></el-input>
                        <el-input placeholder="管理员"     v-model="filters.memberName" ></el-input>
                        <el-button native-type="submit" type="primary"  icon="search">搜索</el-button>
                    </form>
                </div>
            </div>
            <!-- filters end -->

            <!-- table start  -->
            <el-table :data="tableData" stripe element-loading-text="拼命加载中" v-loading="loading">
                <el-table-column prop="name" label="主办方名称" > </el-table-column>
                <el-table-column prop="mcCode" label="管理员名称" > </el-table-column>
                <el-table-column prop="mcCode" label="登录账号" > </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button  type="info" class="href" size="small">
                            <router-link :to="{ path: '/memberInfo/' + scope.row.id }">查看</router-link>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- table end  -->

            <!-- pagination start  -->
            <v-pagination
                @onPageChange="changePg"
                v-if="!loading"
                :record-count="totalItems"
                :pindex="pagination.pageIndex"
                :psize="pagination.pageSize" >
            </v-pagination>
            <!-- pagination end  -->

        </div>
    </div>
</template>

<script>
import { isEmptyObject, bindFilter } from '../../../utils/helper'
export default {
    data() {
        return {
            totalItems: 0,
            loading: true,
            filters: {
                mcCode: '',
                memberName: '',
                phone: ''
            },
            tableData: [],
            pagination: {
                pageIndex: 1,
                pageSize: 20
            }
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
            bindFilter(this.filters)
            this.render()
        },
        render() {
            let result = isEmptyObject(this.filters)
            this.loading = true
            result = Object.assign({}, this.pagination, result)
            this.service.exhibitionList(result).then(res => {
                if (!res) return
                this.totalItems = Number(res.pagination.totalItems)
                this.tableData = res.data
                this.loading = false
            })
        }
    },
    mounted() {
        let params = this.$route.query
        if (params) {
            if (params.page) {
                this.pagination.pageIndex = Number(params.page)
                delete params.page
            }
            else {
                this.filters = Object.assign({}, this.filters, params)
            }
        }
        this.render()
    }
}
</script>

<style lang="scss">
</style>
