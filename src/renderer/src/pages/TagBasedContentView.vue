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
      <PlanList v-if="from === '计划'" class="plan-list"></PlanList>
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
    console.log("hhhhhh");
    document.querySelector('.tagName').style.color = this.tag.color;
    if(this.from==='计划'){
      document.querySelector('.planToggle').classList.add('active');
      document.querySelector('.insToggle').classList.remove('active');
    }else{
      document.querySelector('.insToggle').classList.add('active');
      document.querySelector('.planToggle').classList.remove('active');
    }
  },
  updated(){
    console.log("gggggg");
    document.querySelector('.tagName').style.color = this.tag.color;
    if(this.from==='计划'){
      document.querySelector('.planToggle').classList.add('active');
      document.querySelector('.insToggle').classList.remove('active');
    }else{
      document.querySelector('.insToggle').classList.add('active');
      document.querySelector('.planToggle').classList.remove('active');
    }
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
  width: 95%;
  height:100vh;
}
.planInsToggle{
  display:flex;
  height:40px;
  width:100%;
  margin-top:40px;
}
.planToggle,.insToggle{
  display: flex;
  justify-content: center;
  align-items: center;
  height:40px;
  flex: 1;
  background-color: #fff;
  margin-right:10px;
  border-radius: 10px;
  transition: flex 0.2s ease-in-out;
}
.active {
  flex: 2;
}
.search-box{
  margin-top:15px;
}
.content-show{
  margin-top:15px;
  display:flex;
  justify-content: center;
  align-items: center;
  height:75%;
  width:100%;
  background-color: rgba(255,255,255,0.2);
  border-radius: 10px;
}
.plan-list{
  box-sizing: border-box;
  height:100%;
  padding-left: 5px;
  padding-top: 5px;
  overflow-y: hidden;
  overflow-x:hidden;
}
</style>
