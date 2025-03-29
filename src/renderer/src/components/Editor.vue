<template>
  <mavon-editor
    id="editor"
    ref="md"
    v-model="content"
    :toolbars="config.toolbarConfig"
    v-bind="config.editorConfig"
    @change="handleChange"
    @imgAdd="$imgAdd"
    @imgDel="$imgDel"
    @save="handleSave"
    :style="{ borderRadius: '10px' }"
    :boxShadow="false"
  />
</template>

<script>
import { ref } from 'vue';
//import { md } from '../utils/markdown.js'
import { imgSize } from "@mdit/plugin-img-size";
import { mavonEditor }  from 'mavon-editor'
import store from "../store/store";
import axios from "axios";


export default {
  name: 'Editor',
  props: {
    config: {
      type: Object,
      required: true
    },
    diary:{
      type:Object,
      default: {}
    }
  },
  mounted(){
    console.log('diary数据：'+JSON.stringify(this.diary))
    // 获取图片
    let img = store.getters['pictureAbout/fetchDiaryImage'](this.diary.diaryId)
    console.log('图片数据：'+JSON.stringify(img))
    if(img === null){
      this.img_file = [{miniurl:'no img at pos 0',_name:'null'}]
    } else{
      this.img_file = img
    }
    // 获取内容
    this.content = this.diary.diaryContent || '默认内容'
  },
  data() {
    return {
      //md,
      markdownIt:mavonEditor.getMarkdownIt(),
      content: '',
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
    }
  },
  methods: {
    handleChange(value, render) {
      // console.log('当前内容:', { markdown, html })
    },
    handleSave(){
      this.$emit('handleSave',{ markdown:this.content,image:this.img_file})
    },
    // 图片添加
    $imgAdd(pos, $file) {
      //压缩图片
      this.compressBase64Image($file.miniurl)
        .then(compressedBase64 => {
          $file.miniurl = compressedBase64
        })
        .catch(error => {
          console.error('处理失败:', error);
        });
      // 图片缓存
      this.img_file[pos] = $file
      // 图片上传至服务器
      this.uploadImg(pos)
    },
    // 图片删除
    $imgDel(pos) {
      delete this.img_file[pos]
    },
    // 父组件获取数据的3个api
    getData(){
      return { markdown:this.content,image:this.img_file}
    },
    getImage(){
      return this.img_file.slice(1)
    },
    getContent(){
      return this.content
    },
    // 将图片上传至服务器
    uploadImg(pos) {
      let formData = new FormData();

      // 假设 this.img_files 是 File 对象数组
      this.img_file.forEach((file, index) => {
        formData.append(`file`, file); // 字段名需与后端 upload.array("images") 匹配
        // console.log('img_file:'+JSON.stringify(file))
      });

      axios.post('http://localhost:8080/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' },
      }).then((res) => {
        res.data.forEach(img => {
          this.$refs.md.$img2Url(pos, img.url);
        });
      }).catch((error) => {
        console.error("上传失败:", error);
      });
    },
    /**
     * 压缩图片Base64数据（当宽度 > 300px时等比例缩小）
     * @param {string} base64 - 原始图片Base64
     * @param {number} [maxWidth=300] - 最大允许宽度
     * @returns {Promise<string>} 处理后的Base64
     */
    async compressBase64Image(base64, maxWidth = 300) {
      return new Promise((resolve, reject) => {
        // 1. 创建Image对象加载图片
        const img = new Image();
        img.src = base64;

        img.onload = () => {
          // 2. 获取原始尺寸
          const originalWidth = img.width;
          const originalHeight = img.height;

          // 3. 判断是否需要缩放
          if (originalWidth <= maxWidth) {
            resolve(base64); // 直接返回原始数据
            return;
          }

          // 4. 计算缩放后尺寸
          const scaleFactor = maxWidth / originalWidth;
          const newWidth = maxWidth;
          const newHeight = originalHeight * scaleFactor;

          // 5. 使用Canvas进行缩放绘制
          const canvas = document.createElement('canvas');
          canvas.width = newWidth;
          canvas.height = newHeight;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // 6. 转换回Base64（可调整质量）
          const quality = 0.85; // 0~1质量系数
          resolve(canvas.toDataURL('image/jpeg', quality));
        };

        img.onerror = (err) => {
          reject(new Error('图片加载失败'));
        };
      });
    }
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
