<template>
    <div id="CalendarOneWeek">
      <CalendarMini
        v-for="(item,index) in 7"
        :key='index'
        class="CalendarMini"
        :ref="'cm'+index"
        :choose="currentChosenIndex === index ? 1 : 0"
        :offset="index"
        @click="handleSelect($event,index)"
      ></CalendarMini>
    </div>
</template>

<script>
import CalendarMini from "./CalendarMini.vue";
import PubSub from 'pubsub-js';
export default {
  name: 'CalendarOneWeek',
  //props:['updateDate'],
  components:{
    CalendarMini
  },
  data(){
    return{
      currentChosenIndex: -1, // 初始无选中
      curDate:'',
    }
  },
  methods:{
    handleSelect(e,index) {
      this.currentChosenIndex = index;
      this.curDate = this.$refs['cm'+index][0].getDate();
      this.$emit('updateDate',this.curDate);
      PubSub.publish('getCurDate',this.curDate);
    },
    getCurDate(){
      return this.curDate || '';
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

