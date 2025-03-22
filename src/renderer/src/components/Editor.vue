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
    //const markdownIt = this.$refs.md.getMarkdownIt()
    //markdownIt.use(imgSize)
    //console.log('DATA'+JSON.stringify(this.content))
    //console.log('markdownit:'+JSON.stringify(this.md))
    // this.$nextTick(() => {
    //   this.initImageResize();
    // });
    // this.markdownIt.use(imgSize,{
    //   img: {
    //     width: '200px',
    //     height: 'auto', // 高度自适应
    //   },
    // });
    //console.log("md:"+JSON.stringify(this.markdownIt))
    // 配置换行规则：必须两个空格才换行
    //this.markdownIt.set({ breaks: false });
    // this.markdownIt.renderer.rules.image = function (tokens, idx, options, env, self) {
    //   const token = tokens[idx];
    //   let src = token.attrs[token.attrIndex('src')][1];
    //   // 解析自定义尺寸 `=宽x高`
    //   const match = src.match(/=(\d+)x(\d+)$/);
    //   let width = "auto", height = "auto";
    //   if (match) {
    //     width = match[1] + "px"; height = match[2] + "px";
    //     src = src.replace(match[0], ''); // 移除尺寸部分
    //   }
    //   return `<img src="${src}" style="width:${width}; height:${height};">`;
    // };
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
      console.log('pos:'+pos)
      console.log('$file:'+JSON.stringify($file))
      this.img_file[pos] = $file
      //将图片缓存
      this.img_file[pos] = $file
      //console.log('imgs:'+JSON.stringify(this.img_file))
    },
    // 图片删除
    $imgDel(pos) {
      delete this.img_file[pos]
    },
    getData(){
      return { markdown:this.content,image:this.img_file}
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
