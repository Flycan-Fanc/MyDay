<template>
  <div id="insEditor">
    <div id="insHeader">
      <span class="calendar-area"><CalendarWeather :date="insDate" /></span>
      <span class="tools-area" @click="back">
        <img src="../assets/icon/ic_tools_return.png" alt="back" />
        <span>返回</span>
      </span>
    </div>
    <div id="editor-container">
      <div class="editor-box">
        <Editor id="editor" ref="editor" :config="config" from="灵感" :ins="currentIns" />
      </div>
      <div class="info-box">
        <div class="cover-container">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="beforeCoverUpload"
            :http-request="uploadCover"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="cover" @error="handleCoverError" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
        <div class="date-container">
          <el-date-picker
            v-model="insDate"
            type="date"
            value-format="YYYY-MM-DD"
            format="YYYY-MM-DD"
            placeholder="请选择日期"
            :disabled-date="disabledDate"
          />
        </div>
        <div class="title-container">
          <input v-model="title" type="text" placeholder="请填写标题" />
        </div>
        <TagMini ref="tagMini" originComponent="insTagEditor" :contentId="currentInsId" />
      </div>
      <el-button class="SaveBtn" type="primary" @click="handleSave">Save</el-button>
    </div>
  </div>
</template>

<script>
import { dayjs } from 'element-plus'
import { nanoid } from 'nanoid'
import { Plus } from '@element-plus/icons-vue'
import Editor from '../components/Editor.vue'
import CalendarWeather from '../components/CalendarWeather.vue'
import TagMini from '../components/TagMini.vue'
import editorConfig from '../config/editorConfig'
import router from '../router'
import store from '../store/store'
import { imageUtils } from '../utils/dataUtils'

export default {
  name: 'InsEditor',
  components: { CalendarWeather, Editor, TagMini, Plus },
  data() {
    return {
      config: editorConfig.insConfig.editor,
      userId: '',
      imageUrl: '',
      title: '',
      insDate: '',
      coverPictureId: '',
      currentInsId: '',
    }
  },
  created() {
    this.currentInsId = this.$route.params.insId || nanoid()
  },
  mounted() {
    this.userId = store.getters['userAbout/getUserId']
    this.title = this.currentIns.insTitle || ''
    this.insDate = this.currentIns.insDate || dayjs().format('YYYY-MM-DD')

    const currentCover = store.getters['pictureAbout/fetchInsCoverPicture'](this.currentInsId)
    this.coverPictureId = currentCover?.pictureId || ''
    this.imageUrl = currentCover ? imageUtils.getLocalImageUrl(currentCover) : this.currentIns.insCover || ''
  },
  computed: {
    currentIns() {
      return (
        store.state.insAbout.insData.find((item) => item.insId === this.currentInsId) || {
          insId: this.currentInsId,
          insTags: [],
        }
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
    beforeCoverUpload(file) {
      const isImage = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isImage) {
        ElMessage({ message: '封面只支持 JPG、PNG 或 WEBP', type: 'warning', duration: 2000 })
      }

      if (!isLt3M) {
        ElMessage({ message: '封面大小不能超过 3MB', type: 'warning', duration: 2000 })
      }

      return isImage && isLt3M
    },
    async uploadCover(uploadRequest) {
      try {
        const normalizedFile = await imageUtils.fileToBase64(uploadRequest.file)
        const pictureId = nanoid()
        const picture = {
          pictureId,
          userId: this.userId,
          diaryId: '',
          insId: this.currentInsId,
          pictureName: uploadRequest.file.name,
          pictureContent: '',
          isAvatar: false,
          isCover: true,
          syncStatus: 'local',
        }

        await imageUtils.saveTempImage(this.userId, pictureId, normalizedFile.miniurl)
        store.dispatch('pictureAbout/addPicture', picture)
        await window.api.electronStore.pictureStore.setPicture(
          JSON.parse(JSON.stringify(store.state.pictureAbout.pictureData))
        )
        this.coverPictureId = pictureId
        this.imageUrl = imageUtils.getLocalTempImageUrl(this.userId, pictureId)
        uploadRequest.onSuccess?.({ data: [picture] })

        ElMessage({ type: 'success', message: '封面上传成功' })
      } catch (error) {
        console.error(error)
        uploadRequest.onError?.(error)
        ElMessage({ type: 'error', message: '封面上传失败' })
      }
    },
    handleCoverError() {
      if (!this.coverPictureId) {
        return
      }

      const coverPicture = store.getters['pictureAbout/fetchPictureById'](this.coverPictureId)
      this.imageUrl = coverPicture ? imageUtils.getLocalImageUrl(coverPicture) : ''
    },
    async handleSave() {
      const tag = this.$refs.tagMini.getSelectedTag()
      let finalCoverUrl = this.currentIns.insCover || ''

      if (this.coverPictureId) {
        const coverPicture = store.getters['pictureAbout/fetchPictureById'](this.coverPictureId)
        if (coverPicture) {
          finalCoverUrl = imageUtils.getLocalImageUrl(coverPicture)
          await imageUtils.saveImageToDoc(this.userId, this.currentInsId, this.coverPictureId)
        }
      }

      store.dispatch('insAbout/addIns', {
        insId: this.currentInsId,
        userId: this.userId,
        insTitle: this.title,
        insContent: this.$refs.editor.getContent(),
        insDate: this.insDate || dayjs().format('YYYY-MM-DD'),
        insTags: tag,
        insCover: finalCoverUrl,
      })

      await window.api.electronStore.insStore.setIns(
        JSON.parse(JSON.stringify(store.state.insAbout.insData))
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
#insHeader {
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

#editor-container {
  position: relative;
  display: flex;
  width: 95%;
  height: 78vh;
  margin: 30px 0;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 15px;
}

.editor-box {
  flex: 2;
  min-width: 0;
}

#editor {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.info-box {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cover-container {
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.date-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.title-container input {
  width: 80%;
  height: 60%;
  text-indent: 2em;
  border-radius: 10px;
  border: none;
  font-size: 15px;
}

.SaveBtn {
  position: absolute;
  transform: scale(1.2);
  right: 3%;
  bottom: 3%;
}

.avatar-uploader .avatar {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 75%;
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
