<template>
  <div class="Plan-container top" ref="plan-box">
    <div class="check">
      <!--      <input type="checkbox" name="plan-done" id="plan-done" />-->
      <el-checkbox v-model="finish" size="large" id="plan-done" />
    </div>
    <div class="plan">
      <span id="tags">
        <span v-for="item in plan.planTags" :style="{ color: item.color, marginRight: '5px' }">{{item.tagName}}</span>
      </span>
      <span id="plan-content" v-if="!planContentInputVisible" @click="changePlanContent"> {{ plan.planContent }} </span>
      <el-input
        ref="planContentInput"
        v-if="planContentInputVisible"
        v-model="content"
        :autofocus="false"
        @blur="overChangePlanContent"
        @keyup.enter="overChangePlanContent"
        style="width: 180px"
        placeholder="请输入计划内容"
      />
    </div>
    <div class="tools">
      <img src="../assets/icon/ic_action_tick.png" alt="" @click="handleDone" />
      <img src="../assets/icon/ic_tools_top.png" alt="" @click="handleTop" v-if="!plan.isDone" />
      <img
        src="../assets/icon/ic_tools_addTag.png"
        alt=""
        class="addTags"
        @click="showPlanTagDialog = !showPlanTagDialog"
      />
      <img src="../assets/icon/ic_tools_delete.png" alt="" @click="handleDelete" />
    </div>
    <img src="../assets/icon/ic_status_toped.png" alt="" id="status-toped" v-show="plan.isTop" />
    <PlanTagManager
      v-model:showPlanTagDialog.async="showPlanTagDialog"
      :planId="planId"
    ></PlanTagManager>
  </div>
</template>

<script>
import { toRaw } from 'vue';
import PlanTagManager from './dialog/PlanTagManager.vue'
import store from "../store/store";

export default {
  name: 'PlanMini',
  components: { PlanTagManager },
  props:{
    planId:{
      type: Number,
      required:true,
      // default:()=>{[]},
    },
  },
  mounted(){
    if(this.plan.isDone === 1){
      this.$refs['plan-box'].classList.add('done')
    }
  },
  beforeUpdate() {
    //console.log("Plan:>"+JSON.stringify(this.plan))
  },
  computed:{
    plan(){
      return store.state.planAbout.planData.filter(item=>item.planId===this.planId)[0]
    },
    // planTags(){
    //   return this.plan.planTags
    // },
    finish:{
      get(){
        return this.plan.isDone === 1
      },
      set(value){
        this.handleDone()
        console.log("done:",this.plan.isDone)
      }
    },
    // content(){
    //   return this.plan.planContent
    // }
  },
  methods: {
    handleDone() {
      this.plan.isDone = this.plan.isDone === 1 ? 0 : 1
      if(this.plan.isDone === 1){
        this.$refs['plan-box'].classList.add('done')
      }else{
        console.log(this.$refs['plan-box'])
        this.$refs['plan-box'].classList.remove('done')
      }
      this.plan.isTop = 0;
      this.$store.dispatch('planAbout/changeTopStatus',{planId:this.plan.planId,isTop:0})
    },
    handleFinish(){
      this.finish = this.finish === 1 ? 0 : 1;
    },
    handleTop() {
      this.plan.isTop = this.plan.isTop === 1 ? 0 : 1
      this.$store.dispatch('planAbout/changeTopStatus',{planId:this.plan.planId,isTop:this.plan.isTop})
      // TODO: 置顶计划的逻辑
    },
    handleDelete() {
      // TODO: 删除计划的逻辑
      this.$store.dispatch('planAbout/deletePlan',this.plan.planId)
    },
    //改变计划内容
    changePlanContent(){
      this.content = this.plan.planContent
      this.planContentInputVisible = true;
      this.$nextTick(() => {
        this.$refs.planContentInput.focus();
      });
    },
    overChangePlanContent(){
      if(this.content===''){
        ElMessage({
          message:'计划内容不能为空',
          type:'warning',
        })
      } else{
        store.dispatch('planAbout/editPlanContent',{planId:this.planId, planContent:this.content})
        this.planContentInputVisible = false;
      }
    },
  },
  data() {
    return {
      showPlanTagDialog: false,
      //修改计划内容
      planContentInputVisible:false,
      content: '',  //input内容
    }
  }
}
</script>

<style scoped>
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
.tools {
  visibility: hidden;
}
.Plan-container:hover .tools {
  visibility: visible;
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
  cursor: pointer;
}
#status-toped {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
}
</style>
