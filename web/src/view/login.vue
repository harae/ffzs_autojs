<template>
  <div class="hello">

    <img style="width: 100%; height:195px; z-index:-999; " src="../assets/img/login.png" alt="">
    <div class="bodyauto">
      <div class="topname">
        <div style="width:40px;"></div>
        微赞助手
      </div>



      <div class="autoo">
        <div style="height: 35px;"></div>
        <div class="neirngs">
          <div class="hylogin">

            <div v-if="logintype == true">欢迎登录</div>
            <!-- <div v-if="logintype == true">欢迎登录 </div> -->
            <div v-else>注册 </div>
          </div>
          <div class="hmylj">
            <div v-if="logintype" style="display: flex;">
              还没有账号， <div style="color:#4D82FF;" @click="ljzc()"> 立即注册</div>
            </div>
          </div>
          <div class="inpubj">
            <div class="inputnei">
              <div class="jiabal">
                +86
              </div>
              <div style="width:18px;">
              </div>
              <input type="number" maxlength="11" v-model="phone" placeholder="请输入手机号">
            </div>
          </div>

          <div class="inpubj">
            <div class="inputnei" v-if="logintype == true && tys == true">
              <input type="password" v-model="mima" maxlength="11" placeholder="请输入密码">
            </div>
            <div class="inputnei" v-if="logintype == false || tys == false">

              <input type="number" v-model="validCode" maxlength="11" placeholder="请输入验证码" style=" width: 55%;">
              <div class="yzm" @click="sendSms"> {{ sendContent }} </div>
            </div>
          </div>




          <div class="inpubj" v-if="logintype == false">
            <div class="inputnei">
              <input v-model="password" type="password" maxlength="11" placeholder="请输入密码">
            </div>

          </div>

          <div class="inpubj" v-if="logintype == false">
            <div class="inputnei">
              <input type="number" v-model="initCode" maxlength="11" placeholder="请输入邀请码">
            </div>

          </div>











          <div class="denglog" v-if="logintype == true" @click="denglus()">
            <div> 登录</div>

          </div>



          <div class="denglog" v-else @click="dengluzc()">

            <div> 注册</div>
          </div>

          <div class="dxyz">
            <div v-if="tys == true" @click="duanxindenglu()">短信登录</div>
            <div v-else @click="duanxindenglu()"> 账号登录</div>
          </div>





          <div class="yinsixiey">

            <img style="width:15px;" @click="ysxy()" v-if="ystype == true" src="../assets/img/xuanzhong.png" alt="">

            <img style="width:15px;" @click="ysxy()" v-if="ystype == false" src="../assets/img/wei.png" alt="">
            <div style="width:10px;"></div>

            我已阅读并了解
            <div style="color: #4D82FF;"> 《**隐私协议》</div>
          </div>


        </div>
      </div>
    </div>





    1212
  </div>
</template>

<script>

import { Toast } from 'vant'

import { logins, valid_code, register } from '../api/home'

export default {
  name: 'login',
  data() {
    return {

      // 密码登录
      mima: 'hzj123456',
      // 邀请码
      initCode: "",
      // 电话
      mobilePhone: "",
      // 密码
      password: "",
      // 验证码
      validCode: "",


      sendContent: '获取验证码',
      smsWait: 0,
      sendClass: false,

      phone: '18035918371',

      // phone: '18333752149',

      // 账号密码登录 还是验证码登录
      tys: true,

      logintype: true,

      // 隐私协议
      ystype: true,


    }
  },



  methods: {



    // 统一跳转页面
    // 跳转
    Jumppage: function (e) {

      this.$router.push({
        path: e
      })
    },
    // 登录
    denglus: function () {
      // 账号密码登录 还是验证码登录
      // tys: true,
      if (this.tys == true) {
        // 账号密码登录
        this.zzyzsjh(this.phone)
        if (this.mima == '') {
          Toast.fail('密码为空');
          return
        }
        var data = {
          password: this.mima,
          phone: this.phone
        }
        logins(data).then(res => {
          if (res.code == 200) {
            Toast.success(res.message)
            const token = res.data.token
            window.userToken = token
            localStorage.setItem('token', res.data.token);
            initAutoJs()
            setTimeout(() => {
              // 跳转首页
              this.Jumppage('/my')
            }, 1000)
          }
        })
          .catch(error => {
            console.log(error, "errosr")
          })

      }

      if (this.tys == false) {
        // 还是验证码登录
        this.zzyzsjh(this.phone)
        if (this.validCode == '') {
          Toast.fail('验证码为空');
          return
        }

        var data = {
          validCode: this.validCode,
          phone: this.phone
        }



        // localStorage.setItem('token', '666666666666');
        // Toast('登录成功');
        // setTimeout(function () {
        //   // uni.switchTab({
        //   //   url: '/pages/index/index'
        //   // })
        //   console.log('跳转首页')
        // }, 1000); //延迟1000毫米
        // localStorage.setItem('myCat', 'Tom');
        // Copy to Clipboard
        // 该语法用于读取 localStorage 项，如下：
        // let cat = localStorage.getItem('myCat');
        // Copy to Clipboard
        // 该语法用于移除 localStorage 项，如下：
        // localStorage.removeItem('myCat');
        // Copy to Clipboard
        // 该语法用于移除所有的 localStorage 项，如下：
        // // 移除所有
        // localStorage.clear();



        logins(data).then(res => {
          if (res.code == 200) {
            Toast.success(res.message)
            localStorage.setItem('token', res.data.token);
            setTimeout(() => {
              // 跳转首页
              this.Jumppage('/index')
            }, 1300)
          }
        })
          .catch(error => {
            console.log(error, "errosr")
          })




        return
        // this.$request({
        //   url: '/user/login',
        //   data
        // }).then(res => {

        //   if (res.code == '200') {
        //     uni.setStorageSync('token', res.data.token);
        //     Toast(res.message);
        //     // uni.showToast({
        //     //   title: res.message
        //     // })
        //     setTimeout(function () {
        //       uni.switchTab({
        //         url: '/pages/index/index'
        //       })
        //     }, 1000); //延迟1000毫米
        //   }
        //   console.log(res)
        // })
      }
    },

    // 短信登录
    duanxindenglu: function () {
      this.tys = !this.tys
      if (this.logintype == false) {
        this.logintype = true
      }
    },


    // 短信还是账号登录
    ljzc: function () {
      this.logintype = !this.logintype
      console.log('this.logintype', this.logintype)
    },

    // 是否选中隐私协议
    ysxy: function () {
      this.ystype = !this.ystype
    },
    // 登录 注册接口
    dengluzc: function () {
      // 账号密码
      if (this.logintype) {

      } else {
        // 用户注册
        // 验证码登录
        if (this.validCode == "") {

          // 验证码为空
          Toast.fail('验证码为空');
          // uni.showToast({
          //   icon: 'error',
          //   title: '验证码为空'
          // })

          return
        }
        if (this.password == "") {
          // 密码不能为空

          Toast.fail('密码不能为空');
          // uni.showToast({
          //   icon: 'error',
          //   title: '密码不能为空'
          // })
          return
        }




        var data = {
          // 验证码
          initCode: this.initCode,
          // 账号
          mobilePhone: this.phone,
          // 密码
          password: this.password,
          // 邀请码
          validCode: this.validCode
        }



        register(data).then(res => {
          console.log(res,"6666")
        if (res.code == 200) {
          Toast('注册成功');



        
        }
      })
        .catch(error => {
          console.log(error, "errosr")
        })





        // this.$request({
        //   url: '/user/register',
        //   data
        // }).then(res => {
        //   console.log(res)


        //   if (res.code == 200) {

        //     Toast.fail(res.message);

        //     // uni.showToast({
        //     //   // icon: 'error',
        //     //   title: res.message
        //     // })
        //   }
        // })



      }
    },

    // 正则验证手机号
    zzyzsjh: function (e) {
      let reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
      if (!reg.test(e)) {
        Toast.fail('请输入正确的11位手机号');


        // uni.showToast({
        //   icon: 'none',
        //   title: '请输入正确的11位手机号'
        // })
        return false;
      }
    },

    // 发送验证码
    sendSms() {
      var that = this

      if (that.smsWait !== 0) {


        return false
      }
      console.log(this.phone)
      let reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
      if (!reg.test(this.phone)) {

        Toast.fail('请输入正确的11位手机号');

        // uni.showToast({
        //   icon: 'none',
        //   title: '请输入正确的11位手机号'
        // })
        return false;
      }



      var data = {
        phoneNum: this.phone
      }




      valid_code(data).then(res => {
        if (res.code == 200) {
          Toast('验证码发送成功');
        }
      })
        .catch(error => {
          console.log(error, "errosr")
        })






      // // return
      // this.$request({
      //   url: '/user/valid_code?phoneNum=' + this.phone,
      // }).then(res => {
      //   console.log(res)
      //   if (res.code == '200') {
      //     // uni.showToast({
      //     //   // icon: 'none',
      //     //   title: res.message
      //     // })
      //   Toast('');
      //   }
      // })





      that.smsWait = 60
      that.waitSms()
      that.smsInterval = setInterval(function () {
        that.waitSms()
      }, 1000)
    },



    // 验证码倒计时
    waitSms() {
      var that = this
      that.smsWait--
      var msgBtn = document.querySelector('.msgBtn')
      if (that.smsWait === 0) {
        clearInterval(that.smsInterval)
        that.sendContent = '重新获取'
        that.sendClass = false
        // msgBtn.style.backgroundColor = '#1873f9'
        // msgBtn.style.borderColor = '#1873f9'
        // msgBtn.style.cursor = 'pointer'
      } else {
        that.sendClass = true
        that.sendContent = that.smsWait + '秒后重新获取'
        // msgBtn.style.backgroundColor = '#aecdfa'
        // msgBtn.style.borderColor = '#aecdfa'
        // msgBtn.style.cursor = 'default'
      }
    },



  }








}
</script>

<style lang="less" scoped>
.bodyauto {
  height: 266px;
  margin-top: -110px;
  z-index: 99;
  position: absolute;
  width: 100%;

  .topname {
    display: flex;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 800;
    line-height: 65px;
    color: #FFFFFF
  }

}



.autoo {
  margin-top: 15px;
  background: #fff;
  border-radius: 15px 15px 0 0;


}

.neirngs {
  width: 85%;
  margin: 0 auto;

}



.hylogin {
  font-size: 25px;
  font-family: PingFang SC;
  font-weight: 800;
  // line-height: 32px;
  color: #333333;
}



.hmylj {
  color: #9CA4B5;
  margin-top: 25px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  height: 21px;
}




.inpubj {
  width: 100%;

  height: 53px;
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


  .jiabal {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 21px;
    color: #333333;

  }

}

.denglog {

  display: flex;
  align-items: center;
  justify-content: center;

  background: #4D82FF;
  border-radius: 30px;

  height: 42px;
  margin-top: 30px;


  font-size: 17px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 24px;
  color: #FFFFFF;
}

.dxyz {
  color: #4D82FF;
  text-align: center;
  margin-top: 18px;


  font-size: 17px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 24px;


}

.yinsixiey {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 16px;

  margin-top: 170px;


  color: #9CA4B5;
}

.yzm {

  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 16px;
  color: #4D82FF;
  border: 1px solid #4D82FF;
  margin-left: auto;
  padding: 6px 10px;
  border-radius: 20px;
}

input {
  outline: none;
  border: none;
  background: none;
  font-size: 16px;
}
</style>


