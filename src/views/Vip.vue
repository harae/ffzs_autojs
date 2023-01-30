<template>
	<view class="container">
		<image class="bg-img" src="../../static/img/vipbj.png"></image>
		<view style="height: 40upx;">
		</view>
		<image class="topimg" src="../../static/img/vipzu.png" mode="widthFix"></image>
		<view class="autls">
			<image style="width: 75upx;"
				src="../../static/img/bb839962c5a0b1fc31eba7eb291dc23b7ed827a37d71-QEtuUM@2x.png" mode="widthFix">
			</image>
			<view style="width: 20upx;">
			</view>
			<view class="name">
				这个人有名字
			</view>
		</view>
		<view style="height:80upx;"></view>
		<view class="content">
			<view style="text-align: center;">
				<view class="wzzs"> 微赞助手 </view>
				<view class="wzzspy"> weizanzhushou</view>
			</view>
		</view>
		<view style="height:110upx;"></view>
		<view class="bottombot">
			<view style="height:31upx;"></view>
			<view class="itaut">
				<image style="width:420upx; margin: 0 auto; z-index: -66; position: fixed;"
					src="../../static/img/vip.png" mode="widthFix"></image>
			</view>
			<view class="itaut" style="align-items: center;margin-top:20upx;">
				<image style="width:76upx;" src="../../static/img/zl.png" mode="widthFix"></image>
				<view style="width: 18upx;"> </view>
				<view class="vipname">
					VIP会员充值包
				</view>
				<view style="width: 18upx;"> </view>
				<image style="width:76upx;" src="../../static/img/zr.png" mode="widthFix"></image>
			</view>
			<view style="height:20upx;"> </view>
			<view class="botimku">

				<!-- listype -->

				<view :class="listype == index ? 'itm' : 'itms'" v-for="(item,index) in list" @click="dianjis(index)">
					<view class="itembot">
						<view class="text">
							{{ item.size }}
						</view>
						<view style="margin-top: 35upx;padding: 5upx;">
							元
						</view>
					</view>
					<view style="height:20upx;"> </view>
					<view class="itmauto">
						<view class="dianxian"></view>
						<view class="viptext">
							vip会员
						</view>
						<view class="dianxian"></view>
					</view>
					<view style="height: 50upx;"> </view>
					<view class="itembotss">
						{{ item.title }}
					</view>
				</view>










			</view>

		</view>

		<view style="height:60upx;"></view>

		<view class="qrxybzf">
			确认协议并支付
		</view>




	</view>
</template>

<script>
export default {
	data() {
		return {

			listype: 0,

			list: [{
				size: '20',
				name: 'vip会员',
				title: '连续包月'
			}, {
				size: '20',
				name: 'vip会员',
				title: '半年包'
			}, {
				size: '20',
				name: 'vip会员',
				title: '一年包'
			}]


		};
	},
	mounted() {


	}, methods: {
		dianjis: function (e) {

			this.listype = e

		}
	}
}
</script>

<style scoped>
.itm {
	width: 93%;
	margin: 0 auto;
	flex: 1;
	height: 335upx;
	background-image: url('../../static/img/vipxz.png');
	background-size: 100% 100%;
	color: #5F3C26;

}


.itmauto {
	display: flex;
	align-items: center;
	margin: 0 auto;
	width: 80%;
}

.dianxian {
	width: 40upx;
	border-bottom: 2upx dashed #C17C51;
	margin-top: 10upx;
}

.viptext {
	padding: 0 10upx;
	font-size: 22upx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 30upx;
	color: #92684D;
}



.itembotss {
	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 42upx;
	color: #5F3C26;
	text-align: center;
}





.itembot .text {

	font-size: 90upx;
	font-family: DIN;
	font-weight: bold;
	line-height: 110upx;
	color: #5F3C26;

}







.itms {
	width: 93%;
	margin: 0 auto;
	flex: 1;
	height: 335upx;
	background-image: url('../../static/img/vipwxz.png');
	background-size: 100% 100%;
	color: #9CA4B5;
}






.itmauto {
	display: flex;
	align-items: center;
	margin: 0 auto;
	width: 80%;
}

.dianxian {
	width: 40upx;
	border-bottom: 2upx dashed #9CA4B5;
	margin-top: 10upx;
}

.viptext {
	padding: 0 10upx;
	font-size: 22upx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 30upx;
	color: #9CA4B5;
}



.itembotss {
	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 42upx;
	color: #9CA4B5;
	text-align: center;
}



.itembot .text {

	font-size: 90upx;
	font-family: DIN;
	font-weight: bold;
	line-height: 110upx;
	color: #9CA4B5;

}









.itembot {
	height: 150upx;
	display: flex;
	align-items: center;
	justify-content: center;

}








.topimg {
	position: fixed;
	width: 100%;
	height: 500upx;
	top: 0;
	left: 0;
	z-index: -9;

}



.container {
	color: #5F3C26;
}



.bg-img {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: -99;

}

.name {

	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 42upx;
}

.autls {
	width: 80%;
	display: flex;
	align-items: center;
	margin: 90upx auto;
	z-index: 99;

}

.wzzs {
	font-size: 34upx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 48upx;
	color: #FDE7C8;
	z-index: 99;
	transform: scale(0.8);
}

.wzzspy {

	font-size: 10upx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 22upx;
	color: #FDE7C8;
	z-index: 99;
	opacity: 0.44;

	margin-top: -10upx;

	/* // transform: scale(0.6); */

	/* // tranform:scale(0.5) */

}


.content {
	display: flex;
	justify-content: center;
	align-items: center;
}

.bottombot {
	/* // border: 2upx solid #B8B8FB; */
	height: 520upx;
	/* // background-color: #151F5F; */



	width: 94%;
	margin: 0 auto;

	background: rgba(21, 31, 95, 0.39);
	border: 2upx solid #B8B8FB;
	box-shadow: 0upx 0upx 16upx #091041;
	/* // opacity: 1; */
	border-radius: 10upx;

}


.qrxybzf {
	width: 95%;
	margin: 0 auto;
	height: 85upx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(180deg, #F5DDB9 0%, #E8BB83 100%);
	opacity: 1;
	border-radius: 20upx;



	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 42upx;
	color: #5F3C26;
}

.itaut {
	display: flex;
	justify-content: center;
}

.vipname {
	font-size: 34upx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 48upx;
	color: #FEE7C8;
}









.botimku {
	display: flex;
}
</style>
