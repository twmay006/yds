<template lang="html">
    <span class="customerInput">
    <!-- :style="itemStyle(options.wrap, index)" -->
    <!-- options.wrap ? 'margin-right:' + 33.3 * (3 - (index + 1) % 3) + '%' : '' -->

        <!-- 文字说明， 把表单分割成功能块 -->
        <el-tabs v-if="options.message">
            <el-tab-pane :label="options.message"></el-tab-pane>
        </el-tabs>

        <el-form-item :label=" options.type !== 'button' ? options.label : '' " :prop="prop" :required="options.rules ? options.rules[0] == 'required' : false " :id="prop">
            <!-- required 不清楚为何问题. 不自动判断rules是否是必填 -->
            <!-- input类型 -->
            <template v-if="options.type=== 'input' || options.type=== 'textarea' || options.type=== 'password'">
                <el-input
                    :type="options.type"
                    :rows="5"
                    :placeholder="'请输入' + options.label"
                    :disabled="options.disabled"
                    @change="options.func ? options.func(ruleForm[prop]) : ''"
                    v-model="ruleForm[prop]">
                </el-input>
                <span class="tip" v-if="options.tip" >{{ options.tip }}</span>
            </template>
            <!-- end -->

            <!-- select类型 -->
            <template v-if="options.type === 'select'">
                <el-select
                    v-model="ruleForm[prop]"
                    :multiple="options.multiple"
                    :disabled="options.disabled"
                    :placeholder="'请输入' + options.label">
                        <el-option
                            v-for="item in options.options"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                        </el-option>
                </el-select>
                <span class="tip" v-if="options.tip" >{{ options.tip }}</span>
            </template>
            <!-- end -->

            <!-- clubList类型 -->
            <template v-if="options.type === 'clubList'">
                <el-select
                    v-model="ruleForm[prop]"
                    :multiple="options.multiple"
                    :disabled="options.disabled"
                    :placeholder="'请选择' + options.label">
                        <el-option
                            v-for="item in options.options"
                            :label="item.clubName"
                            :value="item.id"
                            :disabled="item.disabled">
                        </el-option>
                </el-select>
                <span class="tip" v-if="options.tip" >{{ options.tip }}</span>
            </template>
            <!-- end -->

            <!-- cascader类型 -->
            <template v-if="options.type === 'cascader'">
                <el-cascader
                :options="options.options"
                v-model="ruleForm[prop]"
                :props="options.props"
                clearable
                change-on-select
                ></el-cascader>
                <span class="tip" v-if="options.tip" >{{ options.tip }}</span>
            </template>
                <!-- @change="options.func(ruleForm[prop])" -->
            <!-- end -->

            <!-- switch类型 -->
            <template v-if="options.type === 'switch'">
                <el-switch
                    v-model="ruleForm[prop]"
                    on-color="#13ce66"
                    off-color="#ff4949">
                </el-switch>
                <span class="tip" v-if="options.tip" >{{ options.tip }}</span>
            </template>
            <!-- end -->

            <!-- datepicker类型,datetime类型 -->
            <template v-if="options.type === 'date' || options.type === 'datetime'">
                <el-date-picker
                    v-model="ruleForm[prop]"
                    :type="options.type"
                    :placeholder="'请输入' + options.label">
                </el-date-picker>
                <span class="tip" v-if="options.tip" >{{ options.tip }}</span>
            </template>
            <!-- end -->

            <!-- checkbox类型 -->
            <template v-if="options.type === 'checkbox'">
                <el-checkbox-group v-model="ruleForm[prop]">
                    <el-checkbox
                        v-for="item in options.options"
                        :disabled="item.disabled"
                        :label="item.value">
                        {{item.label}}
                    </el-checkbox>
                </el-checkbox-group>
                <span class="tip" v-if="options.tip" >{{ options.tip }}</span>
            </template>
            <!-- end -->

            <!-- radio类型 -->
            <template v-if="options.type === 'radio'">
                <el-radio-group
                    v-model="ruleForm[prop]">
                        <el-radio
                            v-for="item in options.options"
                            :disabled="item.disabled"
                            :label="item.value">
                            {{item.label}}
                        </el-radio>
                </el-radio-group>
                <span class="tip" v-if="options.tip" >{{ options.tip }}</span>
            </template>
            <!-- end -->

            <!-- button类型 -->
            <template v-if="options.type === 'button'">
                <el-button
                    :type="options.color"
                    @click="options.func(prop)"
                    >
                    {{ options.label }}
                </el-button>
                <span class="tip" v-if="options.tip" >{{ options.tip }}</span>
            </template>
            <!-- end -->

            <!-- upload类型 -->
            <template v-if="options.type === 'upload'">
                <v-upload
                    v-model="ruleForm[prop]"
                    @imgUrl="options.func"
                    >
                </v-upload>
                <span class="tip" v-if="options.tip" >{{ options.tip }}</span>
            </template>
            <!-- end -->

            <!-- commonItems类型 -->
            <template v-if="options.type === 'commonItems'">
                <v-commonItems
                    :type="options.genre"
                    v-model="ruleForm[prop]"
                >
                </v-commonItems>
                <span class="tip" v-if="options.tip" >{{ options.tip }}</span>
            </template>
            <!-- end -->

        </el-form-item>
    </span>
</template>
<script>
let num = 0
export default {
    props: {
        ruleForm: Object,
        prop: String,
        index: Number,
        options: {
            type: Object,
            default: function() {
                return {
                    type: 'input'
                }
            }
        }
    },
    methods: {
        itemStyle(e, index) {
            console.log(index)
            let i = index + 1 - num
            if (e) {
                let precent = 33.3 * (3 - i % 3)
                num += i // 从头计算
                return !(i % 3) || `margin-right:${ precent }%`
            }
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
.customerInput {
    .el-form-item__content{
        white-space: nowrap;
        >.tip{
            display: inline-block;
            width: 15%;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: middle;
        }
        >*[class^="el-"]{
            width: 85%;
            & + span{
                font-size: 13px;
            }
        }
    }
}
</style>
