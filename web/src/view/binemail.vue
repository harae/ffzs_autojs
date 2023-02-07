<template>
    <div class="binemail">

        <van-nav-bar title="绑定邮箱" left-arrow @click-left="onClickLeft"  />

        <div style="width: 90%; margin: 0 auto; ">
            <div style="height:75px;">

            </div>
            <div class="inpubj">
                <div class="inputnei">
                    <input style="width:90%;" v-model="email" placeholder="请输入电子邮箱">
                </div>
            </div>
            <div style="height:30px;">

            </div>

            <div class="denglog" @click="bangding()">

                <span> 绑定</span>
            </div>

        </div>


    </div>
</template>



<script>

import { Toast } from 'vant'
import { email } from '../api/home'

export default {
    name: 'binemail',
    data() {
        return {

            email: '',
        }
    },
    methods: {

        onClickLeft() {
            this.$router.go(-1)
        },



        Jumppage: function (e) {

            this.$router.push({
                path: e
            })
        },




        bangding: function () {
            let reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
            if (reg.test(this.email)) {
            } else {
                Toast.fail('请输入正确邮箱地址');
                // uni.showToast({
                // 	icon: 'error',
                // 	title: '请输入正确邮箱地址'
                // })
                return
            }





            var data = {
                email: this.email

            }

            email(data).then(res => {
                if (res.code == 200) {
                    Toast('添加成功');
                }
            })
                .catch(error => {

                    const _this = this
                    if (error.code == 401) {
                        setTimeout(function () {
                            _this.$router.replace("/");
                            // console.log('一秒钟后跳转页面')
                        }, 1000); //延迟1000毫米
                        return
                    } else if (error.code == 435) {
                        debugger
                        setTimeout(function () {
                            _this.$router.replace("/");
                            // console.log('一秒钟后跳转页面')
                        }, 1000); //延迟1000毫米
                        return
                    }
                    console.log(error, "errosr")



                })




            // this.$request({
            // 	url: '/user/email?email=' + this.email,
            // }).then(res => {
            // 	if (res.code == '200') {
            // 		uni.showToast({
            // 			title: res.message
            // 		})
            // 	}
            // 	console.log(res)
            // })



        },





    }


}




</script>


<style lang="less" scoped >
.van-nav-bar {
    background-color: #4D82FF;

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

input {
    outline: none;
    border: none;
    background: none;
    font-size: 16px;
}

.inpubj {
    width: 100%;

    height: 50px;
    background: #EFF4F9;
    border-radius: 30px;
    margin-top: 16px;
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
    border-radius: 30px;
    height: 43px;
    margin-top: 30px;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 24px;
    color: #FFFFFF;
}
</style>