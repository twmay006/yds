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
            <div class="col-33">
                <v-form name="form" @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule" :data="data"  :loading="loading" >
                </v-form>
            </div>

        </div>
    </div>
</template>

<script>
// import { isEmptyObject, bindFilter } from '@/utils/helper'
export default {
    data() {
        return {
            data: {
                // sal: 50293
            },
            loading: false,
            formRule: {
                memberName: {
                    type: 'input',
                    label: '姓名',
                    message: '会员资料',
                    value: '',
                    rules: ['required']
                },
                phone: {
                    type: 'input',
                    label: '手机',
                    rules: ['required']
                },
                sex: {
                    type: 'input',
                    label: '性别',
                    rules: ['required']
                },
                mail: {
                    type: 'input',
                    label: '邮箱',
                    rules: ['required']
                },
                cardId: {
                    type: 'input',
                    label: '身份证',
                    rules: ['required']
                },
                birthday: {
                    type: 'input',
                    label: '出生日期',
                    rules: ['required']
                },
                wxNick: {
                    type: 'input',
                    label: '微信昵称',
                    rules: ['required']
                },
                weixinBind: {
                    type: 'input',
                    label: '微信绑定',
                    rules: ['required']
                },
                promptMessage: {
                    type: 'input',
                    label: '提醒信息',
                    rules: ['required']
                },
                passwd: {
                    type: 'input',
                    label: '消费密码',
                    rules: ['required']
                },
                remarks: {
                    type: 'input',
                    label: '备注',
                    wrap: true, // 换行, 下下策
                    rules: ['required']
                },
                mcCode: {
                    type: 'input',
                    label: '会员卡号',
                    message: '会员卡资料',
                    rules: ['required']
                },
                mcCodeMac: {
                    type: 'input',
                    label: '物理卡号',
                    rules: ['required']
                },
                mcCodeVirtual: {
                    type: 'input',
                    label: '虚拟卡号',
                    rules: ['required']
                },
                cardType: {
                    type: 'commonItems',
                    genre: 'valueType',
                    label: '储值类型',
                    rules: ['required']
                },
                cardTypeId: {
                    type: 'commonItems',
                    genre: 'cardType',
                    label: '卡类型',
                    wrap: true, // 换行, 下下策
                    rules: ['selectNum']
                },
                billMoney: {
                    type: 'input',
                    message: '支付信息',
                    label: '支付金额',
                    // wrap: true, // 换行, 下下策
                    rules: ['required', 'number']
                },
                payCode: {
                    type: 'commonItems',
                    genre: 'paymentMethod',
                    label: '支付方式',
                    // wrap: true, // 换行, 下下策
                    rules: ['required']
                },
                sal: {
                    type: 'commonItems',
                    genre: 'salesMan',
                    label: '销售员',
                    message: '其他信息',
                    rules: ['selectNum']
                }
            }
        }
    },
    props: ['service'],
    methods: {
        onSubmit(e) {

        },
        render() {

        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
.col-33{
    .el-form{
        >.customerInput{
            display: inline-block;
            overflow: hidden;
            width: 33.3%;
            &:nth-last-of-type(2){
                display: block;
                width: 100%;
            }
        }
    }
}
</style>
