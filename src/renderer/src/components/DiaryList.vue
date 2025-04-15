<template>
  <div id="DiaryList">
    <DiaryMini
      v-for="item in diaryData"
      :key="item.diaryId"
      :ref="'diaryMini'+item.diaryId"
      :diaryId="item.diaryId"
      @changeSelectState="changeSelectState"
      @click="diaryRead($event,item)" />
  </div>
</template>

<script>
import DiaryMini from './DiaryMini.vue'
import router from "../router";
import store from "../store/store";
import PubSub from "pubsub-js";

export default {
  name: 'DiaryList',
  mounted(){
    this.pid_date = PubSub.subscribe('updateDiaryListByDate', this.updateDiaryListByDate)
    this.pid_init = PubSub.subscribe('updateDiaryListInit', this.updateDiaryListInit)
    this.pid_search = PubSub.subscribe('updateDiaryListFuzzySearch', this.updateDiaryListFuzzySearch)
    this.pid_diartSwitch = PubSub.subscribe('changeDiarySwitchState',this.changeDiarySwitchState)
  },
  beforeUnmount() {
    PubSub.unsubscribe(this.pid_date)
    PubSub.unsubscribe(this.pid_init)
    PubSub.unsubscribe(this.pid_search)
    PubSub.unsubscribe(this.pid_diartSwitch)
  },
  components: {
    DiaryMini
  },
  data(){
    return {
      pid_date:'',
      pid_init:'',
      pid_search:'',
      pid_diarySwitch:'',
      isDateChanged:false,  // 是否要按照日期筛选的标志，false-不筛选，true-筛选
      date:'', // 按照日期筛选的日期
      isFuzzySearch:false, // 是否模糊搜索的标志
      search:'', // 模糊搜索关键词,
    }
  },
  computed:{
    diaryData:{
      get(){
        if(this.isDateChanged === false && this.isFuzzySearch === false){
          return store.state.diaryAbout.diaryData
        } else if(this.isDateChanged === true && this.isFuzzySearch === false){
          return store.getters['diaryAbout/diaryListByDate'](this.date)
        } else if(this.isDateChanged === false && this.isFuzzySearch === true){
          return store.getters['diaryAbout/fuzzySearchDiaryList'](this.search)
        }
      },
    },
    selectState:{
      get(){
        let res = []
        this.diaryData.forEach(item=>{res.push({diaryId:item.diaryId,selected:false})})
        return res
      }
    }
  },
  watch:{
    selectState:{
      handler(val){
      }
    }
  },
  methods:{
    diaryRead(e,item){
      router.push({
        name:'DiaryView',
        params:{
          diaryId:item.diaryId
        }
      })
    },
    updateDiaryListByDate(msg,data){
      this.isDateChanged = true
      this.isFuzzySearch = false // 模糊搜索和日期筛选不能同时存在
      this.date = data
    },
    updateDiaryListFuzzySearch(msg,data){
      this.isFuzzySearch = true
      this.isDateChanged = false
      this.search = data
    },
    updateDiaryListInit(msg,data){
      this.isDateChanged = false
      this.isFuzzySearch = false
      this.date = ''
      this.search = ''
    },
    changeSelectState(diaryId){
      this.selectState.forEach(item=>{
        if(item.diaryId === diaryId){
          item.selected = !item.selected
        }
      })
    },
    // 改变diaryMini的状态
    // 全选
    selectAll(){
      this.selectState.forEach(item=>{
        item.selected = true
        this.$refs['diaryMini'+item.diaryId][0].select()  // 通知diaryMini也变为选择状态
      })
    },
    // 全不选
    unSelectAll(){
      this.selectState.forEach(item=>{
        item.selected = false
        this.$refs['diaryMini'+item.diaryId][0].unSelect()
      })
    },
    // 改变全选switch的状态
    changeDiarySwitchState(msg,data){
      // TODO:功能可以实现，但暂时还没找到为什么是false成立？
      if((this.selectState.filter(item=>item.selected === true).length) === this.diaryData.length){
        PubSub.publish('selectAllDiary')
      } else{
        PubSub.publish('unSelectAllDiary')
      }
    },
    // 获取选中的diaryId数组
    getSelectDiaryId(){
      let res = []
      this.selectState.forEach(item=>{
        if(item.selected === true){
          res.push(item.diaryId)
        }
      })
      return res
    },
  }
}
</script>

<style scoped>
#DiaryList {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  overflow-y: auto;
  margin-top: 10px;
}
/* 自定义滚动条优化 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  border: 2px solid transparent;
  background-clip: content-box;
}
</style>
