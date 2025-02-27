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
        <ul class="page-selector">
          <li class="lable selected" id="todayBtn">
            <img src="../assets/icon/ic_sidebar_today.png" alt="" />
            <span>Today</span>
          </li>
          <li class="lable" id="oneWeekBtn">
            <img src="../assets/icon/ic_sidebar_7days.png" alt="" />
            <span>7 Days</span>
          </li>
          <li class="lable" id="diaryBtn">
            <img src="../assets/icon/ic_sidebar_diary.png" alt="" />
            <span>Diary</span>
          </li>
          <li class="lable" id="insBtn">
            <img src="../assets/icon/ic_sidebar_ins.png" alt="" />
            <span>Inspiration</span>
          </li>
          <li class="lable" id="tagsBtn" @click="dialogTagVisible = !dialogTagVisible">
            <img src="../assets/icon/ic_sidebar_flag.png" alt="" />
            <span>Tags</span>
<!--            <img src="../assets/icon/ic_action_add.png" alt="" class="createTagBtn">-->
          </li>
        </ul>
      </div>
      <!-- 标签管理对话框 -->
      <el-dialog
        id="tagPage"
        v-model="dialogTagVisible"
        title="标签管理" width="500"
        center align-center
        :append-to-body="true"
      >
        <div id="userTags-area">
          <div class="tag-editor">
            <el-input v-model="tagInput" style="width: 160px" placeholder="添加标签" />
            <div class="tagTool">
              <el-button :icon="Select" type="primary"/>
              <el-button :icon="CloseBold" type="danger"/>
            </div>
          </div>
          <el-scrollbar class="userTagList-box" height="350px">
            <div class="tagList" v-for="item in userTagList" :key="item.id">
              <el-tag class="tag" :color="item.color" size="large" style="height:50px;margin-bottom: 10px;">{{item.name}}
                <el-button :icon="Edit" size="small"></el-button>
                <el-button :icon="Delete" size="small"></el-button>
              </el-tag>
            </div>
          </el-scrollbar>
        </div>
      </el-dialog>
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
      <DiaryEditor></DiaryEditor>
    </div>
  </div>
</template>

<script>
import Today from '../pages/Today.vue'
import OneWeek from "./OneWeek.vue";
import DiaryEditor from "./DiaryEditor.vue";
import Diary from "./Diary.vue";
import Inspiration from "./Inspiration.vue";
import InsEditor from "./InsEditor.vue";
import InsView from "./InsView.vue";
import DiaryView from "./DiaryView.vue";

import expandWindowImg from "../assets/icon/ic_action_expand.png";
import collapseWindowImg from "../assets/icon/ic_action_collapse.png";

import {Select,CloseBold,Edit,Delete} from "@element-plus/icons-vue";

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
    InsEditor,
    InsView,
    DiaryView,
  },
  data(){
    return{
      windowImg:expandWindowImg,
      isMaxWindow:false,
      // icon
      Select,
      CloseBold,
      Edit,
      Delete,
      // tag
      dialogTagVisible:false,
      tagInput:'',
      userTagList:[
        {id:1,name:"标签1",color:'#2da322'},
        {id:2,name:"标签2",color:'#89eeff'},
        {id:3,name:"标签3",color:'#D71CFF'},
        {id:4,name:"标签4",color:'#71d2af'},
        {id:5,name:"标签5",color:'#672882'},
        {id:6,name:"标签6",color:'#968869'},
        {id:7,name:"标签7",color:'#449ef8'},
        {id:8,name:"标签8",color:'#FFD700'},
        {id:9,name:"标签9",color:'#717892'},
        {id:10,name:"标签10",color:'#456789'},
        {id:11,name:"标签11",color:'#78eadc'},
        {id:12,name:"标签12",color:'#121145'},
        {id:13,name:"标签13",color:'#777777'}
      ],
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
  justify-content: center;
  box-sizing: border-box;
}
.list-area li {
  display:flex;
  align-items: center;
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
.createTagBtn{
  visibility: hidden;
}
#tagPage{
}
#userTags-area{
  display:flex;
  flex-direction: column;
}
.tag-editor{
  display:flex;
  justify-content: center;
  align-items: center;
}
.tagTool{
  margin-left:15px;
}
#tagsBtn:hover .createTagBtn{
  visibility: visible;
}
.userTagList-box{
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top:15px;
  width:80%;
}
.userTagList-box .tag{
  width:300px;
}
.person-area{
  position:absolute;
  display:flex;
  justify-content: center;
  align-items: center;
  width:100%;
  bottom: 10%;
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
  cursor:pointer;
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

