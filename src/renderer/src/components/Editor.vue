<template>
  <mavon-editor
    id="editor"
    ref="md"
    v-model="content"
    :toolbars="config.toolbarConfig"
    v-bind="config.editorConfig"
    @change="handleChange"
    @imgAdd="asyncImgAdd"
    @imgDel="$imgDel"
    @save="handleSave"
    :style="{ borderRadius: '10px' }"
    :boxShadow="false"
  />
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import store from '../store/store'
import { imageUtils } from '../utils/dataUtils'
import { pictureAPI } from '../utils/api'

const DIARY_SOURCES = new Set(['日记', '鏃ヨ'])
const INSPIRATION_SOURCES = new Set(['灵感', '鐏垫劅'])

export default {
  name: 'Editor',
  props: {
    config: {
      type: Object,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    diary: {
      type: Object,
      default: () => ({}),
    },
    ins: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      markdownIt: mavonEditor.getMarkdownIt(),
      content: '',
      docId: '',
      userId: '',
      pictureMap: new Map(),
      imgFile: [{ miniurl: 'no img at pos 0', _name: 'null' }],
    }
  },
  mounted() {
    this.userId = store.getters['userAbout/getUserId']
    this.initEditorState()
  },
  watch: {
    diary: {
      deep: true,
      handler() {
        if (this.isDiarySource()) {
          this.initEditorState()
        }
      },
    },
    ins: {
      deep: true,
      handler() {
        if (this.isInspirationSource()) {
          this.initEditorState()
        }
      },
    },
  },
  methods: {
    isDiarySource() {
      return DIARY_SOURCES.has(this.from)
    },
    isInspirationSource() {
      return INSPIRATION_SOURCES.has(this.from)
    },
    getCurrentPictures() {
      if (this.isDiarySource()) {
        return store.state.pictureAbout.pictureData.filter(
          (item) => item.diaryId === String(this.diary?.diaryId) && item.isCover !== true
        )
      }

      if (this.isInspirationSource()) {
        return store.state.pictureAbout.pictureData.filter(
          (item) => item.insId === String(this.ins?.insId) && item.isCover !== true
        )
      }

      return []
    },
    getPictureList() {
      if (this.isDiarySource()) {
        return store.getters['pictureAbout/fetchDiaryImage'](this.diary?.diaryId)
      }

      if (this.isInspirationSource()) {
        return store.getters['pictureAbout/fetchInsImage'](this.ins?.insId)
      }

      return null
    },
    normalizeContentImageUrls(content, pictures) {
      let normalizedContent = content || ''

      pictures.forEach((picture) => {
        if (!picture?.pictureId) {
          return
        }

        const localUrl = imageUtils.getLocalImageUrl(picture)
        const escapedPictureId = picture.pictureId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const remotePattern = new RegExp(
          `https?:\\/\\/[^\\s)]+\\/api\\/picture\\/${escapedPictureId}(\\?[^\\s)]*)?`,
          'g'
        )

        normalizedContent = normalizedContent.replace(remotePattern, localUrl)
      })

      return normalizedContent
    },
    initEditorState() {
      const pictures = this.getCurrentPictures()
      const pictureList = this.getPictureList()

      if (this.isDiarySource()) {
        this.content = this.normalizeContentImageUrls(this.diary?.diaryContent || '', pictures)
        this.docId = this.diary?.diaryId || ''
      } else if (this.isInspirationSource()) {
        this.content = this.normalizeContentImageUrls(this.ins?.insContent || '', pictures)
        this.docId = this.ins?.insId || ''
      }

      this.imgFile = pictureList || [{ miniurl: 'no img at pos 0', _name: 'null' }]
      this.pictureMap = new Map()
      this.imgFile.slice(1).forEach((item, index) => {
        if (item.pictureId) {
          this.pictureMap.set(index + 1, item.pictureId)
        }
      })
    },
    handleChange() {},
    handleSave() {
      this.$emit('handleSave', { markdown: this.content, image: this.imgFile })
    },
    async asyncImgAdd(pos, file) {
      try {
        const normalizedFile = file?.miniurl ? file : await imageUtils.fileToBase64(file)
        const compressedFileObj = await imageUtils.compressImage(normalizedFile)
        const uploadFile = imageUtils.base64ToFile(compressedFileObj.miniurl, compressedFileObj._name)
        const params = {
          userId: this.userId,
          diaryId: this.isDiarySource() ? this.docId : '',
          insId: this.isInspirationSource() ? this.docId : '',
          isAvatar: 0,
          isCover: 0,
          fileScale: 1.0,
        }

        const response = await pictureAPI.uploadPicture(params, [uploadFile])
        const picture = response.data?.[0]
        if (!picture) {
          throw new Error('图片上传返回为空')
        }

        if (this.userId && this.docId) {
          await imageUtils.saveTempImage(this.userId, picture.pictureId, compressedFileObj.miniurl)
          await imageUtils.saveImageToDoc(this.userId, this.docId, picture.pictureId)
        }

        const imageUrl = imageUtils.getLocalImageUrl(picture)
        this.$refs.md.$img2Url(pos, imageUrl)
        this.imgFile[pos] = {
          miniurl: imageUrl,
          _name: picture.pictureName,
          pictureId: picture.pictureId,
        }
        this.pictureMap.set(pos, picture.pictureId)
        store.dispatch('pictureAbout/addPicture', picture)
        await window.api.electronStore.pictureStore.setPicture(
          JSON.parse(JSON.stringify(store.state.pictureAbout.pictureData))
        )

        ElMessage({
          type: 'success',
          message: '图片添加成功',
        })
      } catch (error) {
        console.error(error)
        ElMessage({
          type: 'error',
          message: '图片上传失败',
        })
      }
    },
    async $imgDel(pos) {
      const pictureId = this.pictureMap.get(pos)
      if (!pictureId) {
        delete this.imgFile[pos]
        return
      }

      try {
        await pictureAPI.deletePicture(pictureId)
        store.dispatch('pictureAbout/deletePicture', pictureId)
        await window.api.electronStore.pictureStore.setPicture(
          JSON.parse(JSON.stringify(store.state.pictureAbout.pictureData))
        )
        this.pictureMap.delete(pos)
        delete this.imgFile[pos]
        ElMessage({
          type: 'success',
          message: '图片删除成功',
        })
      } catch (error) {
        console.error(error)
        ElMessage({
          type: 'error',
          message: '图片删除失败',
        })
      }
    },
    getData() {
      return { markdown: this.content, image: this.imgFile }
    },
    getImage() {
      return {
        imgFile: this.imgFile.slice(1),
        imgId: [...this.pictureMap.values()],
      }
    },
    getContent() {
      return this.content
    },
  },
}
</script>

<style scoped>
#editor {
  width: 100%;
  min-width: 0;
}

.interact-resize {
  background: #2196f3;
  opacity: 0.5;
}

#editor :deep(.v-note-panel),
#editor :deep(.v-note-op),
#editor :deep(.v-note-show),
#editor :deep(.v-show-content),
#editor :deep(.markdown-body) {
  min-width: 0;
}

#editor :deep(.auto-textarea-wrapper .auto-textarea-input) {
  white-space: pre-wrap !important;
  overflow-wrap: anywhere;
  word-break: break-word;
  overflow-x: hidden !important;
}

#editor :deep(.v-show-content img) {
  max-width: 100%;
}

#editor :deep(.v-show-content a),
#editor :deep(.markdown-body a),
#editor :deep(.v-show-content p),
#editor :deep(.markdown-body p) {
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>
