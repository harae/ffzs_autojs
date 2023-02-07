<template>
    <div class="my">






        <img class="topbj" src="../assets/img/mybj.png" alt="">




        <div class="auto">
            <div class="auto-top">

                <div class="topst"> 个人中心 </div>
                <div style="height:45px;"></div>
                <div style="height:10px;background:#F9FAFB;"></div>
                <div style="height:15px;"></div>




                <div style="width:10px;">
                </div>




                <img class="toux" src="../assets/img/bb839962c5a0b1fc31eba7eb291dc23b7ed827a37d71-QEtuUM@2x.png" alt="">



                <div style="width:10px;">
                </div>
                <!-- {{status}} -->
                <div class="">
                    <div class="auto-name">
                        {{ status.userName }}
                    </div>
                    <div style="height:5px;">
                    </div>
                    <div class="auto-text">
                        我的个性签名
                    </div>
                </div>
            </div>
        </div>
        <div class="aubottom">


            <div class="item">
                <div style="width:10px;"></div>

                <img class="icon" src="../assets/img/kf.png" alt="">



                <div style="width:15px;"></div>
                <div class="bottomright">
                    <div class="botumleft  itm">
                        客服
                    </div>
                    <div class="botumauto  itm">
                        {{ status.higherUpId }}
                    </div>
                    <span class="aniu" @click="fuzhi(status.higherUpId)">
                        复制
                    </span>
                </div>
            </div>

            <div class="item">
                <div style="width:10px;"></div>


                <img class="icon" src="../assets/img/zh.png" alt="">

                <div style="width:15px;"></div>
                <div class="bottomright">
                    <div class="botumleft  itm">
                        账号
                    </div>
                    <div class="botumauto  itm">
                        {{ status.mobilePhone }}
                    </div>
                    <span class="aniu" style="background: #fff;">
                        复制
                    </span>
                </div>
            </div>


            <div class="item">
                <div style="width:10px;"></div>


                <img class="icon" src="../assets/img/yx.png" alt="">


                <div style="width:15px;"></div>
                <div class="bottomright">
                    <div class="botumleft  itm">
                        邮箱
                    </div>
                    <div class="botumauto  itm">
                        {{ status.customerEmail }}
                    </div>
                    <span class="aniu" @click="bangding()">
                        绑定
                    </span>
                </div>
            </div>


            <div class="item">
                <div style="width:10px;"></div>




                <img class="icon" src="../assets/img/hydq.png" alt="">




                <div style="width:15px;"></div>
                <div class="bottomright">
                    <div class="botumleft  itm">
                        会员到期
                    </div>
                    <div class="botumauto  itm">
                        <!-- 2023-01-30 -->

                        {{ getLocalTime(status.membershipExpirationDate) }}

                    </div>
                    <span class="aniu" @click="xufeivip()">
                        续费
                    </span>
                </div>
            </div>


            <div class="item">
                <div style="width:10px;"></div>


                <img class="icon" src="../assets/img/yqwdr.png" alt="">




                <div style="width:15px;"></div>
                <div class="bottomright">
                    <div class="botumleft  itm">
                        邀请我的人
                    </div>
                    <div class="botumauto  itm">
                        {{ status.initCode }}
                    </div>
                    <span class="aniu" @click="xiaji()">
                        下级
                    </span>
                </div>
            </div>


            <div class="item">
                <div style="width:10px;"></div>


                <img class="icon" src="../assets/img/yqlj.png" alt="">





                <div style="width:15px;"></div>
                <div class="bottomright">
                    <div class="botumleft  itm">
                        邀请链接
                    </div>
                    <div class="botumauto  itm">
                        {{ status.initCode }}
                    </div>
                    <span class="aniu" @click="fuzhi(status.initCode)">
                        复制
                    </span>
                </div>
            </div>





        </div>

        <div style="height:100px;"></div>
        <navbar :active="active"></navbar>

    </div>
</template>


<script>

import { Toast } from 'vant'
import { user } from '../api/home'
import navbar from '../components/tabber.vue'

export default {
    components: { navbar },
    name: 'my',
    data() {
        return {
            status: {},
            active: '/my'

        }
    },

    created() {

        this.cx();
        // debugger
    },

    methods: {

        // 查询个人信息
        cx: function () {
            var data = {}
            user(data).then(res => {
                if (res.code == 200) {
                    this.status = res.data
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

        // 绑定邮箱
        bangding: function () {
            this.Jumppage('/binemail')
            // uni.navigateTo({
            // 	url: '/pages/binemail/binemail'
            // })
        },
        xufeivip: function () {
            this.Jumppage('/vip')
            // uni.navigateTo({
            // 	url: '/pages/vip/vip'
            // })
        },
        // 解析时间戳
        getLocalTime: function (nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        },
        // 复制
        fuzhi: function (value) {

            // debugger
            //点击某个摁扭执行事件 

            let url = value;
            //新建一个文本框
            let oInput = document.createElement('input');
            //赋值给文本框
            oInput.value = url;
            document.body.appendChild(oInput);
            // 选择对象;
            oInput.select();
            // 执行浏览器复制命令
            document.execCommand("Copy");
            //复制完成删除掉输入框
            oInput.remove()
            console.log('复制成功')
            Toast('复制成功')




            // uni.setClipboardData({
            //     data: value,
            //     success(res) {
            //         console.log('复制成功', res)
            //     }
            // })

        },

        // 下级
        xiaji: function () {


            this.Jumppage('/invitation')



            // uni.navigateTo({
            // 	url: '/pages/invitation/invitation'
            // })

        }



    }


}




</script>


<style lang="less" scoped >
.topst {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    color: #fff;
    position: fixed;
    top: 0;
    width: 100%;
    font-weight: 800;
    font-size: 16px;
    background: rgb(77, 130, 255);
    z-index: 999;

}

.topbj {
    width: 100%;
    z-index: -999;
}

.auto {

    width: 100%;
    margin: 0 auto;
    height: 140px;
    margin-top: -100px;
    z-index: 999;


    .toux {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .auto-top {
        display: flex;
        align-items: center;
        color: #fff;
    }

    .auto-name {
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 24px;
    }

    .auto-text {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 18px;
    }
}


.aubottom {
    width: 100%;
    height: 150px;
    margin-top: -60px;
    background: #fff;
    position: absolute;
    z-index: 999;
    border-radius: 15px 15px 0 0;
}


.item {

    display: flex;
    height: 60px;
    align-items: center;

    .icon {
        width: 20px;
    }

    .botumleft {

        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 21px;
        color: #333333;

    }



    .bottomright {
        display: flex;
        align-items: center;
        width: 85%;
        height: 40px;
        border-bottom: 1px solid #ECEEF1;

        .aniu {
            background: #4D82FF;
            border-radius: 10px;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 500;
            line-height: 18px;
            padding: 6px 16px;
            color: #FFFFFF;
        }

        .botumauto {

            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            line-height: 18px;
            color: #9CA4B5;

        }


    }


    .itm {
        flex: 1;

    }


}
</style>