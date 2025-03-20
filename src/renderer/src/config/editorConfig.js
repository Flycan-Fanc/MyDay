export default {
  diaryConfig: {
    // 编辑页配置
    editor:{
      // 工具栏配置
      toolbarConfig:{
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
        navigation: false, // 导航目录
        /* 2.2.1 */
        subfield: true, // 关闭分栏模式
        preview: true, // 预览
      },
      // 编辑器配置
      editorConfig:{
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
      }
    },
    // 预览页配置
    view:{
      // 工具栏配置
      toolbarConfig:{
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
        navigation: false, // 导航目录
        /* 2.2.1 */
        subfield: false, // 关闭分栏模式
        preview: true, // 预览
      },
      // 编辑器配置
      editorConfig:{
        value: '',        // 初始值
        language: 'zh-CN', // 中文支持
        fontSize: '14px',  // 编辑区字体
        boxShadow: false,  // 关闭阴影
        scrollStyle: true, // 开启滚动条样式
        placeholder: '请输入内容...',
        codeStyle: 'atom-one-dark', // 代码高亮主题
        subfield: false,    // 双栏模式
        defaultOpen: 'preview', // 默认打开模式（edit/preview）
        toolbarsFlag: false, // 显示工具栏
        navigation: false,   // 显示导航栏
        shortCut: false      // 启用快捷键
      }
    }
  },
  insConfig:{
    // 编辑页配置
    editor:{
      // 工具栏配置
      toolbarConfig:{
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: false, // 标记
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
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.2.1 */
        subfield: false, // 关闭分栏模式
        preview: true, // 预览
      },
      // 编辑器配置
      editorConfig:{
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
      }
    },
    // 预览页配置
    view:{
      // 工具栏配置
      toolbarConfig:{
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
      },
      // 编辑器配置
      editorConfig:{
        value: '',        // 初始值
        language: 'zh-CN', // 中文支持
        fontSize: '14px',  // 编辑区字体
        boxShadow: false,  // 关闭阴影
        scrollStyle: true, // 开启滚动条样式
        placeholder: '请输入内容...',
        codeStyle: 'atom-one-dark', // 代码高亮主题
        subfield: false,    // 双栏模式
        defaultOpen: 'preview', // 默认打开模式（edit/preview）
        toolbarsFlag: false, // 显示工具栏
        navigation: false,   // 显示导航栏
        shortCut: false      // 启用快捷键
      }
    }
  }
}
