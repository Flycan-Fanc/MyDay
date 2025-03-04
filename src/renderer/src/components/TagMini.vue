<template>
  <div class="tag-container">
    <span class="tagAdd">
      <el-select
        v-model="curTag"
        placeholder="请选择标签"
        size="large"
        style="width: 210px;margin-right:10px;"
      >
        <el-option
          v-for="item in tags"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" :icon="Check" circle @click="handleSelect()"/>
    </span>
    <div class="tags">
      <el-tag
        v-for="tag in selectedTag"
        :key="tag.label"
        closable
        :type="tag.type"
        :color="tag.color"
        effect="dark"
        @close="handleClose(tag)"
        style="margin-right:5px;margin-bottom: 5px;color:#fff;font-weight: bold;border:none">
        {{ tag.value }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import { Check } from '@element-plus/icons-vue'

export default {
  name: 'TagMini',
  methods:{
    handleClose:function(tag){
      console.log(tag)
      this.selectedTag.splice(this.selectedTag.indexOf(tag), 1)
    },
    handleSelect:function(){
      //生成随机16进制颜色
      function randomHexColor(){
        let hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
        while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
          hex = '0' + hex;
        }
        return '#' + hex; //返回‘#'开头16进制颜色
      }
      let randomColor = randomHexColor()
      console.log("this.selectedTag:"+JSON.stringify(Object.values(this.selectedTag)))
      console.log("this.curTag:"+this.curTag)
      if(this.curTag===''){
        ElMessage({
          message: '请选择标签',
          type: 'warning',
          duration:2000,
        })
      } else if(this.selectedTag.some(item=>item.label===this.curTag)){
        ElMessage({
          message: '不能重复添加标签',
          type: 'warning',
          duration:2000,
        })
      }else{
        this.selectedTag.push({
          value: this.curTag,
          label: this.curTag,
          color: randomColor,
        })
        //this.curTag = ''
      }
    },
  },
  data(){
    return {
      Check,
      curTag:'',
      //用户拥有的标签
      tags:[
        {
          value: '#工作',
          label: '#工作',
          color:  '#12c23d'
        },
        {
          value: '#学习',
          label: '#学习',
          color: '#ff6b81'
        },
        {
          value: '#娱乐',
          label: '#娱乐',
          color: '#ff9f43'
        },
      ],
      selectedTag:[] //用户选择赋予目标项的标签
    }
  }
}


</script>

<style scoped>
.tag-container{
  flex:5;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.tags{
  margin:20px;
  align-self: center;
}
</style>

