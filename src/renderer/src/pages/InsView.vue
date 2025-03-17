<template>
  <div id="insView">
    <div id="insHeader">
      <span class="calendar-area"><CalendarWeather></CalendarWeather></span>
      <span class="tools-area" @click="back()">
        <img src="../assets/icon/ic_tools_return.png" alt="返回" />
        <span>返回</span>
      </span>
    </div>
    <div id="view-container">
      <div class="view-box">
        <Editor id="editor" :config="config"></Editor>
      </div>
      <div class="info-box">
        <div class="cover-container">
          <span class="cover-box"><img src="../assets/background/plouzane-1758197.jpg" alt=""></span>
        </div>
        <div class="title-container">
          灵感标题七个字
        </div>
        <div class="tag-container">
          <div class="tags">
            <el-tag
              v-for="tag in selectedTag"
              :key="tag.label"
              :type="tag.type"
              :color="tag.color"
              effect="dark"
              style="
                margin-right: 5px;
                margin-bottom: 5px;
                color: #fff;
                font-weight: bold;
                border: none;
              "
            >
              {{ tag.value }}
            </el-tag>
          </div>
        </div>
        <div class="tools-container">
          <div class="tools-box">
            <el-button class="EditBtn" type="primary" :icon="Edit" style="width:60px"></el-button>
            <el-button class="DelBtn" type="danger" :icon="Delete" style="width:60px"></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarWeather from '../components/CalendarWeather.vue'
import Editor from '../components/Editor.vue'
import editorConfig from '../config/editorConfig'
import {Edit,Delete} from '@element-plus/icons-vue'
import router from "../router";

export default {
  name: 'InsView',
  components: { Editor, CalendarWeather },
  methods:{
    back(){
      router.back()
    }
  },
  data(){
    return {
      Edit, Delete,
      config: editorConfig.insConfig.view,
      selectedTag: [
        { label: '#工作', value: '#工作', color: '#67C23A' },
        { label: '#学习', value: '#学习', color: '#909399' },
        { label: '#娱乐', value: '#娱乐', color: '#E6A23C' },
      ]
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
#view-container{
  position:relative;
  display:flex;
  width:95%;
  height:78vh;
  margin:30px 0;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius:15px;
}
.view-box{
  flex:2;
}
#editor{
  width:100%;
  height:100%;
  border-radius:10px;
}
.info-box{
  position:relative;
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
  border-radius:10px;
  background-color: #ededed;
  font-size: 20px;
  color: rgba(94, 94, 94, 0.4)
}
.cover-box>img{
  width:100%;
  height:100%;
  border-radius:10px;
}
.title-container{
  flex:1;
  display:flex;
  justify-content: center;
  align-items: flex-start;
  color: #707070;
  font-size: 20px;
  font-weight:bold;
}
.title-container input{
  width: 80%;
  height: 60%;
  text-indent: 2em;
  border-radius: 10px;
  border: none;
  font-size: 15px;
}
.tag-container{
  flex:5;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.tags{
  margin:20px;
  align-self: center;
}
.tools-container{
  display:flex;
  justify-content: center;
  align-items: center;
}
.tools-container>.tools-box{
  position:absolute;
  bottom: 5%;
}
</style>
