<template>
  <!-- 标签管理对话框 -->
  <el-dialog
    id="tagPage"
    v-model:="dialogTagVisible"
    title="标签管理"
    width="500"
    center
    align-center
    :append-to-body="true"
    :close="closeTagDialog"
  >
    <div id="userTags-area">
      <div class="tag-editor">
        <el-input v-model="tagInput" style="width: 160px" placeholder="添加标签" />
        <el-button class="mt-4" style="width: 20%; margin-left: 10px" @click="">Add</el-button>
      </div>
      <div class="tagList-box">
        <el-table :data="userTagData" style="width: 100%" max-height="250">
          <el-table-column fixed prop="name" label="标签" align="center" width="150">
            <template #default="scope">
              <el-tag
                :color="scope.row.color"
                effect="dark"
                style="border:none;font-weight:bold;cursor:pointer;"
              >{{scope.row.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="删除标签" align="center" min-width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                Remove
              </el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="编辑标签" align="center" min-width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click.prevent="editRow(scope.$index)">
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
export default {
  name: 'UserTagManager',
  props: {
    showTagDialog: {
      type: Boolean,
      default: false
    }
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
    }
  },
  methods: {
    closeTagDialog() {
      this.dialogTagVisible = false
    },
    // tag 操作
    deleteRow(index) {
      this.userTagData.value.splice(index, 1)
    },
    editRow(index){
      this.userTagData.value[index].name = this.tagInput
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
      userTagData: [
        { id: 1, name: '标签1', color: '#2da322' },
        { id: 2, name: '标签2', color: '#89eeff' },
        { id: 3, name: '标签3', color: '#D71CFF' },
        { id: 4, name: '标签4', color: '#71d2af' },
        { id: 5, name: '标签5', color: '#672882' },
        { id: 6, name: '标签6', color: '#968869' },
        { id: 7, name: '标签7', color: '#449ef8' },
        { id: 8, name: '标签8', color: '#FFD700' },
        { id: 9, name: '标签9', color: '#717892' },
        { id: 10, name: '标签10', color: '#456789' },
        { id: 11, name: '标签11', color: '#78eadc' },
        { id: 12, name: '标签12', color: '#121145' },
        { id: 13, name: '标签13', color: '#777777' }
      ],
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
