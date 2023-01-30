<template>
	<view>
		<view class="top"></view>


		<view class="items" v-for="(item, index) in 5 ">

			<view style="height: 30upx;"> </view>

			<view class="itemtop">
				<view class="itemtext">
					观看赞友
				</view>
				<view class="time">
					10小时52分02秒
				</view>
			</view>

			<view style="height:28upx;"> </view>

			<view class="itemtop">
				<view class="anniu">
					助手

				</view>

				<view class="duok">
					星际多开
				</view>

			</view>

			<view style="height:22upx;"> </view>

		</view>




	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
		};
	}, mounted() {

	},
	onShow() {


		this.$request({
			url: '/script/exec/?pageNum=1&pageSize=1000',
			method: 'GET'
		}).then(res => {
			console.log(res)

			if (res.code == '200') {

				this.list = res.data.rows


				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: res.message
				// 		})

			}


		})



	},

}
</script>

<style scoped="scoped">
.top {
	height: 20upx;
	background: #F9FAFB;
}

.items {
	width: 95%;
	margin: 0 auto;
	border-bottom: 1upx solid #DFE3E8;
}

.itemtop {
	display: flex;
	align-items: center;

}

.time {
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 37upx;
	color: #9CA4B5;
	margin-left: auto;

}

.itemtext {

	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 42upx;
	color: #333333;
}

.anniu {
	background: #4D82FF;

	padding: 6upx 10upx;

	font-size: 24upx;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 33upx;
	color: #FFFFFF;

	border-radius: 10upx;
}

.duok {
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 37upx;
	color: #333333;
	padding: 0 20upx;

}
</style>
