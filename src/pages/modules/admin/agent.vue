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
                        <el-button type="success" class="href" size="large" v-if="$route.meta.handleAuth.add">
                            <router-link :to="{ path: '/admin/agentAdd' }">新增</router-link>
                        </el-button>
                        <el-input placeholder="代理商名称" v-model="filters.name"></el-input>
                        <el-select v-model="filters.status" clearable placeholder="状态">
                            <el-option label="启用" value="available" > </el-option>
                            <el-option label="禁止" value="unavailable" > </el-option>
                        </el-select>
                        <el-button native-type="submit" type="primary" icon="search">搜索</el-button>
                    </form>
                </div>
            </div>
            <!-- filters end -->

            <!-- table start  -->
            <el-table :data="tableData" stripe element-loading-text="拼命加载中" v-loading="loading">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" inline >
                            <el-form-item label="账户名">
                                <span>{{ props.row.account }}</span>
                            </el-form-item>
                            <el-form-item label="代理商名称">
                                <span>{{ props.row.agentName }}</span>
                            </el-form-item>
                            <el-form-item label="管理员名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <span>{{ props.row.email }}</span>
                            </el-form-item>
                            <el-form-item label="QQ">
                                <span>{{ props.row.QQ }}</span>
                            </el-form-item>
                            <el-form-item label="状态">
                                <span>{{ props.row.status }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="序号" width="90px">
                    <template scope="scope">
                        <div>
                            {{(pagination.pageIndex - 1) * pagination.pageSize + scope.$index + 1}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="agentName" label="代理商名称"> </el-table-column>
                <el-table-column prop="name" label="管理员名称"> </el-table-column>
                <el-table-column prop="mcCode" label="用户数量(已创建/总数)"> </el-table-column>
                <el-table-column prop="son_agent_count" label="二级代理商数量(已创建/总数)"> </el-table-column>
                <el-table-column prop="account" label="登录账号"> </el-table-column>
                <el-table-column prop="mcCode" label="状态">
                    <template scope="scope">
                        <!-- <el-switch v-model="scope.row.status" on-color="#13ce66" off-color="#ff4949" on-text="启用" off-text="禁止">
                        </el-switch> -->
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="warning" class="href" size="small">
                            <router-link :to="{path: '/agentAdd', query: { id : scope.row.id}}">修改</router-link>
                        </el-button>
                        <el-button type="danger" size="small" @click.native.prevent="handleDelete(scope.$index, tableData)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- table end  -->

            <!-- pagination start  -->
            <v-pagination @onPageChange="changePg" v-if="!loading" :record-count="totalItems" :pindex="pagination.pageIndex" :psize="pagination.pageSize">
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
                name: '',
                status: ''
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
            bindFilter(this.filters)
            this.render()
        },
        render() {
            let result = isEmptyObject(this.filters)
            this.loading = true
            result = Object.assign({}, this.pagination, result)
            this.service.agentList(result).then(res => {
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
