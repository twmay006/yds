<template lang="html">
    <!-- 自定义按钮 -->
    <span class="el-customer">
        <template v-if="type == 'payStyle'">
            <el-select
                v-model='payStyle'
                placeholder='支付方式'
                @change="change"
                clearable >
                <el-option v-for='item in clubConstant.PAY_STYLE' :label='item.value' :value='item.key'>
                </el-option>
            </el-select>
        </template>

        <template v-if="type == 'dateRange'">
            <el-date-picker
                v-model="dateRange"
                format="yyyy-MM-dd"
                type="daterange"
                align="right"
                placeholder="选择日期范围"
                :picker-options="pickerOptions"
                @change="change">
            </el-date-picker>
        </template>

        <template v-if="type == 'memberName'">
            <el-autocomplete
                v-model="memberName"
                :fetch-suggestions="querySearchAsync"
                placeholder="姓名"
                icon="close"
                @select="change"
                :on-icon-click="handleIconDelete"
                :props="{ label: 'memberName', value: 'memberName' }"
            ></el-autocomplete>
        </template>

        <template v-if="type == 'valueType'">
            <el-select
                v-model='valueType'
                placeholder='卡类型'
                @change="change"
                clearable >
                <el-option v-for='item in clubConstant.CARD_TYPE' :label='item.value' :value='item.key'>
                </el-option>
            </el-select>
        </template>

        <template v-if="type == 'cardType'">
            <el-select
                v-model='cardType'
                @change="change"
                clearable >
                <el-option v-for='item in ValueType[FormItems.valueType]' :label='item.cardTypeName' :value='item.id'>
                </el-option>
            </el-select>
        </template>

        <template v-if="type == 'autoReadCard'">
            <el-input
              placeholder="会员卡号"
              icon="picture"
              @change="change"
              v-model="autoReadCard"
              :on-icon-click="handleIconRead">
            </el-input>
        </template>

        <template v-if="type == 'salesMan'">
            <el-select
                v-model='salesMan'
                placeholder="销售人员"
                @change="change"
                clearable >
                <el-option v-for='item in salesManArr' :label='item.name' :value='item.id'>
                </el-option>
            </el-select>
        </template>

        <template v-if="type == 'warehouse'">
            <el-select
                v-model='warehouse'
                placeholder="仓库"
                @change="change"
                clearable >
                <el-option v-for='item in warehouseArr' :label='item.warehouseName' :value='item.id'>
                </el-option>
            </el-select>
        </template>

        <template v-if="type == 'paymentMethod'">
            <el-radio-group v-model="paymentMethod"  @change="change">
                <el-radio :label="item.key" v-for='item in clubConstant.PAY_STYLE' >{{ item.value }}</el-radio>
              </el-radio-group>
        </template>

        <!-- 俗称优雅的props双向绑定...  -->
        <input type="text" :value="value" style='display:none;'>

    </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { apiList } from '@/api/'
export default {
    data() {
        return {
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', [start, end])
                    }
                },
                {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        picker.$emit('pick', [start, end])
                    }
                },
                {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        picker.$emit('pick', [start, end])
                    }
                }]
            },
            payStyle: this.value,
            dateRange: this.value,
            memberName: this.value,
            valueType: this.value,
            autoReadCard: this.value,
            cardType: this.value,
            salesMan: this.value,
            paymentMethod: this.value,
            warehouse: this.value,
            clubList: this.value,
            clubConstant: [],
            ValueType: [],
            salesManArr: [],
            warehouseArr: []
        }
    },
    props: {
        value: {},
        type: String,
        startText: {
            type: String,
            default: 'startTime'
        },
        endText: {
            type: String,
            default: 'endTime'
        }
    },
    computed: {
        // ...mapState({
        //     FormItems: state => {
        //         return state.form.FormItems
        //     }
        // })
        ...mapGetters([
            'FormItems'
        ])
    },
    watch: {
        value(val) {
            this[this.type] = val || ''
        },
        dateRange(val) {
            this.$parent.filters[this.startText] = !val[0] ? '' : moment(val[0]).format('YYYY-MM-DD')
            this.$parent.filters[this.endText] = !val[1] ? '' : moment(val[1]).format('YYYY-MM-DD')
        }
    },
    methods: {
        ...mapActions([
            'addFormItems'
        ]),
        change(e) {
            this.addFormItems({ [this.type]: this[this.type] })
            // 特别字段处理处理
            // if (this.type === 'valueType') {
            //     console.log(this.FormItems)
            //     sessionStorage.setItem('variable', this[this.type])
            // }
            // if (['memberName'].indexOf(this.type) > -1) {
            //     this.$emit('input', e[this.type])
            //     return
            // }
            this.$emit('input', this[this.type])
        },
        handleIconDelete(e) {
            this[this.type] = ''
            this.$emit('input', this[this.type])
        },
        handleIconRead() {
            try {
                ydgBridge.openTimer
            }
            catch (e) {
                this.$message.error('请使用壳程序')
                return false
            }
            let rc = { v: 1, ac: 'RC', cardtype: 'MH', data: {} },
                result = JSON.parse(ydgBridge.callPc(JSON.stringify(rc))).data
            // 返回的是一个字符串  ....
            if (!result.cardno && result.cardno !== null && result.cardno !== undefined) {
                this.autoReadCard = result.cardno
                this.$parent.changePg(1)
            }
            else {
                let options = { mcCodeMac: result.pcn }
                apiList.getCodeMacBymcCode(options).then(res => {
                    if (!res) return
                    this.autoReadCard = result.cardno
                    this.$parent.changePg(1)
                })
            }
        },
        querySearchAsync(queryString, cb) {
            let options = { pageIndex: 1, memberName: queryString }
            apiList.member(options).then(res => {
                if (!res) return
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    cb(res.data)
                }, 1000 * Math.random())
            })
        },
        datePickerHandle(e) {
            e = e || ' - '
            let time = e.split(' - ')
            this.$parent.filters.time = time
            this.$parent.filters[this.startText] = time[0]
            this.$parent.filters[this.endText] = time[1]
        },
        getWareHouse() {
            let warehouseArr = JSON.parse(sessionStorage.getItem('warehouseArr'))
            if (warehouseArr) {
                this.warehouseArr = warehouseArr
                return
            }
            apiList.getWareHouse().then(res => {
                if (!res) return
                this.warehouseArr = res.data
                sessionStorage.setItem('warehouseArr', JSON.stringify(res.data))
            })
        },
        getValueType() {
            let ValueType = JSON.parse(sessionStorage.getItem('ValueType'))
            if (ValueType) {
                this.ValueType = ValueType
                return
            }
            apiList.getValueType().then(res => {
                if (!res) return
                this.ValueType = res.data
                sessionStorage.setItem('ValueType', JSON.stringify(res.data))
            })
        },
        getsalemanList() {
            let salesManArr = JSON.parse(sessionStorage.getItem('salesManArr'))
            if (salesManArr) {
                this.salesManArr = salesManArr
                return
            }
            apiList.getsalemanList().then(res => {
                if (!res) return
                this.salesManArr = res.data
                sessionStorage.setItem('salesManArr', JSON.stringify(res.data))
            })
        },
        getClubConstant() {
            let clubConstant = JSON.parse(sessionStorage.getItem('clubConstant'))
            if (clubConstant) {
                this.clubConstant = clubConstant
                return
            }
            apiList.getClubConstant().then(res => {
                if (!res) return
                this.clubConstant = res.data
                sessionStorage.setItem('clubConstant', JSON.stringify(res.data))
            })
        },
        render() {
            switch (this.type) {
                case 'payStyle':
                    this.getClubConstant()
                    break
                case 'valueType':
                    this.getClubConstant()
                    break
                case 'cardType':
                    this.getValueType()
                    break
                case 'salesMan':
                    this.getsalemanList()
                    break
                case 'paymentMethod':
                    this.getClubConstant()
                    break
                case 'warehouse':
                    this.getWareHouse()
                    break
                default:
                    console.log('nothing')
            }
        }
    },
    mounted() {
        this.render()
    }
}
</script>

<style lang="scss" scoped>
.el-date-editor--daterange{
    width: 220px !important;
}
.el-customer{
    display: block;
    &>*{
        width: 100%;
    }
}
</style>
