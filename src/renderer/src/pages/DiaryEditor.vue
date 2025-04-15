<template>
  <div id="diaryEditor">
    <div id="diaryHeader">
      <span class="calendar-area"><CalendarWeather></CalendarWeather></span>
      <span class="tools-area" @click="back()">
        <img src="../assets/icon/ic_tools_return.png" alt="返回" />
        <span>返回</span>
      </span>
    </div>
    <div id="diaryInfo">
      <el-date-picker
        v-model="diaryDate"
        type="date"
        placeholder="请选择日期"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        size="default"
      />
      <el-input
        v-model="diaryTitle"
        style="width: 300px; margin-left: 20px"
        placeholder="请输入标题"
      />
      <el-button
        class="SaveBtn"
        type="primary"
        style="margin-left: 20px; cursor: pointer"
        @click="handleSave"
        >Save</el-button
      >
    </div>
    <Editor id="editor" :config="config" ref="editor" :diary="diary" from="日记"></Editor>
  </div>
</template>

<script>
import CalendarWeather from "../components/CalendarWeather.vue";
import Editor from "../components/Editor.vue";
import editorConfig from "../config/editorConfig";
import router from "../router";
import store from "../store/store";
import {imageStorage, mdStorage} from "../utils/fileLocalStorage";
import { dayjs } from "element-plus";
export default {
  name: 'DiaryEditor',
  mounted(){
    console.log('DD'+JSON.stringify(this.diary))
    this.diaryTitle = this.diary?.diaryTitle || ''
    this.diaryDate = this.diary?.diaryDate || ''
  },
  computed:{
    diaryId() {
      return this.$route.params.diaryId
    },
    diary(){
      return JSON.parse(JSON.stringify(store.state.diaryAbout.diaryData.filter(item => item.diaryId === this.diaryId)[0]||{}))
    }
  },
  data(){
    return {
      config:editorConfig.insConfig.editor,
      diaryTitle:'',
      diaryDate:'',
      // 日期选择器的配置数据
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
    handleSave(){
      let image = this.$refs.editor.getImage()
      let content = this.$refs.editor.getContent()
      // 1.图片本地存储
      // image.forEach((file, pos) => {
      //   // TODO:后续改为真实用户id
      //   imageStorage.saveImage(`user1_diary${this.diaryId}_image.imgJSON`, JSON.stringify(file))
      // })
      //TODO:保存的逻辑
      // 2. 保存到store，先保存图片
      image.forEach((file, pos) => {
        store.dispatch("pictureAbout/addPicture", {
          //TODO:后续使用vuex的userId
          userId: 1,
          diaryId: this.diaryId,
          image: file,
        });
      })
      // 再保存diary date、title、markdown
      store.dispatch("diaryAbout/addDiary", {
        userId: 1,
        diaryId: this.diaryId,
        diaryTitle: this.diaryTitle,
        diaryContent: content,
        diaryDate: dayjs(this.diaryDate).format('YYYY-MM-DD'),
      });
      // 路由跳转
      // router.push({
      //   name:'DiaryView',
      //   params:{
      //     diaryId:this.diary.diaryId
      //   }
      // })
      router.back()
    }

  },
  components:{
    CalendarWeather,
    Editor
  }
}
</script>

<style scoped>
#diaryHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 45px;
}
.calendar-area {
  align-self: flex-start;
  padding-left: 10px;
}
.tools-area {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
  cursor: pointer;
}
.tools-area > img {
  width: 40px;
  height: 40px;
}
#diaryInfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
}
#editor {
  margin-top: 20px;
  height: 72vh;
  width: 95%;
}
</style>
