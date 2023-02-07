<template>
	<div class="invitation">

		<van-nav-bar title="我的邀请" left-arrow @click-left="onClickLeft" />
		<div style="height:45px;"></div>

		<div class="top"></div>


		<div class="items" v-for="(item, index) in list">
			<div style="height:17px;"> </div>
			<div class="itemtop">

				<div class="le">
					1555555555
				</div>

				<div class="huiy">
					普通会员
				</div>

			</div>
			<div style="height:13px;"> </div>


			<div class="itemtop">

				<div class="lefts">
					直推邀请总数：1人
				</div>

				<div class="lefts">
					会员总数：1人
				</div>

			</div>


			<div style="height:10px;"> </div>
		</div>





	</div>
</template>



<script>

import { Toast } from 'vant'
import { invitation } from '../api/home'

export default {
	name: 'invitation',
	data() {
		return {


		}
	},
	created(){
// debugger
this.cx()
	},
	methods: {

		onClickLeft() {
			this.$router.go(-1)
		},




		cx: function () {


			var data = {}
			invitation(data).then(res => {
				if (res.code == 200) {
					this.list = res.data
				}
			}).catch(error => {
				const _this = this
				if (error.code == 401) {
					setTimeout(function () {
						_this.$router.replace("/");
						// console.log('一秒钟后跳转页面')
					}, 1000); //延迟1000毫米
					return
				} else if (error.code == 435) {
					// debugger
					setTimeout(function () {
						_this.$router.replace("/");
						// console.log('一秒钟后跳转页面')
					}, 1000); //延迟1000毫米
					return
				}
				console.log(error, "errosr")
			})


		},





		Jumppage: function (e) {
			// debugger
			this.$router.push({
				path: e
			})
		},




	}


}




</script>


<style lang="less" scoped >
.van-nav-bar {

	position: fixed;
	width: 100%;


}

/deep/ .van-nav-bar__title {

	font-weight: 550;
	font-size: 18px;
	//   font-size: 0.45rem;
}

/deep/ .van-icon {
	color: #666;
}



.top {
	height: 10px;
	background: #F9FAFB;
}

.items {
	width: 95%;
	margin: 0 auto;
	border-bottom: 1px solid #DFE3E8;
}

.itemtop {
	display: flex;
	align-items: center;

}

.le {

	font-size: 15px;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 21px;
	color: #333333;

}

.huiy {
	font-size: 13px;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 18px;
	color: #FFA556;
	margin-left: auto;

}

.lefts {
	font-size: 13px;
	font-family: PingFang SC;
	font-weight: 500;
	line-height: 18px;
	color: #333333;
	width: 50%;
}
</style>