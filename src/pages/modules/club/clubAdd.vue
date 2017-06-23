<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->

        <div class="content-wrapper">
            <!-- filters start -->
            <div class="filters">
                <div class="tip">提示:带<span>*</span>号必填</div>
            </div>
            <!-- filters end -->

            <el-tabs v-model="currentTag" type="card" @tab-click="handleClick">
                <el-tab-pane label="场馆信息" name="first">
                    <el-row :gutter="40" >
                        <el-col :span="12">
                            <v-form name="form" @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule" :data="data"  :loading="loading" v-if="isShow">
                            </v-form>
                        </el-col>
                        <el-col :span="12">
                            <v-baidu :keyword="keyword" v-show="isShow">
                                <span slot='tip' class="tip">注:我们将会取A坐标作为您场馆的经纬度地址</span>
                            </v-baidu>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <!-- <el-tab-pane label="微信信息" name="second">
                    <el-row :gutter="40" >
                        <el-col :span="12">
                            <v-form name="form" @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule1" :data="data"  :loading="loading" v-if="isShow">
                            </v-form>
                        </el-col>
                    </el-row>
                </el-tab-pane> -->
                <el-tab-pane label="账户信息" name="third">
                    <el-row :gutter="40" >
                        <el-col :span="12">
                            <v-form name="form" @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule2" :data="data"  :loading="loading" v-if="isShow">
                            </v-form>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="佣金比例" name="four" class="line">
                    <v-form name="form" @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule3" :data="data"  :loading="loading" :inline=true  v-if="isShow">
                        <el-button slot='customInput' type="success" @click="add">新增</el-button>
                    </v-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import area from '@/utils/chinaArea'
import vBaidu from '@/components/baidu'
import { isEmptyObject } from '@/utils/helper'
export default {
    data() {
        return {
            currentTag: 'first',
            loading: false,
            isShow: true,
            keyword: '',
            filesList: [],
            formRule: {
                clubName: {
                    type: 'input',
                    label: '场馆名称',
                    value: '',
                    rules: ['required']
                },
                provinces: {
                    type: 'cascader',
                    label: '省市区',
                    value: [],
                    options: area.data,
                    func: this.change,
                    rules: ['array']
                },
                address: {
                    type: 'input',
                    label: '场馆地址',
                    value: '',
                    rules: ['required'],
                    func: this.change
                },
                phone: {
                    type: 'input',
                    label: '联系电话',
                    value: '',
                    rules: ['required', 'phone']
                },
                contacts: {
                    type: 'input',
                    label: '联系人',
                    value: '',
                    rules: ['required']
                },
                contactsPhone: {
                    type: 'input',
                    label: '手机号码',
                    value: '',
                    rules: ['required', 'phone']
                },
                domainName: {
                    type: 'input',
                    label: '域名',
                    value: '',
                    rules: ['required', 'url']
                },
                preStr: {
                    type: 'input',
                    label: '订单前缀',
                    value: '',
                    rules: ['required']
                },
                brief: {
                    type: 'textarea',
                    label: '场馆介绍',
                    value: '',
                    rules: ['required']
                },
                sysBusPictures: {
                    type: 'upload',
                    label: '场馆图片',
                    value: [],
                    func: this.getImg
                }
            },
            // formRule1: {
            //     1: {
            //         type: 'input',
            //         label: '微信Appid',
            //         value: '',
            //         rules: ['required']
            //     },
            //     2: {
            //         type: 'input',
            //         label: '微信Secrect',
            //         value: '',
            //         rules: ['required']
            //     },
            //     3: {
            //         type: 'input',
            //         label: '支付商户ID',
            //         value: '',
            //         rules: ['required']
            //     }
            // },
            formRule2: {
                name: {
                    type: 'input',
                    label: '户名',
                    value: '',
                    rules: ['required', 'Cn']
                },
                bank: {
                    type: 'input',
                    label: '开户行',
                    value: '',
                    rules: ['required', 'Cn']
                },
                account: {
                    type: 'input',
                    label: '银行卡号',
                    value: '',
                    rules: ['required', 'number']
                }
            },
            formRule3: {
                startPoint: {
                    type: 'input',
                    label: '起始金额',
                    value: '',
                    rules: ['required', 'number']
                },
                endPoint: {
                    type: 'input',
                    label: '截止金额',
                    value: '',
                    rules: ['required', 'number']
                },
                level: {
                    type: 'input',
                    label: '佣金比例',
                    value: '',
                    rules: ['required', 'number']
                },
                btn: {
                    type: 'button',
                    label: '删除',
                    color: 'warning',
                    func: this.del
                }
            },
            data: {}
        }
    },
    props: ['service'],
    components: {
        vBaidu
    },
    methods: {
        change(e) {
            this.keyword = e
        },
        handleClick(tab, event) {
            if (!isEmptyObject(this.$route.query)) return
            this.isShow = false
            this.currentTag = tab ? tab.name : this.currentTag
            let api = {}
            switch (this.currentTag) {
                case 'first':
                    api = {
                        url: `club/${ this.$route.query.id }`,
                        method: 'get',
                        options: ''
                    }
                    break
                case 'third':
                    api = {
                        url: `clubBank/findByClubId/${ this.$route.query.id }`,
                        method: 'get',
                        options: ''
                    }
                    break
                case 'four':
                    api = {
                        url: 'commission/getAllCommission',
                        method: 'get',
                        options: { clubId: this.$route.query.id }
                    }
                    break
                default:
                    // console.log('error')
            }
            this.service.selectApi(api).then(res => {
                if (!res) return
                if (this.currentTag === 'four') {
                    this.data = {}
                    this.formRule3 = Object.assign({}, this.$options.data().formRule3, { btn: this.$data.formRule3.btn })
                    for (let i = res.data.length - 1; i >= 0; i--) {
                        this.add(res.data[i], i)
                    }
                }
                else {
                    this.data = res.data
                }
                this.isShow = true
            })
        },
        onSubmit(e) {
            if (!e) {
                this.loading = false
                return
            }
            this.loading = true
            let api = {}, filesList = []
            switch (this.currentTag) {
                case 'first':
                    api = {
                        url: 'club',
                        method: this.$route.query.id ? 'put' : 'post',
                        options: e
                    }
                    // 删掉upload组件自带的一些参数. 后台没接受会报错
                    Object.keys(this.filesList).forEach(k => {
                        filesList.push({ url: this.filesList[k].url })
                    })
                    api.options.sysBusPictures = filesList
                    break
                case 'third':
                    api = {
                        url: `clubBank/saveOrUpdate`,
                        method: 'post',
                        options: Object.assign({}, e, { clubId: this.$route.query.id })
                    }
                    if (!api.options.clubId) {
                        this.$message.error('请先注册场馆信息')
                        return
                    }
                    break
                case 'four':
                    if (!this.$route.query.id) {
                        this.$message.error('请先注册场馆信息')
                        return
                    }
                    let options = { clubId: this.$route.query.id, commission: [] },
                        obj = {}
                    Object.keys(e).forEach((key) => {
                        if (key.indexOf('btn') > -1) {
                            options.commission.push(obj)
                            obj = {}
                            return
                        }
                        obj[key.replace(/[^a-zA-Z]/g, '')] = e[key]
                        obj.clubId = this.$route.query.id
                    })
                    api = {
                        url: `commission/insert`,
                        method: 'post',
                        options: options
                    }
                    break
                default:
                    // console.log('error')
            }
            console.log(api)
            this.service.selectApi(api).then(res => {
                this.loading = false
                if (!res) return
                if (this.currentTag === 'first' && res.data) {
                    router.push({ query: { id: res.data } })
                }
                this.$message.success(res.msg)
            })
        },
        getImg(e) {
            this.filesList = e
        },
        del(e) {
            let k = e.replace(/[^0-9]/g, ''), obj = {}
            Object.keys(this.formRule3).forEach((key) => {
                if (key.indexOf(k) === -1) {
                    obj[key] = this.formRule3[key]
                }
            })
            this.formRule3 = Object.assign({}, obj)
        },
        add(e, i) {
            let now = i === 0 ? '' : e.clubId ? i : Date.now(),
                startPoint = `startPoint${ now }`,
                endPoint = `endPoint${ now }`,
                level = `level${ now }`,
                btn = `btn${ now }`
            this.formRule3 = Object.assign(
                {},
                this.formRule3,
                { [startPoint]: Object.assign({}, this.formRule3.startPoint, { value: String(e.clubId ? e.startPoint : '') }) },
                { [endPoint]: Object.assign({}, this.formRule3.endPoint, { value: String(e.clubId ? e.endPoint : '') }) },
                { [level]: Object.assign({}, this.formRule3.level, { value: String(e.clubId ? e.level : '') }) },
                { [btn]: this.formRule3.btn }
            )
        }
    },
    mounted() {
        this.handleClick()
    }
}
</script>

<style lang="scss">
.line{
    .el-form-item{
        width: 25%;
        &:last-child{
            width: auto;
            display: block;
            margin-left: 100px;
        }
        &:nth-child(4n){
            width: auto;
        }
        &:nth-child(4){
            visibility: hidden;
        }
    }
}
</style>
