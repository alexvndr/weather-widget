import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/*',
      redirect: { name: 'list' }
    }
  ],
  mode: 'abstract',
  linkActiveClass: 'active'
})
