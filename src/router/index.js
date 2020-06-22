import Vue from 'vue'
import Router from 'vue-router'
import GamePage from '@/components/GamePage'
import Demo from '@/components/Demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GamePage',
      component: GamePage
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    }
  ]
})
