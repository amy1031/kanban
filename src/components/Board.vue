<template>
  <div class="board"> 
    <div class="row">
      <div class="col-xs-6">
       <h2>{{board.name}}</h2>
      </div>
      <div class="col-xs-6">
        <button class="boards pull-right"><router-link to="/boards">Back to All Boards</router-link></button> 
        <button class="delete pull-right" @click="removeBoard(board)">Delete Board</button>
        </div>
      <div class="col-xs-12">
        <p class="description">{{board.description}}</p>
      </div>
    </div>
    <div class="row">
        <div v-for='(list, index) in this.lists'>
            <lists :list-prop='list' :list-index="index"> </lists>
        </div>
    </div>
    <div class="row">
      <div class="col-xs-8">
      <h4>Create a new list</h4>
        <div class="add-list">
        <form @submit.prevent="createList">
          <div class="form-group">
            <input type="text" class="form-control" v-model="name" placeholder="List Name" required>
          </div>
          <div class="form-group">
            <textarea rows="4" cols="50" class="form-control" v-model="description" placeholder="Description"></textarea>
          </div>
            <button class="btn btn-primary" type="submit">Create List</button>
        </form>
        </div>
        <hr>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Lists from './Lists'

export default {
  name: 'board',
  data() {
    return {
      name: '',
      description: '',
      boardId: this.$route.params.id
    }
  },
  mounted(){
    //debugger
    this.$store.dispatch('getBoard', this.$route.params.id)
    this.lists = this.$store.dispatch('getLists', this.boardId)
   // console.log('board: ' + this.$route.params.id)
   // this.tasks = this.$root.$data.store.actions.getTasks(this.$route.params.id, lists().list.id)
  },
  computed:{
    board(){
      return this.$store.state.activeBoard
    },
    lists(){
      return this.$store.state.lists
        }
    // tasks(){
    //   return this.$root.$data.store.state.tasks
    //     },
    // comments() {
    //   return this.$root.$data.store.state.comments
    // }
  },
  components: {
    Lists
  },
  methods: {
    createList(){
      this.$store.dispatch('createList', {name: this.name, description: this.description, boardId: this.boardId})
    },
    removeBoard(board){
      this.$store.dispatch('removeBoard', board)
    }
  }
}
</script>

<style scoped>
h2 {
  color: #71328D;
}
button.delete {
  background-color: #ff5050;
  border: 0px;
  color: #fff;
  font-weight: bold;
  font-family: Poppins;
  border-radius: 5px;
  border: 0px;
  padding: 7px;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-top: 20px;
  transition-duration: 0.4s;
}
button.delete:hover{
  background-color: #f61313;
  color: #fff;
}
button.boards {
  background-color: #9B5BB8;
  border: 0px;
  color: #fff;
  font-weight: bold;
  font-family: Poppins;
  border-radius: 5px;
  border: 0px;
  padding: 7px;
  margin-bottom: 5px;
  margin-top: 20px;
  transition-duration: 0.4s;
}
button.boards:hover{
  background-color: #71328D;
  color: #fff;
}
.description {
  font-family: helvetica;
  font-size: 16px;
  padding-left: 10px;
}
</style>
