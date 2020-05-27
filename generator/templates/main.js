import conf from './conf'
import App from './App.vue'

var prototype = {}

conf(App,prototype).$mount('#app')
