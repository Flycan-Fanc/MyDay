<template>
  <div id="InsList">
    <InsMini v-for="item in insData" :key="item.insId" @click="insRead(item.insId)"></InsMini>
  </div>
</template>

<script>
import InsMini from './InsMini.vue'
import router from "../router";
import PubSub from "pubsub-js";
import store from "../store/store";
export default {
  name:'InsList',
  components:{
    InsMini
  },
  mounted(){
    //鼠标滚动时页面横向滚动
    document.querySelector('#InsList').addEventListener('wheel', function(event) {
      let scrollLength = event.deltaY * 2;
      console.log(scrollLength)
      document.querySelector('#InsList').scrollBy({ left: scrollLength, behavior: 'smooth' });
    })

    this.pid_date = PubSub.subscribe('updateInsListByDate', this.updateInsListByDate)
    this.pid_init = PubSub.subscribe('updateInsListInit', this.updateInsListInit)
    this.pid_search = PubSub.subscribe('updateInsListFuzzySearch', this.updateInsListFuzzySearch)
  },
  beforeUnmount() {
    PubSub.unsubscribe(this.pid_date)
    PubSub.unsubscribe(this.pid_init)
    PubSub.unsubscribe(this.pid_search)
  },
  data(){
    return {
      pid_date:'',
      pid_init:'',
      pid_search:'',
      isDateChanged:false,  // 是否要按照日期筛选的标志，false-不筛选，true-筛选
      date:'', // 按照日期筛选的日期
      isFuzzySearch:false, // 是否模糊搜索的标志
      search:'', // 模糊搜索关键词
    }
  },
  computed:{
    insData:{
      get(){
        if(this.isDateChanged === false && this.isFuzzySearch === false){
          return store.state.insAbout.insData
        } else if(this.isDateChanged === true && this.isFuzzySearch === false){
          return store.getters['insAbout/insListByDate'](this.date)
        } else if(this.isDateChanged === false && this.isFuzzySearch === true){
          return store.getters['insAbout/fuzzySearchInsList'](this.search)
        }
      },
    },
  },
  methods:{
    insRead(insId){
      router.push({
        name:'InsView',
        params:{
          insId:insId
        }
      })
    },
    updateInsListByDate(msg,data){
      this.isDateChanged = true
      this.isFuzzySearch = false
      this.date = data
    },
    updateInsListFuzzySearch(msg,data){
      this.isFuzzySearch = true
      this.isDateChanged = false
      this.search = data
    },
    updateInsListInit(msg,data){
      this.isDateChanged = false
      this.isFuzzySearch = false
      this.date = ''
      this.search = ''
    }
  }
}
</script>

<style scoped>
#InsList {
  display: grid;
  grid-template-rows: 250px 250px; /* 固定两行高度 */
  grid-auto-columns: 200px; /* 自动生成的列宽 */
  grid-auto-flow: column; /* 按列优先排列 */
  padding: 0 20px; /* 两侧留白 */
  overflow-x: auto;
  /*margin-top: 20px;*/
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
