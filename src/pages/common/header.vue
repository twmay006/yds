<template>
    <header class="db-header">
        <el-row class="container">
            <el-col :span="24" class="header">
                <el-col :span="10" class="logo" :class="siderState ? 'logo-collapse-width' : 'logo-width'">
                    <el-tooltip class="item" :disabled="!siderState" effect="light" content="运动时" placement="right">
                        <router-link :to="{path: '/'}">运动时</router-link>
                    </el-tooltip>
                </el-col>
                <el-col :span="4">
                    <span class="tools" @click.prevent="collapse">
                        <i class="fa fa-bars"></i>
                    </span>
                    <span class="tools">
                        <v-screenfull></v-screenfull>
                    </span>
                </el-col>
                <el-col :span="10" class="userInfo">
                    <span>{{ time }}</span>
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link userInfo-inner">
                            <img src="../../assets/images/yds.png">{{user ? user.username : ''}}
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="dialogFormPw = true" >修改密码</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-col>
        </el-row>

        <el-dialog title="修改密码" v-model="dialogFormPw" :modal="false">
            <v-form ref="form" name="form" @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule" :data="data" text="修改">
            </v-form>
        </el-dialog>
     </header>
</template>


<script>
    import { mapActions, mapGetters } from 'vuex'
    import { logout, changePwd } from '@/api/'
    import md5 from 'md5'
    export default {
        data() {
            return {
                user: '',
                time: '',
                dialogFormPw: false,
                data: {},
                formRule: {
                    oldPassword: {
                        type: 'password',
                        label: '旧密码',
                        value: '',
                        rules: ['required']
                    },
                    newPassword: {
                        type: 'password',
                        label: '新密码',
                        value: '',
                        rules: ['required']
                    },
                    confirmPassowrd: {
                        type: 'password',
                        label: '确认密码',
                        value: '',
                        rules: ['required', 'password']
                    }
                }
            }
        },
        computed: {
            ...mapGetters([
                'siderState'
            ]),
            btnText() {
                if (this.isBtnLoading) return '修改中...'
                return '确定'
            }
        },
        created() {
            this.user = JSON.parse(localStorage.getItem('username'))
        },
        methods: {
            ...mapActions([
                'changeState'
            ]),
            logout() {
                this.$confirm('确定要注销吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    logout().then(res => {
                        localStorage.removeItem('username')
                        // localStorage.removeItem('permission')
                        this.$router.push({ path: '/login', query: { redirect: this.$route.path } })
                    })
                }).catch(() => {})
            },
            onSubmit(e) {
                if (!e) {
                    this.loading = false
                    return
                }
                this.loading = true
                let options = { oldPassword: md5(e.oldPassword), newPassword: md5(e.newPassword) }
                changePwd(options).then(res => {
                    this.loading = false
                    this.dialogFormPw = false
                    this.$refs.form.resetForm('form')
                    if (!res) {
                        return
                    }
                    this.$message.success(res.msg)
                })
            },
            // 折叠导航栏
            collapse() {
                this.changeState(!this.siderState)
            },
            now() {
                this.time = moment().format('YYYY-MM-DD HH:mm:ss dddd')
            }
        },
        mounted() {
            this.now() // 初始时会有一秒空白...
            setInterval(() => { this.now() }, 1000)
        }
    }
</script>

<style lang="scss">
.db-header{
    z-index: 99;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    .header {
        height: 60px;
        line-height: 60px;
        background: #20A0FF;
        color:#fff;
        overflow: hidden;
        .userInfo {
            & >span{
                padding-right: 20px;
                &+div{
                    padding-right: 35px;
                }
            }
            white-space:nowrap;
            overflow: hidden;
            text-align: right;
            float: right;
            .userInfo-inner {
                cursor: pointer;
                color:#fff;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
        .logo {
            text-align: center;
            height:60px;
            border-color: rgba(238,241,146,0.3);
            border-right-width: 1px;
            border-right-style: solid;
            font-size: 2.1rem;
            img {
                width: 40px;
                float: left;
                margin: 10px 10px 10px 18px;
            }
            .txt {
                color:#fff;
            }
        }
        .logo-width{
            width:230px;
        }
        .logo-collapse-width{
            width:60px;
            white-space: nowrap;
            color: transparent;
            a{
                display: block;
            }
        }
        .tools{
            float: left;
            font-size: 2.4rem;
            padding: 0px 23px;
            width:14px;
            height: 60px;
            line-height: 60px;
            vertical-align: top;
            cursor: pointer;
            position: relative;
            &:first-child{
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;
            }
        }
    }
}
</style>
