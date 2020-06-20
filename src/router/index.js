import Vue from 'vue'
import Router from 'vue-router'
import GamePage from '@/components/GamePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GamePage',
      component: GamePage
    }
  ]
})
