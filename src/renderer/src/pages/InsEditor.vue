<template>
  <div id="insEditor">
    <div id="insHeader">
      <span class="calendar-area"><CalendarWeather></CalendarWeather></span>
      <span class="tools-area" @click="back()">
        <img src="../assets/icon/ic_tools_return.png" alt="返回" />
        <span>返回</span>
      </span>
    </div>
    <div id="editor-container">
      <div class="editor-box">
        <Editor id="editor" ref="editor" :config="config" from="灵感" :ins="ins"></Editor>
      </div>
      <div class="info-box">
        <div class="cover-container">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" alt=""/>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>

        </div>
        <div class="title-container">
          <input type="text" placeholder="请填写标题" v-model="title">
        </div>
        <TagMini ref="tagMini" originComponent="insTagEditor" :contentId="ins.insId"></TagMini>
      </div>
      <el-button class="SaveBtn" type="primary" @click="handleSave">Save</el-button>
    </div>
  </div>
</template>

<script>
import Editor from '../components/Editor.vue'
import CalendarWeather from '../components/CalendarWeather.vue'
import TagMini from '../components/TagMini.vue'
import { ref } from 'vue'
import { Check } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import editorConfig from "../config/editorConfig";
import router from "../router";
import store from "../store/store";
import { nanoid } from "nanoid";
import { dayjs } from "element-plus";

export default {
  name: 'InsEditor',
  components: { CalendarWeather, Editor,TagMini,Plus },
  mounted(){
    console.log("insId:"+this.insId)
    console.log("ins:"+JSON.stringify(this.ins))
    console.log('url:'+this.imageUrl)

    this.imageUrl = this.ins.insCover || ''
    this.title = this.ins.insTitle || ''
  },
  computed:{
    insId(){
      return Number(this.$route.params.insId)
    },
    ins(){
      return JSON.parse(JSON.stringify(store.state.insAbout.insData.filter(item => item.insId === this.insId)[0]))
    },
  },
  data(){
    return{
      Check,
      config:editorConfig.insConfig.editor,
      imageUrl: '', //用户头像url
      curTag:'',
      title: '',
      //用户拥有的标签
      tags:[],
      selectedTag:[] //用户选择赋予灵感的标签
    }
  },
  methods:{
    back(){
      router.back()
    },
    handleAvatarSuccess(res, file){
      this.imageUrl = res[0].url
      console.log(this.imageUrl)
    },
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg';
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG && !isPng) {
        // this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        ElMessage({
          message: '上传头像图片只能是 JPG 格式!',
          type: 'warning',
          duration:2000,
        })
      }
      if (!isLt3M) {
        // this.$message.error('上传头像图片大小不能超过 2MB!');
        ElMessage({
          message: '上传头像图片大小不能超过 3MB!',
          type: 'warning',
          duration:2000,
        })
      }
      return isJPG && isLt3M;
    },
    handleClose:function(tag){
      console.log(tag)
      this.selectedTag.splice(this.selectedTag.indexOf(tag), 1)
    },
    handleSelect:function(){
      //生成随机16进制颜色
      function randomHexColor(){
        let hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
        while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
          hex = '0' + hex;
        }
        return '#' + hex; //返回‘#'开头16进制颜色
      }
      let randomColor = randomHexColor()
      console.log("this.selectedTag:"+JSON.stringify(Object.values(this.selectedTag)))
      console.log("this.curTag:"+this.curTag)
      if(this.curTag===''){
        ElMessage({
          message: '请选择标签',
          type: 'warning',
          duration:2000,
        })
      } else if(this.selectedTag.some(item=>item.label===this.curTag)){
        ElMessage({
          message: '不能重复添加标签',
          type: 'warning',
          duration:2000,
        })
      }else{
        this.selectedTag.push({
          value: this.curTag,
          label: this.curTag,
          color: randomColor,
        })
        //this.curTag = ''
      }
    },
    handleAddCover:function(){
      //TODO: 添加图片
    },
    handleSave:function(){
      //TODO: 保存灵感
      this.tag = this.$refs.tagMini.getSelectedTag()
      // 获取tag
      console.log('tag:'+JSON.stringify(this.tag))
      // 将信息汇总保存
      let ins = {
        insId:this.insId || nanoid(),
        userId:1,  //TODO：后续引入真实用户id
        insTitle: this.title,
        insContent:this.$refs.editor.getContent(),
        insData: dayjs(),
        insTags: this.tag,
        insCover: this.imageUrl,
      }
      console.log('save ins:'+JSON.stringify(ins))
      store.dispatch('insAbout/addIns',ins)
      router.back()
    }
  },

}
</script>

<style scoped>
#insHeader{
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 45px;
}
.calendar-area{
  align-self: flex-start;
  padding-left:10px;
}
.tools-area{
  display:flex;
  justify-content: center;
  align-items: center;
  margin-right:40px;
  cursor:pointer;
}
.tools-area>img{
  width: 40px;
  height: 40px;
}
#editor-container{
  position:relative;
  display:flex;
  width:95%;
  height:78vh;
  margin:30px 0;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius:15px;
}
.editor-box{
  flex:2;
}
#editor{
  width:100%;
  height:100%;
  border-radius:10px;
}
.info-box{
  flex:1;
  display:flex;
  flex-direction: column;
}
.cover-container{
  flex:4;
  display:flex;
  justify-content: center;
  align-items: center;
}
.cover-box{
  display:flex;
  justify-content: center;
  align-items: center;
  width:75%;
  height:75%;
  background-color: #ededed;
  font-size: 20px;
  color: rgba(94, 94, 94, 0.4)
}
.title-container{
  flex:1;
  display:flex;
  justify-content: center;
  align-items: flex-start;
}
.title-container input{
  width: 80%;
  height: 60%;
  text-indent: 2em;
  border-radius: 10px;
  border: none;
  font-size: 15px;
}

.SaveBtn{
  position: absolute;
  transform:scale(1.2);
  right: 3%;
  bottom: 3%;
}

.avatar-uploader .avatar {
  width:100%;
  height:100%;
  display: block;
  object-fit: cover;
}
.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  width:75%;
  height:75%;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 150px;
  text-align: center;
}
</style>
