require('es6-promise').polyfill();
import Vue from 'vue';
import App from '../../src/App.vue';
import VueRainbow from 'vue-rainbow';
import './index.less';
Vue.use(VueRainbow);

new Vue({
  el: 'body',
  components: {
    'app': App
  }
})
