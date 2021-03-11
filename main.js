import Vue from 'vue'
import App from './App'
import {myRequsest} from 'util/api.js'

Vue.prototype.$myRequsest = myRequsest
Vue.filter('formatDate', function(value) {
	value = value.slice(5)
	return value
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
