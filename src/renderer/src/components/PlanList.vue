<template>
    <div id="PlanList">
      <PlanMini v-for="i in 20" :key="i"></PlanMini>
    </div>
</template>

<script>
import PlanMini from "./PlanMini.vue";
export default {
    name: "PlanList",
    components: {
      PlanMini,
    },
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

</style>

