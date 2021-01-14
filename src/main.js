import { createApp } from 'vue'
import { Button, Col, Input, Row, Spin } from 'ant-design-vue';
import router from './router'
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
	.mount('#app')
// 这.......