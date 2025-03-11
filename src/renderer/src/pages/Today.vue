<template>
  <div id="today">
    <div class="todayHeader">
      <div class="greetings-area">
        <span class="hello">Hello,Steve</span>
        <span class="greetings">今天想做什么？</span>
      </div>
      <div class="deleteArea">
        <span>Delete all done</span>
        <img src="../assets/icon/ic_tools_delete.png" alt="DeleteAllDoneBtn" @click="handleDeleteAllDone()"/>
      </div>
    </div>
    <AddPlan />
    <div class="list-area">
      <PlanList id="PlanList" />
    </div>
  </div>
</template>

<script>
import AddPlan from "../components/AddPlan.vue";
import PlanList from "../components/PlanList.vue";
import store from "../store/store";

export default {
  name: 'Today',
  components: {AddPlan,PlanList},
  methods:{
    handleDeleteAllDone(){
      ElMessageBox.confirm(
        '确认删除全部已完成的计划?',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          if(store.state.planAbout.planData.filter(item=>item.isDone===1).length === 0){
            ElMessage({
              type: 'warning',
              message: '没有已完成的计划',
            })
          }
          else{
            store.dispatch('planAbout/deletePlanBatch')
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
          }
        })
        .catch(() => {})
    }
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#today {
  height: 100vh;
  margin-left: 5px;
}
.todayHeader {
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
.list-area {
  margin-top: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60%;
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
