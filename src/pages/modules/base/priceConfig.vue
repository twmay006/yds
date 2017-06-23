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
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column prop="name" label="方案名称"> </el-table-column>
                <el-table-column label="计费方式">
                    <template scope="scope">
                        {{ scope.row.billingType | chargingFilter}}
                    </template>
                </el-table-column>
                <el-table-column label="收费价格设置">
                    <template scope="scope">{{scope.row.putOffStyle | putoffStyleFilter }}</template>
                </el-table-column>
                <el-table-column prop="valPrice" label="是否网络价格"> </el-table-column>
                <el-table-column prop="valNum" label="是否默认"> </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <v-btn text="修改" type="danger" size="small" v-model="scope"  ></v-btn>
                        <v-btn text="删除" type="info" size="small" :path="{ url: '/club/clubAdd', options: { id : scope.row.id } }"></v-btn>
                    </template>
                </el-table-column>
            </el-table>
            <!-- table end  -->
        </div>
    </div>
</template>

<script>
// import { isEmptyObject, bindFilter } from '@/utils/helper'
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
        render() {
            let options = { id: this.$route.params.id }
            this.service.priceProjectList(options).then(res => {
                this.loading = false
                if (!res) return
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
