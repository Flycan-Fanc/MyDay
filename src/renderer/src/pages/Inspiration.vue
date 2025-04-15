<template>
  <div id="inspiration">
    <div id="insHeader">
      <span class="calendar-area"><CalendarSearch :from="from"></CalendarSearch></span>
      <span class="tools-area">
        <span style="margin-right:10px;">Select All</span>
        <el-switch
          v-model="isSelectAll"
          class="mt-2"
          inline-prompt
          @change="changeSwitchState"
          :active-icon="Check"
          :inactive-icon="Close"
        />
        <el-popconfirm
          class="box-item"
          title="确认删除所有选择的日记？"
          confirm-button-text="确认"
          cancel-button-text="取消"
          @confirm="deleteAllSelectIns"
          placement="bottom-end"
        >
          <template #reference>
            <img src="../assets/icon/ic_tools_delete.png" alt="删除" />
          </template>
        </el-popconfirm>
<!--        <span id="delete-SelectAll-Checkbox" class="someSelected">✔</span>-->
      </span>
    </div>
    <div id="InsList-container">
      <InsList id="InsList" ref="insList"></InsList>
    </div>
    <NewBtn id="NewBtn" @click="createIns()"></NewBtn>
  </div>
</template>

<script>
import CalendarSearch from '../components/CalendarSearch.vue'
import InsList from '../components/InsList.vue'
import NewBtn from "../components/NewBtn.vue";
import router from "../router";
import { Check, Close } from "@element-plus/icons-vue";
import store from "../store/store";
import PubSub from "pubsub-js";
import { nanoid } from "nanoid";

export default {
  name: 'Inspiration',
  components: { NewBtn, CalendarSearch,InsList },
  mounted(){
    //鼠标滚动时页面横向滚动
    document.querySelector('#InsList-container').addEventListener('wheel', function(event) {
      let scrollLength = event.deltaY * 2;
      console.log(scrollLength)
      document.querySelector('#InsList').scrollBy({ left: scrollLength, behavior: 'smooth' });
    })

    this.pid_select = PubSub.subscribe('selectAllIns',this.selectAll)
    this.pid_unselect = PubSub.subscribe('unSelectAllIns',this.unSelectAll)
  },
  beforeUnmount(){
    PubSub.unsubscribe(this.pid_select)
    PubSub.unsubscribe(this.pid_unselect)
  },
  methods:{
    createIns(){
      router.push({
        name:'InsEditor',
        params:{
          insId: nanoid(),
        }
      })
    },
    changeSwitchState(){
      if(this.isSelectAll === true){
        this.$refs.insList.selectAll()
      }else{
        this.$refs.insList.unSelectAll()
      }
    },
    selectAll(msg,data){
      this.isSelectAll = true
    },
    unSelectAll(msg,data){
      this.isSelectAll = false
    },
    deleteAllSelectIns(){
      let deleteInsId = this.$refs.insList.getSelectInsId()
      if(deleteInsId.length === 0){
        ElMessage({
          message:'没有选择的灵感',
          type: 'warning',
        })
      } else{
        store.dispatch('insAbout/deleteInsBatch',deleteInsId)
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        this.isSelectAll = false
      }
    }
  },
  data(){
    return{
      Check,
      Close,
      from:'灵感',
      isSelectAll: false,
      pid_select:'',
      pid_unselect:'',
    }
  },
}
</script>

<style scoped>
#insHeader{
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 45px;
}
.calendar-area{
  align-self: flex-start;
  padding-left:10px;
}
.tools-area{
  display:flex;
  justify-content: center;
  align-items: center;
  /*margin-right:40px;*/
  cursor:pointer;
}
.tools-area>img{
  width: 40px;
  height: 40px;
}
#delete-SelectAll-Checkbox{
  box-sizing:border-box;
  width: 25px;
  height: 25px;
  border: 2px solid #fff;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 10px;
  text-align: center;
  font-size:21px;
  line-height: 21px;
  color: #fff;
}
/*直接全选*/
#delete-SelectAll-Checkbox.allSelected{
  color:#000;
  background-color: rgba(255,255,255,0)
}
/*存在选中*/
#delete-SelectAll-Checkbox.someSelected{
  color:rgba(255,255,255,0);
  border: 7px solid #fff;
  background-color: #0095ff;
}
#inspiration{
  width: 95%;
  height: 82vh;
}
#InsList-container{
  display:flex;
  align-items: center;
  height:100%;
}
#NewBtn{
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
