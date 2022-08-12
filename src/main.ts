import { createApp } from 'vue'
import { DatePicker } from 'ant-design-vue';
// import './style.css'
import './css/shop.css'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import Anyd from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'

const app = createApp(App).use(router).use(Anyd).use(DatePicker)

app.use(store, key)

app.mount('#app')
