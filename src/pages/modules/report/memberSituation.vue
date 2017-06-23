<template lang='html'>
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class='content-wrapper'>
            <el-tabs v-model='currentTag' type='card' @tab-click='handleClick'>
                <el-tab-pane label='会员' name='first'>

                    <!-- filters start -->
                        <div class='filters'>
                            <div class='tip'>管理中心报表, 分类展示</div>
                        </div>
                    <!-- filters end -->

                    <el-row :gutter='30'>
                        <el-col :span='12'>
                            <div id='sex' class='echarts' style='width:100%; height:400px;'></div>
                        </el-col>
                        <el-col :span='12'>
                            <div id='age' class='echarts' style='width:100%; height:400px;'></div>
                        </el-col>
                        <el-col :span='24'>
                            <div id='source' class='echarts' style='width:100%; height:400px;'></div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label='卡类型' name='second'>
                    <!-- filters start -->
                        <div class='filters'>
                            <div class='filter'>
                                <form @submit.prevent='handleSearch'>
                                    <el-select v-model='cardType' placeholder='卡类型' clearable >
                                        <el-option v-for='item in state1' :label='item.value' :value='item.key'>
                                        </el-option>
                                    </el-select>
                                    <el-button native-type='submit' type='primary' icon='search'>搜索</el-button>
                                </form>
                            </div>
                        </div>
                    <!-- filters end -->
                    <div id='cardCategory' class='echarts' style='width:100%; height:400px;'></div>
                </el-tab-pane>
                <el-tab-pane label='今日办卡' name='third'> </el-tab-pane>
                <el-tab-pane label='办卡月报' name='four'> </el-tab-pane>
                <el-tab-pane label='办卡年报' name='five'> </el-tab-pane>
            </el-tabs>

            <div v-show="['third', 'four', 'five'].indexOf(currentTag) > -1">
                <!-- filters start -->
                    <div class='filters'>
                        <div class='filter'>
                            <form @submit.prevent='handleSearch'>
                                <el-date-picker
                                    v-show="currentTag == 'third'"
                                    v-model="time"
                                    type="date"
                                    @change="pickTime"
                                    placeholder="选择日期"
                                    :disabled='currentTag == "third"'>
                                </el-date-picker>
                                <el-date-picker
                                    v-show="currentTag == 'four'"
                                    v-model="time"
                                    type="month"
                                    @change="pickTime"
                                    placeholder="选择月">
                                  </el-date-picker>
                                  <el-date-picker
                                      v-show="currentTag == 'five'"
                                      v-model="time"
                                      type="year"
                                      @change="pickTime"
                                      placeholder="选择年">
                                    </el-date-picker>
                                <el-button native-type='submit' type='primary' icon='search'>搜索</el-button>
                            </form>
                        </div>
                    </div>
                <!-- filters end -->
                <div id='handleCard' class='echarts' style='width:100%; height:400px;'></div>
            </div>
        </div>
    </div>
</template>

<script>
import { isEmptyObject } from '@/utils/helper'
import echarts from 'echarts'
export default {
    data() {
        return {
            currentTag: 'first',
            data: [],
            data1: [],
            time: moment().format('YYYY-MM-DD'),
            state1: [],
            cardType: 'DATELINE',
            filters: {
                year: '',
                month: '',
                day: ''
            }
        }
    },
    props: ['service'],
    methods: {
        handleClick(tab, event) {
            if (['third', 'four', 'five'].indexOf(tab.name) > -1) {
                this.pickTime(moment().format('YYYY-MM-DD'))
                switch (tab.name) {
                    case 'third':
                        break
                    case 'four':
                        this.filters.day = ''
                        break
                    default:
                        this.filters.day = ''
                        this.filters.month = ''
                        break

                }
                this.render()
            }
            else {
                setTimeout(() => {
                    this.draw(tab.name)
                }, 10)
            }
        },
        pickTime(e) {
            this.time = e
            this.filters = {
                year: e.split('-')[0],
                month: e.split('-')[1],
                day: e.split('-')[2]
            }
        },
        draw(currentTag) {
            let sex,
                sexArray = [],
                age,
                ageArray = ['未知', '年龄段18以下', '年龄段18-29', '年龄段30-39', '年龄段40-49', '年龄段50-59', '年龄段60-69', '年龄段70-79', '年龄段80以上'],
                ageObject = [],
                source,
                cardName = '',
                cardCategory,
                cardCategoryArray = [],
                cardCategoryArray1 = [],
                handleCard,
                handleCardArray = []

            switch (currentTag) {
                case 'first':
                    Object.keys(this.data.sex).forEach(k => {
                        sexArray.push({
                            name: this.data.sex[k]['sex'],
                            value: this.data.sex[k]['point']
                        })
                    })
                    sex = echarts.init(document.getElementById('sex'))
                    sex.setOption({
                        title: {
                            text: '会员男女比例',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: ['男', '女', '不详']
                        },
                        series: [{
                            name: '会员',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        // build a color map as your need.
                                        var colorList = [
                                            '#428ed2', '#ff9797', '#51a737'
                                        ]
                                        return colorList[params.dataIndex]
                                    },
                                    label: {
                                        position: 'inner',
                                        formatter: function(params) {
                                            return `${ (params.percent - 0).toFixed(0) }%(${ params.value })`
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            },
                            data: sexArray
                        }]
                    })

                    Object.keys(this.data.age).forEach(k => {
                        ageObject.push({
                            name: ageArray[k],
                            value: this.data.age[k]
                        })
                    })

                    age = echarts.init(document.getElementById('age'))
                    age.setOption({
                        title: {
                            text: '会员年龄段分析',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: ageArray
                        },
                        series: [{
                            name: '会员年龄',
                            type: 'pie',
                            center: ['50%', '50%'],
                            data: ageObject
                        }]
                    })

                    source = echarts.init(document.getElementById('source'))
                    source.setOption({
                        title: {
                            text: '会员办理来源比例分析',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: ['场馆端', '微信']
                        },
                        series: [{
                            name: '会员年龄',
                            type: 'pie',
                            center: ['50%', '50%'],
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        // build a color map as your need.
                                        var colorList = [
                                            '#bf4853', '#ebc475', '#51a737'
                                        ]
                                        return colorList[params.dataIndex]
                                    }
                                }
                            },
                            data: [
                                { name: '场馆端', value: this.data.cardnum['total'] },
                                { name: '微信', value: this.data.cardnum['wx'] }
                            ]
                        }]
                    })
                    break
                case 'second':
                    for (let i = this.data['cardType'].length - 1; i >= 0; i--) {
                        if (this.data['cardType'][i] === this.cardType) {
                            cardCategoryArray.push(this.data['carddetail'][i])
                            cardCategoryArray1.push(this.data['cardname'][i])
                        }
                    }

                    switch (this.cardType) {
                        case 'CASH':
                            cardName = '金额卡'
                            break
                        case 'NUM':
                            cardName = '次数卡'
                            break
                        case 'DATELINE':
                            cardName = '期限卡'
                            break
                        default:
                            cardName = '未知'
                    }

                    cardCategory = echarts.init(document.getElementById('cardCategory'))
                    cardCategory.setOption({
                        title: {
                            text: `${ cardName }-会员卡种分析`,
                            subtext: `总计: ${ cardCategoryArray.reduce(function(first, second) { return first + second }, 0) }`,
                            x: 'center'
                        },
                        noDataLoadingOption: {
                            text: '暂无数据,请换个时间段试试'
                        },
                        yAxis: {
                            type: 'value'
                        },
                        xAxis: [{
                            type: 'category',
                            data: cardCategoryArray1,
                            axisLabel: {
                                interval: 0,
                                rotate: 45,
                                margin: 10,
                                textStyle: {
                                    color: '#222'
                                }
                            }
                        }],
                        grid: { // 控制图的大小，调整下面这些值就可以，
                            x: 40,
                            x2: 100,
                            y2: 150 // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                        },
                        series: [{
                            name: '销量',
                            type: 'bar',
                            barMaxWidth: 30,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        // build a color map as your need.
                                        var colorList = [
                                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
                                            '#40e0d0', '#cd5c5c'
                                        ]
                                        return colorList[params.dataIndex]
                                    },
                                    label: {
                                        show: true,
                                        position: 'top'
                                    }
                                }
                            },
                            data: cardCategoryArray
                        }]
                    })
                    break
                default:
                    let number = currentTag === 'five' ? 12 : currentTag === 'four' ? moment(this.time).endOf('month').format('D') : 24
                    for (let i = 1; i <= number; i++) {
                        handleCardArray.push(`${ number === 24 ? i - 1 : i }${ number === 24 ? '时' : number === 12 ? '月' : '天' }`)
                    }
                    handleCard = echarts.init(document.getElementById('handleCard'))
                    handleCard.setOption({
                        tooltip: {
                            show: true
                        },
                        noDataLoadingOption: {
                            text: '暂无数据,请换个时间段试试'
                        },
                        legend: {
                            data: ['储值卡', '次数卡', '期限卡', '总计']
                        },
                        xAxis: [{
                            type: 'category',
                            data: handleCardArray
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: [{
                            name: '储值卡',
                            type: 'bar',
                            barMaxWidth: 30,
                            data: this.data1['CASH']
                        }, {
                            name: '次数卡',
                            type: 'bar',
                            barMaxWidth: 30,
                            data: this.data1['NUM']
                        }, {
                            name: '期限卡',
                            type: 'bar',
                            barMaxWidth: 30,
                            data: this.data1['DATELINE']
                        }, {
                            name: '总计',
                            type: 'line',
                            data: this.data1['TOTAL']
                        }]
                    })
                    break
            }
        },
        handleSearch() {
            if (this.currentTag === 'second') {
                this.draw('second')
                return
            }
            this.render()
        },
        getClubConstant() {
            this.service.getClubConstant().then(res => {
                if (!res) return
                this.state1 = res.data.CARD_TYPE
            })
        },
        render1() {
            this.service.getMemberInfo().then(res => {
                if (!res) return
                this.data = res.data
                this.draw(this.currentTag)
            })
        },
        render() {
            let result = isEmptyObject(this.filters)
            this.service.getMemberMonthInfo(result).then(res => {
                if (!res) return
                this.data1 = res.data
                this.draw(this.currentTag)
            })
        }
    },
    mounted() {
        this.render1()
        this.getClubConstant()
    }
}
</script>

<style lang='scss' scoped>
.el-col{
    .echarts{
        border: 1px solid #d1dbe5;
        margin-bottom: 30px;
        box-sizing: border-box;
    }
}
</style>
