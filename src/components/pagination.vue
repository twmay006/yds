<template lang="html">
    <div class="pagination-wrapper" v-if="!loading">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pagination.pageIndex"
            :page-size="pagination.pageSize"
            layout="slot, total, prev, pager, next, jumper"
            :total="recordCount">
            <!-- 预留出slot吧.. -->
        </el-pagination>
    </div>
</template>

<script>
import { GetRequest, isEmptyObject, strToNum } from '../utils/helper'

export default {
    data() {
        return {
            pagination: {
                pageIndex: 1,
                pageSize: 20
            },
            paginationing: false
        }
    },
    methods: {
        handleCurrentChange(page) {
            // 回到顶部
            document.getElementsByClassName('content-container')[0].scrollTop = 0
            router.push({
                query: Object.assign({}, this.$route.query, { page: page })
            })
            this.$emit('onPageChange', page)
            this.paginationing = true
        }
    },
    props: ['recordCount', 'exclude', 'loading', 'searching', 'strToNum'],
    watch: {
        '$route'(to, from) {
            // console.log('router')
            // 判断是否是浏览器的后退操作
            if (this.searching || this.paginationing) {
                this.$parent.searching = false
                this.paginationing = false
                return false
            }
            let filters = Object.assign({}, this.$parent.filters),
                reg = /page=(\d+)/,
                regMatch = reg.exec(location.search),
                prev = regMatch ? Number(regMatch[1]) : 1,
                query,
                urlQuery = GetRequest()

            Object.keys(filters).forEach((key) => {
                if (this.exclude && this.exclude.indexOf(key) > -1) return
                filters[key] = ''
            })

            // 处理些特殊的字符.. 因为是重构, 所以字段名不能大改, 没有和后台没有约束好...
            if ((urlQuery.startTime || urlQuery.beginTime) && urlQuery.endTime) {
                urlQuery.time = [urlQuery.startTime || urlQuery.beginTime, urlQuery.endTime]
            }
            // console.log(strToNum(urlQuery, this.strToNum))
            query = Object.assign({}, filters, urlQuery, strToNum(urlQuery, this.strToNum))

            // 删除page . 防止把参数带过去
            query.page ? delete query.page : query
            this.$parent.filters = query
            // 传递给父组件.重新加载
            if (this.pagination.pageIndex !== prev || !this.searching || !this.paginationing) {
                // console.log('success')
                this.$emit('onPageChange', prev)
            }
        }
    },
    mounted() {
        let params = this.$route.query
        this.$parent.pagination = Object.assign(this.pagination, { pageIndex: Number(params.page) || 1 })
        if (isEmptyObject(params, ['page'])) {
            delete params.page
            // 处理特殊字段，与后台约定好字段名...
            this.$parent.filters = Object.assign({}, this.$parent.filters, params, strToNum(params, this.strToNum))
            // console.log(this.$parent.filters)
            // console.log(params)
            if ((params.startTime || params.beginTime) && params.endTime) {
                this.$parent.filters.time = [params.startTime || params.beginTime, params.endTime]
            }
        }
    }
}
</script>
