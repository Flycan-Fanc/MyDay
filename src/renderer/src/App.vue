<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import Login from './pages/Login.vue'
import Layout from './pages/Layout.vue'
import PubSub from 'pubsub-js'
import { authAPI } from './utils/api'
import { dataInit } from './utils/dataInit'
import { dataSync } from './utils/dataSync'
import { clearSession } from './utils/session'

const isLogin = ref(false)

let pidLogin = ''
let pidLogout = ''

const login = () => {
  isLogin.value = true
}

const logout = async () => {
  await clearSession()
  isLogin.value = false
}

onBeforeMount(async () => {
  const loginUserId = await window.api.electronStore.appStore.getLoginUserId()
  if (loginUserId === -1) {
    isLogin.value = false
    return
  }

  await window.api.electronStore.appStore.setUserStore(loginUserId)
  const token = await window.api.electronStore.userStore.getUserToken()

  if (!token) {
    await clearSession()
    isLogin.value = false
    return
  }

  try {
    localStorage.setItem('token', token)
    const res = await authAPI.verifyToken(token)
    await dataInit(res.user)
    try {
      await dataSync()
    } catch (syncErr) {
      console.error(syncErr)
    }
    await window.api.electronStore.userStore.setUserToken(token)
    await window.api.electronStore.appStore.addUserIndex(res.user)
    isLogin.value = true
  } catch (err) {
    console.log(err)
    await clearSession()
    isLogin.value = false
  }
})

onMounted(() => {
  pidLogin = PubSub.subscribe('login', login)
  pidLogout = PubSub.subscribe('logout', logout)
})

onBeforeUnmount(() => {
  PubSub.unsubscribe(pidLogin)
  PubSub.unsubscribe(pidLogout)
})
</script>

<template>
  <Login v-if="!isLogin"></Login>
  <Layout v-if="isLogin"></Layout>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
