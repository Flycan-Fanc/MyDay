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
    <PlanList id="PlanList"></PlanList>
  </div>
</template>

<script>
import CalendarOneWeek from '../components/CalendarOneWeek.vue'
import PlanList from '../components/PlanList.vue'

export default {
  components: { PlanList, CalendarOneWeek }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#oneweek{
  height:100vh;
}
.oneweekHeader{
  box-sizing:border-box;
  height: 120px;
  padding-top: 30px;
  padding-bottom: 10px;
}
.greetings-area {
  display:flex;
  flex-direction: column;
  float:left;
}
.hello{
  display: flex;
  align-items: center;
  height:40px;
  font-size:25px;
  font-weight:900;
}
.greetings{
  display: flex;
  align-items: center;
  height:40px;
  font-size:25px;
  font-weight:900;
  color:#258c9e;
}
.deleteArea{
  display:flex;
  justify-content: center;
  align-items: center;
  float:right;
  height:100%;
  width: 200px;
}
.deleteArea>img{
  width:35px;
}
#PlanList{
  margin-top:25px;
  padding-left:5px;
  padding-top:5px;
  height:55%;
  width:810px;
}
</style>
