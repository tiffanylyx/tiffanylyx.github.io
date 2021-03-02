/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import global_ from './components/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
Vue.config.productionTip = false

new Vue({
    data: function(){
        return {
            age_select: [],
        }
    },
  render: h => h(App)
}).$mount('#app')
