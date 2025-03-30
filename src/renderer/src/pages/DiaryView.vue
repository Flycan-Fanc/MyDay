<template>
  <div id="diaryView">
    <div id="diaryHeader">
      <span class="calendar-area"><CalendarWeather></CalendarWeather></span>
      <span class="tools-area" @click="back()">
        <img src="../assets/icon/ic_tools_return.png" alt="返回" />
        <span>返回</span>
      </span>
    </div>
    <div class="tools-container">
      <div class="diaryTitle" >
        {{diary.diaryTitle}}
      </div>
      <div class="tools-box">
        <el-button class="EditBtn" type="primary" :icon="Edit" style="width:60px" @click="handleEdit"></el-button>
        <el-button class="DelBtn" type="danger" :icon="Delete" style="width:60px"></el-button>
      </div>
    </div>
    <div id="view-container">
      <div class="view-box">
        <Editor id="editor" :config="config" :diary="diary" from="日记" @handleSave="handleSave"></Editor>
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
import {mapState} from "vuex";
import store from "../store/store";

export default {
  name: 'InsView',
  components: { Editor, CalendarWeather },
  mounted(){

  },
  computed:{
    diaryId(){
      return Number(this.$route.params.diaryId)  //param参数获取到的为string类型，需要转换
    },
    diary(){
      return store.state.diaryAbout.diaryData.filter(item=>item.diaryId===this.diaryId)[0]
    }
  },
  methods:{
    back(){
      router.back()
    },
    handleEdit(){
      router.push({
        name:'DiaryEditor',
        params:{
          diaryId:this.diaryId
        }
      })
      //this.config = editorConfig.diaryConfig.editor
    },
    handleSave(){
      console.log('保存了')
      this.config = editorConfig.diaryConfig.view
    }
  },
  data(){
    return {
      Edit, Delete,
      config: editorConfig.diaryConfig.view,
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
#diaryHeader{
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
  height:70vh;
  margin:10px 0;
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
.cover-box>img{
  width:100%;
  height:100%;
  border-radius:10px;
}
.title-container input{
  width: 80%;
  height: 60%;
  text-indent: 2em;
  border-radius: 10px;
  border: none;
  font-size: 15px;
}
.tools-container{
  position:relative;
  height: 40px;
  width:95%;
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top:30px;
  border-radius: 5px;
}
.diaryTitle{
  flex:4;
  height:40px;
  align-self: center;
  line-height:40px;
  text-indent:2em;
  border-radius:8px;
  background-color: #fff;
  margin-right:10%;
}
.tools-box{
  flex:1;
  justify-items: flex-end;
}
</style>
