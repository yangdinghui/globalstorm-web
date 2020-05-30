// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//video-player
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
//覆盖video.js中的按钮样式
require('@/assets/video.css')
// require('videojs-contrib-hls/dist/videojs-contrib-hls')
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);

Vue.use(ElementUI);// 使用Element UI

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
