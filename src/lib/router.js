import Vue from 'vue'
import VueRouter from 'vue-router'
import AV from 'leancloud-storage'

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
        component: require('../pages/Home'),
        public: true
    },
    '/moments': {
        component: require('../pages/Moments'),
        public: true
    },
    '/multi-moments': {
        component: require('../pages/MomentsMulti'),
        public: true
    },
    '/view/moments': {
        component: require('../components/Moments')
    },
    '/view/plaza': {
        component: require('../components/Plaza'),
        public: true
    },
    '*': {
        component: require('../pages/NotFound'),
        public: true
    }
})

router.beforeEach(({to, next}) => {
    if (to.public || AV.User.current())
        return next()
    router.go({
        path: '/view/plaza',
        query: {needLogin: true}
    })
})

// Broadcast an event on route changed 
router.afterEach(function ({to}) {
    let vm = to.router.app
    vm.$dispatch('onRouteChanged', to)
    vm.$broadcast('onRouteChanged', to)
})

export default router
