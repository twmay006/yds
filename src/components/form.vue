<template>
    <el-form :ref="name" :inline="inline" :rules="rules" :model="fields" :label-width="width" v-if="flag" @keyup.enter.native="submitForm(name)">
        <item v-for="(value,key,index) in items" :rule-form="fields" :prop="key" :options="value" :index="index">
        </item>
        <el-form-item :class="inline ? 'btn-bar' : ''">
            <slot name='customInput'></slot>
            <el-button type="primary" @click="submitForm(name)" :loading="loading">{{btnText}}</el-button>
            <el-button @click="resetForm(name)">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import Item from './formItems'
import { isEmptyObject, $ } from '../utils/helper.js'

function limit(value) {
    let min = parseInt(value.split('-')[0]),
        max = parseInt(value.split('-')[1]),
        message
    if (min === max) {
        message = `请输入${ min }个字符`
    }
    else if (min && max) {
        message = `请输入${ min }到${ max }个字符`
    }
    else if (min && !max) {
        message = `请输入${ min }个以上字符`
    }
    else if (!min && max) {
        message = `请输入${ max }个以下字符`
    }
    return {
        min: min,
        max: max,
        message: message
    }
}

export default {
    props: {
        name: {
            type: String,
            default: 'form'
        },
        items: Object,
        data: {},
        loading: Boolean,
        inline: Boolean,
        success: Boolean,
        width: {
            type: String,
            default: '120px'
        },
        text: {
            default: '提交'
        }
    },
    data() {
        var validatePass = (rule, value, callback) => {
                if (value !== this.fields.newPassword) {
                    callback(new Error('两次输入密码不一致'))
                }
                else {
                    callback()
                }
            },
            validatePhone = (rule, value, callback) => {
                var reg = /^1\d{10}$/
                if (value && !reg.test(value)) {
                    callback(new Error('手机格式不对'))
                }
                else {
                    callback()
                }
            },
            validateNumber = (rule, value, callback) => {
                var reg = /^\d+(\.\d+)?$/
                if (value && !reg.test(value)) {
                    callback(new Error('只能输入数字'))
                }
                else {
                    callback()
                }
            },
            validateId = (rule, value, callback) => {
                var reg = /^(\d{18}$|^\d{17}(\d|X|x))$/
                if (value && !reg.test(value)) {
                    callback(new Error('身份证格式不对'))
                }
                else {
                    callback()
                }
            },
            validatePost = (rule, value, callback) => {
                var reg = /^[0-9][0-9]{5}$/
                if (value && !reg.test(value)) {
                    callback(new Error('邮政编码格式不对'))
                }
                else {
                    callback()
                }
            },
            validateCn = (rule, value, callback) => {
                var reg = /^[\u4E00-\u9FFF]+$/
                if (value && !reg.test(value)) {
                    callback(new Error('请输入汉字'))
                }
                else {
                    callback()
                }
            },
            validateUrl = (rule, value, callback) => {
                var reg = /((https|http|ftp|rtsp|mms):\/\/)?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)/g
                if (value && !reg.test(value)) {
                    callback(new Error('请输入正确格式域名'))
                }
                else {
                    callback()
                }
            }

        return {
            fields: {},
            rules: {},
            flag: false,
            config: {
                required: {
                    required: true,
                    message: '请输入%'
                },
                object: {
                    type: 'object',
                    message: 'ffff'
                },
                email: {
                    type: 'email',
                    message: '请输入正确的邮箱格式'
                },
                date: {
                    type: 'date',
                    require: true,
                    message: '请选择%'
                },
                array: {
                    type: 'array',
                    required: true,
                    message: '请至少选择一个%'
                },
                selectNum: {
                    required: true,
                    type: 'number',
                    message: '请选择%'
                },
                number: {
                    validator: validateNumber,
                    message: ''
                },
                url: {
                    validator: validateUrl,
                    message: ''
                },
                id: {
                    validator: validateId,
                    message: ''
                },
                post: {
                    validator: validatePost,
                    message: ''
                },
                Cn: {
                    validator: validateCn,
                    message: ''
                },
                phone: {
                    validator: validatePhone,
                    message: ''
                },
                password: {
                    validator: validatePass,
                    message: ''
                }
            }
        }
    },
    computed: {
        btnText() {
            if (this.loading) return `${ this.text }中...`
            return this.text
        },
        demo() {
            if (this.success) {
                this.resetForm(this.name)
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid, e) => {
                if (valid) {
                    this.$emit('on-submit', this.fields)
                }
                else {
                    this.$nextTick(function() {
                        let target = $('is-error')[0],
                            link
                        if (target.className.indexOf('is-error') > -1) {
                            link = document.createElement('a')
                            link.setAttribute('href', `#${ target.id }`)
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                            return
                        }
                    })
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$emit('on-fail', false)
            this.$refs[formName].resetFields()
        },
        render() {
            let fields = {},
                rules = {},
                arr = [],
                reset = {}
            Object.keys(this.items).forEach(k => {
                // fields[k] = this.items[k].value
                fields[k] = this.fields[k] ? this.fields[k] : this.items[k].value
                arr = []
                if (!this.items[k].rules) return
                for (let i = this.items[k].rules.length - 1; i >= 0; i--) {
                    if (this.items[k].rules[i].indexOf('-') > -1) {
                        arr.push(limit(this.items[k].rules[i]))
                    }
                    else {
                        reset = {
                            trigger: this.items[k].type !== 'input' ? 'change' : 'blur',
                            message: this.config[this.items[k].rules[i]].message.replace('%', this.items[k].label)
                        }
                        arr.push(Object.assign({}, this.config[this.items[k].rules[i]], reset))
                    }
                }
                rules[k] = arr
            })
            this.fields = isEmptyObject(this.data) ? this.data : fields
            this.rules = rules
            console.log(this.rules)
            this.flag = true
        }
    },
    components: {
        Item
    },
    watch: {
        items(val) {
            this.render()
        },
        data(val) {
            this.fields = val
        }
    },
    mounted() {
        this.render()
    }
}
</script>

<style lang="scss" scoped>
    .btn-bar{
        display: block !important;
        margin-bottom: 0;
        text-align: right;
    }
</style>
