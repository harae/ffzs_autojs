<template>
    <div class="home">
    
<div class="topst"> 运行日志 </div>
        <div style="height:45px;"></div>
        <div style="height:10px;background:#F9FAFB;"></div>
        <div style="height:15px;"></div>







        <div style="height:100px;"></div>
        <navbar 	:active="active"></navbar> 
    </div>
</template>



<script>

import { Toast } from 'vant'
import { logins } from '../api/home'

import navbar from '../components/tabber.vue'
 
export default {
    components:{navbar},
    name: 'home',
    data() {
        return {
            active: '/home',
		

        }
    },
    methods: {

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






</style>