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
import { dataInit } from "./utils/dataInit";
import store from "./store/store";
import { dataSync } from "./utils/dataSync";



let loginUser = {}

let isLogin = ref(false)

let pid_login = ''
let pid_logout = ''

let user_Store = null  // 用户electron-store

const login = ()=>{
  isLogin.value = true
  console.log(isLogin)
}
const logout = async ()=>{
  isLogin.value = false
}

onBeforeMount(async ()=>{
  // TODO:在onBeforeMount里面编写验证是否有用户已经登陆的逻辑
  // 获取登陆的用户
  let loginUserId = await window.api.electronStore.appStore.getLoginUserId()
  console.log('id:'+loginUserId)
  if(loginUserId === -1){
    console.log('未登录')
    isLogin.value = false
  }else{
    // 0.初始化userStore
    await window.api.electronStore.appStore.setUserStore(loginUserId)
    // 验证token
    let token = await window.api.electronStore.userStore.getUserToken()
    try {
      // let res = await authAPI.verifyToken(token).catch(err => {
      //   // 如果是网络错误，返回一个特殊标记（如 {networkError: true}）
      //   if (err.message.includes('Network Error') || err.code === 'ERR_INTERNET_DISCONNECTED') {
      //     return { networkError: true };
      //   }
      //   throw err; // 其他错误继续抛出
      // });  // 为了后续改造支持离线使用

      // 如果是网络错误，跳过验证，使用本地数据
      // if (res.networkError) {
      //   console.log('网络不可用，使用本地缓存 Token');
      //   const localUser = await window.api.electronStore.userStore.getUserInfo(); // 尝试读取本地用户数据
      //   if (localUser) {
      //     isLogin.value = true;
      //     return; // 直接返回，不执行后续初始化
      //   } else {
      //     isLogin.value = false; // 无本地数据则视为未登录
      //     return;
      //   }
      // }

      let res = await authAPI.verifyToken(token)
      console.log('res:'+JSON.stringify(res))
      await dataInit(res.user)
      await dataSync()
      await window.api.electronStore.userStore.setUserToken(token) // 将token存入userStore
      await window.api.electronStore.appStore.addUserIndex(res.user) // 将登录用户存入appStore的用户索引
      isLogin.value = true
    } catch(err){
      console.log(err)
      isLogin.value = false
    }
    // TODO：获取数据的逻辑
    console.log(JSON.stringify(loginUser))

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
