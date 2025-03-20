<template>
    <div id="DiaryList">
      <DiaryMini v-for="item in diaryData" :key="item.diaryId" @click="diaryRead(item)"/>
    </div>
</template>

<script>
import DiaryMini from './DiaryMini.vue'
import router from "../router";
import store from "../store/store";
import {mapState} from "vuex";
export default {
  name: 'DiaryList',
  components: {
    DiaryMini
  },
  computed:{
    ...mapState('diaryAbout', ['diaryData'])
  },
  methods:{
    diaryRead(item){
      router.push({
        name:'DiaryView',
        params:{
          diaryId:item.diaryId
        }
      })
    }
  }
}


</script>

<style scoped>
#DiaryList {
  display:grid;
  grid-template-columns: repeat(auto-fill, 250px);
  overflow-y:auto;
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

