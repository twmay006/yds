<template lang="html">
    <span>
        <el-date-picker  v-model="myResult" format="yyyy-MM-dd" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2" @change="update">
        </el-date-picker>
    </span>
</template>
<script>
export default {
    data() {
        return {
            myResult: this.value,
            pickerOptions2: {
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
            }
        }
    },
    props: {
        value: {},
        startText: {
            type: String,
            default: 'startTime'
        },
        endText: {
            type: String,
            default: 'endTime'
        }
    },
    watch: {
        value(val) {
            this.myResult = val || []
        }
    },
    methods: {
        update(e) {
            e = e || ' - '
            let time = e.split(' - ')
            this.$parent.filters.time = time
            this.$parent.filters[this.startText] = time[0]
            this.$parent.filters[this.endText] = time[1]
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
    .el-date-editor--daterange{
        width: 220px !important;
    }
</style>
