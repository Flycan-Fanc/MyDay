<script setup>
//
// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import Login from './pages/Login.vue'
import Layout from './pages/Layout.vue'
import Editor from './components/Editor.vue'
import PubSub from "pubsub-js";
//import userStore from "./utils/localStores/userStore";
import { authAPI } from './utils/api'

const store = window.api.electronStore

let loginUser = {}

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

onBeforeMount(async ()=>{
  // TODO:在onBeforeMount里面编写验证是否有用户已经登陆的逻辑
  // 获取登陆的用户
  let loginUserId = await store.appStore.getLoginUserId()
  if(loginUserId === -1){
    console.log('未登录')
    isLogin.value = false
  }else{
    // 验证token
    loginUser = store.appStore.findUserById(loginUserId)
    let token = loginUser.token
    try {
      let res = await authAPI.verifyToken(token)
    } catch(err){
      console.log(err)
      isLogin.value = false
    }
    // TODO：获取数据的逻辑
    isLogin.value = true
  }
})

onMounted(()=>{
  pid_login = PubSub.subscribe('login', login)
  pid_logout = PubSub.subscribe('logout', logout)


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
