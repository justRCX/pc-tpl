import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import pcTpl from '../packages/index'
Vue.use(pcTpl)
new Vue({
  render: h => h(App),
}).$mount('#app')
