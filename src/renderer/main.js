import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import nedb from 'nedb'
import './common/scss/index.scss'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = new nedb({
  filename: './data/todoList.db',
  autoload: true
})
// import fs from 'fs'
// import path from 'path'

// let fileContents = fs.readFileSync(path.join(__static, '/text.txt'), 'utf8')

// console.log(fileContents)


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
