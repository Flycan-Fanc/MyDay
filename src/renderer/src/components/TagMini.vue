<template>
  <div class="tag-container">
    <span class="tagAdd">
      <el-select
        v-model="curTag"
        placeholder="请选择标签"
        size="large"
        style="width: 210px; margin-right: 10px"
      >
        <el-option
          v-for="item in userTags"
          :key="item.tagId"
          :label="item.tagName"
          :value="item.tagName"
        />
      </el-select>
      <el-button type="primary" :icon="Check" circle @click="handleSelect()" />
    </span>
    <div class="tags">
      <el-tag
        v-for="tag in selectedTag"
        :key="tag.tagId"
        closable
        :type="tag.type"
        :color="tag.color"
        effect="dark"
        @close.stop="handleClose(tag)"
        style="margin-right: 5px; margin-bottom: 5px; color: #fff; font-weight: bold; border: none"
      >
        {{ tag.tagName }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import { Check } from '@element-plus/icons-vue'
import store from "../store/store";

export default {
  name: 'TagMini',
  props:{
    contentId:{
      type:Number,
    },
    originComponent:{
      type:String,
      required:true
    },
    dialogPlanTagVisible:{
      type:Boolean,
      default:true,
    }
    // visible:{
    //   type:Boolean,
    //   default:true
    // }
  },
  mounted(){
    //console.log("tagList:" + JSON.stringify(this.userTags))
    store.dispatch('tagAbout/addSelectedTag',JSON.parse(JSON.stringify(this.tagList)))
    //console.log("selectedTag111:"+this.contentId)
  },
  computed:{
    userTags(){
      return store.state.tagAbout.userTags
    },
    //该项目拥有的标签
    tagList(){
      if(this.originComponent === 'planTagManager'){
        return store.state.planAbout.planData.filter(item => item.planId === this.contentId)[0].planTags
      } else if(this.originComponent === 'insTagEditor'){
        //TODO: 获取灵感拥有的标签
        return store.state.insAbout.insData.filter(item => item.insId === this.contentId)[0].insTags
      }

    },
    //用户选择赋予目标项的标签
    selectedTag(){
      //console.log("selectedTag:"+JSON.stringify(store.state.tagAbout.selectedTag))
      return store.state.tagAbout.selectedTag
      //return JSON.parse(JSON.stringify(this.tagList))
    },
    //用户选择要关闭的标签
    closeTag(){
      return store.state.tagAbout.closeTag
    }
  },
  watch:{
    dialogPlanTagVisible(){
      console.log("dialogPlanTagVisible:"+this.dialogPlanTagVisible)
      if(this.dialogPlanTagVisible === true){
        store.dispatch('tagAbout/addSelectedTag',JSON.parse(JSON.stringify(this.tagList)))
      }
    },
  },
  methods:{
    handleClose:function(tag){
      store.dispatch('tagAbout/deleteSelectedTag',tag);
    },
    handleSelect:function(){
      // //生成随机16进制颜色
      // function randomHexColor(){
      //   let hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
      //   while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
      //     hex = '0' + hex;
      //   }
      //   return '#' + hex; //返回‘#'开头16进制颜色
      // }
      // let randomColor = randomHexColor()
      console.log("this.selectedTag:"+JSON.stringify(Object.values(this.selectedTag)))
      console.log("this.curTag:"+JSON.stringify(this.curTag))
      if(this.curTag===''){
        ElMessage({
          message: '请选择标签',
          type: 'warning',
          duration:2000,
        })
      } else if(this.selectedTag.some(item=>item.tagName===this.curTag)){
        ElMessage({
          message: '不能重复添加标签',
          type: 'warning',
          duration:2000,
        })
      }else{
        let curTagObj = this.userTags.filter(item=>item.tagName === this.curTag)
        store.dispatch('tagAbout/addSelectedTag',[...curTagObj,...this.selectedTag])
      }
    },
    //父组件获取selectedTag
    getSelectedTag(){
      return this.selectedTag
    },
  },
  data(){
    return {
      Check,
      curTag:'', //el-option当前选中的标签
    }
  }
}
</script>

<style scoped>
.tag-container {
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.tags {
  margin: 20px;
  align-self: center;
}
</style>
