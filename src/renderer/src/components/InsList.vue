<template>
  <div id="InsList">
    <InsMini v-for="i in 20" :key="i"></InsMini>
  </div>
</template>

<script>
import InsMini from './InsMini.vue'
export default {
  name:'InsList',
  mounted(){
    //鼠标滚动时页面横向滚动
    document.querySelector('#InsList').addEventListener('wheel', function(event) {
      let scrollLength = event.deltaY * 2;
      console.log(scrollLength)
      document.querySelector('#InsList').scrollBy({ left: scrollLength, behavior: 'smooth' });
    })
  },
  components:{
    InsMini
  },
}


</script>

<style scoped>
#InsList {
  display: grid;
  grid-template-rows: 250px 250px; /* 固定两行高度 */
  grid-auto-columns: 200px;       /* 自动生成的列宽 */
  grid-auto-flow: column;         /* 按列优先排列 */
  padding: 0 20px;               /* 两侧留白 */
  overflow-x:auto;
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

