<template>
	<div class="container">

		<van-nav-bar title="续费会员" left-arrow @click-left="onClickLeft" />


		<img class="bg-img" src="../assets/img/vipbj.png" alt="">


		<div style="height: 20px;">
		</div>


		<img class="topimg" src="../assets/img/vipzu.png" alt="">



		<div class="autls">


			<img style="width:37px;" src="../assets/img/bb839962c5a0b1fc31eba7eb291dc23b7ed827a37d71-QEtuUM@2x.png"
				alt="">

			<div style="width:10px;">
			</div>
			<div class="name">
				这个人有名字
			</div>
		</div>
		<div style="height:40px;"></div>
		<div class="content">
			<div style="text-align: center;">
				<div class="wzzs"> 微赞助手 </div>
				<div class="wzzspy"> weizanzhushou</div>
			</div>
		</div>
		<div style="height:75px;"></div>
		<div class="bottombot">
			<div style="height:15px;"></div>
			<div class="itaut">


				<img style="width:420px; margin: 0 auto; z-index: -66; position: fixed;" src="../assets/img/vip.png"
					alt="">

			</div>
			<div class="itaut" style="align-items: center;margin-top:10px;">

				<img style="width:38px;" src="../assets/img/zl.png" alt="">
				<div style="width:9px;"> </div>
				<div class="vipname">
					VIP会员充值包
				</div>
				<div style="width: 9px;"> </div>



				<img style="width:38px;" src="../assets/img/zr.png" alt="">
			</div>
			<div style="height:10px;"> </div>
			<div class="botimku">

				<!-- listype -->

				<div :class="listype == index ? 'itm' : 'itms'" v-for="(item, index) in list" @click="dianjis(index)">
					<div class="itembot">
						<div class="text">
							{{ item.size }}
						</div>
						<div style="margin-top:17px;padding:2.5px;">
							元
						</div>
					</div>
					<div style="height:10px;"> </div>
					<div class="itmauto">
						<div class="dianxian"></div>
						<div class="viptext">
							vip会员
						</div>
						<div class="dianxian"></div>
					</div>
					<div style="height:20px;"> </div>
					<div class="itembotss">
						{{ item.title }}
					</div>
				</div>
			</div>
		</div>

		<div style="height:30px;"></div>

		<div class="qrxybzf" @click='pay'>
			确认协议并支付
		</div>
	</div>
</template>



<script>

import { Toast } from 'vant'
import { order } from '../api/home'

export default {
	name: 'vip',
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
			}],
		}
	},
	methods: {


		onClickLeft() {
			this.$router.go(-1)
		},


		Jumppage: function (e) {
			// debugger
			this.$router.push({
				path: e
			})
		},


		dianjis: function (e) {

			this.listype = e

		},

		pay: async function () {
			try {
				const res = await order({
					"paymentMethod": "支付宝",
					"productId": 1,
				})
				console.log(1, res)
				const data = res.data || {}
				const payInfo = data.payInfo || ""
				this.submitPay(payInfo)
			} catch (error) {
				console.warn(2, error)
			}
		},

		submitPay(formHtml){
			const divForm = document.createElement("divForm")
			divForm.innerHTML = formHtml
			document.body.appendChild(divForm)
			document.forms[0].submit()
		}

	}


}




</script>


<style lang="less" scoped >
.van-nav-bar {
	background-color: rgb(23, 34, 104);

}

/deep/ .van-nav-bar__title {
	color: white;
	font-weight: 600;
	font-size: 18px;
	//   font-size: 0.45rem;
}

/deep/ .van-icon {
	color: white;
}


.itm {
	width: 93%;
	margin: 0 auto;
	flex: 1;
	height: 167.5px;
	background-image: url('../assets/img/vipxz.png');
	background-size: 100% 100%;
	color: #5F3C26;




	.itmauto {
		display: flex;
		align-items: center;
		margin: 0 auto;
		width: 80%;

		.dianxian {
			width: 20px;
			border-bottom: 1px dashed #C17C51;
			margin-top: 5px;
		}

		.viptext {
			padding: 0 5px;
			font-size: 11px;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 15px;
			color: #92684D;
		}

	}

	.itembotss {
		font-size: 15px;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 21px;
		color: #5F3C26;
		text-align: center;
	}





	.itembot .text {

		font-size: 45px;
		font-family: DIN;
		font-weight: bold;
		line-height: 55px;
		color: #5F3C26;

	}




}


.itms {
	width: 93%;
	margin: 0 auto;
	flex: 1;
	height: 167.5px;
	background-image: url('../assets/img/vipwxz.png');
	background-size: 100% 100%;
	color: #9CA4B5;






	.itmauto {
		display: flex;
		align-items: center;
		margin: 0 auto;
		width: 80%;

		.dianxian {
			width: 20px;
			border-bottom: 1px dashed #9CA4B5;
			margin-top: 5px;
		}

		.viptext {
			padding: 0 5px;
			font-size: 11px;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 15px;
			color: #9CA4B5;
		}

	}

	.itembotss {
		font-size: 15px;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 21px;
		color: #9CA4B5;
		text-align: center;
	}



	.itembot .text {

		font-size: 45px;
		font-family: DIN;
		font-weight: bold;
		line-height: 55px;
		color: #9CA4B5;

	}


}






.itembot {
	height: 75px;
	display: flex;
	align-items: center;
	justify-content: center;

}








.topimg {
	position: fixed;
	width: 100%;
	height: 250px;
	// top: 0;
	// left: 0;
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

	font-size: 15px;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 21px;
}

.autls {
	width: 80%;
	display: flex;
	align-items: center;
	margin: 45px auto;
	z-index: 99;

}

.wzzs {
	font-size: 17px;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 24px;
	color: #FDE7C8;
	z-index: 99;
	transform: scale(0.8);
}

.wzzspy {

	font-size: 5px;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 11px;
	color: #FDE7C8;
	z-index: 99;
	opacity: 0.44;

	margin-top: -5px;

	// transform: scale(0.6);

	// tranform:scale(0.5)

}


.content {
	display: flex;
	justify-content: center;
	align-items: center;
}

.bottombot {
	// border: 2px solid #B8B8FB;
	height: 260px;
	// background-color: #151F5F;



	width: 94%;
	margin: 0 auto;

	background: rgba(21, 31, 95, 0.39);
	border: 2px solid #B8B8FB;
	box-shadow: 0px 0px 8px #091041;
	// opacity: 1;
	border-radius: 5px;

}


.qrxybzf {
	width: 95%;
	margin: 0 auto;
	height: 42.5px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(180deg, #F5DDB9 0%, #E8BB83 100%);
	opacity: 1;
	border-radius: 10px;



	font-size: 15px;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 21px;
	color: #5F3C26;
}

.itaut {
	display: flex;
	justify-content: center;
}

.vipname {
	font-size: 17px;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 24px;
	color: #FEE7C8;
}









.botimku {
	display: flex;
}
</style>