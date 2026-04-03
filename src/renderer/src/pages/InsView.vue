<template>
  <div id="insView">
    <div id="insHeader">
      <span class="calendar-area"><CalendarWeather :date="insData.insDate" /></span>
      <span class="tools-area" @click="back">
        <img src="../assets/icon/ic_tools_return.png" alt="返回" />
        <span>返回</span>
      </span>
    </div>
    <div id="view-container">
      <div class="view-box">
        <Editor id="editor" :config="config" from="灵感" :ins="insData" />
      </div>
      <div class="info-box">
        <div class="cover-container">
          <span class="cover-box">
            <img :src="displayCover" alt="" @error="handleCoverError" />
          </span>
        </div>
        <div class="title-container">
          {{ insData.insTitle }}
        </div>
        <div class="tag-container">
          <div class="tags">
            <el-tag
              v-for="tag in insData.insTags"
              :key="tag.tagId"
              :color="tag.color"
              effect="dark"
              style="margin-right: 5px; margin-bottom: 5px; color: #fff; font-weight: bold; border: none;"
            >
              {{ tag.tagName }}
            </el-tag>
          </div>
        </div>
        <div class="tools-container">
          <div class="tools-box">
            <el-button class="EditBtn" type="primary" :icon="Edit" style="width: 60px" @click="handleEdit" />
            <el-button class="DelBtn" type="danger" :icon="Delete" style="width: 60px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Edit, Delete } from '@element-plus/icons-vue'
import CalendarWeather from '../components/CalendarWeather.vue'
import Editor from '../components/Editor.vue'
import editorConfig from '../config/editorConfig'
import router from '../router'
import store from '../store/store'
import { imageUtils } from '../utils/dataUtils'

export default {
  name: 'InsView',
  components: { Editor, CalendarWeather },
  computed: {
    insId() {
      return this.$route.params.insId
    },
    insData() {
      return store.state.insAbout.insData.find((item) => item.insId === this.insId) || { insTags: [] }
    },
    insCover() {
      return this.coverPicture ? imageUtils.getLocalImageUrl(this.coverPicture) : (this.insData?.insCover || '')
    },
    coverPicture() {
      return store.getters['pictureAbout/fetchInsCoverPicture'](this.insId)
    },
    remoteCover() {
      if (this.coverPicture?.pictureId) {
        return imageUtils.getImageUrl(this.coverPicture.pictureId)
      }

      return this.insData?.insCover || ''
    },
    defaultCover() {
      return new URL('../assets/background/plouzane-1758197.jpg', import.meta.url).href
    },
    displayCover() {
      if (this.useRemoteFallback) {
        return this.remoteCover || this.defaultCover
      }

      return this.insCover || this.remoteCover || this.defaultCover
    },
  },
  methods: {
    back() {
      router.back()
    },
    handleCoverError() {
      this.useRemoteFallback = true
    },
    handleEdit() {
      router.push({
        name: 'InsEditor',
        params: {
          insId: this.insId,
        },
      })
    },
  },
  data() {
    return {
      Edit,
      Delete,
      config: editorConfig.insConfig.view,
      useRemoteFallback: false,
    }
  },
  watch: {
    insCover() {
      this.useRemoteFallback = false
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

#view-container {
  position: relative;
  display: flex;
  width: 95%;
  height: 78vh;
  margin: 30px 0;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 15px;
}

.view-box {
  flex: 2;
  min-width: 0;
}

#editor {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.info-box {
  position: relative;
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

.cover-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 75%;
  border-radius: 10px;
  background-color: #ededed;
  font-size: 20px;
  color: rgba(94, 94, 94, 0.4);
}

.cover-box > img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.title-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: #707070;
  font-size: 20px;
  font-weight: bold;
}

.tag-container {
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.tags {
  margin: 20px;
  align-self: center;
}

.tools-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tools-container > .tools-box {
  position: absolute;
  bottom: 5%;
}
</style>
