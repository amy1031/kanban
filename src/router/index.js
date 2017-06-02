import Vue from 'vue'
import Router from 'vue-router'
import Boards from '../components/Boards'
import Board from '../components/Board'
import Lists from '../components/Lists'
import Tasks from '../components/Tasks'
import Comments from '../components/Comments'
import Register from '../components/Register'
import Login from '../components/Login'
import Home from '../components/Home'
import App from '../App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/boards',
      name: 'Boards',
      component: Boards
    },{
      path: '/boards/:id',
      name: 'Board',
      component: Board
    },
    {
      path: '/boards/:id/lists/:listId',
      name: 'Lists',
      component: Lists
    },
    {
      path: '/boards/:id/lists/:listId/tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/boards/:id/lists/:listId/tasks/:taskId/comments',
      name: 'Comments',
      component: Comments
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: '/',
    }
  ]
})
