<template>
  <mavon-editor
    v-model="content"
    :toolbars="config.toolbarConfig"
    v-bind="config.editorConfig"
    @change="handleChange"
    @imgAdd="$imgAdd"
    @imgDel="$imgDel"
    :style="{ borderRadius: '10px' }"
    :boxShadow="false"
  />
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Editor',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  mounted(){
    console.log("editor:"+JSON.stringify(this.config));
  },
  data() {
    return {
      content: '## 欢迎使用mavon-editor\n输入内容...',
    }
  },
  methods: {
    handleChange(markdown, html) {
      console.log('当前内容:', { markdown, html })
    },
    // 图片上传
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('image', $file);
      axios({
        url: 'server url',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        $vm.$img2Url(pos, url);
      })
    },
    // 图片删除
    $imgDel(pos) {}
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

