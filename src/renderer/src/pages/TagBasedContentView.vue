<template>
    <div id="tagBasedContentView">
      <div class="planInsToggle"></div>
      <div class="search-box">
        <Search></Search>
      </div>
      <div class="content-show">
        <PlanList></PlanList>
        <InsList></InsList>
      </div>
    </div>
</template>

<script>
import Search from "../components/Search.vue";
import PlanList from "../components/PlanList.vue";
import InsList from "../components/InsList.vue";

export default {
  name: "TagBasedContentView",
  components:{Search,PlanList,InsList}
}


</script>

<style scoped>

</style>

