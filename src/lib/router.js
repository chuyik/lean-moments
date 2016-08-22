import Vue from 'vue'
import VueRouter from 'vue-router'

const root = '/'

Vue.use(VueRouter)
const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  root: root
})

// Router Map
router.map({
    '/': {
        component: require('../components/Home')
    },
    '/moments': {
        component: require('../components/Moments')
    },
    '/plaza': {
        component: require('../components/Plaza')
    },
    '*': {
        component: require('../components/NotFound')
    }
})

// Broadcast an event on route changed 
router.afterEach(function ({to}) {
    let vm = to.router.app
    vm.$dispatch('onRouteChanged', to)
    vm.$broadcast('onRouteChanged', to)
})

export default router
