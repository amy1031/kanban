import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let api = axios.create({
  baseURL: 'https://kanban-vue.herokuapp.com/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'https://kanban-vue.herokuapp.com',
  timeout: 2000,
  withCredentials: true
})

// REGISTER ALL DATA HERE 
let state = {
  boards: [],
  activeBoard: {},
  error: {},
  user: {},
  lists: [],
  tasks: {},
  comments: {}
}

let handleError = (state, err) => {
  state.error = err
}

export default new Vuex.Store({
  // ALL DATA LIVES IN THE STATE
  state,

  mutations: {
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, list) {
      // state.tasks[list._id] = list.tasks
      Vue.set(state.tasks, list._id, list.tasks)
    },
    setComments(state, task) {
     // state.comments = comments
     Vue.set(state.comments, task._id, task.comments)
    },
    setUser(state, user) {
      state.user = user
    }
  },
  // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
  actions: {
    getBoards({commit, dispatch}) {
      api('userboards')
        .then(res => {
          commit('setBoards', res.data.data)
          //state.boards = res.data.data
        })
        .catch(handleError)
    },
    getBoard({commit, dispatch}, id) {
      api('boards/' + id)
        .then(res => {
          commit('setActiveBoard', res.data.data)
          //state.activeBoard = res.data.data
        })
        .catch(handleError)
    },
    createBoard({commit, dispatch}, board) {
      api.post('boards/', board)
        .then(res => {
          dispatch('getBoards')
          //this.getBoards()
        })
        .catch(handleError)
    },
    removeBoard({commit, dispatch}, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          router.push('/')
          //this.getBoards()
        })
        .catch(handleError)
    },
    getLists({commit, dispatch}, id) {
      //  state.lists = []
      api('boards/' + id + '/lists')
        .then(res => {
          commit('setLists', res.data.data)
          //state.lists = res.data.data
        })
        .catch(handleError)
    },
    createList({commit, dispatch}, list) {
      api.post('/lists', list)
        .then(res => {
          dispatch('getLists', list.boardId)
          //this.getLists(id)
        })
        .catch(handleError)
    },
    editList(list){
      api.put('/lists', list)
      .then(res => {
          this.getLists(list._id)
        })
        .catch(handleError)
    },
    removeList({commit, dispatch}, list) {
      api.delete('lists/' + list._id)
        .then(res => {
          dispatch('getLists', list.boardId)
          //this.getLists(list.boardId)
        })
        .catch(handleError)
    },
    getTasks({commit, dispatch}, {listId, boardId}) {
      api('boards/' + boardId + '/lists/' + listId + '/tasks')
        .then(res => {
          //debugger
           commit('setTasks', res.data.data)
        })
        .catch(handleError)
    },
    createTask({commit, dispatch}, task) {
      api.post('/tasks', task)
        .then(res => {
          //debugger
          // dispatch('getLists', task.boardId)
          dispatch('getTasks', {boardId: task.boardId, listId: task.listId})
          // console.log(res.data)
          // state[listId].push(res.data.data)
          // Vue.set(state[listId], state[listId].length, res.data.data)
          //this.getTasks(boardId, null, listId)          
        })
        .catch(handleError)
    },
    removeTask({commit, dispatch}, task) {
      api.delete('tasks/' + task._id)
        .then(res => {
          dispatch('getTasks', {boardId: task.boardId, listId: task.listId})
          //this.getTasks()
        })
        .catch(handleError)
    },
    moveTasks({ commit, dispatch }, task) {
      api.put('tasks/'+ task._id, task)
        .then(res => {
          dispatch('getTasks', {boardId: task.boardId, listId: task.listId})
        })
        .catch(handleError)
    },
    getComments({commit, dispatch}, {listId, boardId, taskId}) {
      api('boards/' + boardId + '/lists/' + listId + '/tasks/' + taskId + '/comments')
        .then(res => {
          commit('setComments', res.data.data)
          //state.comments[taskId] = res.data.data.comments
          // console.log(res.data.data.comments)
        })
        .catch(handleError)
    },
    createComment({commit, dispatch}, comment) {
      api.post('/comments', comment)
        .then(res => {
          dispatch('getComments', {boardId: comment.boardId, listId: comment.listId, taskId: comment.taskId})        
        })
        .catch(handleError)
    },
    removeComment({commit, dispatch}, comment) {
      api.delete('comments/' + comment._id)
        .then(res => {
          dispatch('getComments', {boardId: comment.boardId, listId: comment.listId, taskId: comment.taskId})
          //this.getLists(list.boardId)
        })
        .catch(handleError)
    },
    register({commit, dispatch}, user) {
      auth.post('register', user)
        .then(res => {
         // console.log(res)
          if (res.data.error) {
            return handleError(res.data.error)
          }
          //Redirect to page
          commit('setUser', res.data.data)
          //state.user = res.data.data
          router.push('/boards')
        })
        .catch(handleError)
    },
    login({commit, dispatch}, user) {
      auth.post('login', user)
        .then(res => {
          commit('setUser', res.data.data)
          //dispatch('getBoards')
          //state.user = res.data.data
          router.push('/boards')
          //console.log(res)
        }).catch(handleError)
    },
    getAuth({commit, dispatch}) {
      auth('authenticate')
        .then(res => {
          commit('setUser', res.data.data)
          //state.user = res.data.data
          if (state.user === null) {
            router.push('/')
          } else {
            router.push('/boards')
          }
        }).catch(err => {
          router.push('/login')
        })
    },
    logout({commit, dispatch}, user) {
      auth.delete('logout', user)
        .then(res => {
          router.push('/')
          //console.log(res)
        }).catch(handleError)
    }
  }

})

