import Vue from 'vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import lodash from 'lodash'
import 'vant/lib/index.less'
import request from './request'

Vue.config.productionTip = false
Vue.use(Vant)

Vue.prototype._ = lodash
Vue.prototype.$request = request
Vue.prototype.$urls = request.urls

export default (App,prototype) => {
  if (prototype.length) {
    prototype.map((value, key) => {
      Vue.prototype[key] = value
    })
  }

  return new Vue({
    router,
    store,
    render: h => h(App)
  })
}
