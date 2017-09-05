// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from '@/store'
import App from '@/App'
import router from '@/router'
import axios from '@/extends/http'
import i18n from '@/extends/langLoader'
import ElementUI from 'element-ui'
import api from '@/api'
import AlloyFinger from 'alloyfinger'
import AlloyFingerVue from '@/../node_modules/alloyfinger/vue/alloy_finger.vue.js'

window.AlloyFinger=AlloyFinger

Vue.use(AlloyFingerVue);

Vue.config.productionTip = false

Vue.prototype.axios = axios;
Vue.use(api)
Vue.use(ElementUI)

//Element UI, 兼容 vue-i18n 6.x ，方案
Vue.locale = function() {}


new Vue({
    el: '#app',
    store,
    axios,
    router,
    i18n,
    render: h => h(App)
})
