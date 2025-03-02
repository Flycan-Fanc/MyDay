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
    <div class="userInfo-Area">
      <div class="basic-info">
        <span class="avatar-box">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" alt=""/>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </span>
        <span class="info-box">
          <span>用户名：{{ userInfo.userAccount }}</span>
          <span>创建于：{{ userInfo.createTime }}</span>
        </span>
      </div>
      <el-divider style="margin:0;"/>
      <div class="modify-info">
        <span class="userName-info">
          <span class="userName title">昵 称</span>
          <span class="userName content" @click="changeUserName">
            <span v-if="!userNameInputVisible">{{ userInfo.userName }}</span>
            <el-input
              ref="userName"
              v-if="userNameInputVisible"
              v-model="userInfo.userName"
              :autofocus="false"
              @blur="overChangeUserName"
              style="width: 180px;"
              placeholder="输入邮箱" />
          </span>
        </span>
        <span class="email-info">
          <span class="email title">邮 箱</span>
          <span class="email content" @click="changeEmail">
            <span v-if="!emailInputVisible">{{ userInfo.email }}</span>
            <el-input
              ref="email"
              v-if="emailInputVisible"
              v-model="userInfo.email"
              :autofocus="false"
              @blur="overChangeEmail"
              style="width: 180px;"
              placeholder="输入邮箱" />
          </span>
        </span>
        <span class="userProfile-info">
          <span class="userProfile title" >签 名</span>
          <span class="userProfile content" @click="changeUserProfile">
            <span v-if="!userProfileInputVisible">{{userInfo.userProfile}}</span>
            <el-input
              ref="userProfile"
              v-if="userProfileInputVisible"
              v-model="userInfo.userProfile"
              :autofocus="false"
              @blur="overChangeUserProfile"
              style="width: 180px;"
              placeholder="输入签名" />
        </span>
          </span>
        <span class="password-info">
          <span class="password title">密 码</span>
          <span class="password content">
            <el-button >修改密码</el-button>
          </span>
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Select, CloseBold, Edit, Delete } from '@element-plus/icons-vue'

import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// TODO: 记录信息是否被修改，从而确定关闭dialog之前是否要弹出确认框
// TODO: 修改用户信息
export default {
  name: 'UserInfoManager',
  props: {
    showUserInfoDialog: {
      type: Boolean,
      default: false
    }
  },
  components:{
    Plus,
  },
  mounted() {
    console.log(this.userInfo.avatar)
  },
  computed: {
    dialogUserInfoVisible: {
      get() {
        console.log('get Show:' + this.showUserInfoDialog)
        return this.showUserInfoDialog
      },
      set(val) {
        console.log('set Show:' + this.showUserInfoDialog)
        this.$emit('update:showUserInfoDialog', val)
      }
    }
  },
  methods: {
    // dialog
    beforeCloseUserInfoDialog() {
      if(this.anyInfoChanged){
        ElMessageBox.confirm(
          '确认要修改信息？',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            customStyle:'width:240px;'
          }
        )
          .then(() => {
            ElMessage({
              type: 'success',
              message: '修改成功',
            });
            // TODO: 修改信息的逻辑
            this.dialogUserInfoVisible = false
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '放弃修改',
            });
            // TODO: 取消修改信息的逻辑
            this.dialogUserInfoVisible = false
          })
      } else{
        this.dialogUserInfoVisible = false
      }
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
  },
  data() {
    return {
      // icon
      Select,
      CloseBold,
      Edit,
      Delete,
      userInfo: {
        userId: 12312321,
        userAccount: 'Steve',
        userPassword: '123456',
        email: '1234567@gmail.com',
        userName: 'Steve',
        avatar: new URL('@/assets/test.png', import.meta.url).href,
        userProfile: '计划、日记、灵感',
        createTime: '2024.12.06'
      },
      anyInfoChanged:false,
      emailInputVisible: false,
      userProfileInputVisible: false,
      userNameInputVisible:false,
    }
  }
}
</script>

<style scoped>
.userInfo-Area{
  display:flex;
  flex-direction: column;
  align-items: center;
  height:400px;
  width:100%;
}
.basic-info{
  flex:1;
  display:flex;
  justify-content: center;
  align-items: center;
  width:100%;
}
.avatar-box{
  display:flex;
  justify-content: center;
  align-items: center;
  width:120px;
}
.info-box{
  box-sizing:border-box;
  display:flex;
  flex:1;
  height:100px;
  flex-direction:column;
  justify-content: space-evenly;
  align-items: flex-start;
}
.info-box span{
  font-size:15px;
  line-height:15px;
  width:100%;
}
.modify-info{
  flex: 3;
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  width:100%;
  height:100%;
}
.modify-info>span {
  height:30px;
  width:100%;
  display:flex;
  justify-content: flex-start;
  align-items: center;
}
.modify-info .title{
  flex:10;
  display:flex;
  justify-content: center;
}
.modify-info .content{
  flex:17;
}
.avatar-uploader el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader el-upload:hover {
  border-color: #409EFF;
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
</style>
