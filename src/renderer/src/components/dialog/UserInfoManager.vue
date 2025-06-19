<template>
  <!-- 标签管理对话框 -->
  <el-dialog
    id="userInfoPage"
    v-model="dialogUserInfoVisible"
    title="个人信息"
    width="350"
    center
    align-center
    :append-to-body="true"
    :before-close="beforeCloseUserInfoDialog"
  >
    <div id="userInfo-Area" v-if="!editPasswordVisible">
      <div class="basic-info">
        <span class="avatar-box">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" alt="" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </span>
        <span class="info-box">
          <span>用户名：{{ userInfo.userAccount || "默认用户名" }}</span>
          <span>创建于：{{ userInfo.createTime }}</span>
        </span>
      </div>
      <el-divider style="margin: 0" />
      <div class="modify-info">
        <span class="userName-info">
          <span class="userName title">昵 称</span>
          <span class="userName content" @click="changeUserName">
            <span v-if="!userNameInputVisible">{{ userInfo.userName || "默认昵称"}}</span>
            <el-input
              ref="userName"
              v-if="userNameInputVisible"
              v-model="userInfo.userName"
              :autofocus="false"
              @blur="overChangeUserName"
              style="width: 180px"
              placeholder="输入昵称"
            />
          </span>
        </span>
        <span class="email-info">
          <span class="email title">邮 箱</span>
          <span class="email content" @click="changeEmail">
            <span v-if="!emailInputVisible">{{ userInfo.email || "未设置邮箱"}}</span>
            <el-input
              ref="email"
              v-if="emailInputVisible"
              v-model="userInfo.email"
              :autofocus="false"
              @blur="overChangeEmail"
              style="width: 180px"
              placeholder="输入邮箱"
            />
          </span>
        </span>
        <span class="userProfile-info">
          <span class="userProfile title">签 名</span>
          <span class="userProfile content" @click="changeUserProfile">
            <span v-if="!userProfileInputVisible">{{ userInfo.userProfile || "这个人很懒，未设置签名"}}</span>
            <el-input
              ref="userProfile"
              v-if="userProfileInputVisible"
              v-model="userInfo.userProfile"
              :autofocus="false"
              @blur="overChangeUserProfile"
              style="width: 180px"
              placeholder="输入签名"
            />
          </span>
        </span>
        <span class="password-info">
          <span class="password title">密 码</span>
          <span class="password content">
            <el-button @click="handelEditPassword">修改密码</el-button>
          </span>
        </span>
      </div>
    </div>
    <div id="passwordEdit-Area" v-if="editPasswordVisible">
      <div class="passwordEdit-box">
        <span class="oldPassword">
          <span class="title">原 密 码</span>
          <span class="content">
            <el-input
            v-model="password.oldPassword"
            style="width: 180px"
            type="password"
            placeholder="请输入原密码"
            show-password
          /></span>
        </span>
        <span class="newPassword">
          <span class="title">新 密 码</span>
          <span class="content">
            <el-input
              v-model="password.newPassword"
              style="width: 180px"
              type="password"
              placeholder="请输入新密码"
              show-password
            /></span>
        </span>
        <span class="confirmNewPassword">
          <span class="title">确认新密码</span>
          <span class="content">
            <el-input
              v-model="password.confirmNewPassword"
              style="width: 180px"
              type="password"
              placeholder="请再次输入新密码"
              show-password
            /></span>
        </span>
      </div>
      <div class="passwordEditSubmit-box">
        <el-button @click="confirmEditPassword" style="width:80px;">确认</el-button>
        <el-button @click="cancelEditPassword" style="width:80px;">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Select, CloseBold, Edit, Delete } from '@element-plus/icons-vue'

import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from "../../store/store";
import { updateUserInfo } from "../../utils/api/modules/user";
import * as userApi from "../../utils/api/modules/user";

// TODO: 记录信息是否被修改，从而确定关闭dialog之前是否要弹出确认框
// TODO: 修改用户信息
export default {
  name: 'UserInfoManager',
  props: {
    showUserInfoDialog: {
      type: Boolean,
      default: false
    },
    user:{
      type:Object,
    }, //原始用户数据
    logout:{
      type: Function,
    }
  },
  components:{
    Plus,
  },
  mounted() {
    // console.log('userDialog mounted')
    // this.userInfoOrigin = store.state.userAbout.userData;
    // this.userInfo = JSON.parse(JSON.stringify(this.userInfoOrigin));
  },
  computed: {
    dialogUserInfoVisible: {
      get() {
        return this.showUserInfoDialog
      },
      set(val) {
        this.$emit('update:showUserInfoDialog', val)
      }
    },
  },
  watch:{
    user:{
      deep:true,
      immediate: true,
      handler(newVal){
        Object.assign(this.userInfo, newVal);
      }
    }
  },
  methods: {
    // dialog
    beforeCloseUserInfoDialog() {
      console.log("关闭了对话框")
      this.anyInfoChanged = false;
      for(let key in this.userInfo){
        if (this.userInfo[key] !== this.user[key]) {
          this.anyInfoChanged = true;
        }
      }
      if(this.anyInfoChanged){
        ElMessageBox.confirm(
          '确认要修改信息？',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            customStyle:'width:240px;z-index: 2002;'
          }
        )
          .then(async () => {
            // TODO: 修改信息的逻辑
            console.log('user:', this.user)
            console.log('userInfo:', this.userInfo)
            // 先向远程提交
            await userApi.updateUserInfo(this.userInfo)
            // 再修改vuex数据
            await store.dispatch('userAbout/editUser', this.userInfo)
            ElMessage({
              type: 'success',
              message: '修改成功',
            });
            this.dialogUserInfoVisible = false;
          })
          .catch((err) => {
            console.log("err:",err)
            Object.assign(this.userInfo, this.user);
            ElMessage({
              type: 'info',
              message: '修改失败',
            });
            // TODO: 取消修改信息的逻辑
            this.dialogUserInfoVisible = false;
          })
      } else{
        this.dialogUserInfoVisible = false;
      }
      setTimeout(()=>{
        this.editPasswordVisible = false;
      }, 500);
    },
    // avatar
    handleAvatarSuccess(res, file) {
      this.userInfo.avatar = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // modifyInfo
    changeUserName() {
      this.userNameInputVisible = true;
      this.$nextTick(() => {
        this.$refs.userName.focus();
      });
    },
    overChangeUserName() {
      this.userNameInputVisible = false;
    },
    changeEmail() {
      this.emailInputVisible = true;
      this.$nextTick(() => {
        this.$refs.email.focus();
      });
    },
    overChangeEmail() {
      this.emailInputVisible = false;
    },
    changeUserProfile() {
      this.userProfileInputVisible = true;
      this.$nextTick(() => {
        this.$refs.userProfile.focus();
      });
    },
    overChangeUserProfile() {
      this.userProfileInputVisible = false;
    },
    // password edit
    handelEditPassword(){
      this.editPasswordVisible = true;
    },
    async confirmEditPassword(){
      // TODO:确认修改密码的逻辑
      if(this.password.confirmNewPassword !== this.password.newPassword){
        ElMessage({
          type: 'error',
          message: '两次输入的新密码不一致',
        });
      } else if(this.password.oldPassword === this.password.newPassword){
        ElMessage({
          type: 'error',
          message: '新密码不能与旧密码相同',
        });
      } else{
        try {
          await userApi.updatePassword(this.user.userId, this.password.oldPassword, this.password.newPassword)
          ElMessage({
            type: 'success',
            message: '密码修改成功，请重新登录',
          });
          this.password.oldPassword = '';
          this.password.newPassword = '';
          this.password.confirmNewPassword = '';
          this.editPasswordVisible = false;
          this.logout();
        } catch(err) {
          console.log("密码修改err",err)
          ElMessage({
            type: 'error',
            message: '密码修改失败',
          });
        }
      }
    },
    cancelEditPassword(){
      // TODO:取消修改密码的逻辑
      this.editPasswordVisible = false;
    },
  },
  data() {
    return {
      // icon
      Select,
      CloseBold,
      Edit,
      Delete,
      // userInfo: {
      //   userId: 12312321,
      //   userAccount: 'Steve',
      //   userPassword: '123456',
      //   email: '1234567@gmail.com',
      //   userName: 'Steve',
      //   avatar: new URL('@renderer/assets/avatar/useravatar.png', import.meta.url).href,
      //   userProfile: '计划、日记、灵感',
      //   createTime: '2024.12.06'
      // },
      userInfo: {},  //克隆的用户数据
      anyInfoChanged:false,
      emailInputVisible: false,
      userProfileInputVisible: false,
      userNameInputVisible:false,
      // password edit
      editPasswordVisible:false,
      password:{
        oldPassword:'',
        newPassword:'',
        confirmNewPassword:'',
      }
    }
  }
}
</script>

<style scoped>
#userInfo-Area,#passwordEdit-Area {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 400px;
  width: 100%;
}
.basic-info {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.avatar-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
}
.info-box {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  height: 100px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
}
.info-box span {
  font-size: 15px;
  line-height: 15px;
  width: 100%;
}
.modify-info {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
}
.modify-info > span {
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.modify-info .title {
  flex: 10;
  display: flex;
  justify-content: center;
}
.modify-info .content {
  flex: 17;
}
.avatar-uploader el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
.passwordEdit-box{
  flex:3;
  display:flex;
  width:100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top:30px;
}
.oldPassword, .newPassword, .confirmNewPassword{
  display: flex;
  width:100%;
  margin-bottom: 20px;
}
.passwordEdit-box .title{
  flex:1;
  font-size: 15px;
  line-height: 15px;
  align-self: center;
  margin-left:20px;
}
.passwordEdit-box .content{
  flex:2;
}
.passwordEditSubmit-box{
  flex:1;
  display: flex;
  width:100%;
  justify-content: center;
}
input {
  display: inline-block;
}
</style>
