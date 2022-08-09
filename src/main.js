import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import MyForm from '@/components/FormAndTable/form.vue'
import MyTable from '@/components/FormAndTable/table.vue'
import '@/assets/style/global-style.scss'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('MyForm', MyForm)
Vue.component('MyTable', MyTable)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
