<template>
    <div id="diaryEditor">
      <div id="diaryHeader">
        <span class="calendar-area"><CalendarWeather></CalendarWeather></span>
        <span class="tools-area" @click="back()">
          <img src="../assets/icon/ic_tools_return.png" alt="返回" >
          <span>返回</span>
        </span>
      </div>
      <div id="diaryInfo">
        <el-date-picker
          v-model="diary.date"
          type="date"
          placeholder="请选择日期"
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
          size="default"
        />
        <el-input
          v-model="diary.title"
          style="width: 300px;margin-left: 20px;"
          placeholder="请输入标题"
        />
        <el-button class="SaveBtn" type="primary" style="margin-left: 20px;">Save</el-button>
      </div>
      <Editor id="editor" :config="config"></Editor>
    </div>
</template>

<script>
import CalendarWeather from "../components/CalendarWeather.vue";
import Editor from "../components/Editor.vue";
import editorConfig from "../config/editorConfig";
import router from "../router";
export default {
  name: 'DiaryEditor',
  data(){
    return {
      config:editorConfig.diaryConfig.editor,
      diary:{
        date:'',
        title:'',
      },
      shortcuts:[
        {
          text: 'Today',
          value: new Date(),
        },
        {
          text: 'Yesterday',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          },
        },
        {
          text: 'A week ago',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          },
        },
      ],
    }
  },
  methods: {
    //路由返回
    back(){
      router.back()
    },
    disabledDate(time) {
      return time.getTime() > Date.now();
    },

  },
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
#diaryInfo{
  display:flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
}
#editor{
  margin-top: 20px;
  height: 72vh;
  width:95%;
}

</style>

