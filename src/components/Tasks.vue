<template>
    <div class="tasks">
      <div class="well well-sm">
        <div class="pull-right">
             &nbsp; 
            <button class="delete" @click="removeTask(taskProp)">x</button>
        </div>
      <h4>{{this.taskProp.name}}</h4>
      <p class="description">{{this.taskProp.description}}</p>
        <div class="panel panel-default">
            <div class="panel-body">
                <h5>Comments:</h5>
                <div v-for='(comment, index) in this.comments'>
                    <comments :comment-prop='comment' :comment-index="index"></comments>
                </div>
                <br>
                <div class="add-comment">
                    <form class="form-inline" @submit.prevent="createComment">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="name" placeholder="Add Comment" required>
                        </div>
                            <button type="submit" class="add">Add</button>
                    </form>
                </div>
            </div>
        </div>
      <!--  <div v-for='list in this.lists'>{{this.list.name}} -->
      <!--  <form class="form-horizontal">
            <div class="form-group">
                <label for="select" class="col-sm-4 control-label">Move to:</label>
                    <div class="col-sm-8">
                        <select class="form-control">
                            <option>1</option>
                        </select>
                    </div>
            </div>
        </form>
    </div> -->
    </div>
</div>
</template>


<script>
import Comments from './Comments'

export default {
    name: 'tasks',
    props: ["taskProp", "taskIndex"],
    data(){
        return {
            name: '',
            boardId: this.$store.state.activeBoard._id,
            listId:  this.taskProp.listId,
            taskId: this.taskProp._id
        }
        // selected: this.list.name
    },
    mounted() {
        this.$store.dispatch('getComments', {boardId: this.taskProp.boardId, listId: this.taskProp.listId, taskId: this.taskProp._id})
       // debugger
    },
    computed: {
        comments(){
          //  debugger
            return this.$store.state.comments[this.taskProp._id]
        }
    },
    methods:{
        removeTask(task){
            this.$store.dispatch('removeTask', task)
        },
        createComment(){
         //   debugger
            this.$store.dispatch('createComment', {name: this.name, boardId: this.taskProp.boardId, listId: this.taskProp.listId, taskId: this.taskProp._id})
        }
    },
    components:{
        Comments
    }
}
</script>


<style scoped>
.delete {
    background-color: #afb0af;
    border: 0px;
    color: #fff;
    font-weight: bold;
    font-family: Poppins;
    border-radius: 5px;
    border: 0px;
    padding: 3px 5px;
    transition-duration: 0.4s;
}
.description {
    padding-left: 10px;
}
h4 {
    padding-bottom: 5px;
}
h5 {
    margin-top: 0px;
    padding-bottom: 5px;
}
h6 {
    padding-top: 10px;
}

button.add {
  background-color: #9B5BB8;
  border: 0px;
  color: #fff;
  font-weight: bold;
  font-family: Poppins;
  border-radius: 5px;
  border: 0px;
  padding: 6px;
  margin-bottom: 5px;
  transition-duration: 0.4s;
}

</style>