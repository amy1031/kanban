<template>
    <div id="home">
    <h2>Kanban lets you collaborate and get more done.</h2>
        <h3>Kanban’s boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding
          way.
        </h3>
    <div class="col-xs-6">
    <h4>Already use Kanban?</h4>
    <button class="btn btn-primary"><router-link to="/login">Login</router-link></button>
    </div>
    <div class="col-xs-6">
    <h4>New Member?</h4>
    <button class="btn btn-primary register"><router-link to="/register">Register</router-link></button>
    </div>
</div>

    </div>
</template>


<script>
import Login from './Login'
import Register from './Register'

export default {
    name: 'home',
    mounted() {
        this.$store.dispatch('getAuth')
    },
    computed:{},
    methods:{},
    components:{
        Login,
        Register
    }
}
</script>


<style scoped>
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
h4 {
      color: #9a9a9a;
      font-size: 16px;
      font-weight: bold;
      font-family: helvetica;
    }

.btn {
      padding: 14px 24px;
      border: 0 none;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

.btn:focus,
    .btn:active:focus,
    .btn.active:focus {
      outline: 0 none;
    }

.btn-primary {
      background: #B576D1;
      color: #ffffff;
    }

    .btn-primary:hover,
    .btn-primary:focus,
    .btn-primary:active,
    .btn-primary.active,
    .open>.dropdown-toggle.btn-primary {
      background: #9B5BB8;
    }

    .btn-primary:active,
    .btn-primary.active {
      background: #007299;
      box-shadow: none;
    }

.register {
      background: #71328D;
      color: #ffffff;
    }

a {
      color: #ffffff;
    }

a:hover {
      text-decoration: none;
    }
</style>