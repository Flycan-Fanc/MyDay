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
    handleChange(markdown, html) {
      console.log('当前内容:', { markdown, html })
    },
    handleSave(){
      this.$emit('handleSave',{ markdown:this.content,image:this.img_file})
    },
    // 图片添加
    $imgAdd(pos, $file) {
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   this.$refs.md.$img2Url(pos, e.target.result + "=300x200"); // 这里可以追加尺寸参数 };
      //   reader.readAsDataURL($file);
      // }
      // console.log('pos:'+pos)
      // console.log('$file:'+JSON.stringify($file))
      // this.img_file[pos] = $file
      //将图片缓存
      this.img_file[pos] = $file
      //console.log('imgs:'+JSON.stringify(this.img_file))
      this.uploadImg()
    },
    // 图片删除
    $imgDel(pos) {
      delete this.img_file[pos]
    },
    getData(){
      return { markdown:this.content,image:this.img_file}
    },
    // uploadImg($e){
    //   // 第一步.将图片上传到服务器.
    //   let formData = new FormData();
    //   for(let _img in this.img_file){
    //     formData.append(_img, this.img_file[_img]);
    //   }
    //   axios({
    //     url: 'http://localhost:8080/image',
    //     method: 'post',
    //     data: formData,
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   }).then((res) => {
    //     /**
    //      * 例如：返回数据为 res = [[pos, url], [pos, url]...]
    //      * pos 为原图片标志（0）
    //      * url 为上传后图片的url地址
    //      */
    //     // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
    //     for (let img in res) {
    //       // $vm.$img2Url 详情见本页末尾
    //       this.$refs.md.$img2Url(img[0], img[1]);
    //     }
    //   })
    // },
    uploadImg($e) {
      let formData = new FormData();

      // 假设 this.img_files 是 File 对象数组
      this.img_file.forEach((file, index) => {
        formData.append(`images`, file); // 字段名需与后端 upload.array("images") 匹配
      });

      axios.post('http://localhost:8080/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res) => {
        res.data.forEach(img => {
          this.$refs.md.$img2Url(img[0], img[1]);
        });
      }).catch((error) => {
        console.error("上传失败:", error);
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
#mavon-editor img{
  width:100px;
}
</style>
