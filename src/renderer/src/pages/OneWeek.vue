<template>
  <div id="oneweek">
    <div class="oneweekHeader">
      <div class="greetings-area">
        <span class="hello">Hello,Steve</span>
        <span class="greetings">为你接下来的7天做计划</span>
      </div>
      <div class="deleteArea" @click="handleDeleteAllDone()">
        <span>Delete all done</span>
        <img src="../assets/icon/ic_tools_delete.png" alt="DeleteAllDoneBtn" />
      </div>
    </div>
    <CalendarOneWeek ref="calendarOneWeek" @updateDate="updateDate"></CalendarOneWeek>
    <AddPlan class="addPlan"/>
    <div class="list-area">
      <PlanList id="PlanList" :curDate="curDate"></PlanList>
    </div>
  </div>
</template>

<script>
import CalendarOneWeek from '../components/CalendarOneWeek.vue'
import PlanList from '../components/PlanList.vue'
import AddPlan from '../components/AddPlan.vue'
import store from "../store/store";
import {h} from 'vue'

export default {
  components: { AddPlan, PlanList, CalendarOneWeek },
  mounted(){
    this.curDate = this.$refs['calendarOneWeek'].getCurDate();
  },
  data(){
    return {
      curDate:''
    }
  },
  methods:{
    updateDate(curDate){
      this.curDate = curDate;
    },
    handleDeleteAllDone(){
      ElMessageBox.confirm(
        h('p', null, [
          h('span', null, '确认删除 '),
          h('span', { style: 'color: red' }, '选择日期'),
          h('span', null, ' 全部已完成的计划?')
        ]),
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          if(store.state.planAbout.planData.filter(item=>item.isDone===1 && item.startTime === this.curDate).length === 0){
            ElMessage({
              type: 'warning',
              message: '当前日期没有已完成的计划',
            })
          }
          else{
            store.dispatch('planAbout/deletePlanBatch',this.curDate)
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#oneweek {
  height: 100vh;
  margin-left: 5px;
}
.oneweekHeader {
  box-sizing: border-box;
  height: 120px;
  padding-top: 30px;
  padding-bottom: 10px;
}
.greetings-area {
  display: flex;
  flex-direction: column;
  float: left;
}
.hello {
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 25px;
  font-weight: 900;
}
.greetings {
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 25px;
  font-weight: 900;
  color: #258c9e;
}
.deleteArea {
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
  height: 100%;
  width: 200px;
  cursor:pointer;
}
.deleteArea > img {
  width: 35px;
}
.addPlan{
  margin-top:2vh;
}
.list-area {
  margin-top: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48%;
  width: 95%;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
#PlanList {
  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 5px;
  padding-bottom: 10px;
  height: 100%;
  width: 810px;
}
</style>
