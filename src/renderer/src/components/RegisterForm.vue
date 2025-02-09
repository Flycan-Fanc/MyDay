<template>
  <form id="register-form" action="" method="">
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
    <input
      type="password"
      name="checkPassword"
      id="checkPassword"
      placeholder="确认密码"
    /><br />
    <input
      type="email"
      name="email"
      id="email"
      placeholder="邮箱"
    /><br />
    <button class="register-button">注册</button><br />
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

export default {
    name: 'RegisterForm',
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

