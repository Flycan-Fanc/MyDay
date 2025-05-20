<template>
  <div id="AppCover">
    <img
      class="AppCover-img"
      src="../assets/background/AppCover_BlueForest.jpg"
      alt="Blue Forest App Cover"
    />
    <span class="login-slogan"
    >Live with heart,<br />capture every part.</span
    >
    <span class="login-container">
        <span class="window-controls"
        ><div class="drag-region"></div>
          <div class="control-region">
            <img src="../assets/icon/ic_action_minus.png" id="minimize" class="window-control" alt="最小化"></img>
            <img src="../assets/icon/ic_action_cancel.png" id="close" class="window-control" alt="关闭"></img>
          </div>
        </span>
        <span class="AppLogo">MyDay</span>
        <span class="app-slogan" style="color: #7d7979; font-size: 15px"
        >计划、日记、灵感</span
        >
        <ul class="change">
          <li class="login active" @click="toLogin" ref="loginBtn">
            账号登陆<br />
            <div class="decoration active"></div>
          </li>
          <li class="register" @click="toRegister" ref="registerBtn">
            账号注册<br />
            <div class="decoration"></div>
          </li>
        </ul>
        <LoginForm v-if="isLogin"></LoginForm>
        <RegisterForm v-if="!isLogin"></RegisterForm>
      </span>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";
export default {
  name:'Login',
  components: {LoginForm,RegisterForm},
  mounted(){
    const windowControls = window.api.windowControls;
    if (windowControls) {
      document.getElementById('close').addEventListener('click', () => {
        console.log("close");
        windowControls.closeWindow();
      });

      document.getElementById('minimize').addEventListener('click', () => {
        console.log("minimize");
        windowControls.minimizeWindow();
      });
    }
  },
  data(){
    return {
      isLogin:true,
      isLoginPage:true
    }
  },
  methods:{
    toLogin(){
      this.$refs.loginBtn.classList.add('active');
      this.$refs.loginBtn.children[1].classList.add('active');
      this.$refs.registerBtn.classList.remove('active');
      this.$refs.registerBtn.children[1].classList.remove('active');
      this.isLogin = true;
    },
    toRegister(){
      this.$refs.registerBtn.classList.add('active');
      this.$refs.registerBtn.children[1].classList.add('active');
      this.$refs.loginBtn.classList.remove('active');
      this.$refs.loginBtn.children[1].classList.remove('active');
      this.isLogin = false;
    }
  }
}


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#AppCover {
  position: relative;
  margin: auto;
  width: 950px;
  height: 600px;
}

.AppCover-img {
  margin-top: 30px;
  width: 950px;
  height: 540px;
  -webkit-app-region: drag;
  -webkit-user-drag: none;
  user-select: none;
}
.login-slogan {
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  left: 10%;
  top: 15%;
  user-select: none;
}
.login-container {
  -webkit-app-region: no-drag;
  box-sizing: border-box;
  position: absolute;
  float: right;
  right: 10%;
  width: 340px;
  height: 600px;
  background-color: #fff;
  box-shadow: 3px 3px 10px 0 #5f5e5e;
  text-align: center;
}
.window-controls {
  display: flex;
  width:100%;
  height:40px;
  margin-bottom: 20px;
}
.drag-region{
  -webkit-app-region: drag;
  flex:4;
}
.control-region{
  flex:1;

}
.window-controls img{
  width:30px;
  cursor:pointer;
  user-select: none;
  -webkit-user-drag: none;
}
.login-container .AppLogo {
  color: #2eafc5;
  font-size: 30px;
  font-weight: 900;
  text-shadow: 1px 1px 3px rgba(142, 142, 142, 0.5);
  user-select: none;
}
.login-container .app-slogan {
  display: block;
  user-select: none;
}
.login-container .change {
  margin-top: 40px;
  color: #8c8a8a;
  font-size: 20px;
  font-weight: bold;
  user-select: none;
}
.login-container .change > li {
  display: inline-block;
  list-style: none;
  margin: 0 20px;
}
.login-container .change > li.active {
  color: #2eafc5;
}
.login-container .change .decoration.active {
  margin-top: 5px;
  background-color: #2eafc5;
  width: 100px;
  height: 5px;
}

</style>

