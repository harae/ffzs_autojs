<template>
	<view>
		<view class="top"></view>

		<view class="box" v-for="(item, index) in list">
			<div style="width:17%;display: flex;">
				<image class="icon" src="../../static/img/1.png" mode="widthFix"></image>
				<div class="dian"></div>
			</div>
			<view style="width:80%;">
				<view class="title">
					这里是是来自系统提示的消息
				</view>

				<view style="height:10upx;">

				</view>

				<view class="contenttext">
					这里是是来自系统提示的消息这里是是来自系统提示的消息这里是是来自系统提示的消息最多两行最多两行最多两行最多
				</view>

			</view>

		</view>



	</view>
</template>

<script>
export default {
	data() {
		return {

			list: [{}, {}, {}],


		};
	},
	onLoad() {

	},
	methods: {

	}
}
</script>

<style scoped="scoped">
.top {
	height: 20upx;
	background: #F9FAFB;
}

.box {
	width: 95%;
	height: 170upx;
	margin: 0 auto;
	border-bottom: 1upx solid #DFE3E8;
	display: flex;
	align-items: center;
}

.dian {
	width: 20upx;
	height: 20upx;
	background: red;
	border-radius: 50%;
	margin-left: -30upx;
	z-index: 999;
}


.icon {
	width: 98upx;
	height: 98upx;

}

.title {
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 42upx;
	color: #333333;
}

.contenttext {
	font-size: 24upx;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 33upx;
	color: #9CA4B5;

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;


}
</style>
