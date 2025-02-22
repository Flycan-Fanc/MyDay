<template>
    <div id="DiaryList">
      <DiaryMini v-for="i in 20" :key="i" />
    </div>
</template>

<script>
import DiaryMini from './DiaryMini.vue'
export default {
    name: 'DiaryList',
    components: {
      DiaryMini
    },
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

