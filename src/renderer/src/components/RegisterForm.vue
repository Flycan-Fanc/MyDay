<template>
  <form id="register-form" @submit.prevent>
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
    <input
      type="password"
      name="checkPassword"
      id="checkPassword"
      placeholder="确认密码"
      v-model="checkPassword"
    /><br />
    <input
      type="email"
      name="email"
      id="email"
      placeholder="邮箱"
      v-model="email"
    /><br />
<!--    <button class="register-button" @click="register()">注册</button><br />-->
    <el-button class="register-button" type="primary" @click="register()" :loading="loading">注册</el-button><br />
    <span class="agree-container">
            <input
              type="checkbox"
              name="confirmAgreement"
              id="confirmAgreement"
              v-model="isAgree"
            />
            <span id="agreement"
            >已阅读并同意<span style="color: #2eafc5">《用户注册协议》</span
            >与<span style="color: #2eafc5">《隐私协议》</span>
            </span>
          </span>
  </form>
</template>

<script>

import {authAPI} from '../utils/api'

export default {
  name: 'RegisterForm',
  data(){
    return {
      userAccount: '',
      password: '',
      checkPassword: '',
      email: '',
      isAgree: false,
      loading: false,
    }
  },
  methods: {
    register(){
      if(this.userAccount === '' || this.password === ''){
        ElMessage({
          message: '用户名或密码不能为空',
          type: 'error',
          number:60,
          duration: 2000
        })
      } else if(this.password !== this.checkPassword){
        ElMessage({
          message: '两次输入的密码不一致',
          type: 'error',
          number: 60,
          duration: 2000
        })
      } else if(!this.isAgree){
        ElMessage({
          message: '请先同意用户注册协议与隐私协议',
          type: 'error',
          number:60,
          duration: 2000
        })
      } else{
        this.loading = true
        // TODO：注册逻辑
        authAPI.register(this.userAccount, this.email, this.password).then((res)=>{
          console.log(res)
          this.loading = false
          // TODO:注册成功，跳转？
          ElMessage({
            message: '注册成功，请登录',
            type: 'success',
            number:60,
            duration: 2000
          })
        }).catch((err)=>{
          console.log(err)
          this.loading = false
          ElMessage({
            message:err.message,
            type:'error',
          })
        })
      }
    },
  }
}


</script>

<style scoped>
#register-form {
  margin-top: 20px;
}
#register-form input {
  width: 250px;
  height: 35px;
  margin: 8px 0;
  outline-style: none;
  border: 2px solid #aeacac;
  border-radius: 5px;
  text-indent: 2em;
  font-size: 15px;
  color: #aeacac;
}
#register-form input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #aeacac;
}
#register-form input::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #aeacac;
}
#register-form input::-webkit-input-placeholder {
  /* Chrome, Safari, Opera */
  color: #aeacac;
}
#register-form .register-button {
  width: 250px;
  height: 35px;
  margin: 8px 0;
  background-color: #2eafc5;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 15px;
}
#register-form .agree-container {
  display: inline-block;
  margin: 0 45px;
  line-height: 1.5;
}
#register-form #confirmAgreement {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: top; /* 垂直居中对齐文本 */
}
#register-form #agreement {
  display: inline-block;
  width: 90%;
  text-align: left;
}
</style>

