import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import * as monaco from "monaco-editor"
import { loader } from '@guolao/vue-monaco-editor'

const app = createApp(App)

// 使用路由
app.use(router)

app.mount('#app')




loader.config({ monaco })