<template>
    <div class="login">
       <h4>Login</h4> 
        <form @submit.prevent="login">
        <div class="form-group">
            <input type="email" class="form-control" v-model="email" placeholder="Email" required>
        </div>
        <div class="form-group">
            <input type="password" class="form-control" v-model="password" placeholder="Password" required>
        </div>
            <button class="btn btn-primary" type="submit">Login</button>
        </form>
        <p>Not a member? <router-link to="/register">Register</router-link>.</p>
    </div>
</template>


<script>

export default {
    name: 'login',
    data(){
        return {
            email: '',
            password: ''
        }
    },
    computed:{},
    methods:{
        login() {
            this.$store.dispatch('login', {email: this.email, password: this.password})
        }
    },
    components:{}
}
</script>


<style scoped>
h4 {
      color: #9a9a9a;
      font-size: 16px;
      font-weight: bold;
      font-family: helvetica;
    }
a {
    color: #808080;
}
p {
    padding-top: 10px;
}
</style>