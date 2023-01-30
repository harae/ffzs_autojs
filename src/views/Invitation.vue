<template>
	<view>
		<view class="top"></view>


		<view class="items" v-for="(item, index) in 5">
			<view style="height: 35upx;"> </view>
			<view class="itemtop">

				<view class="le">
					1555555555
				</view>

				<view class="huiy">
					普通会员
				</view>

			</view>
			<view style="height:25upx;"> </view>


			<view class="itemtop">

				<view class="lefts">
					直推邀请总数：1人
				</view>

				<view class="lefts">
					会员总数：1人
				</view>

			</view>


			<view style="height:20upx;"> </view>
		</view>


	</view>

</template>

<script>
import axios from 'axios';
export default {

	name: "Invitation",
	data() {
		return {

		};
	},
	mounted() {




		axios({
			url: '/user/invitation',
			method: 'GET'

		}).then(res => {

			console.log(res)
			this.const = res.data


		})




	}
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

.le {

	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 42upx;
	color: #333333;

}

.huiy {
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 37upx;
	color: #FFA556;
	margin-left: auto;

}

.lefts {
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 37upx;
	color: #333333;
	width: 50%;
}
</style>
