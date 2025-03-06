<template>
  <div id="tagBasedContentView">
    <div class="planInsToggle" @click="handleToggle">
      <div class="planToggle">
        <span
          >{{ planChoose }}<span class="tagName" v-if="from === '计划'">{{ tag.value }}</span></span
        >
      </div>
      <div class="insToggle">
        <span
          >{{ insChoose }}<span class="tagName" v-if="from === '灵感'">{{ tag.value }}</span></span
        >
      </div>
    </div>
    <div class="search-box">
      <Search :from="from"></Search>
    </div>
    <div class="content-show">
      <PlanList v-if="from === '计划'"></PlanList>
      <InsList v-if="from === '灵感'"></InsList>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import PlanList from "../components/PlanList.vue";
import InsList from "../components/InsList.vue";

export default {
  name: "TagBasedContentView",
  components: { Search, PlanList, InsList },
  props: {
    // tag:{
    //   value: '#学习',
    //   label: '#学习',
    //   color: '#ff6b81'
    // }
    // TODO: 后续tag需要从外面传进来
  },
  mounted(){
    document.querySelector('.tagName').style.color = this.tag.color;
  },
  updated(){
    document.querySelector('.tagName').style.color = this.tag.color;
  },
  data() {
    return {
      from: '计划',   //用户点击不同选项改变from值
      tag: {
        value: '#学习',
        label: '#学习',
        color: '#ff6b81'
      }
    }
  },
  computed: {
    planChoose() {
      return this.from === '计划' ? 'All of your plans labeled ' : 'Plan';
    },
    insChoose() {
      return this.from === '灵感' ? 'All of your inspirations labeled ' : 'Inspiration';
    }
  },
  methods: {
    handleToggle() {
      this.from = this.from === '计划' ? '灵感' : '计划';
    },
  }
}
</script>

<style scoped>
#tagBasedContentView {
  display:flex;
  flex-direction: column;
  margin-top: 45px;
  width: 95%;
  height: 82vh;
}
.planInsToggle{
  display:flex;
  height:100px;
}
.planToggle{
  height:100%;
  flex: 2;
  background-color: #fff;
  margin-right:10px;
}
.insToggle{
  height:100%;
  flex:1;
  background-color: #fff;
}
</style>
