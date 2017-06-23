<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <!-- filters start -->
            <div class='filters'>
                <div class="tip">管理中心报表, 分类展示</div>
                <!-- <el-button type="primary" @click="login()">登录</el-button> -->
            </div>
            <!-- filters end -->

            <el-row :gutter="30" class="report_list" >
              <el-col :span="5" v-for="item in category" >
                <div>
                    <p>{{ item.name }}</p>
                    <ul>
                        <li v-for="child in item.value">
                            <i class="el-icon-d-arrow-right"></i>
                            <router-link :to="{ path: child.path }">{{ child.name }}</router-link>
                        </li>
                    </ul>
                </div>
              </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: [
                { name: '财务分析', key: 'finance', value: [] },
                { name: '经营汇总', key: 'business', value: [] },
                { name: '会员业务', key: 'member', value: [] }
            ],
            reportType: []
        }
    },
    props: ['service'],
    methods: {
        render() {
            let target = this.reportType[0].children,
                index
            Object.keys(target).forEach(k => {
                if (target[k].meta && target[k].meta.type) {
                    this.category.filter(x => {
                        if (x.key === target[k].meta.type) {
                            index = this.category.indexOf(x)
                            this.category[index].value.push(target[k])
                            return
                        }
                    })
                }
            })
        }
    },
    mounted() {
        this.reportType = this.$router.options.routes.filter(x => { return x.path === '/report' })
        this.render()
    }
}
</script>

<style lang="scss" scoped>
.report_list{
    >.el-col{
        div{
            height: 300px;
            overflow-y: auto;
            overflow-x: hidden;
            border: 1px solid #d1dbe5;
            border-radius: 4px;
            p{
                font-size: 20px;
                padding-left: 10px;
            }
            ul{
                padding: 0;
                li{
                    position: relative;
                    border: 1px solid #d1dbe5;
                    list-style: none;
                    margin: 0 -1px -1px -1px;
                    &:hover{
                        background: #eef1f6
                    }
                    i{
                        position: absolute;
                        right: 10px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    a{
                        display: block;
                        padding: 10px 30px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
            }

        }
    }
}
</style>
