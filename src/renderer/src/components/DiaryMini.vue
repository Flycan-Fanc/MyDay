<template>
  <div id="DiaryMini-container">
    <span class="date">{{ date }}</span>
    <span class="diaryAbstract">{{ title }}</span>
    <el-checkbox
      id="diary-selector"
      type="checkbox"
      v-model="selected"
      @click="changeSelectState($event)"
      style="position: absolute; right: 5%; top: 5%"
    />
  </div>
</template>

<script>

import store from "../store/store";

export default {
  name: 'DiaryMini',
  props: {
    diaryId: {
      type: Number,
      required: true
    },
  },
  beforeUnmount() {
    // 解绑自定义事件
    //this.$off('changeSelectState')
  },
  data() {
    return {
      selected: false,
    }
  },
  computed:{
    diary(){
      return store.state.diaryAbout.diaryData.filter(item=>item.diaryId === this.diaryId)[0]
    },
    date(){
      return this.diary.diaryDate.split('-').join('.')
    },
    title(){
      if(this.diary.diaryTitle.length <= 5){
        return this.diary.diaryTitle
      }else{
        return this.diary.diaryTitle.slice(0,5) + '...'
      }
    },
  },
  watch:{
    selected:{
      handler(){
        this.$emit('changeSelectState',this.diaryId)
      }
    }
  },
  methods:{
    changeSelectState(e){
      e.stopPropagation()
      // this.selected = !this.selected
      // // TODO:通知diaryList改变对应的diary的select状态
      // this.$emit('changeSelectState',this.diaryId)
    },
    // 选择
    select(){
      this.selected = true
    },
    // 取消选择
    unSelect(){
      this.selected = false
    }
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#DiaryMini-container {
  /*记得删掉*/
  margin: 10px;
  /*记得删掉*/
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 230px;
  height: 130px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}
#DiaryMini-container:hover {
  background-color: #fff;
  transform: translate(-5px, -5px);
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.4);
}
.date {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.diaryAbstract {
  flex: 1;
  display: flex;
  font-size: 20px;
}
#diary-selector {
  position: absolute;
  right: 5%;
  top: 5%;
}
</style>
