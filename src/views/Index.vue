<template>
	<view>
		<view class="top"></view>

		<view style="height: 30upx;">

		</view>
		<view class="nei">
			<view class="toperge">
				<view class="left" @click="navta('false')">
					<view class="left-aut">
						<image class="jticon" src="../../static/img/sp.png" mode="widthFix"></image>
						<view style="width: 15upx;">
						</view>
						<view class="title">
							视频阅读
						</view>
					</view>
					<image v-if="navtap == 'false'" class="leftimgxz" src="../../static/img/xuanjiao.png"
						mode="widthFix"></image>
				</view>

				<view style="width:4%;">

				</view>


				<view class="left" @click="navta('false')">
					<view class="left-aut">
						<image class="jticon" src="../../static/img/wz.png" mode="widthFix"></image>
						<view style="width: 15upx;">
						</view>
						<view class="title">
							文章阅读
						</view>
					</view>
					<image v-if="navtap == 'false'" class="leftimgxz" src="../../static/img/xuanjiao.png"
						mode="widthFix"></image>
				</view>
			</view>

			<view style="height:60upx;"></view>

			<view class="itemdt">
				起始时间~终止时间：
				<picker mode="time" :value="starttime" start="09:01" end="21:01" @change="bindTimeChangestarttime">
					<view class="uni-input" style="width:90upx;">{{ starttime }}</view>
				</picker>

				<view style="text-align: center; width:100upx; ">
					至
				</view>
				<picker mode="time" :value="endtime" start="09:01" end="21:01" @change="bindTimeChangeendtime">
					<view class="uni-input" style="width:90upx;">{{ endtime }}</view>
				</picker>
			</view>
			<view style="height:40upx;"></view>
			<view class="itemdt">
				视频阅读数量：
				<view class="uni-input" style="width:70upx;">
					<input type="number" placeholder="数量" maxlength="4">
				</view>
				<view style="width:10upx;"> </view>
				文章阅读数量：
				<view class="uni-input" style="width:70upx;">
					<input type="number" placeholder="数量" maxlength="4">
				</view>
			</view>

		</view>
		<view style="height:40upx;"></view>
		<view class="top"></view>
		<!-- <view style="height:30upx;"></view> -->
		<view class="itemdt" style="margin-top: 30upx;">
			<view class="leftti">
				<view style="width: 40upx;">
				</view>
				<image style="width:88upx;" src="../../static/img/tx.png" mode="widthFix"></image>
				<view class="xjdk">
					星级多开
				</view>
				<image style="width: 30upx;" src="../../static/img/xuanzhong.png" mode="widthFix"></image>
			</view>
			<view class="leftti" style="justify-content: center;width: 40%;">
				<!-- <view style="width: 40upx;">
				</view> -->
				<view class="xjdk">
					观看赞友
				</view>
				<image style="width: 30upx;" src="../../static/img/xuanzhong.png" mode="widthFix"></image>
			</view>
		</view>




		<view class="itemdt" style="margin-top: 30upx;">
			<view class="leftti">
				<view style="width: 40upx;">
				</view>
				<image style="width:88upx;" src="../../static/img/tx.png" mode="widthFix"></image>
				<view class="xjdk">
					星级多开
				</view>
				<image style="width: 30upx;" src="../../static/img/xuanzhong.png" mode="widthFix"></image>
			</view>
			<view class="leftti" style="justify-content: center;width: 40%;">
				<!-- <view style="width: 40upx;">
				</view> -->
				<view class="xjdk">
					观看赞友
				</view>
				<image style="width: 30upx;" src="../../static/img/xuanzhong.png" mode="widthFix"></image>
			</view>
		</view>


		<view class="itemdt" style="margin-top: 30upx;">
			<view class="leftti">
				<view style="width: 40upx;">
				</view>
				<image style="width:88upx;" src="../../static/img/tx.png" mode="widthFix"></image>
				<view class="xjdk">
					星级多开
				</view>
				<image style="width: 30upx;" src="../../static/img/xuanzhong.png" mode="widthFix"></image>
			</view>
			<view class="leftti" style="justify-content: center;width: 40%;">
				<!-- <view style="width: 40upx;">
				</view> -->
				<view class="xjdk" style="display: flex; align-items: center;">




					<view style="padding: 0 20upx;">
						复刷
					</view>

					<view class="uni-input" style="width:70upx;">
						<input type="number" placeholder="数量" maxlength="4">
					</view>

				</view>
				<image style="width: 30upx;" src="../../static/img/xuanzhong.png" mode="widthFix"></image>
			</view>
		</view>



		<view class="itemdt" style="margin-top: 30upx;">
			<view class="leftti">
				<view style="width: 40upx;">
				</view>
				<image style="width:88upx;" src="../../static/img/tx.png" mode="widthFix"></image>
				<view class="xjdk">
					星级多开
				</view>
				<image style="width: 30upx;" src="../../static/img/xuanzhong.png" mode="widthFix"></image>
			</view>
			<view class="leftti" style="justify-content: center;width: 40%;">
				<!-- <view style="width: 40upx;">
				</view> -->
				<view class="xjdk">
					观看赞友
				</view>
				<image style="width: 30upx;" src="../../static/img/xuanzhong.png" mode="widthFix"></image>
			</view>
		</view>
		<view style="height: 40upx;"></view>
		<view class="top"></view>

		<view class="nei">
			<view class="itamt">
				<image style="width: 30upx;" src="../../static/img/wei.png" mode="widthFix"></image>
				<view class="dingshi">
					定时(时/分)
				</view>
				<view style="width:15upx;"> </view>



				<view class="uni-input" style="width:60upx;">
					<input type="number" placeholder="数量" maxlength="3">
				</view>
				<view style="width:15upx;"> </view>
				<view class="uni-input" style="width:60upx;">
					<input type="number" placeholder="数量" maxlength="3">
				</view>



				<view style="width:30upx;"> </view>
				<view class="antl" @click="zhixing()">
					执行
				</view>
			</view>



			<view class="itamt">
				<view class="botleft">
					阅读等待时间：
				</view>
				<view class="botright">
					<view class="uni-input" style="width:120upx;">
						<input type="number" placeholder="数量" maxlength="3">
					</view>
					<view style="width:30upx;"> </view>
					<view class="antl" @click="yuedumingxi()">
						阅读明细
					</view>
				</view>
			</view>








			<view class="itamt">
				<view class="botleft">
					视频关闭次数：
				</view>
				<view class="botright">
					<view class="uni-input" style="width:120upx;">
						<input type="number" placeholder="次数" maxlength="3">
					</view>
					<view style="width:30upx;"> </view>
					<view class="antl" @click="huanyuanpeizhi()">
						还原配置
					</view>
				</view>
			</view>


			<view class="itamt">
				<view class="botleft">
					连续等待次数：
				</view>
				<view class="botright">
					<view class="uni-input" style="width:120upx;">
						<input type="number" placeholder="次数" maxlength="4">
					</view>
					<view style="width:30upx;"> </view>
					<view class="antl" @click="jianrongpeizhi()">
						兼容配置
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			navtap: 'false',

			starttime: '始',
			endtime: '终'

		}
	},
	onLoad() {

		this.cxappid();


	},
	methods: {


		// 查询appid
		// 

		cxappid: function () {


			this.$request({
				url: '/config/script/default',
				method: 'GET'
			}).then(res => {
				console.log(res)
				debugger
				if (res.code == '200') {


				}


			})


		},




		// 阅读明细
		yuedumingxi: function () {

			uni.navigateTo({
				url: '/pages/details/details'
			})

		},

		// 还原配置
		huanyuanpeizhi: function () {

		},

		// 兼容配置
		jianrongpeizhi: function () {

		},


		// 执行
		zhixing: function () {

			// 执行


		},





		navta: function (e) {

			this.navtap = e

		},


		// 开始时间
		bindTimeChangestarttime: function (e) {

			this.starttime = e.detail.value
		},



		// 结束时间
		bindTimeChangeendtime: function (e) {

			this.endtime = e.detail.value
		},















	}
}
</script>

<style scoped="scoped">
.top {
	height: 20upx;
	background: #F9FAFB;
}

.nei {
	width: 95%;
	margin: 0 auto;
	/* // */
	border: 2px solid red;
}

.jticon {
	width: 55upx;
}

.left {
	width: 48%;
	background: rgba(255, 255, 255, 0.39);
	box-shadow: 0px 0px 12upx rgba(58, 58, 58, 0.1);
	margin: 0 auto;
	border-radius: 15upx;

	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;



}


.toperge {
	display: flex;

}

.left-aut {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 140upx;
}

.leftimgxz {

	width: 80upx;
	position: absolute;
	bottom: 0;
	right: 0;


}


.title {
	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 42upx;
	color: #2B2B2B;

}

.itemdt {
	display: flex;
	align-items: center;
}

.uni-input {

	text-align: center;
	background: #EFF4F9;
	/* // background: rgba(239, 244, 249, 0.39); */
	padding: 17upx 30upx;
	border-radius: 15upx;

	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 42upx;
	color: #9CA4B5;
}

.leftti {
	width: 50%;
	/* // border: 2px solid red; */
	display: flex;
	align-items: center;
}

.xjdk {


	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 42upx;
	color: #333333;

	padding: 10upx 20upx;

}

.itamt {
	height: 142upx;
	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 42upx;
	color: #333333;
	display: flex;
	align-items: center;

	border-bottom: 1upx solid #E4E8EF;

}

.dingshi {
	padding: 0 20upx;
}


.antl {

	background: #4D82FF;
	width: 150upx;

	text-align: center;
	padding: 17upx 30upx;
	border-radius: 15upx;

	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 42upx;
	margin-left: auto;
	color: #FFFFFF;



}

.botleft {
	width: 40%;


}


.botright {
	width: 60%;


	display: flex;
	align-items: center;

	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 42upx;
	color: #333333;

}
</style>
