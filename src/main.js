/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    data: function(){
        return {
            age_select: [],
        }
    },
  render: h => h(App)
}).$mount('#app')
