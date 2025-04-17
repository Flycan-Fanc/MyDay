<template>
  <form id="login-form" @submit.prevent> <!-- 阻止默认提交行为 -->
    <input
      type="text"
      name="username"
      id="username"
      placeholder="用户名"
    /><br />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="密码"
    /><br />
    <button class="login-button" @click="login">登录</button><br />
    <span class="rememberMe-container">
      <input type="checkbox" name="rememberMe" id="rememberMe" />
      <span id="remember">记住我(30天免登录)</span>
    </span>
    <span class="agree-container">
      <input
        type="checkbox"
        name="confirmAgreement"
        id="confirmAgreement"
      />
      <span id="agreement"
        >已阅读并同意<span style="color: #2eafc5">《用户注册协议》</span
        >与<span style="color: #2eafc5">《隐私协议》</span>
      </span>
    </span>
  </form>
</template>

<script>
import PubSub from "pubsub-js";

export default {
  name: 'RegisterForm',
  methods:{
    login(){
      // TODO: 登录验证逻辑
      PubSub.publish('login')
    }
  },
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
