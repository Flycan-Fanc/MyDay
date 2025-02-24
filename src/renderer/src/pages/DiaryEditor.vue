<template>
    <div id="diaryEditor">
      <div id="diaryHeader">
        <span class="calendar-area"><CalendarWeather></CalendarWeather></span>
        <span class="tools-area">
          <img src="../assets/icon/ic_tools_return.png" alt="返回">
          <span>返回</span>
        </span>
      </div>
      <Editor id="editor"></Editor>
    </div>
</template>

<script>
import CalendarWeather from "../components/CalendarWeather.vue";
import Editor from "../components/Editor.vue";
export default {
  name: 'DiaryEditor',
  components:{
    CalendarWeather,
    Editor
  }
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
#editor{
  margin-top: 30px;
  height: 85vh;
  width:95%;
}
</style>

