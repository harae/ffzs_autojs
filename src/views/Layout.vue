<template>
  <!--<div>
    <el-button type="info" @click="loginout">退出</el-button>
  </div>-->
  <el-container class="home-container">
    <el-header>
      <div>
        <h3 class="h3-title">登录管理系统</h3>
      </div>
      <div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link el-icon-s-check">
            个人中心<i class="el-icon-arrow-down el-icon--right" style="margin-right: 15px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-fold" command="loginOut">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button " @click="toggleCollapse"><i
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" /></div>
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#47A1FF" :unique-opened="true"
          :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="url">
          <el-menu-item index="/userlist">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    name: "Layout",
    data() {
      return {
        isCollapse: false,
        url: '' //默认激活的模块地址
      }
    },
    created() {
      //created生命周期函数，在页面初始化之前调用方法获取数据
      this.url = window.sessionStorage.getItem('url');
    },
    methods: {
      //下拉列表的绑定函数shen
      handleCommand(command) {
        if (command == 'loginOut') {
          window.localStorage.clear();
          this.$router.push('/');
        }
      },
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style scoped>
  .el-container {
    padding: 0;
    margin: 0;
    height: 100%;
  }

  .home-container {
    height: 100%;
    width: 100%;
    position: fixed;
  }

  .el-header {
    background-color: #5c5c5c;
    display: flex;
    justify-content: space-between;
    padding: 0;
    align-items: center;
    color: white;
    font-size: 20px;
  }

  .el-aside {
    background-color: #545c64;
  }

  .toggle-button {
    background-color: #5c5c6c;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
    height: 36px;
    font-size: 24px;
    color: white;
  }

  .header-img {
    width: 30px;
    height: 30px;
    margin-left: 20px;
    margin-right: 5px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: white;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-submenu {
    margin: 0px;
    padding: 0px;
  }

  .el-menu-item {
    margin: 0px;
    padding: 0px;
  }

  .h3-title{
    margin-left: 750px;
  }
</style>
