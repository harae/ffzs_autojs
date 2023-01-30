<template>

	<div>
		<el-image style="width: 100%; z-index:-999;" src="../../static/img/login.png" mode="widthFix"></el-image>
		<div class="bodyauto">
			<div class="topname">
				<div style="width: 80upx;"></div>
				微赞助手
			</div>
			<div class="autoo">
				<div style="height: 70upx;"></div>
				<div class="neirngs">
					<div class="hylogin">
						<p v-if="logintype == true">欢迎登录 </p>
						<p v-else>注册 </p>
					</div>
					<div class="hmylj">
						<p v-if="logintype">
							还没有账号， <p style="color:#4D82FF;" @click="ljzc()"> 立即注册</p>
						</p>
					</div>
					<div class="inpubj">
						<div class="inputnei">
							<div class="jiabal">
								+86
							</div>
							<div style="width: 35upx;">
							</div>
							<input type="number" maxlength="11" v-model="phone" placeholder="请输入手机号">
						</div>
					</div>

					<div class="inpubj">
						<div class="inputnei" v-if="logintype == true && tys == true">
							<input password v-model="mima" maxlength="11" placeholder="请输入密码">
						</div>
						<div class="inputnei" v-if="logintype == false || tys == false">
							<input type="number" v-model="validCode" maxlength="11" placeholder="请输入验证码"
								style=" width: 55%;">
							<div class="yzm" @click="sendSms"> {{ sendContent }} </div>
						</div>
					</div>




					<div class="inpubj" v-if="logintype == false">
						<div class="inputnei">
							<input v-model="password" maxlength="11" placeholder="请输入密码">
						</div>

					</div>

					<div class="inpubj" v-if="logintype == false">
						<div class="inputnei">
							<input type="number" v-model="initCode" maxlength="11" placeholder="请输入邀请码">
						</div>

					</div>





					<div class="denglog" v-if="logintype == true" @click="denglus()">
						<p> 登录</p>

					</div>



					<div class="denglog" v-else @click="dengluzc()">

						<p> 注册</p>
					</div>

					<div class="dxyz">
						<p v-if="tys == true" @click="duanxindenglu()">短信登录</p>
						<p v-else @click="duanxindenglu()"> 账号登录</p>
					</div>

					<div class="yinsixiey">
						<image @click="ysxy()" v-if="ystype == true" style="width:30upx;"
							src="../../static/img/xuanzhong.png" mode="widthFix"></image>
						<image @click="ysxy()" v-if="ystype == false" style="width:30upx;"
							src="../../static/img/wei.png" mode="widthFix"></image>
						<div style="width:20upx;"></div>
						我已阅读并了解
						<p style="color: #4D82FF;"> 《**隐私协议》</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {

			// 密码登录
			mima: '',
			// 邀请码
			initCode: "",
			// 电话
			mobilePhone: "",
			// 密码
			password: "",
			// 验证码
			validCode: "",
			sendContent: '获取验证码',
			smsWait: 0,
			sendClass: false,

			phone: '15127772051',

			// phone: '18333752149',

			// 账号密码登录 还是验证码登录
			tys: true,

			logintype: true,

			// 隐私协议
			ystype: true,

		};
	},
	methods: {


		// 登录
		denglus: function () {
			// 账号密码登录 还是验证码登录
			// tys: true,
			if (this.tys == true) {
				// 账号密码登录

				this.zzyzsjh(this.phone)

				if (this.mima == '') {
					alert("密码为空");
					// uni.showToast({
					// 	icon: 'error',
					// 	title: '密码为空'
					// })
					return
				}


				var data = {
					password: this.mima,
					phone: this.phone
				}


				this.$request({
					url: '/user/login',
					data
				}).then(res => {
					if (res.code == '200') {
						uni.setStorageSync('token', res.data.token);
						uni.showToast({
							title: res.message
						})
						setTimeout(function () {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 1000); //延迟1000毫米
					}
					console.log(res)

				})




			}

			if (this.tys == false) {
				// 还是验证码登录
				this.zzyzsjh(this.phone)


				if (this.validCode == '') {
					alert("验证码为空")
					// uni.showToast({
					// 	icon: 'error',
					// 	title: '验证码为空'
					// })
					return
				}

				var data = {
					validCode: this.validCode,
					phone: this.phone
				}

				this.$request({
					url: '/user/login',
					data
				}).then(res => {

					if (res.code == '200') {
						// uni.setStorageSync('token', res.data.token);
						// uni.showToast({
						// 	title: res.message
						// })
						// setTimeout(function () {
						// 	uni.switchTab({
						// 		url: '/pages/index/index'
						// 	})
						// }, 1000); //延迟1000毫米
					}
					console.log(res)
				})



			}


		},

		// 短信登录
		duanxindenglu: function () {

			this.tys = !this.tys

			if (this.logintype == false) {
				this.logintype = true

			}

		},


		// 短信还是账号登录
		ljzc: function () {

			this.logintype = !this.logintype
			console.log('this.logintype', this.logintype)

		},

		// 是否选中隐私协议
		ysxy: function () {
			this.ystype = !this.ystype
		},


		// 登录 注册接口


		dengluzc: function () {





			// 账号密码
			if (this.logintype) {






			} else {
				// 用户注册
				// 验证码登录
				if (this.validCode == "") {

					// 验证码为空

					uni.showToast({
						icon: 'error',
						title: '验证码为空'
					})

					return
				}
				if (this.password == "") {
					// 密码不能为空

					uni.showToast({
						icon: 'error',
						title: '密码不能为空'
					})
					return
				}




				var data = {
					// 验证码
					initCode: this.initCode,
					// 账号
					mobilePhone: this.phone,
					// 密码
					password: this.password,
					// 邀请码
					validCode: this.validCode
				}


				this.$request({
					url: '/user/register',
					data
				}).then(res => {
					console.log(res)


					if (res.code == 200) {
						uni.showToast({
							// icon: 'error',
							title: res.message
						})
					}
				})
			}
		},

		// 正则验证手机号
		zzyzsjh: function (e) {
			let reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
			if (!reg.test(e)) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的11位手机号'
				})
				return false;
			}
		},

		// 发送验证码
		sendSms() {
			var that = this

			if (that.smsWait !== 0) {


				return false
			}
			console.log(this.phone)
			let reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
			if (!reg.test(this.phone)) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的11位手机号'
				})
				return false;
			}



			var data = {
				phoneNum: this.phone
			}


			this.$request({
				url: '/user/valid_code?phoneNum=' + this.phone,
			}).then(res => {
				console.log(res)


				if (res.code == '200') {
					uni.showToast({
						// icon: 'none',
						title: res.message
					})

				}


			})





			that.smsWait = 60
			that.waitSms()
			that.smsInterval = setInterval(function () {
				that.waitSms()
			}, 1000)
		},



		// 验证码倒计时
		waitSms() {
			var that = this
			that.smsWait--
			var msgBtn = document.querySelector('.msgBtn')
			if (that.smsWait === 0) {
				clearInterval(that.smsInterval)
				that.sendContent = '重新获取'
				that.sendClass = false
				// msgBtn.style.backgroundColor = '#1873f9'
				// msgBtn.style.borderColor = '#1873f9'
				// msgBtn.style.cursor = 'pointer'
			} else {
				that.sendClass = true
				that.sendContent = that.smsWait + '秒后重新获取'
				// msgBtn.style.backgroundColor = '#aecdfa'
				// msgBtn.style.borderColor = '#aecdfa'
				// msgBtn.style.cursor = 'default'
			}
		},



	}
}
</script>

<style>
.bodyauto {
	height: 500upx;
	margin-top: -170upx;
	z-index: 999;
}

.topname {

	display: flex;
	font-size: 46upx;
	font-family: PingFang SC;
	font-weight: 800;
	line-height: 65upx;
	color: #FFFFFF
}

.autoo {
	/* border: 2px solid #000; */
	margin-top: 60upx;
	background: #fff;
	border-radius: 30upx 30upx 0 0;
}

.neirngs {
	width: 85%;
	margin: 0 auto;

}



.hylogin {
	font-size: 46upx;
	font-family: PingFang SC;
	font-weight: 800;
	line-height: 65upx;
	color: #333333;
}

.hmylj {
	color: #9CA4B5;
	margin-top: 50upx;


	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 500;
	height: 42upx;


}

.inpubj {
	width: 100%;

	height: 106upx;
	background: #EFF4F9;
	border-radius: 60upx;
	margin-top: 32upx;
	display: flex;
	align-items: center;
}

.inputnei {
	width: 80%;

	margin: 0 auto;
	display: flex;
	align-items: center;
}


.jiabal {
	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 42upx;
	color: #333333;

}



.denglog {

	display: flex;
	align-items: center;
	justify-content: center;

	background: #4D82FF;
	border-radius: 60upx;

	height: 85upx;
	margin-top: 60upx;


	font-size: 34upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 48upx;
	color: #FFFFFF;
}

.dxyz {
	color: #4D82FF;
	text-align: center;
	margin-top: 36upx;


	font-size: 34upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 48upx;


}

.yinsixiey {
	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 37upx;

	margin-top: 340upx;


	color: #9CA4B5;
}

.yzm {

	font-size: 24upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 33upx;
	color: #4D82FF;
	border: 1upx solid #4D82FF;

	margin-left: auto;
	padding: 11upx 21upx;
	border-radius: 40upx;

}
</style>
