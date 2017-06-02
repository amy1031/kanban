<template>
<div class="lists">
    <div class="col-xs-6">
    <div class="list" droppable="true" v-on:drop.capture="createTasks" ondragover="event.preventDefault()">
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="pull-right">
                <button class="delete" @click="removeList(listProp)">X</button>
                </div>
                <h3 class="panel-title">{{this.listProp.name}}</h3> 
            </div>

            <!-- tasks -->
            <div class="panel-body">
                <div v-for='(task, index) in this.tasks' :key="index" :id="index" class="tasks" draggable="true" v-on:dragstart.capture="moving">
                    <tasks :task-prop='task' :task-index="index"></tasks>
                </div>
                <div class="add-task">
                    <h5>Create a new task</h5></b-btn>
                        <form @submit.prevent="createTask">
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="name" placeholder="Task Name" required>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="description" placeholder="Description">
                            </div>
                                <button type="submit" class="task">Create Task</button>
                        </form>
                    </div>
                </div>
                <!-- end tasks -->

            </div>
        </div>
        </div>
    </div>
</div>
</template>


<script>
import Tasks from './Tasks'
import draggable from 'vuedraggable'

export default {
    name: 'lists',
    props: ["listProp", "listIndex"],
    data(){
        return {
            name: '',
            description: '',
            boardId: this.$store.state.activeBoard._id,
            listId:  this.listProp._id
        }
    },
    created() {
       // debugger
        this.$store.dispatch('getTasks', {boardId: this.listProp.boardId, listId: this.listProp._id})
    },
    computed: {
        tasks(){
            //debugger
            return this.$store.state.tasks[this.listProp._id]
        }
    },
    methods:{
        createTask(){
         //   debugger
            this.$store.dispatch('createTask', {name: this.name, description: this.description, boardId: this.boardId, listId: this.listId})
    },
        removeList(list){
            this.$store.dispatch('removeList', list)
    },
        editList(list) {
            this.$store.dispatch('editList', list)
    },
      moveTask() {
        let i = this.tasks.indexOf(this.tasks)
        this.tasks.splice(i, 1)
        this.$store.dispatch('moveTasks', tasks)
    },
      moving(event) {
        var task = this.tasks[event.target.id]
        event.dataTransfer.setData('text/javascript', JSON.stringify(task))
    },
      createTasks(event) {
        var task = JSON.parse(event.dataTransfer.getData('text/javascript'))
        task.listId = this.listProp._id
        this.$store.dispatch('moveTasks', task)
      }
    },
    components:{
        Tasks
    }
}
</script>


<style scoped>
h3 {
    color: #B576D1;
    margin-top: 0px;
    font-size: 20px;
    font-weight: bold;
    padding: 5px;
}

.task {
    border: 0px;
    color: #fff;
    background-color: #B576D1;
    font-weight: bold;
    font-family: helvetica;
    border-radius: 5px;
    border: 0px;
    padding: 7px;
    margin-bottom: 5px;
    transition-duration: 0.4s;
}
.task:hover{
  background-color: #b4db64;
  color: #fff;
}
.delete {
    background-color: #afb0af;
    border: 0px;
    color: #fff;
    font-weight: bold;
    font-family: Poppins;
    border-radius: 5px;
    border: 0px;
    padding: 7px 10px;
    transition-duration: 0.4s;
}
span {
    color: #9a9a9a;
}
span:hover {
    color: #9a9a9a;
    text-decoration: underline;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>