<script setup>
//
// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Login from './pages/Login.vue'
import Layout from './pages/Layout.vue'
import Editor from './components/Editor.vue'
import PubSub from "pubsub-js";
//import userStore from "./utils/localStores/userStore";

let isLogin = ref(false)

let pid_login = ''
let pid_logout = ''

let user_Store = null  // 用户electron-store

const login = ()=>{
  isLogin.value = true
  console.log(isLogin)
}
const logout = ()=>{
  isLogin.value = false
}

// // 由App.vue管理全局store
// // 用户 electron-store获取
// const getUserStore = (userId)=>{
//   return userStore
// }
// // 用户 electron-store设置
// const setUserStore = (userId) =>{
//   user_Store = new userStore(userId)
// }

onMounted(()=>{
  pid_login = PubSub.subscribe('login', login)
  pid_logout = PubSub.subscribe('logout', logout)

  // TODO:在onMounted里面编写验证是否有用户已经登陆的逻辑
})
onBeforeUnmount(()=>{
  PubSub.unsubscribe(pid_login)
  PubSub.unsubscribe(pid_logout)
  // TODO:编写electron-store存储的逻辑
})
</script>

<template>
  <Login v-if="!isLogin"></Login>
  <Layout v-if="isLogin"></Layout>
</template>
<style>
* {
  margin:0;
  padding:0;
}
</style>
