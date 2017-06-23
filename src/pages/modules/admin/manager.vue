<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->

        <div class="content-wrapper">
            <!-- tabs start  -->
            <div class="tabs">
                <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
                    <el-tab-pane label="操作员管理" name="manager"></el-tab-pane>
                    <el-tab-pane label="展会角色管理" name="exhibition"></el-tab-pane>
                </el-tabs>
            </div>
            <!-- tabs end  -->

            <!-- filters start -->
            <div class="filters">
                <div class="filter">
                    <form @submit.prevent="handleSearch">
                        <el-button type="primary" native-type="submit" icon="plus">创建操作员</el-button>
                    </form>
                </div>
            </div>
            <!-- filters end -->

            <!-- table start  -->
            <el-table :data="tableData" stripe element-loading-text="拼命加载中" v-loading="loading" >
                <el-table-column prop="cardTypeName" label="登录名" > </el-table-column>
                <el-table-column prop="mcCode" label="姓名" > </el-table-column>
                <el-table-column prop="memberName" label="邮箱"> </el-table-column>
                <el-table-column prop="phone" label="QQ"> </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <span>{{ scope.row.cardState | stateFilter}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- table end  -->

            <!-- pagination start  -->
            <v-pagination
                @onPageChange="changePg"
                v-if="!loading"
                :record-count="recordCount"
                :pindex="pagination.pageIndex"
                :psize="pagination.pageSize" >
            </v-pagination>
            <!-- pagination end  -->

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 'manager',
            tableData: [],
            loading: true,
            recordCount: 0,
            pagination: {
                pageIndex: 1,
                pageSize: 20
            }
        }
    },
    props: ['service'],
    methods: {
        changePg(v) {

        },
        handleSearch() {

        },
        handleClick(tab, event) {

        },
        render() {

        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>

</style>
