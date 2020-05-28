import Vue from 'vue'
import App from './App.vue'
import lodash from 'lodash'
import 'vant/lib/index.less'
import request from './request'
import router from './router'
import store from './store'
import {Button, Field, Picker, Popup, Dialog, Icon} from 'vant'

Vue.use(Button)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Dialog)
Vue.use(Icon)

Vue.config.productionTip = false

Vue.prototype._ = lodash
Vue.prototype.$request = request
Vue.prototype.$urls = request.urls

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
