<template>
  <div id="app">
  <!--  <error></error> -->
<!-- <router-link to="/login">Login</router-link><br>
  <router-link to="/register">Register</router-link> -->
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-12">
        <h1>Kanban.</h1>
      </div>
      <!--<div class="col-xs-12 col-sm-6 text-right">
        <ul class="nav nav-pills">
          <router-link to="/login"><button class="btn btn-primary round">Login</button></router-link>
          <router-link to="/register"><button class="btn btn-primary round">Register</button></router-link>
        </ul>
      </div>-->
    </div>
    <div class="row">
      <div class="col-xs-12">
      <router-view></router-view>
      </div>
    </div>
   <!-- <div class="row">
      <div class="col-xs-12 col-sm-6">
        <router-view></router-view>
      </div>
    </div> -->
    </div>
  </div>
</template>

<script>
import Error from './components/Error'
import Login from './components/Login'
import Register from './components/Register'

export default {
  name: 'app',
  mounted() {
    this.$store.dispatch('getAuth')
  },
  components:{
    Error,
    Login,
    Register
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #E4FFAB;
}
</style>
