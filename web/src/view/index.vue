<template>
    <div class="index">

        <div class="topst"> 功能使用 </div>
        <div style="height:45px;"></div>
        <div style="height:10px;background:#F9FAFB;"></div>
        <div style="height:15px;"></div>
        <div class="nei">
            <div class="toperge">
                <div class="left" @click="navta('false')">
                    <div class="left-aut">
                        <img class="jticon" src="../assets/img/sp.png" alt="">
                        <div style="width:8px;">
                        </div>
                        <div class="title">
                            视频阅读
                        </div>
                    </div>

                    <img v-if="navtap == 'false'" class="leftimgxz" src="../assets/img/xuanjiao.png" alt="">

                </div>

                <div style="width:4%;">

                </div>


                <div class="left" @click="navta('false')">
                    <div class="left-aut">
                        <img class="jticon" src="../assets/img/wz.png" alt="">
                        <div style="width:8px;">
                        </div>
                        <div class="title">
                            文章阅读
                        </div>
                    </div>
                    <img v-if="navtap == 'false'" class="leftimgxz" src="../assets/img/xuanjiao.png" alt="">
                </div>
            </div>

            <div style="height:30px;"></div>

            <div class="itemdt">
                起始时间~终止时间：
                <!-- <picker mode="time" :value="starttime" start="09:01" end="21:01" @change="bindTimeChangestarttime">
				
				</picker> -->

                <div class="uni-input" style="width:45px;" @click="show = true">{{ starttime }}</div>


                <van-action-sheet v-model="show">
                    <div class="content">

                        <van-datetime-picker v-model="currentTime" type="time" title="选择时间" :min-hour="0" :max-hour="23"
                            @confirm="qued" @cancel="clis" />

                    </div>
                </van-action-sheet>



                <div style="text-align: center; width:50px; ">
                    至
                </div>
                <div class="uni-input" style="width:45px;" @click="shows = true">{{ endtime }}</div>



                <van-action-sheet v-model="shows">
                    <div class="content">

                        <van-datetime-picker v-model="currentTimes" type="time" title="选择时间" :min-hour="0"
                            :max-hour="23" @confirm="queds" @cancel="cliss" />

                    </div>
                </van-action-sheet>




            </div>
            <div style="height:20px;"></div>
            <div class="itemdt">
                视频阅读数量：
                <div class="uni-input" style="width:40px;">




                    <input style="width:100%;" type="number" placeholder="数量" maxlength="4">

                </div>
                <div style="width:10px;"> </div>
                文章阅读数量：
                <div class="uni-input" style="width:40px;">
                    <input style="width:100%;" type="number" placeholder="数量" maxlength="4">
                </div>
            </div>

        </div>
        <div style="height:20px;"></div>
        <div class="top"></div>
        <!-- <div style="height:30px;"></div> -->
        <div class="itemdt" style="margin-top:15px;">
            <div class="leftti">
                <div style="width:20px;">
                </div>

                <img style="width:44px;" src="../assets/img/tx.png" alt="">


                <div class="xjdk">
                    星级多开
                </div>

                <img style="width:15px;" src="../assets/img/xuanzhong.png" alt="">

            </div>
            <div class="leftti" style="justify-content: center;width: 40%;">
                <!-- <div style="width: 40px;">
				</div> -->
                <div class="xjdk">
                    观看赞友
                </div>

                <img style="width:15px;" src="../assets/img/xuanzhong.png" alt="">

            </div>
        </div>




        <div class="itemdt" style="margin-top:15px;">
            <div class="leftti">
                <div style="width:20px;">
                </div>


                <img style="width:44px;" src="../assets/img/tx.png" alt="">

                <div class="xjdk">
                    星级多开
                </div>

                <img style="width:15px;" src="../assets/img/xuanzhong.png" alt="">

            </div>
            <div class="leftti" style="justify-content: center;width: 40%;">
                <!-- <div style="width: 40px;">
				</div> -->
                <div class="xjdk">
                    观看赞友
                </div>



                <img style="width:15px;" src="../assets/img/xuanzhong.png" alt="">


            </div>
        </div>


        <div class="itemdt" style="margin-top:15px;">
            <div class="leftti">
                <div style="width:20px;">
                </div>


                <img style="width:44px;" src="../assets/img/tx.png" alt="">

                <div class="xjdk">
                    星级多开
                </div>


                <img style="width:15px;" src="../assets/img/xuanzhong.png" alt="">



            </div>
            <div class="leftti" style="justify-content: center;width: 40%;">
                <!-- <div style="width: 40px;">
				</div> -->
                <div class="xjdk" style="display: flex; align-items: center;">




                    <div style="padding: 0 10px;">
                        复刷
                    </div>

                    <div class="uni-input" style="width:45px;">
                        <input type="number" placeholder="数量" maxlength="4">
                    </div>

                </div>

                <img style="width:15px;" src="../assets/img/xuanzhong.png" alt="">

            </div>
        </div>



        <div class="itemdt" style="margin-top:15px;">
            <div class="leftti">
                <div style="width: 20px;">
                </div>


                <img style="width:44px;" src="../assets/img/tx.png" alt="">

                <div class="xjdk">
                    星级多开
                </div>


                <img style="width:15px;" src="../assets/img/xuanzhong.png" alt="">




            </div>
            <div class="leftti" style="justify-content: center;width: 40%;">
                <!-- <div style="width: 40px;">
				</div> -->
                <div class="xjdk">
                    观看赞友
                </div>

                <img style="width: 15px;" src="../assets/img/xuanzhong.png" alt="">


            </div>
        </div>
        <div style="height:20px;"></div>
        <div class="top"></div>

        <div class="nei">
            <div class="itamt">


                <img style="width:15px;" src="../assets/img/wei.png" alt="">


                <div class="dingshi">
                    定时(时/分)
                </div>
                <div style="width:7px;"> </div>



                <div class="uni-input" style="width:40px;">
                    <input type="number" placeholder="数量" maxlength="3">
                </div>
                <div style="width:7px;"> </div>
                <div class="uni-input" style="width:40px;">
                    <input type="number" placeholder="数量" maxlength="3">
                </div>



                <div style="width:15px;"> </div>
                <div id="autojs_run" class="antl" @click="zhixing()">
                    执行
                </div>
            </div>



            <div class="itamt">
                <div class="botleft">
                    阅读等待时间：
                </div>
                <div class="botright">
                    <div class="uni-input" style="width:60px;">
                        <input type="number" placeholder="数量" maxlength="3">
                    </div>
                    <div style="width:15px;"> </div>
                    <div class="antl" @click="yuedumingxi()">
                        阅读明细
                    </div>
                </div>
            </div>








            <div class="itamt">
                <div class="botleft">
                    视频关闭次数：
                </div>
                <div class="botright">
                    <div class="uni-input" style="width:60px;">
                        <input type="number" placeholder="次数" maxlength="3">
                    </div>
                    <div style="width:15px;"> </div>
                    <div class="antl" @click="huanyuanpeizhi()">
                        还原配置
                    </div>
                </div>
            </div>


            <div class="itamt">
                <div class="botleft">
                    连续等待次数：
                </div>
                <div class="botright">
                    <div class="uni-input" style="width:60px;">
                        <input type="number" placeholder="次数" maxlength="4">
                    </div>
                    <div style="width:15px;"> </div>
                    <div class="antl" @click="jianrongpeizhi()">
                        兼容配置
                    </div>
                </div>
            </div>


        </div>

        <div style="height: 100px;"></div>
        <navbar :active="active"></navbar>

    </div>
</template>



<script>

import { Toast } from 'vant'
import { logins } from '../api/home'
import navbar from '../components/tabber.vue'

export default {
    components: { navbar },
    name: 'index',
    data() {
        return {


            active: '/index',


            // active: 'search',


            show: false,
            shows: false,


            currentTime: '12:00',

            currentTimes: '12:00',


            navtap: 'false',

            starttime: '始',
            endtime: '终'


        }
    },
    methods: {

        qiehuan: function (e) {
            console.log(e)


        },


        Jumppage: function (e) {
            // debugger
            this.$router.push({
                path: e
            })
        },

        qued: function (e) {
            console.log(e, "ddd")
            this.starttime = e
            this.show = false

            // debugger

        },

        clis: function () {
            // debugger
            this.show = false
        },



        queds: function (e) {
            console.log(e, "ddd")
            this.endtime = e
            this.shows = false

            // debugger

        },

        cliss: function () {
            // debugger
            this.shows = false
        },





        // 阅读明细
        yuedumingxi: function () {

            this.Jumppage('/details')


            // uni.navigateTo({
            //     url: '/pages/details/details'
            // })

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







    }


}




</script>


<style lang="less" scoped >
.topst {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    color: #000;
    position: fixed;
    top: 0;
    width: 100%;
    font-weight: 800;
    font-size: 16px;
    background: #FFFFFF;
    z-index: 999;
}




.iconti {
    width: 24px;
    height: 24px;
}

input {
    width: 100%;
    outline: none;
    border: none;
    background: none;
    font-size: 16px;



}


.top {

    background: #F9FAFB;
}

.nei {
    width: 95%;
    margin: 0 auto;
    // border: 2px solid red;
}

.jticon {
    width: 27px;
}

.left {
    width: 48%;
    background: rgba(255, 255, 255, 0.39);
    box-shadow: 0px 0px 6px rgba(58, 58, 58, 0.1);
    margin: 0 auto;
    border-radius: 7px;
    height: 70px;

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
    height: 35px;
}

.leftimgxz {

    width: 40px;
    position: absolute;
    bottom: 0;
    right: 0;


}


.title {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 21px;
    color: #2B2B2B;

}

.itemdt {
    display: flex;
    align-items: center;
}

.uni-input {

    text-align: center;
    background: #EFF4F9;
    // background: rgba(239, 244, 249, 0.39);
    padding: 8px 15px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 21px;
    color: #9CA4B5;
}

.leftti {
    width: 50%;
    // border: 2px solid red;
    display: flex;
    align-items: center;

}

.xjdk {


    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 21px;
    color: #333333;

    padding: 5px 10px;

}

.itamt {
    height: 71px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 21px;
    color: #333333;
    display: flex;
    align-items: center;

    border-bottom: 1px solid #E4E8EF;

}

.dingshi {
    padding: 0 10px;
}


.antl {

    background: #4D82FF;
    width: 75px;

    text-align: center;
    padding: 7px 10px;
    border-radius: 7px;

    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 21px;
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

    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 21px;
    color: #333333;

}
</style>