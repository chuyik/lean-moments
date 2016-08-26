import './lib/leancloud'

import Vue from 'vue'
import App from './App'
import router from './lib/router'
import './lib/push'
import './lib/moment'

// Settings
Vue.config.debug = process.env.NODE_ENV !== 'production'

router.start(App, 'app')

