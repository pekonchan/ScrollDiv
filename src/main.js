import { createApp } from 'vue'
import App from './App.vue'
import ScrollDiv from '../package/index.js'
console.log('🚀 ~ file: main.js:4 ~ ScrollDiv:', ScrollDiv);

const app = createApp(App)
app.use(ScrollDiv,{
    barStyle: {
        backgroundColor: 'pink', // 滚动条的颜色
    },
    size: 6, // 滚动条的大小
    offset: 2 // 滚动条距离边界的偏移量
}).mount('#app')