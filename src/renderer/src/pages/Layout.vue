<template>
  <div id="layout-container">
    <div id="sidebar">
      <div class="logo-area">
        <span class="AppLogo">MyDay</span>
        <span class="app-slogan" style="color: #7d7979; font-size: 15px"
        >计划、日记、灵感</span
        >
      </div>
      <div class="list-area">
        <ul>
          <li class="lable selected">
            <img src="../assets/icon/ic_sidebar_today.png" alt="" /><span
          >Today</span
          >
          </li>
          <li class="lable">
            <img src="../assets/icon/ic_sidebar_7days.png" alt="" /><span
          >7 Days</span
          >
          </li>
          <li class="lable">
            <img src="../assets/icon/ic_sidebar_diary.png" alt="" /><span
          >Diary</span
          >
          </li>
          <li class="lable">
            <img src="../assets/icon/ic_sidebar_ins.png" alt="" /><span
          >Inspiration</span
          >
          </li>
          <li class="lable">
            <img src="../assets/icon/ic_sidebar_flag.png" alt="" /><span
          >Tags</span
          >
          </li>
        </ul>
      </div>
      <div class="person-area">
        <div class="img-container">
          <img src="../assets/avatar/useravatar.png" alt="" id="avatar" />
        </div>
        <span id="username">Username</span>
      </div>
    </div>
    <div id="window-action">
      <img src="../assets/icon/ic_action_minus.png" alt="" @click="minimizeWindow()"/>
      <img :src="windowImg" alt="窗口变化" @click="changeWindowSize()"/>
      <img src="../assets/icon/ic_action_cancel.png" alt="" @click="closeWindow()"/>
    </div>
    <div id="content">
      <Inspiration></Inspiration>
    </div>
  </div>
</template>

<script>
import Today from '../pages/Today.vue'
import OneWeek from "./OneWeek.vue";
import DiaryEditor from "./DiaryEditor.vue";
import Diary from "./Diary.vue";
import Inspiration from "./Inspiration.vue";
import expandWindowImg from "../assets/icon/ic_action_expand.png";
import collapseWindowImg from "../assets/icon/ic_action_collapse.png";
const windowControls = window.api.windowControls;
export default {
  name: "Layout",
  created(){
    windowControls.enlargeWindow(1200,675);
  },
  components:{
    Today,
    OneWeek,
    DiaryEditor,
    Diary,
    Inspiration,
  },
  data(){
    return{
      windowImg:expandWindowImg,
      isMaxWindow:false,
    }
  },
  methods: {
    minimizeWindow() {
      windowControls.minimizeWindow();
    },
    closeWindow() {
      // ToDo: 后续添加一些确认关闭窗口的提示
      windowControls.closeWindow();
    },
    changeWindowSize() {
      this.isMaxWindow = !this.isMaxWindow;
      console.log(this.isMaxWindow)
      if(!this.isMaxWindow){
        windowControls.enlargeWindow(1200, 675);
        this.windowImg = expandWindowImg;
      } else{
        windowControls.maximize();
        this.windowImg = collapseWindowImg;
      }
    }
  }
}


</script>

<style scoped>
html,body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#layout-container {
  width: 100vw;
  height: 100vh;
  background: url("../assets/background/background.png") no-repeat;
  background-size: cover;
}
#sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  float:left;
  width: 25%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.4);
}

#sidebar .logo-area {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  padding-top: 40px;
  text-align: center;
  overflow: hidden;
  margin-bottom: 20px;
}

.logo-area .AppLogo {
  display: block;
  color: #2eafc5;
  font-size: 30px;
  font-weight: 900;
  text-shadow: 1px 1px 3px rgba(142, 142, 142, 0.5);
}

.logo-area .app-slogan {
  display: block;
}
#sidebar .list-area {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: 30%;
}
.list-area li {
  display: block;
  list-style: none;
  /* vertical-align: baseline; */
  height: 45px;
  margin-bottom: 10px;
  cursor: pointer;
}
.list-area li:hover,
li.selected {
  background-color: #fff;
  border-radius: 10px;
  color: #2e4ac5;
  font-weight: bold;
  width: 105%;
}
.list-area img {
  display: inline-block;
  height: 39px; /*height + 2*margin-top = li的 height45*/
  vertical-align: center;
  margin-left: 25%;
  margin-right: 15px;
  /* margin-top: 3px; */
}
.list-area span {
  display: inline-block;
  height: 100%;
  line-height: 45px;
  font-size: 15px;
  font-weight: bold;
  vertical-align: top;
}
.person-area{
  position:absolute;
  display:flex;
  justify-content: center;
  align-items: center;
  width:100%;
  bottom: 10%;
  background-color: orange;
}
.person-area .img-container {
  display: inline-block;
  width: 60px; /* 设置容器宽度 */
  height: 60px; /* 设置容器高度 */
  overflow: hidden; /* 隐藏超出容器的部分 */
  border-radius: 50%; /* 使容器呈现圆形 */
  margin-right: 20px;
}
.person-area .img-container #avatar {
  height: 100%;
  object-fit: cover;
}
.person-area #username {
  display: inline-block;
  line-height: 60px;
  vertical-align: top;
  font-weight: bold;
  font-size: 15px;
}
#window-action {
  position: absolute;
  display:flex;
  justify-content: flex-end;
  align-items: center;
  height:40px;
  width: 100%;
  -webkit-app-region: drag;
}
#window-action img {
  width: 25px;
  padding-left:20px;
  padding-top: 10px;
  -webkit-app-region: no-drag;
  -webkit-user-drag: none;
}
#window-action :nth-last-child(1) {
  margin-right: 10px;
}
#content {
  height:100vh;
  overflow-x: auto;
  overflow-y: hidden;
  margin-left:28%;
}
</style>

