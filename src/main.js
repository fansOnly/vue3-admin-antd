import { createApp } from 'vue'
import App from './App.vue'

import { message } from 'ant-design-vue'

import router from './router'
import store from './store'
import antdComponent from './utils/antdComponents'

import Auth from './directive/auth'

import './assets/styles/index.less'

const app = createApp(App)

app.config.globalProperties.$message = message

app.use(Auth)
    .use(router)
    .use(antdComponent)
    .use(store)
app.mount('#app')
