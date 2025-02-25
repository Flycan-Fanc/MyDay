<template>
  <div id="insEditor">
    <div id="insHeader">
      <span class="calendar-area"><CalendarWeather></CalendarWeather></span>
      <span class="tools-area">
        <img src="../assets/icon/ic_tools_return.png" alt="返回" />
        <span>返回</span>
      </span>
    </div>
    <div id="editor-container">
      <div class="editor-box">
        <Editor id="editor" :config="config"></Editor>
      </div>
      <div class="info-box">
        <div class="cover-container">
          <span class="cover-box" @click="handleAddImg()">请选择封面图片</span>

        </div>
        <div class="title-container">
          <input type="text" placeholder="请填写标题">
        </div>
        <div class="tag-container">
          <span class="tagAdd">
            <el-select
              v-model="curTag"
              placeholder="请选择标签"
              size="large"
              style="width: 210px;margin-right:10px;"
            >
              <el-option
                v-for="item in tags"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button type="primary" :icon="Check" circle @click="handleSelect()"/>
          </span>
          <div class="tags">
            <el-tag
              v-for="tag in selectedTag"
              :key="tag.label"
              closable
              :type="tag.type"
              :color="tag.color"
              effect="dark"

              @close="handleClose(tag)"
              style="margin-right:5px;margin-bottom: 5px;color:#fff;font-weight: bold;border:none">
              {{ tag.value }}
            </el-tag>
          </div>
        </div>
      </div>
      <el-button class="SaveBtn" type="primary">Save</el-button>
    </div>
  </div>
</template>

<script>
import Editor from '../components/Editor.vue'
import CalendarWeather from '../components/CalendarWeather.vue'
import { ref } from 'vue'
import { Check } from '@element-plus/icons-vue'
import editorConfig from "../config/editorConfig";

export default {
  name: 'InsEditor',
  components: { CalendarWeather, Editor },
  data(){
    return{
      Check,
      config:editorConfig.insConfig.editor,
      curTag:'',
      //用户拥有的标签
      tags:[
        {
          value: '#工作',
          label: '#工作',
          color:  '#12c23d'
        },
        {
          value: '#学习',
          label: '#学习',
          color: '#ff6b81'
        },
        {
          value: '#娱乐',
          label: '#娱乐',
          color: '#ff9f43'
        },
      ],
      selectedTag:[] //用户选择赋予灵感的标签

    }
  },
  methods:{
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
    handleAddImg:function(){
      //TODO: 添加图片
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
.SaveBtn{
  position: absolute;
  transform:scale(1.);
  right: 3%;
  bottom: 3%;
}
</style>
