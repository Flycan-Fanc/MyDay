<template>
  <div id="oneweek">
    <div class="oneweekHeader">
      <div class="greetings-area">
        <span class="hello">Hello,Steve</span>
        <span class="greetings">为你接下来的7天做计划</span>
      </div>
      <div class="deleteArea">
        <span>Delete all done</span>
        <img src="../assets/icon/ic_tools_delete.png" alt="DeleteAllDoneBtn" />
      </div>
    </div>
    <CalendarOneWeek></CalendarOneWeek>
    <AddPlan class="addPlan"/>
    <div class="list-area">
      <PlanList id="PlanList"></PlanList>
    </div>
  </div>
</template>

<script>
import CalendarOneWeek from '../components/CalendarOneWeek.vue'
import PlanList from '../components/PlanList.vue'
import AddPlan from '../components/AddPlan.vue'

export default {
  components: { AddPlan, PlanList, CalendarOneWeek }
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
