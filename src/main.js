import { createApp } from 'vue'
import router from './router'

import { Button, Col, Image, Input, Row, Spin, Tag, } from 'ant-design-vue';

import store from './store'
import App from './App.vue'

createApp(App)
    .use(router)
    .use(store)
    .use(Button)
    .use(Col)
    .use(Row)
    .use(Input)
    .use(Spin)
    .use(Image)
    .use(Tag)
    .mount('#app')
    
// 这.......有啥方法不这么干，
