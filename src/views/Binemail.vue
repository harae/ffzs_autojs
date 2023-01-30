<template>
	<view>

<view style="width: 90%; margin: 0 auto; ">
	<view style="height:150rpx;">
		
	</view>
	<view class="inpubj">
		<view class="inputnei">
			<input v-model="email" placeholder="请输入电子邮箱">
		</view>
	</view>
	<view style="height:60rpx;">
		
	</view>
	
	<view class="denglog" @click="bangding()">
	
		<text> 绑定</text>
	</view>
	
</view>
	

	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: ''
			}
		},
		methods: {

			bangding: function() {

				let reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/


				if (reg.test(this.email)) {


				} else {

					uni.showToast({
						icon: 'error',
						title: '请输入正确邮箱地址'
					})


					return
				}




				this.$request({
					url: '/user/email?email=' + this.email,

				}).then(res => {
					if (res.code == '200') {


						uni.showToast({
							title: res.message
						})

					}
					console.log(res)

				})





			},




		},

	}
</script>

<style>
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
</style>
