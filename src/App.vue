<template>
  <Login msg="Welcome to Login"/>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Login from './views/login/Login.vue'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
</style>
