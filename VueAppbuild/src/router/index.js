import Vue from 'vue'
import Router from 'vue-router'
import guide from 'components/guide'
import index from 'components/index'
import home from 'components/home'
import search from 'components/search'
import my from 'components/my'
import exit from 'components/exit'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'guide',
      component: guide
    },
    {
    	path:'/index',
    	name: 'index',
      	component: index,
      	children:[
	      	{
	      		path:'/index/home',
		    	  component: home,
            alias: '/home'
	      	},
          {
            path:'/index/search',
            component: search,
            alias: '/search'
          },
          {
            path:'/index/my',
            component: my,
            alias: '/my'
          },
          {
            path:'/index/exit',
            component: exit,
            alias: '/exit'
          }
      	]
    }
  ]
})
