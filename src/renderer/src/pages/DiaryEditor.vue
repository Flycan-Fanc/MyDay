<template>
  <div id="diaryEditor">
    <div id="diaryHeader">
      <span class="calendar-area"><CalendarWeather :date="diaryDate" /></span>
      <span class="tools-area" @click="back">
        <img src="../assets/icon/ic_tools_return.png" alt="back" />
        <span>返回</span>
      </span>
    </div>
    <div id="diaryInfo">
      <el-date-picker
        v-model="diaryDate"
        type="date"
        value-format="YYYY-MM-DD"
        format="YYYY-MM-DD"
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
      >
        Save
      </el-button>
    </div>
    <Editor id="editor" ref="editor" :config="config" :diary="diary" from="日记" />
  </div>
</template>

<script>
import { dayjs } from 'element-plus'
import CalendarWeather from '../components/CalendarWeather.vue'
import Editor from '../components/Editor.vue'
import editorConfig from '../config/editorConfig'
import router from '../router'
import store from '../store/store'

export default {
  name: 'DiaryEditor',
  components: {
    CalendarWeather,
    Editor,
  },
  data() {
    return {
      config: editorConfig.diaryConfig.editor,
      userId: '',
      diaryTitle: '',
      diaryDate: '',
      shortcuts: [
        { text: 'Today', value: dayjs().format('YYYY-MM-DD') },
        { text: 'Yesterday', value: dayjs().subtract(1, 'day').format('YYYY-MM-DD') },
        { text: 'A week ago', value: dayjs().subtract(7, 'day').format('YYYY-MM-DD') },
      ],
    }
  },
  mounted() {
    this.diaryTitle = this.diary?.diaryTitle || ''
    this.diaryDate = this.diary?.diaryDate || dayjs().format('YYYY-MM-DD')
    this.userId = store.getters['userAbout/getUserId']
  },
  computed: {
    diaryId() {
      return this.$route.params.diaryId
    },
    diary() {
      return (
        store.state.diaryAbout.diaryData.find((item) => item.diaryId === this.diaryId) || {}
      )
    },
  },
  methods: {
    back() {
      router.back()
    },
    disabledDate(time) {
      return time.getTime() > Date.now()
    },
    async handleSave() {
      store.dispatch('diaryAbout/addDiary', {
        userId: this.userId,
        diaryId: this.diaryId,
        diaryTitle: this.diaryTitle,
        diaryContent: this.$refs.editor.getContent(),
        diaryDate: this.diaryDate || dayjs().format('YYYY-MM-DD'),
      })
      await window.api.electronStore.diaryStore.setDiary(
        JSON.parse(JSON.stringify(store.state.diaryAbout.diaryData))
      )
      await window.api.electronStore.pictureStore.setPicture(
        JSON.parse(JSON.stringify(store.state.pictureAbout.pictureData))
      )
      ElMessage({
        type: 'success',
        message: '保存成功',
      })
      router.back()
    },
  },
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
