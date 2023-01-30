<template>
	<view>
		<image class="topbj" src="../../static/img/mybj.png" mode="widthFix"></image>
		<view class="auto">
			<view class="auto-top">
				<view style="width:20upx;">
				</view>
				<image class="toux" src="../../static/img/bb839962c5a0b1fc31eba7eb291dc23b7ed827a37d71-QEtuUM@2x.png"
					mode="widthFix"></image>
				<view style="width:20upx;">
				</view>
				<!-- {{status}} -->
				<view class="">
					<view class="auto-name">
						{{ status.userName }}
					</view>
					<view style="height:10upx;">
					</view>
					<view class="auto-text">
						我的个性签名
					</view>
				</view>
			</view>
		</view>
		<view class="aubottom">


			<view class="item">
				<view style="width:20upx;"></view>
				<image class="icon" src="../../static/img/kf.png" mode="widthFix"></image>
				<view style="width:30upx;"></view>
				<view class="bottomright">
					<view class="botumleft  itm">
						客服
					</view>
					<view class="botumauto  itm">
						{{ status.higherUpId }}
					</view>
					<span class="aniu" @click="fuzhi(status.higherUpId)">
						复制
					</span>
				</view>
			</view>

			<view class="item">
				<view style="width:20upx;"></view>
				<image class="icon" src="../../static/img/zh.png" mode="widthFix"></image>
				<view style="width:30upx;"></view>
				<view class="bottomright">
					<view class="botumleft  itm">
						账号
					</view>
					<view class="botumauto  itm">
						{{ status.mobilePhone }}
					</view>
					<span class="aniu" style="background: #fff;">
						复制
					</span>
				</view>
			</view>


			<view class="item">
				<view style="width:20upx;"></view>
				<image class="icon" src="../../static/img/yx.png" mode="widthFix"></image>
				<view style="width:30upx;"></view>
				<view class="bottomright">
					<view class="botumleft  itm">
						邮箱
					</view>
					<view class="botumauto  itm">
						{{ status.customerEmail }}
					</view>
					<span class="aniu" @click="bangding()">
						绑定
					</span>
				</view>
			</view>


			<view class="item">
				<view style="width:20upx;"></view>
				<image class="icon" src="../../static/img/hydq.png" mode="widthFix"></image>
				<view style="width:30upx;"></view>
				<view class="bottomright">
					<view class="botumleft  itm">
						会员到期
					</view>
					<view class="botumauto  itm">
						<!-- 2023-01-30 -->

						{{ getLocalTime(status.membershipExpirationDate) }}

					</view>
					<span class="aniu" @click="xufeivip()">
						续费
					</span>
				</view>
			</view>


			<view class="item">
				<view style="width:20upx;"></view>
				<image class="icon" src="../../static/img/yqwdr.png" mode="widthFix"></image>
				<view style="width:30upx;"></view>
				<view class="bottomright">
					<view class="botumleft  itm">
						邀请我的人
					</view>
					<view class="botumauto  itm">
						{{ status.initCode }}
					</view>
					<span class="aniu" @click="xiaji()">
						下级
					</span>
				</view>
			</view>


			<view class="item">
				<view style="width:20upx;"></view>
				<image class="icon" src="../../static/img/yqlj.png" mode="widthFix"></image>
				<view style="width:30upx;"></view>
				<view class="bottomright">
					<view class="botumleft  itm">
						邀请链接
					</view>
					<view class="botumauto  itm">
						{{ status.initCode }}
					</view>
					<span class="aniu" @click="fuzhi(status.initCode)">
						复制
					</span>
				</view>
			</view>





		</view>
	</view>
</template>

<script>
export default {
	data() {

		return {
			status: {},

		};
	},

	onShow() {

		this.$request({
			url: '/user',
			method: 'GET'

		}).then(res => {

			console.log(res)
			this.status = res.data



		})


	},

	mounted() {






		// this.$request({
		// 	url: '/user/login',
		// 	data
		// }).then(res => {

	},

	methods: {

		// 绑定邮箱
		bangding: function () {
			uni.navigateTo({
				url: '/pages/binemail/binemail'
			})

		},



		xufeivip: function () {

			uni.navigateTo({
				url: '/pages/vip/vip'
			})


		},

		// 解析时间戳
		getLocalTime: function (nS) {
			return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
		},






		// 复制
		fuzhi: function (value) {

			uni.setClipboardData({
				data: value,
				success(res) {
					console.log('复制成功', res)
				}
			})

		},

		// 下级
		xiaji: function () {

			uni.navigateTo({
				url: '/pages/invitation/invitation'
			})

		}


	}
}
</script>

<style scoped="scoped">
.topbj {
	width: 100%;
	z-index: -999;
}

.auto {

	width: 100%;
	margin: 0 auto;
	height: 280upx;
	margin-top: -300upx;
	z-index: 999;
}


.toux {
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
}

.auto-top {
	display: flex;
	align-items: center;
	color: #fff;
}

.auto-name {
	font-size: 34upx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 48upx;
}

.auto-text {
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 37upx;
}



.aubottom {
	width: 100%;
	height: 300upx;
	margin-top: -100upx;
	background: #fff;
	border-radius: 30upx 30upx 0 0;
}


.item {

	display: flex;
	height: 120upx;
	align-items: center;
}

.icon {
	width: 40upx;
}

.botumleft {

	font-size: 32upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 42upx;
	color: #333333;

}



.bottomright {
	display: flex;
	align-items: center;
	width: 85%;
	height: 80upx;
	border-bottom: 1upx solid #ECEEF1;
}

.aniu {
	background: #4D82FF;
	border-radius: 20upx;
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 37upx;
	padding: 12upx 32upx;
	color: #FFFFFF;
}

.botumauto {

	font-size: 28upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 37upx;
	color: #9CA4B5;

}



.itm {
	flex: 1;

}
</style>
