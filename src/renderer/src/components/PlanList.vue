<template>
  <div id="PlanList">
    <PlanMini v-for="item in planData" :key="item.planId" :planId="item.planId"></PlanMini>
  </div>
</template>

<script>
import PlanMini from "./PlanMini.vue";
import store from "../store/store";
import PubSub from "pubsub-js";
export default {
  name: "PlanList",
  props:{
    curDate:{
      type:String,
      default:''
    }
  },
  components: {
    PlanMini,
  },
  mounted() {
    const planList = document.querySelector("#PlanList");
    planList.style.overflowY = "auto";

    const planContainers = planList.querySelectorAll("#Plan-container");
    planContainers.forEach((container) => {
      container.style.overflowY = "auto";
    });
  },
  beforeUpdate() {
    //console.log("planData:"+this.planData)
    // TODO:触发CalendarMini更新计划数量
    PubSub.publish('updatePlanNum')
  },
  methods:{
    handleDone(){

    },

  },
  data(){
  },
  computed:{
    planData(){
      if(this.curDate===''){
        return store.getters["planAbout/sortedPlanList"]
      } else {
        return store.getters["planAbout/sortedPlanListByDate"](this.curDate)
      }
    }
  },
  watch:{
    curDate(){
      if(this.curDate===''){
        return store.getters["planAbout/sortedPlanList"]
      } else {
        return store.getters["planAbout/sortedPlanListByDate"](this.curDate)
      }
    }
  }
}
</script>

<style scoped>
body {
  background-color: #aecef1;
}
* {
  margin: 0;
  padding: 0;
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
