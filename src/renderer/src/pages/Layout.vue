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
        <ul class="page-selector" ref="pageSelector">
          <li class="lable today selected" id="todayBtn" @click="routerPush($event,'/today')">
            <img src="../assets/icon/ic_sidebar_today.png" alt="" />
            <span>Today</span>
          </li>
          <li class="lable oneWeek" id="oneWeekBtn" @click="routerPush($event,'/oneWeek')">
            <img src="../assets/icon/ic_sidebar_7days.png" alt="" />
            <span>7 Days</span>
          </li>
          <li class="lable diary" id="diaryBtn" @click="routerPush($event,'/diary')">
            <img src="../assets/icon/ic_sidebar_diary.png" alt="" />
            <span>Diary</span>
          </li>
          <li class="lable inspiration" id="insBtn" @click="routerPush($event,'/inspiration')">
            <img src="../assets/icon/ic_sidebar_ins.png" alt="" />
            <span>Inspiration</span>
          </li>
          <li class="lable" id="tagsBtn" @click="showTagDialog = !showTagDialog">
            <img src="../assets/icon/ic_sidebar_flag.png" alt="" />
            <span>Tags</span>
          </li>
        </ul>
      </div>
      <UserTagManager v-model:showTagDialog.async="showTagDialog"></UserTagManager>
      <UserInfoManager v-model:showUserInfoDialog.async="showUserInfoDialog" :user="user" :logout="logout"></UserInfoManager>
      <div class="person-area">
        <div class="sync-entry-area">
          <el-tooltip :content="syncTooltip" placement="right" effect="light" :show-after="150">
            <div class="sync-indicator" :class="`is-${syncStatus}`" aria-label="sync-status">
              <span class="sync-indicator__light"></span>
            </div>
          </el-tooltip>
          <el-tooltip :content="syncActionHint" placement="right" effect="light" :show-after="150">
            <el-button
              class="sync-action-btn"
              size="small"
              round
              :loading="isManualSyncing"
              :disabled="!canManualSync"
              @click.stop="manualSync"
            >
              {{ syncButtonText }}
            </el-button>
          </el-tooltip>
        </div>
        <div class="popover-emit" ref="buttonRef" v-click-outside="onClickOutside">
          <div class="img-container">
            <img :src="avatarUrl" alt="用户头像" id="avatar" />
          </div>
          <span id="username" ref="buttonRef" v-click-outside="onClickOutside">{{userName}}</span>
        </div>
      </div>
      <el-popover
        ref="popoverRef"
        :virtual-ref="buttonRef"
        trigger="click"
        virtual-triggering
        width=150;
        placement="right"
        hide-after=0
        >
        <span style="display:flex;justify-content: center;align-items: center;font-size:0;">
          <el-link @click="openUserDialog()">修改资料</el-link>
          <el-divider direction="vertical" style="height:25px;"/>
          <el-link @click="logout">退出登录</el-link>
        </span>
      </el-popover>
    </div>
    <div id="window-action">
      <img src="../assets/icon/ic_action_minus.png" alt="" @click="minimizeWindow()"/>
      <img :src="windowImg" alt="窗口变化" @click="changeWindowSize()"/>
      <img src="../assets/icon/ic_action_cancel.png" alt="" @click="closeWindow()"/>
    </div>
    <div id="content">
      <router-view></router-view>
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
import UserTagManager from "../components/dialog/UserTagManager.vue";
import UserInfoManager from "../components/dialog/UserInfoManager.vue";
import TagBasedContentView from "./TagBasedContentView.vue";
import ErrorPage from "./ErrorPage.vue";

import expandWindowImg from "../assets/icon/ic_action_expand.png";
import collapseWindowImg from "../assets/icon/ic_action_collapse.png";

import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import PlanList from "../components/PlanList.vue";

import { locationUtils, weatherUtils } from "../utils/dataUtils";
import { imageUtils } from "../utils/dataUtils";
import PubSub from "pubsub-js";

import { dataLocalStorage } from "../utils/dataLocalStorage";
import store from "../store/store";
import { dataSync } from "../utils/dataSync";
import { dataRemoteStorage } from "../utils/dataRemoteStorage";
import { dataRemoteFetch } from "../utils/dataRemoteFetch";
import * as syncMetaAPI from "../utils/api/modules/syncMeta";

const windowControls = window.api.windowControls;

export default {
  name: "Layout",
  created(){
    windowControls.enlargeWindow(1200,675);
  },
  mounted() {
    // 获取用户昵称
    this.user = store.state.userAbout.userData;

    this.buttonRef = this.$refs.buttonRef;
    this.popoverRef = this.$refs.popoverRef;

    async function fetchWeatherAndNotify() {
      await weatherUtils.getWeatherInfo(); // 等待天气数据获取完成
      PubSub.publish("getWeather");       // 再发布事件
    }
    fetchWeatherAndNotify().catch(console.error);
  },
  components:{
    PlanList,
    Today,
    OneWeek,
    DiaryEditor,
    Diary,
    Inspiration,
    InsEditor,
    InsView,
    DiaryView,
    TagBasedContentView,
    // dialog
    UserTagManager,
    UserInfoManager,
    ErrorPage
  },
  data(){
    return{
      user: {},
      windowImg:expandWindowImg,
      isMaxWindow:false,
      // dialog
      showTagDialog:false,
      showUserInfoDialog:false,
      buttonRef:ref(),
      popoverRef:ref(),
      isManualSyncing:false,
    }
  },
  watch:{
    // showTagDialog(val){
    //   console.log("showTagDialog changed:"+val)
    // }
  },
  computed:{
    userName() {
      const name = this.user?.userName;
      if (name && name.length >= 10) {
        return name.slice(0, 10);
      }
      return name || '默认昵称';
    },
    avatarUrl: {
      get(){
        console.log("get avatar url:",this.user.avatarId)
        return this.user.avatarId ? imageUtils.getImageUrl(this.user.avatarId) : ''
      },
    },
    syncStatus() {
      return store.state.syncAbout.status || 'local_only'
    },
    syncTooltip() {
      return store.getters['syncAbout/tooltipText']
    },
    syncButtonText() {
      return '\u540c\u6b65'
    },
    canManualSync() {
      return !!this.user?.userId && this.syncStatus !== 'syncing' && !this.isManualSyncing
    },
    syncActionHint() {
      if (!this.user?.userId) {
        return '\u672a\u767b\u5f55'
      }
      if (this.syncStatus === 'syncing' || this.isManualSyncing) {
        return '\u540c\u6b65\u4e2d'
      }
      if (this.syncStatus === 'pending' || this.syncStatus === 'local_only' || this.syncStatus === 'error') {
        return '\u624b\u52a8\u540c\u6b65'
      }
      return '\u68c0\u67e5\u6700\u65b0\u540c\u6b65\u72b6\u6001'
    },
  },
  directives:{
    clickOutside: vClickOutside,
  },
  methods: {
    minimizeWindow() {
      windowControls.minimizeWindow();
    },
    closeWindow() {
      // ToDo: 后续添加一些确认关闭窗口的提示
      ElMessageBox.confirm(
        '确认退出?',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(async () => {
        // 数据本地存储
        try {
          await dataLocalStorage()
        } catch(err){
          ElMessage({
            message: "数据本地存储失败",
            type: "error",
            duration: 2000
          })
          throw new Error(`数据本地存储失败:${err}`)
        }
        // 数据远程同步
        try {
          await dataSync()
        }  catch(err){
          ElMessage({
            message: "数据远程同步失败",
            type: "error",
            duration: 2000
          })
          throw new Error(`数据远程同步失败:${err}`)
        }
        windowControls.closeWindow();
      }).catch((err) => {
        console.log(err)
      })
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
    },
    onClickOutside(){
      unref(this.popoverRef).popperRef?.delayHide?.()
    },
    // router
    routerPush(e,targetPath){
      this.$router.push({path:targetPath})
      Array.from(this.$refs.pageSelector.children).forEach(item => {
        if(item.classList.contains("selected")){
          item.classList.remove("selected")
        }
        if(item.classList.contains(targetPath.slice(1))){
          item.classList.add("selected")
        }
      })
    },
    openUserDialog(){
      this.showUserInfoDialog = !this.showUserInfoDialog
    },
    hasLocalBusinessData() {
      return (
        store.state.tagAbout.userTags.length > 0 ||
        store.state.planAbout.planData.length > 0 ||
        store.state.diaryAbout.diaryData.length > 0 ||
        store.state.insAbout.insData.length > 0 ||
        store.state.pictureAbout.pictureData.length > 0
      )
    },
    buildManualSyncPlan(remoteSyncMeta) {
      const localVersion = Number(store.state.syncAbout.localVersion ?? 0)
      const remoteVersion = Number(remoteSyncMeta?.data_version ?? store.state.syncAbout.remoteVersion ?? 0)
      const hasLocalData = this.hasLocalBusinessData()

      if (this.syncStatus === 'local_only' && hasLocalData) {
        return {
          action: 'push',
          title: '\u6570\u636e\u540c\u6b65',
          message: '\u5c06\u5f53\u524d\u672c\u5730\u6570\u636e\u4e0a\u4f20\u5230\u8fdc\u7aef\u3002\n\n\u98ce\u9669\u63d0\u793a\uff1a\u5f53\u524d\u8fdc\u7aef\u540c\u6b65\u4ecd\u4e3a\u5168\u91cf\u8986\u76d6\u65b9\u6848\uff0c\u5982\u8fdc\u7aef\u5df2\u6709\u65e7\u6570\u636e\uff0c\u672c\u6b21\u63a8\u9001\u4f1a\u4ee5\u672c\u5730\u72b6\u6001\u4e3a\u51c6\u3002',
          confirmButtonText: '\u4e0a\u4f20\u672c\u5730\u6570\u636e',
          type: 'warning',
        }
      }

      if (localVersion > remoteVersion) {
        return {
          action: 'push',
          title: '\u6570\u636e\u540c\u6b65',
          message: `\u672c\u5730\u7248\u672c v${localVersion} \u9886\u5148\u4e8e\u8fdc\u7aef v${remoteVersion}\uff0c\u5c06\u628a\u5f53\u524d\u672c\u5730\u6570\u636e\u63a8\u9001\u5230\u8fdc\u7aef\u3002\n\n\u98ce\u9669\u63d0\u793a\uff1a\u8fdc\u7aef\u540c\u6b65\u4ecd\u4e3a\u5168\u91cf\u8986\u76d6\u65b9\u6848\uff0c\u7ee7\u7eed\u540e\u4ee5\u672c\u5730\u6570\u636e\u4e3a\u51c6\u3002`,
          confirmButtonText: '\u63a8\u9001\u5230\u8fdc\u7aef',
          type: 'warning',
        }
      }

      if (localVersion < remoteVersion) {
        return {
          action: 'pull',
          title: '\u6570\u636e\u540c\u6b65',
          message: `\u8fdc\u7aef\u7248\u672c v${remoteVersion} \u9886\u5148\u4e8e\u672c\u5730 v${localVersion}\uff0c\u5c06\u62c9\u53d6\u8fdc\u7aef\u6700\u65b0\u6570\u636e\u5230\u672c\u5730\u3002\n\n\u98ce\u9669\u63d0\u793a\uff1a\u5f53\u524d\u672c\u5730\u6570\u636e\u4f1a\u88ab\u8fdc\u7aef\u5185\u5bb9\u8986\u76d6\uff0c\u8bf7\u786e\u8ba4\u5df2\u4e0d\u518d\u4fdd\u7559\u672c\u5730\u672a\u4e0a\u4f20\u53d8\u66f4\u3002`,
          confirmButtonText: '\u62c9\u53d6\u8fdc\u7aef\u6570\u636e',
          type: 'warning',
        }
      }

      return {
        action: 'noop',
        title: '\u6570\u636e\u540c\u6b65',
        message: '\u5f53\u524d\u672c\u5730\u4e0e\u8fdc\u7aef\u7248\u672c\u4e00\u81f4\uff0c\u65e0\u9700\u624b\u52a8\u540c\u6b65\u3002',
        confirmButtonText: '\u77e5\u9053\u4e86',
        type: 'info',
      }
    },
    async manualSync(){
      if (!this.canManualSync) {
        return
      }

      const userId = store.getters['userAbout/getUserId'] || this.user?.userId
      if (!userId) {
        ElMessage({
          message: '\u672a\u767b\u5f55',
          type: 'warning',
          duration: 2000
        })
        return
      }

      this.isManualSyncing = true
      try {
        const remoteSyncMeta = await syncMetaAPI.getSyncMeta(userId)
        const plan = this.buildManualSyncPlan(remoteSyncMeta)

        if (plan.action === 'noop') {
          ElMessage({
            message: plan.message,
            type: 'info',
            duration: 2000
          })
          return
        }

        await ElMessageBox.confirm(
          plan.message,
          plan.title,
          {
            confirmButtonText: plan.confirmButtonText,
            cancelButtonText: '\u53d6\u6d88',
            type: plan.type,
          }
        )

        if (plan.action === 'push') {
          await dataLocalStorage()
          await dataRemoteStorage()
          return
        }

        if (plan.action === 'pull') {
          await dataRemoteFetch(userId, remoteSyncMeta, { preferRemote: true })
        }
      } catch (err) {
        if (err === 'cancel' || err === 'close') {
          return
        }
        ElMessage({
          message: '\u624b\u52a8\u540c\u6b65\u5931\u8d25',
          type: 'error',
          duration: 2000
        })
      } finally {
        this.isManualSyncing = false
      }
    },
    async logout(){
      // TODO：退出登录前的收尾工作：数据本地存储以及远程同步等、将用户登陆状态设为false
      try {
        await dataLocalStorage()
        // 清除用户登陆状态
        let userId = store.getters['userAbout/getUserId']
      } catch(err){
        ElMessage({
          message: "数据本地存储失败",
          type: "error",
          duration: 2000
        })
        // throw new Error(`数据本地存储失败:${err}`)
      }
      // 数据远程同步
      try {
        await dataSync()
      }  catch(err){
        ElMessage({
          message: "数据远程同步失败",
          type: "error",
          duration: 2000
        })
        //throw new Error(`数据远程同步失败:${err}`)
      }
      PubSub.publish("logout")
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
.list-area li.selected {
  background-color: #fff;
  border-radius: 10px;
  color: #2e4ac5;
  font-weight: bold;
  width: 105%;
}
.list-area li:hover{
  background-color: rgba(255,255,255,0.4);
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
#tagsBtn:hover .createTagBtn{
  visibility: visible;
}
.person-area{
  position:absolute;
  display:flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  width:100%;
  bottom: 10%;
}
.person-area .sync-entry-area {
  display: flex;
  align-items: center;
  gap: 10px;
}
.person-area .popover-emit {
  display: flex;
  align-items: center;
}
.sync-action-btn {
  min-width: 64px;
  color: #2c5f88;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(44, 95, 136, 0.18);
  box-shadow: 0 8px 16px rgba(44, 95, 136, 0.12);
}
.sync-action-btn:hover,
.sync-action-btn:focus {
  color: #1e4b6f;
  background: rgba(255, 255, 255, 0.95);
}
.sync-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-right: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.65);
}
.sync-indicator__light {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #9da5b1;
  box-shadow: 0 0 10px rgba(157, 165, 177, 0.45);
  transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}
.sync-indicator.is-local_only .sync-indicator__light,
.sync-indicator.is-pending .sync-indicator__light,
.sync-indicator.is-error .sync-indicator__light {
  background: #e35d5b;
  box-shadow: 0 0 12px rgba(227, 93, 91, 0.45);
}
.sync-indicator.is-syncing .sync-indicator__light {
  background: #e2b13c;
  box-shadow: 0 0 12px rgba(226, 177, 60, 0.5);
  animation: sync-pulse 1.6s ease-in-out infinite;
}
.sync-indicator.is-synced .sync-indicator__light {
  background: #58b16f;
  box-shadow: 0 0 12px rgba(88, 177, 111, 0.45);
}
@keyframes sync-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.18);
    opacity: 1;
  }
}
.person-area .img-container {
  display: inline-block;
  width: 60px; /* 设置容器宽度 */
  height: 60px; /* 设置容器高度 */
  overflow: hidden; /* 隐藏超出容器的部分 */
  border-radius: 50%; /* 使容器呈现圆形 */
  margin-right: 20px;
  cursor:pointer;
}
.person-area .img-container #avatar {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.person-area #username {
  display: inline-block;
  line-height: 60px;
  vertical-align: top;
  font-weight: bold;
  font-size: 15px;
  cursor:pointer;
}
#window-action {
  position: absolute;
  display:flex;
  justify-content: flex-end;
  align-items: center;
  height:40px;
  width: 100%;
  -webkit-app-region: drag;
  cursor:pointer;
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
