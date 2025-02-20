<template>
    <div id="CalendarOneWeek">
      <CalendarMini
        v-for="(item,index) in 7"
        :key='index'
        class="CalendarMini"
        :choose="currentChosenIndex === index ? 1 : 0"
        @select="handleSelect(index)"
      ></CalendarMini>
    </div>
</template>

<script>
import CalendarMini from "./CalendarMini.vue";
export default {
  name: 'CalendarOneWeek',
  components:{
    CalendarMini
  },
  data(){
    return{
      currentChosenIndex: -1 // 初始无选中
    }
  },
  methods:{
    handleSelect(index) {
      this.currentChosenIndex = index;
    }
  }

}


</script>

<style scoped>
*{
  margin:0;
  padding:0;
}
#CalendarOneWeek{
  display:flex;
  justify-content: space-around;
  margin-right:5%;
}
</style>

