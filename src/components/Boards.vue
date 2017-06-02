<template>
  <div class="boards"> 
  <div class="row">
    <div class="col-xs-6">
      <h1 class="capitalize">Hello, {{user.name}}!</h1>
    </div>
    <div class="col-xs-6">
    <p class="logout pull-right"><button class="logout" @click="logout(user)">Logout</button></p>
    </div>
    </div>
    <h2>Your Boards</h2>
    <div class="row">
      <div v-for="board in boards">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <router-link :to="'/boards/'+board._id"><button class="board">{{board.name}}</button></router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3>Create a new board</h3>
          <form @submit.prevent="createBoard">
            <div class="form-group">
              <input type="text" class="form-control" v-model="name" placeholder="Board Name" required>
            </div>
            <div class="form-group">
              <textarea rows="4" cols="50" class="form-control" v-model="description" placeholder="Description"></textarea>
            </div>
            <button class="btn btn-primary" type="submit">Add Board</button>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'boards',
  data() {
    return {
      name: '',
      description: '',
      creatorId: this.$store.state.user._id
    }
  },
  mounted(){
    this.$store.dispatch('getBoards')
  },
  computed:{
    boards(){
      return this.$store.state.boards
    },
    user() {
      return this.$store.state.user
    }
  },
  methods:{
    createBoard(){
      this.$store.dispatch('createBoard', {name: this.name, description: this.description, creatorId: this.creatorId})
    },
    logout() {
      this.$store.dispatch('logout', this.user)
    }
  }
}
</script>

<style scoped>
.capitalize {
    text-transform: capitalize;
}
h1 {
  font-family: helvetica;
  font-size: 30px;
}
h2 {
  font-family: helvetica;
  font-size: 20px;
  color: #707070;
}
h3 {
  font-family: helvetica;
  font-size: 18px;
  color: #707070;
}
a {
  color: #606060;
  font-size: 14px;
  font-weight: bold;
  color: #71328D;
}
p.logout {
  margin-top: 25px;
}

button.board {
  font-size: 25px;
  color: #9B5BB8;
  font-weight: bold;
  font-family: Poppins;
  background-color: #fff;
  border-radius: 5px;
  border: 0px;
  padding: 10px;
  width: 100%;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}
button.board:hover{
  background-color: #9B5BB8;
  color: #fff;
}

button.logout {
  font-size: 16px;
  color: #9B5BB8;
  font-weight: bold;
  font-family: Poppins;
  background-color: #fff;
  border-radius: 5px;
  border: 0px;
  padding: 7px;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}

button.logout:hover{
  background-color: #9a9a9a;
  color: #fff;
}

hr {
  	border-top: 3px double #8c8b8b;
}
</style>
