<template>
  <!-- 标签管理对话框 -->
  <el-dialog
    id="tagPage"
    v-model:="dialogTagVisible"
    title="标签管理" width="500"
    center align-center
    :append-to-body="true"
    :close="closeTagDialog"
  >
    <div id="userTags-area">
      <div class="tag-editor">
        <el-input v-model="tagInput" style="width: 160px" placeholder="添加标签" />
        <div class="tagTool">
          <el-button :icon="Select" type="primary"/>
          <el-button :icon="CloseBold" type="danger"/>
        </div>
      </div>
      <el-scrollbar class="userTagList-box" height="350px">
        <div class="tagList" v-for="item in userTagList" :key="item.id">
          <div class="tag">
            <el-tag :color="item.color" size="large" style="margin-bottom: 10px;">{{item.name}}</el-tag>
            <el-button :icon="Edit" size="small" class="tagTool"></el-button>
            <el-button :icon="Delete" size="small" class="tagTool"></el-button>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<script>
import {Select,CloseBold,Edit,Delete} from "@element-plus/icons-vue";
export default {
  name: "UserTagManager",
  props: {
    showTagDialog: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    dialogTagVisible:{
      get(){
        console.log("get Show:"+this.showTagDialog)
        return this.showTagDialog
      },
      set(val){
        console.log("set Show:"+this.showTagDialog)
        this.$emit('update:showTagDialog',val)
      }
    }
  },
  methods:{
    closeTagDialog() {
      this.dialogTagVisible = false
    },
  },
  data(){
      return {
        // icon
        Select,
        CloseBold,
        Edit,
        Delete,
        // tag
        tagInput:'',
        userTagList:[
          {id:1,name:"标签1",color:'#2da322'},
          {id:2,name:"标签2",color:'#89eeff'},
          {id:3,name:"标签3",color:'#D71CFF'},
          {id:4,name:"标签4",color:'#71d2af'},
          {id:5,name:"标签5",color:'#672882'},
          {id:6,name:"标签6",color:'#968869'},
          {id:7,name:"标签7",color:'#449ef8'},
          {id:8,name:"标签8",color:'#FFD700'},
          {id:9,name:"标签9",color:'#717892'},
          {id:10,name:"标签10",color:'#456789'},
          {id:11,name:"标签11",color:'#78eadc'},
          {id:12,name:"标签12",color:'#121145'},
          {id:13,name:"标签13",color:'#777777'}
        ],
      }
  }
}


</script>

<style scoped>
#userTags-area{
  display:flex;
  flex-direction: column;
}
.tag-editor{
  display:flex;
  justify-content: center;
  align-items: center;
}
.tagTool{
  margin-left:15px;
}
.userTagList-box{
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top:15px;
  width:80%;
}
.tagList{
  background-color: tomato;
  display:flex;
  align-items: center;
  justify-content: center;
}
.tag{
  align-self: center;
}
.tagTool{
  visibility: hidden;
}
.tag:hover .tagTool{
  visibility:visible;
}
</style>

