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
import { mavonEditor }  from 'mavon-editor'
import store from "../store/store";
import {imageRequest} from "../utils/fileRequest";
import {imageUtils} from "../utils/dataUtils";
import { nanoid } from "nanoid";


export default {
  name: 'Editor',
  props: {
    config: {
      type: Object,
      required: true
    },
    from:{
      type:String,
      required: true
    },
    diary:{
      type:Object,
      default: {}
    },
    ins:{
      type:Object,
      default: {}
    }
  },
  mounted(){
    // 初始化数据：根据应用不同，获取不同数据
    this.userId = store.getters['userAbout/getUserId']
    if(this.from === '日记') {
      // 获取图片
      let img = store.getters['pictureAbout/fetchDiaryImage'](this.diary.diaryId)

      if (img === null) {
        this.img_file = [{ miniurl: 'no img at pos 0', _name: 'null' }]
      } else {
        this.img_file = img
      }
      // 获取内容和文档id
      this.content = this.diary.diaryContent || '默认内容'
      this.docId = this.diary.diaryId
    } else if(this.from === '灵感') {
      let img = store.getters['pictureAbout/fetchInsImage'](this.ins.insId)

      if (img === null) {
        this.img_file = [{ miniurl: 'no img at pos 0', _name: 'null' }]
      } else {
        this.img_file = img
      }
      // 获取内容
      this.content = this.ins.insContent || '默认内容'
      this.docId = this.ins.insId
    }
  },
  data() {
    return {
      //md,
      markdownIt:mavonEditor.getMarkdownIt(),
      content: '',
      docId: '',
      userId: '',
      pictureMap: new Map(),
      img_file: [{miniurl:'no img at pos 0',_name:'null'}]
    }
  },
  watch: {
    // 监听 diary 变化并更新 content
    diary: {
      immediate: true, // 立即触发一次
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.content = JSON.stringify(newVal.diaryContent);
        } else {
          this.content = '默认内容';
        }
      }
    },
    // 监听 ins 变化并更新 content
    ins: {
      immediate: true,
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.content = JSON.stringify(newVal.insContent);
        }
      }
    },
  },
  methods: {
    handleChange(value, render) {
      // console.log('当前内容:', { markdown, html })
    },
    handleSave(){
      this.$emit('handleSave',{ markdown:this.content,image:this.img_file})
    },
    // 图片添加
    async asyncImgAdd(pos, $file) {
      let newFileObj = {}
      //压缩图片
      await imageUtils.compressImage($file).then(res=>{
        newFileObj = res
      })

      let newFile = imageUtils.base64ToFile(newFileObj.miniurl, newFileObj._name)

      let pictureId = nanoid();
      // 图片保存到本地
      imageRequest.post(`http://localhost:3001/images/save/${this.userId}/${this.docId}/${pictureId}`, newFile)
        .then(res=>{
          ElMessage({
            type:'success',
            message:'图片添加成功'
          })
          this.$refs.md.$img2Url(pos, res.path);
          // 图片缓存
          this.img_file[pos] = newFile
          this.pictureMap.set(pos, pictureId);

        }).catch(err=>{
          console.log(err)
        })
    },
    // 图片删除
    $imgDel(pos) {
      // 删除图片本地缓存
      let pictureId = this.pictureMap.get(pos)
      imageRequest.delete(`http://localhost:3001/images/delete/${this.userId}/${this.docId}/${pictureId}`)
        .then(res=>{
          ElMessage({
            type:'success',
            message:'图片删除成功'
          })
          // 删除图片数组中对应元素
        }).catch(err=>{
          console.log(err)
        })
      // 从缓存数组中删除
      delete this.img_file[pos]
      delete this.pictureMap[pos]
    },
    // 父组件获取数据的3个api
    getData(){
      return { markdown:this.content,image:this.img_file}
    },
    getImage(){
      return {
        imgFile:this.img_file.slice(1),
        imgId:[...this.pictureMap.values()],
      }
    },
    getContent(){
      return this.content
    },
  }
}
</script>

<style scoped>
#editor{
  min-width: 95%;
}
/* 图片拖拽手柄样式 */
.interact-resize {
  background: #2196f3;
  opacity: 0.5;
}
#editor .auto-textarea-wrapper .auto-textarea-input {
  white-space: nowrap !important;    /* 禁止换行 */
  overflow-x: auto !important;       /* 横向溢出显示滚动条 */
}

</style>
