<script setup>
//
// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
import Login from './pages/Login.vue'
import Layout from './pages/Layout.vue'
import Editor from './components/Editor.vue'
</script>

<template>
<!--  <img alt="logo" class="logo" src="./assets/electron.svg" />-->
<!--  <div class="creator">Powered by electron-vite</div>-->
<!--  <div class="text">-->
<!--    Build an Electron app with-->
<!--    <span class="vue">Vue</span>-->
<!--  </div>-->
<!--  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>-->
<!--  <div class="actions">-->
<!--    <div class="action">-->
<!--      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>-->
<!--    </div>-->
<!--    <div class="action">-->
<!--      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>-->
<!--    </div>-->
<!--  </div>-->
<!--  <Versions />-->
  <Layout></Layout>
</template>
<style>
* {
  margin:0;
  padding:0;
}
</style>
