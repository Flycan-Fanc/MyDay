<template>
  <el-dialog
    id="planTagPage"
    title="管理Tags"
    v-model="dialogPlanTagVisible"
    width="300px"
    center
    align-center
    :append-to-body="true"
    :close="beforeClosePlanTagPage"
  >
    <TagMini class="tagMini" :planId="planId" :dialogPlanTagVisible="dialogPlanTagVisible"></TagMini>
    <span class="planTagTool">
      <el-button @click="handleSave">确认</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
// TODO: 当标签关闭时，如果有信息被修改，应该提示是否修改信息==>增加逻辑：如何获知信息被修改？
import TagMini from '../TagMini.vue'
import { ElMessage, ElMessageBox } from "element-plus";
import store from "../../store/store";
export default {
  name: 'PlanTagManager',
  props:{
    showPlanTagDialog:{
      type: Boolean,
      default: false
    },
    planId:{
      type: Number,
      required: true
    }
  },
  components:{TagMini},
  computed: {
    dialogPlanTagVisible: {
      get() {
        return this.showPlanTagDialog
      },
      set(val) {
        this.$emit('update:showPlanTagDialog', val)
      }
    },
    selectedTag(){
      return store.state.tagAbout.selectedTag
    }
  },
  data(){
    return {
      anyInfoChanged:false,
    }
  },
  methods:{
    beforeClosePlanTagPage(done) {
      if(this.anyInfoChanged){
        ElMessageBox.confirm(
          '确认要修改信息？',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            customStyle:'width:240px;'
          }
        )
          .then(() => {
            ElMessage({
              type: 'success',
              message: '修改成功',
            });
            // TODO: 修改信息的逻辑
            this.dialogPlanTagVisible = false;
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '放弃修改',
            });
            // TODO: 取消修改信息的逻辑
            this.dialogPlanTagVisible = false;
          })
      } else{
        this.dialogPlanTagVisible = false;
      }
    },
    handleSave(){
      console.log('handleSave')
      console.log("handleSave:"+this.planId+",selectedTag"+JSON.stringify(this.selectedTag))
      //去除掉selectedTag里面要去除的tag
      //store.dispatch('tagAbout/deleteSelectedTagByCloseTag')
      store.dispatch('planAbout/editPlanTag',{planId:this.planId,selectedTag:this.selectedTag})
      store.dispatch('tagAbout/clearSelectedTag')
      this.dialogPlanTagVisible = false;
    },
    handleCancel(){
      //store.dispatch()
      //store.dispatch('tagAbout/clearCloseTag')
      this.dialogPlanTagVisible = false;
    },
  }
}


</script>

<style scoped>
.tagMini {
  margin-top:10px;
}
.planTagTool{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>

