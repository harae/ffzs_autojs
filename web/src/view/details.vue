<template>
    <div class="details">

        <van-nav-bar title="阅读明细" left-arrow @click-left="onClickLeft" />

        <div style="height: 45px;"></div>


        <div class="top"></div>
        <div class="items" v-for="(item, index) in 5 ">

            <div style="height:15px;"> </div>

            <div class="itemtop">
                <div class="itemtext">
                    观看赞友
                </div>
                <div class="time">
                    10小时52分02秒
                </div>
            </div>

            <div style="height:14px;"> </div>

            <div class="itemtop">
                <div class="anniu">
                    助手

                </div>

                <div class="duok">
                    星际多开
                </div>

            </div>

            <div style="height:11px;"> </div>

        </div>




    </div>
</template>



<script>

import { Toast } from 'vant'
import { exec } from '../api/home'

export default {
    name: 'details',
    data() {
        return {

            list:[],

        }
    },

    created() {

        this.cx()

    },

    methods: {


        cx: function () {


            var data = {}
            exec(data).then(res => {
                if (res.code == 200) {
                   
                    this.list = res.data.rows
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
             
                    setTimeout(function () {
                        _this.$router.replace("/");
                        // console.log('一秒钟后跳转页面')
                    }, 1000); //延迟1000毫米
                    return
                }
                console.log(error, "errosr")
            })


        },



        onClickLeft() {
            this.$router.go(-1)
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

.time {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 18px;
    color: #9CA4B5;
    margin-left: auto;

}

.itemtext {

    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 21px;
    color: #333333;
}

.anniu {
    background: #4D82FF;

    padding: 3px 5px;

    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 16px;
    color: #FFFFFF;

    border-radius: 5px;
}

.duok {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 18px;
    color: #333333;
    padding: 0 10px;

}
</style>