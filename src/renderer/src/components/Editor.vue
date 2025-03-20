<template>
  <mavon-editor
    id="editor"
    ref="md"
    v-model="content"
    :toolbars="config.toolbarConfig"
    v-bind="config.editorConfig"
    :markdownIt="md"
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
import { md, interact} from '../utils/markdown.js'

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
    console.log('DATA'+JSON.stringify(this.content))
    console.log('markdownit:'+JSON.stringify(this.md))
    this.$nextTick(() => {
      this.initImageResize();
    });
  },
  data() {
    return {
      md,
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
      this.$emit('handleSave')
    },
    // 图片添加
    $imgAdd(pos, $file) {
      this.img_file[pos] = $file
      // 生成base64并添加到img_files数组
      const reader = new FileReader()
      reader.onload = (e) => {
        const miniurl = e.target.result

        // 初始化默认尺寸
        this.$set(this.sizes, miniurl, {
          width: '300px',
          height: 'auto'
        })
      }
      reader.readAsDataURL(file)
      //将图片缓存
      this.img_file[pos] = $file
      console.log('imgs:'+JSON.stringify(this.img_file))
      // // 第一步.将图片上传到服务器.
      // var formdata = new FormData();
      // formdata.append('image', $file);
      // axios({
      //   url: 'server url',
      //   method: 'post',
      //   data: formdata,
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // }).then((url) => {
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   /**
      //    * $vm 指为mavonEditor实例，可以通过如下两种方式获取
      //    * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
      //    * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      //    */
      //   $vm.$img2Url(pos, url);
      // })
    },
    // 图片删除
    $imgDel(pos) {
      delete this.img_file[pos]
    },
    // 图片上传处理（示例：转 Base64）
    // handleImageAdd(filename, file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     // 替换图片路径为 Base64
    //     this.content = this.content.replace(
    //       filename,
    //       e.target.result
    //     );
    //   };
    //   reader.readAsDataURL(file);
    // },

    // 初始化图片拖拽调整
    initImageResize() {
      interact(".editor img[data-editable]").resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        modifiers: [
          // // 防御性判断 + 参数修正
          // interact.modifiers.aspectRatio ?
          //   interact.modifiers.aspectRatio({ ratio: 'preserve' }) :
          //   null
        ].filter(Boolean),
        listeners: {
          move: (event) => {
            const target = event.target;
            let width = parseFloat(target.getAttribute("width")) || target.offsetWidth;
            let height = parseFloat(target.getAttribute("height")) || target.offsetHeight;

            width += event.deltaRect.left + event.deltaRect.right;
            height += event.deltaRect.top + event.deltaRect.bottom;

            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.setAttribute("width", width);
            target.setAttribute("height", height);

            this.syncMarkdownContent(target);
          }
        }
      });
    },

    // 同步修改后的尺寸到 Markdown 原文
    syncMarkdownContent(imgElement) {
      const src = imgElement.getAttribute("src");
      const alt = imgElement.getAttribute("alt") || "";
      const width = imgElement.getAttribute("width");
      const height = imgElement.getAttribute("height");

      // 构造新语法
      const regex = /!\[(.*?)\]\((.*?)(?:\s*=\s*(\d+)x(\d+))?\)/;
      this.content = this.content.replace(regex, (match, pAlt, pSrc) => {
        return pSrc === src
          ? `![${alt}](${src} =${width}x${height})`
          : match;
      });
    }
  }
}
// 工具栏配置
const toolbarConfig = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  help: true, // 帮助
  /* 1.3.5 */
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  save: true, // 保存（触发events中的save事件）
  /* 1.4.2 */
  navigation: true, // 导航目录
  /* 2.2.1 */
  subfield: false, // 关闭分栏模式
  preview: true, // 预览
}

//完整配置选项
const editorConfig = ref({
  value: '',        // 初始值
  language: 'zh-CN', // 中文支持
  fontSize: '14px',  // 编辑区字体
  boxShadow: false,  // 关闭阴影
  scrollStyle: true, // 开启滚动条样式
  placeholder: '请输入内容...',
  codeStyle: 'atom-one-dark', // 代码高亮主题
  subfield: false,    // 双栏模式
  defaultOpen: 'edit', // 默认打开模式（edit/preview）
  toolbarsFlag: true, // 显示工具栏
  navigation: false,   // 显示导航栏
  shortCut: false      // 启用快捷键
})
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
</style>
