<template>
  <div id="insView">
    <div id="insHeader">
      <span class="calendar-area"><CalendarWeather></CalendarWeather></span>
      <span class="tools-area">
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
          <span class="cover-box">请选择封面图片</span>
        </div>
        <div class="title-container">

        </div>
        <div class="tag-container">
          <div class="tags">
            <el-tag
              v-for="tag in selectedTag"
              :key="tag.label"
              closable
              :type="tag.type"
              :color="tag.color"
              effect="dark"
              @close="handleClose(tag)"
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
      </div>
    </div>
  </div>
</template>

<script>
import CalendarWeather from '../components/CalendarWeather.vue'
import Editor from '../components/Editor.vue'

export default {
  name: 'InsView',
  components: { Editor, CalendarWeather }
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
</style>
