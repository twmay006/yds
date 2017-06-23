<template lang="html">
	<div id="login-page" @keyup.enter="login">
		<div class="login-form">
			<div class="input-group">
				<div class="title">运动时</div>
				<el-input
				:autofocus="true"
				placeholder="请输入用户名"
				v-model="username">
				</el-input>
			</div>
			<div class="input-group" ref="password">
				<el-input
				type="text"
                @focus="handleFocus"
                placeholder="请输入密码"
				v-model="password">
				</el-input>
			</div>
			<div class="input-group">
				<label>记住我？</label>
				<el-switch
				v-model="rememberMe"
				on-text=""
				off-text="">
				</el-switch>
			</div>
			<div class="input-group">
				<el-button @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import md5 from 'md5'
import { login } from '@/api/'
import waves from '@/utils/cwaves'
// import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            username: '',
            password: '',
            placeholder: '',
            rememberMe: false,
            isBtnLoading: false
        }
    },
    computed: {
        // ...mapGetters([
        //     'items'
        // ]),
        btnText() {
            if (this.isBtnLoading) return '登录中...'
            return '登录'
        }
    },
    methods: {
        // ...mapActions([
        //     'addMenu'
        // ]),
        handleFocus() {
            this.$refs.password.getElementsByClassName('el-input__inner')[0].type = 'password'
            if (this.placeholder) {
                this.password = ''
                this.placeholder = ''
            }
        },
        login() {
            if (!this.username) {
                this.$message.error('请填写用户名！！！')
                return
            }
            if (!this.password) {
                this.$message.error('请填写密码')
                return
            }

            let passwordLenth = this.password.length,
                loginParams = { username: this.username, password: md5(this.password) }

            if (this.placeholder) {
                loginParams.password = this.placeholder
            }

            this.isBtnLoading = true

            login(loginParams).then(res => {
                if (!res) {
                    this.isBtnLoading = false
                    return
                }
                if (this.rememberMe) {
                    let options = Object.assign({}, loginParams, { passwordLenth: passwordLenth })
                    localStorage.setItem('rememberMe', JSON.stringify(options))
                }
                else {
                    localStorage.removeItem('rememberMe')
                }

                let info = res.data

                localStorage.setItem('username', JSON.stringify(info.user))
                localStorage.setItem('permissions', JSON.stringify(info.permissions))
                localStorage.setItem('menus', JSON.stringify(info.menus))

                if (this.$route.query.redirect) {
                    this.$router.push({ path: this.$route.query.redirect })
                }
                else {
                    this.$router.push({ path: '/' })
                }
            })
        }
    },
    mounted() {
        waves.init('login-page')
        let account = JSON.parse(localStorage.getItem('rememberMe'))
        if (account) {
            let placeholder = ''
            for (var i = account.passwordLenth - 1; i >= 0; i--) {
                placeholder += '•'
            }
            this.rememberMe = true
            this.username = account.username
            this.password = placeholder
            this.placeholder = account.password
        }
    },
    beforeDestroy() {
        waves.removeEvent()
    }
}
</script>

<style lang="scss" scoped>
#login-page {
    background-image: linear-gradient(70deg, #2061c2 0, #0d0525 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#2061c2, endColorstr=#0d0525);/*IE<9>*/
    -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#2061c2, endColorstr=#0d0525)";/*IE8+*/
    padding-left: calc(100vw - 100%);
    width: 100%;
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden; /* ie10 会出现问题 */
    .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        text-align: center;
        transform: translate(-50%, -50%);
		width: 500px;
		height: 380px;
		border-radius: 10px;
		background: white;
		border: 1px #eaeaea solid;
	  	.title {
	        color: #20a0ff;
	        font-weight: bold;
	        font-size: 40px;
	        text-align: center;
	        line-height: 2.2;
	        font-family: sans-serif;
	  	}
	  	.input-group {
	        margin: 30px auto 0;
	        width: 80%;
            text-align: left;
	        button {
	      		width: 100%;
	        }
	  	}
    }
}
</style>
