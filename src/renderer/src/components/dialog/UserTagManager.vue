<template>
  <!-- 标签管理对话框 -->
  <el-dialog
    id="tagPage"
    v-model="dialogTagVisible"
    title="标签管理"
    width="500"
    center
    align-center
    :append-to-body="true"
    :close="closeUserTagDialog"
  >
    <div id="userTags-area">
      <div class="tag-editor">
        <el-color-picker v-model="color" :predefine="predefineColors" style="margin-right:10px"/>
        <el-input v-model="tagInput" style="width: 160px" placeholder="添加标签" />
        <el-button class="mt-4" style="width: 20%; margin-left: 10px" @click="addTag">Add</el-button>
      </div>
      <div class="tagList-box">
        <el-table :data="userTagData" style="width: 100%" max-height="250">
          <el-table-column fixed prop="tagId" label="tagId" v-if="false"></el-table-column>>
          <el-table-column fixed prop="tagName" label="标签" align="center" width="150">
            <template #default="scope">
              <el-tag
                v-show="!tagContentInputVisible[scope.$index]"
                :color="scope.row.color"
                effect="dark"
                style="border:none;font-weight:bold;cursor:pointer;"
                @click="console.log(scope.row.tagName)"
              >{{scope.row.tagName}}</el-tag>
              <el-input
                ref="planContentInput"
                v-if="tagContentInputVisible[scope.$index]"
                v-model="content"
                autofocus
                @blur="overChangeTagContent(scope)"
                @keyup.enter="overChangeTagContent(scope)"
                style="width: 100px"
                placeholder="请输入标签"
              />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="删除标签" align="center" min-width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.row.tagId)">
                Remove
              </el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="编辑标签" align="center" min-width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click.prevent="editRow(scope)">
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Select, CloseBold, Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import store from "../../store/store";

export default {
  name: 'UserTagManager',
  props: {
    showTagDialog: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.initializeTagContentInputVisible();
  },
  computed: {
    dialogTagVisible: {
      get() {
        console.log('get Show:' + this.showTagDialog)
        return this.showTagDialog
      },
      set(val) {
        console.log('set Show:' + this.showTagDialog)
        this.$emit('update:showTagDialog', val)
      }
    },
    //用户拥有的标签
    userTagData(){
      return store.state.tagAbout.userTags
    }
  },
  watch: {
    userTagData:{
      handler(newValue) {
        // 当 userTagData 变化时，重新初始化 tagContentInputVisible
        this.initializeTagContentInputVisible();
      },
      deep: true, // 启用深度检测
    },
  },
  methods: {
    closeUserTagDialog() {
      this.dialogTagVisible = false
    },
    // tag 操作
    deleteRow(index) {
      store.dispatch('tagAbout/deleteTag',index)
    },
    editRow(scope){
      console.log('scope:'+scope)
      this.content = scope.row.tagName
      this.tagContentInputVisible[scope.$index] = true
      // 自动获取焦点
      this.$nextTick(() => {
        this.$refs.planContentInput.focus();
      });
      console.log(this.content)
    },
    addTag(){
      console.log("123:"+this.color)
      store.dispatch('tagAbout/addTag',{tagName:this.tagInput,color:this.color})
    },
    overChangeTagContent(scope){
      let newName = ''
      if(this.content === '' || this.content === '#'){
        ElMessage({
          message: '标签名不能为空',
          type: 'warning',
          duration: 2000
        })
      } else if(this.content[0] === '#'){
        newName = this.content
      } else{
        //this.userTagData[scope.$index].tagName = '#' + this.content
        newName = '#' + this.content
      }
      store.dispatch('tagAbout/editTagName',{tagId:scope.row.tagId,tagName:newName})
      this.tagContentInputVisible[scope.$index] = false
      this.content = ''
      console.log('tagData:'+JSON.stringify(this.userTagData))
    },
    initializeTagContentInputVisible() {
      if (this.userTagData && this.userTagData.length) {
        this.tagContentInputVisible = new Array(this.userTagData.length).fill(false);
      } else {
        console.warn('userTagData is not initialized or is empty');
      }
    },
  },
  data() {
    return {
      // icon
      Select,
      CloseBold,
      Edit,
      Delete,
      // tag
      tagInput: '',
      color: '#FF8707',
      predefineColors:[
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577',
      ],
      // 标签edit
      tagContentInputVisible: [],
      content:'',
    }
  }
}
</script>

<style scoped>
#userTags-area {
  display: flex;
  flex-direction: column;
}
.tag-editor {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tagList-box{
  display:flex;
  justify-content: center;
}
</style>
