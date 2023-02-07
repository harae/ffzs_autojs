<template>
    <div class="tabber">


        <van-tabbar v-model="active" @change="qiehuan">
            <van-tabbar-item name="/index">
                <template #icon="props">
                    <img v-if="props.active == true" class="iconti" src="../assets/img/gnsy.png" alt="">
                    <img v-if="props.active == false" class="iconti" src="../assets/img/gnsys.png" alt="">
                </template>
                <div style="height:4px;"></div>
                <div>
                    功能使用
                </div>
            </van-tabbar-item>
            <van-tabbar-item name="/home">
                <template #icon="props">
                    <img v-if="props.active == true" class="iconti" src="../assets/img/yxrz.png" alt="">
                    <img v-if="props.active == false" class="iconti" src="../assets/img/yxrzs.png" alt="">
                </template>
                <div style="height:4px;"></div>
                <div>
                    运行日志
                </div>
            </van-tabbar-item>
            <van-tabbar-item name="/help">
                <template #icon="props">
                    <img v-if="props.active == true" class="iconti" src="../assets/img/sybz.png" alt="">
                    <img v-if="props.active == false" class="iconti" src="../assets/img/sybzs.png" alt="">
                </template>
                <div style="height:4px;"></div>
                <div>
                    使用帮助
                </div>
            </van-tabbar-item>
            <van-tabbar-item name="/my">
                <template #icon="props">
                    <img class="iconti" v-if="props.active == true" src="../assets/img/grzx.png" alt="">
                    <img class="iconti" v-if="props.active == false" src="../assets/img/grzxs.png" alt="">
                </template>
                <div style="height:4px;"></div>
                <div>
                    个人中心
                </div>
            </van-tabbar-item>
        </van-tabbar>

    </div>
</template>



<script>

import { Toast } from 'vant'
import { logins } from '../api/home'

export default {
    name: 'tabber',
    props:['active'],
    data() {
        return {
           
            active:this.active,
        }
    },
    methods: {

        qiehuan: function (e) {
            console.log(e)
            // debugger

            this.active = e
            this.$router.replace(e)
            return





        },

        Jumppage: function (e) {

            this.$router.push({
                path: e
            })
        },




    }


}




</script>


<style lang="less" scoped >

</style>