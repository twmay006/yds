<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <el-tabs v-model='currentTag' type='card' @tab-click='handleClick'>
                <el-tab-pane label='今日' name='first'>
                </el-tab-pane>
                <el-tab-pane label='日报' name='second'>
                </el-tab-pane>
                <el-tab-pane label='月报' name='third'></el-tab-pane>
            </el-tabs>

            <!-- filters start -->
            <div class='filters'>
                <div class='filter'>
                    <form @submit.prevent='handleSearch' >
                        <el-date-picker
                            v-show="['first', 'second'].indexOf(currentTag) > -1"
                            v-model="filters.beginTime"
                            type="date"
                            @change="pickTime"
                            placeholder="选择日期"
                            :disabled='currentTag == "first"'>
                        </el-date-picker>
                        <el-date-picker
                            v-show="['first', 'second'].indexOf(currentTag) === -1"
                            v-model="value2"
                            type="month"
                            @change="pickTime"
                            placeholder="选择月">
                          </el-date-picker>
                        <el-button native-type='submit' type='primary' icon='search'>搜索</el-button>
                    </form>
                </div>
            </div>
            <!-- filters end -->

            <!-- table end -->
            <el-table :data='tableData' stripe element-loading-text='拼命加载中' v-loading="loading" class="total" show-summary>
                <el-table-column prop='clubName' label='场馆'> </el-table-column>
                <el-table-column prop='member' label='会员'> </el-table-column>
                <el-table-column prop='ticket' label='票券'> </el-table-column>
                <el-table-column prop='court' label='场地'> </el-table-column>
                <el-table-column prop='goods' label='商品'> </el-table-column>
                <el-table-column prop='quitCard' label='退卡'> </el-table-column>
                <el-table-column prop='otherIcome' label='其他收入'> </el-table-column>
                <el-table-column label='其他开支'>
                    <template scope="scope">
                            -{{ scope.row.otherPay }}
                    </template>
                </el-table-column>
                <el-table-column label='合计'>
                    <template scope="scope">
                        <div>
                            {{ scope.row.allIcome + scope.row.allPay }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- table end -->

        </div>
    </div>
</template>

<script>
import { isEmptyObject } from '@/utils/helper'
export default {
    data() {
        return {
            currentTag: 'first',
            value2: '',
            tableData: [],
            loading: true,
            filters: {
                beginTime: moment().format('YYYY-MM-DD'),
                endTime: ''
            }
        }
    },
    props: ['service'],
    methods: {
        pickTime(v) {
            if (this.currentTag !== 'third') {
                this.filters.beginTime = v
            }
            else {
                this.filters.beginTime = moment(v).startOf('month').format('YYYY-MM-DD')
                this.filters.endTime = moment(v).endOf('month').format('YYYY-MM-DD')
            }
        },
        handleClick(tab, event) {
            if (this.currentTag === 'third') {
                this.value2 = moment().format('YYYY-MM')
                this.pickTime(this.value2)
            }
            else {
                this.filters.beginTime = moment().format('YYYY-MM-DD')
                this.filters.endTime = ''
            }
            this.render()
        },
        handleSearch() {
            this.render()
        },
        render() {
            let result = isEmptyObject(this.filters),
                itemTotal = 0,
                array = [],
                array1 = [],
                clubName = []
            this.service.getIncome(result).then(res => {
                this.loading = false
                if (!res || !res.data.length) {
                    this.tableData = []
                    return
                }
                Object.keys(res.data[0]).forEach((key) => {
                    if (['clubName', 'create_time'].indexOf(key) > -1) return
                    for (let i = res.data.length - 1; i >= 0; i--) {
                        itemTotal += res.data[i][key]
                        if (array1.length < res.data.length) {
                            clubName.push(res.data[i].clubName)
                            array1.push({ value: res.data[i].all_icome - res.data[i].all_pay, name: res.data[i].clubName })
                        }
                    }
                    array.push(itemTotal)
                })
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
.el-row{
    &.hidden{
        overflow: hidden;
        height: 0;
    }
}
</style>
