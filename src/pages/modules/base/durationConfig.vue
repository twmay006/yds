<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <div class="date-container">
                <v-form name="form" @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule3" :data="data"  :loading="load">
            </v-form>
            </div>
        </div>
    </div>
</template>

<script>
// import isEmptyObject from '@/utils/helper'
// import { Loading } from 'element-ui';
export default {
    data() {
        return {
            load: false,
            formRule3: {
                beginDate: {
                    type: 'date',
                    label: '开始日期',
                    value: '',
                    rules: ['date']
                },
                endDate: {
                    type: 'date',
                    label: '结束日期',
                    value: '',
                    rules: ['date']
                },
                clubList: {
                    type: 'clubList',
                    label: '场馆',
                    options: [],
                    rules: ['required']
                }
            },
            data: {}
        }
    },
    props: ['service'],
    methods: {
        openFullScreen() {
            this.fullscreenLoading = true
            setTimeout(() => {
                this.fullscreenLoading = false
            }, 3000)
        },
        getClubList() {
            this.service.club().then(res => {
                if (!res) return
                this.formRule3.clubList.options = res.data
            })
        },
        onSubmit(e) {
            if (!e) {
                this.load = false
                return
            }
            this.load = true
            let parameter = {
                beginDate: moment(e.beginDate).format('YYYY-MM-DD'),
                endDate: moment(e.endDate).format('YYYY-MM-DD'),
                clubId: e.clubList
            }
            this.service.insertConsumeInfo(parameter).then(res => {
                if (!res) return
                this.load = false
                this.$message.success(res.msg)
            })
        }
    },
    mounted() {
        this.getClubList()
    }
}
</script>

<style lang="scss">
    .date-container{
        width: 60%;
        /*height: 200px;*/
        /*background: red;*/
        /*display: flex;*/
        /*justify-content: space-around;*/
        margin: 50px auto;
        /*flex-wrap: wrap;*/
        /*.el-date-editor.el-input,.el-select{
            width: 300px;
            margin: 10px;
        }*/
    }
</style>
<!-- <div class="date-container">
                <div class="item-date">
                    <el-date-picker
                      v-model="beginDate"
                      type="date"
                      placeholder="请选择开始日期">
                    </el-date-picker>
                </div>
                <div class="item-date">
                    <el-date-picker
                      v-model="endDate"
                      type="date"
                      placeholder="请选择结束日期">
                    </el-date-picker>
                </div>
                <el-select v-model="club" placeholder="请选择场馆">
                    <el-option
                      v-for="item in clubList"
                      :key="item.id"
                      :label="item.clubName"
                      :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="date-container">
                <el-button type="primary" @click="loading"
    v-loading.fullscreen.lock="load">点击生成</el-button>
                </div>
                <el-button
    type="primary"
    @click="openFullScreen"
    v-loading.fullscreen.lock="fullscreenLoading">
    显示整页加载，3 秒后消失
  </el-button> -->