<template>
    <div id="PlanList">
      <div class="Plan-container top done">
        <div class="check">
          <input type="checkbox" name="plan-done" id="plan-done" />
        </div>
        <div class="plan">
          <span id="tags">#工作</span>
          <span id="plan-content">制作活动策划书</span>
        </div>
        <div class="tools">
          <img src="../assets/icon/ic_action_tick.png" alt="" />
          <img src="../assets/icon/ic_tools_top.png" alt="" />
          <img src="../assets/icon/ic_tools_addTag.png" alt="" />
          <img src="../assets/icon/ic_tools_delete.png" alt="" />
        </div>
        <img src="../assets/icon/ic_status_toped.png" alt="" id="status-toped" />
      </div>
      <div class="Plan-container normal">
        <div class="check">
          <input type="checkbox" name="plan-done" id="plan-done" />
        </div>
        <div class="plan">
          <span id="tags">#工作</span>
          <span id="plan-content">制作活动策划书</span>
        </div>
        <div class="tools">
          <img src="../assets/icon/ic_action_tick.png" alt="" />
          <img src="../assets/icon/ic_tools_top.png" alt="" />
          <img src="../assets/icon/ic_tools_addTag.png" alt="" />
          <img src="../assets/icon/ic_tools_delete.png" alt="" />
        </div>
        <img src="../assets/icon/ic_status_toped.png" alt="" id="status-toped" />
      </div>
      <div class="Plan-container choose"></div>
      <div class="Plan-container edit"></div>
      <div class="Plan-container done"></div>
    </div>
</template>

<script>

export default {
    name: "PlanList",
    mounted() {
      console.log("PlanList mounted");
      const planList = document.querySelector("#PlanList");
      planList.style.overflowY = "auto";

      const planContainers = planList.querySelectorAll("#Plan-container");
      planContainers.forEach((container) => {
        container.style.overflowY = "auto";
      });
    },
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
.Plan-container {
  display: flex;
  position: relative;
  margin-bottom: 12px;
  width: 780px;
  height: 70px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: transform 0.1s ease-in-out;
}
.Plan-container:hover {
  background-color: #fff;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.4);
  transform: translate(-3px, -3px);
}
.Plan-container.done {
  background-color: rgba(255, 255, 255, 0.4);
}
.Plan-container.done #tags {
  color: rgb(192, 188, 188);
}
.Plan-container.done #plan-content {
  color: #898686;
  text-decoration-line: line-through;
}
.check {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.check #plan-done {
  width: 20px;
  height: 20px;
}
.plan {
  flex: 8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
}

.plan #tags {
  font-size: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #757070;
}
.plan #plan-content {
  font-weight: 500;
}
.tools {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
}
.tools img {
  width: 35px;
  height: 35px;
  margin-left: 10px;
}
#status-toped {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
}
</style>

