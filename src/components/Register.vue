<template>
    <div class="register" id="register">
        <h4>Register</h4>
            <form @submit.prevent="register">
            <div class="form-group">
                <input type="text" class="form-control" v-model="name" placeholder="Name" required>
            </div>
            <div class="form-group">
                <input type="email" class="form-control" v-model="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <input type="password" class="form-control" v-model="password" placeholder="Password" required>
            </div>
                <button class="btn btn-primary" type="submit">Register</button>
            </form>
             <p>Already a member? <router-link to="/login">Log in</router-link>.</p>
    </div>
</template>


<script>
export default {
    name: 'register',
    data(){
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    computed:{},
    methods:{
        register() {
            this.$store.dispatch('register', {name: this.name, email: this.email, password: this.password})
        }
    },
    components:{}
}
</script>


<style scoped>
#register {
    background-color: #E4FFAB;
}
h4 {
      color: #9a9a9a;
      font-size: 16px;
      font-weight: bold;
      font-family: helvetica;
    }
.btn-primary {
      background: #71328D;
      color: #ffffff;
    }
a {
    color: #808080;
}
p {
    padding-top: 10px;
    color: #505050;
}
</style>