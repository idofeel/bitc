import { createApp } from 'vue'
import { Button } from 'ant-design-vue';
import router from './router'
import store from './store'
import App from './App.vue'
createApp(App)
    .use(router)
    .use(store)
    .use(Button)
	.mount('#app')
