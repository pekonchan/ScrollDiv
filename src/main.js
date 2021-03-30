import Vue from 'vue'
import ScrollDiv from '../packages'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ScrollDiv,{
  barStyle: {
    backgroundColor: 'pink', // 滚动条的颜色
  },
  size: 6, // 滚动条的大小
  offset: 2 // 滚动条距离边界的偏移量
})

new Vue({
  render: h => h(App),
}).$mount('#app')
