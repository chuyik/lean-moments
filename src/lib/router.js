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
        component: require('../pages/Home')
    },
    '/moments': {
        component: require('../pages/Moments')
    },
    '/multi-moments': {
        component: require('../pages/MomentsMulti')
    },
    '/view/moments': {
        component: require('../components/Moments')
    },
    '/view/plaza': {
        component: require('../components/Plaza')
    },
    '*': {
        component: require('../pages/NotFound')
    }
})

// Broadcast an event on route changed 
router.afterEach(function ({to}) {
    let vm = to.router.app
    vm.$dispatch('onRouteChanged', to)
    vm.$broadcast('onRouteChanged', to)
})

export default router
