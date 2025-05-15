<template>
  <form id="login-form" @submit.prevent>
    <!-- 阻止默认提交行为 -->
    <input
      type="text"
      name="username"
      id="username"
      placeholder="用户名"
      v-model="userAccount"
    /><br />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="密码"
      v-model="password"
    /><br />
    <el-button class="login-button" type="primary" @click="login" :loading="loading">登录</el-button
    ><br />
    <span class="rememberMe-container">
      <input type="checkbox" name="rememberMe" id="rememberMe" v-model="isRemember" />
      <span id="remember">记住我(30天免登录)</span>
    </span>
    <span class="agree-container">
      <input type="checkbox" name="confirmAgreement" id="confirmAgreement" v-model="isAgree" />
      <span id="agreement"
        >已阅读并同意<span style="color: #2eafc5">《用户注册协议》</span>与<span
          style="color: #2eafc5"
          >《隐私协议》</span
        >
      </span>
    </span>
  </form>
</template>

<script>
import PubSub from 'pubsub-js'
//import appStore from "../utils/localStores/appStore";
import userAbout from '../store/modules/userAbout'
import store from '../store/store'
import { dataInit } from '../utils/dataInit'

import { authAPI } from '../utils/api'

export default {
  name: 'LoginForm',
  data() {
    return {
      userAccount: '',
      password: '',
      isRemember: false,
      isAgree: false,
      userStore: null,
      loading: false
    }
  },
  methods: {
    login() {
      // 测试用户，仅在开发环境使用
      if (this.userAccount === '@testAdmin' && import.meta.env.MODE === 'development') {
        PubSub.publish('login')
        return
      }
      if (this.userAccount === '' || this.password === '') {
        ElMessage({
          message: '用户名或密码不能为空',
          type: 'error',
          number: 60,
          duration: 2000
        })
      } else if (!this.isAgree) {
        ElMessage({
          message: '请先同意用户注册协议与隐私协议',
          type: 'error',
          number: 60,
          duration: 2000
        })
      } else {
        this.loading = true
        authAPI
          .login(this.userAccount, this.password)
          .then((res) => {
            console.log(res)
            localStorage.setItem('token', res.token)
            this.loading = false
            // 提示成功登录，并跳转
            ElMessage({
              message: '登录成功',
              type: 'success',
              number: 60,
              duration: 2000
            })
            dataInit(res.user)  // 初始化数据
            PubSub.publish('login')  // 跳转页面
          })
          .catch((err) => {
            console.log(err)
            this.loading = false
            ElMessage({
              message: err.message,
              type: 'error'
            })
          })

        // 若失败则提示
      }
    }
  }
}
</script>

<style scoped>
#login-form {
  margin-top: 20px;
}
#login-form input {
  width: 250px;
  height: 35px;
  margin: 12px 0;
  outline-style: none;
  border: 2px solid #aeacac;
  border-radius: 5px;
  text-indent: 2em;
  font-size: 15px;
  color: #aeacac;
}
#login-form input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #aeacac;
}
#login-form input::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #aeacac;
}
#login-form input::-webkit-input-placeholder {
  /* Chrome, Safari, Opera */
  color: #aeacac;
}
#login-form .login-button {
  width: 250px;
  height: 35px;
  margin: 8px 0;
  background-color: #2eafc5;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 15px;
  cursor: pointer;
}
#login-form .rememberMe-container {
  display: inline-block;
  width: 250px;
  margin: 10px 45px 0;
  line-height: 1.5;
  text-align: left;
}
#login-form #rememberMe {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: middle; /* 垂直居中对齐文本 */
  margin-left: 2px;
}
#login-form #remember {
  display: inline-block;
  width: 90%;
  text-align: left;
}
#login-form .agree-container {
  display: inline-block;
  margin: 0 45px;
  line-height: 1.5;
  width: 250px;
}
#login-form #confirmAgreement {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: top; /* 垂直居中对齐文本 */
}
#login-form #agreement {
  display: inline-block;
  width: 90%;
  text-align: left;
}
</style>
