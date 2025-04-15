<template>
  <div id="InsMini-container" ref="container">
    <span class="insCover">
      <img :src="insCover" alt="" />
    </span>
    <span class="insTitle">{{ title }}</span>
    <span class="insDate">{{ date }}</span>
    <span id="ins-selector" ref="insSelector">
      <el-checkbox
        type="checkbox"
        v-model="selected"
        @click="changeSelectState($event)"
        size="large"
        style="position: absolute; right: 0; top: 0"
      />
    </span>

  </div>
</template>

<script>
import store from '../store/store'
import PubSub from "pubsub-js";

export default {
  name: 'InsMini',
  props: {
    insId: {
      type: Number,
      required: true
    }
  },
  mounted() {},
  data() {
    return {
      selected: false
    }
  },
  watch:{
    selected:{
      handler(val){
        if(val){
          this.$refs.container.classList.add('select')
        }else{
          if([...this.$refs.container.classList].indexOf('select')!==-1){
            this.$refs.container.classList.remove('select')
          }
        }
      }
    }
  },
  computed: {
    ins() {
      return store.state.insAbout.insData.filter((item) => item.insId === this.insId)[0]
    },
    date(){
      return this.ins.insDate.split('-').join('.')
    },
    title(){
      if(this.ins.insTitle.length <= 8){
        return this.ins.insTitle
      }else{
        return this.ins.insTitle.slice(0,5) + '...'
      }
    },
    insCover(){
      return  this.ins.insCover || new URL("../assets/background/plouzane-1758197.jpg", import.meta.url).href;
    }
  },
  methods: {
    changeSelectState(e){
      this.$emit('changeSelectState',this.insId)
      PubSub.publish('changeInsSwitchState') // 每选择一个，都要检测是否要变更为全选状态
      e.stopPropagation()
    },
    // 选择
    select(){
      this.selected = true
    },
    // 取消选择
    unSelect(){
      this.selected = false
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#InsMini-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 170px;
  height: 230px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
}
#InsMini-container:hover {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}
#InsMini-container.select{
  background-color: rgb(254, 158, 77)
}
.insCover {
  flex: 2;
  margin-top: 15px;
  transition: margin-top 0.15s ease-in-out;
}
#InsMini-container:hover .insCover {
  margin-top: 40px;
}
.insCover img {
  width: 100%;
  height: 100%;
}
.insTitle {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.insDate {
  flex: 1;
}
#ins-selector {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s,opacity 0.3s linear;
}
.hidden{
  visibility: hidden;
  opacity: 0;
}
#ins-selector.visible {
  visibility: visible;
  opacity: 1;
}

#InsMini-container:hover #ins-selector {
  visibility: visible;
  opacity: 1;
}
</style>
