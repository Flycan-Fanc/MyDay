// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import PubSub from 'pubsub-js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// use

createApp(App).use(router).use(store).use(PubSub).use(mavonEditor).mount('#app')
