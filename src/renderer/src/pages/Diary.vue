<template>
  <div id="diary">
    <div id="diaryHeader">
      <span class="calendar-area"><CalendarSearch :from="from"></CalendarSearch></span>
      <span class="tools-area">
        <span style="margin-right:10px;">Select All</span>
<!--        <span id="delete-SelectAll-Checkbox" class="someSelected">✔</span>-->
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
          @confirm="deleteAllSelectDiary"
          placement="bottom-end"
        >
          <template #reference>
            <img src="../assets/icon/ic_tools_delete.png" alt="删除"/>
          </template>
        </el-popconfirm>
<!--        <img src="../assets/icon/ic_tools_delete.png" alt="删除" @click="deleteAllSelectDiary"/>-->
<!--        <img src="../assets/icon/ic_tools_return.png" alt="返回" />-->
      </span>
    </div>
    <DiaryList id="DiaryList" ref="diaryList"></DiaryList>
    <NewBtn id="NewBtn" @click="createDiary()"></NewBtn>
  </div>
</template>

<script>
import DiaryList from '../components/DiaryList.vue'
import CalendarSearch from '../components/CalendarSearch.vue'
import NewBtn from '../components/NewBtn.vue'
import router from "../router";
import { Check, Close } from '@element-plus/icons-vue'
import PubSub from "pubsub-js";
import store from "../store/store";
import { nanoid } from "nanoid";

export default {
  name: 'Diary',
  components: { NewBtn, CalendarSearch, DiaryList },
  mounted(){
    this.pid_select = PubSub.subscribe('selectAllDiary',this.selectAll)
    this.pid_unselect = PubSub.subscribe('unSelectAllDiary',this.unSelectAll)
  },
  beforeUnmount(){
    PubSub.unsubscribe(this.pid_select)
    PubSub.unsubscribe(this.pid_unselect)
  },
  methods:{
    createDiary(){
      let diaryId = nanoid()
      console.log(diaryId)
      router.push({
        name:'DiaryEditor',
        params:{
          diaryId:diaryId
        }
      })
    },
    changeSwitchState(){
      if(this.isSelectAll === true){
        this.$refs.diaryList.selectAll()
      }else{
        this.$refs.diaryList.unSelectAll()
      }
    },
    selectAll(msg,data){
      this.isSelectAll = true
    },
    unSelectAll(msg,data){
      this.isSelectAll = false
    },
    deleteAllSelectDiary(){
      let deleteDiaryId = this.$refs.diaryList.getSelectDiaryId()
      if(deleteDiaryId.length === 0){
        ElMessage({
          message:'没有选择的日记',
          type: 'warning',
        })
      } else{
        store.dispatch('diaryAbout/deleteDiaryBatch',deleteDiaryId)
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        this.isSelectAll = false
      }
      // TODO:删除全部选择的日记
    }
  },
  data() {
    return {
      Check,
      Close,
      from: '日记',
      isSelectAll: false,
      pid_select:'',
      pid_unselect:'',
    }
  },
  watch:{
    // isSelectAll:{
    //   handler(newVal, oldVal){
    //     if(newVal === true){
    //       this.$refs.diaryList.selectAll()
    //     }else{
    //       this.$refs.diaryList.unSelectAll()
    //     }
    //   }
    // },
  },
}
</script>

<style scoped>
#diaryHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 45px;
}
.calendar-area {
  align-self: flex-start;
  padding-left: 10px;
}
.tools-area {
  display: flex;
  justify-content: center;
  align-items: center;
  /*margin-right:40px;*/
  cursor: pointer;
}
.tools-area > img {
  width: 40px;
  height: 40px;
}
#delete-SelectAll-Checkbox {
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  border: 2px solid #fff;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 10px;
  text-align: center;
  font-size: 21px;
  line-height: 21px;
  color: #fff;
}
/*直接全选*/
#delete-SelectAll-Checkbox.allSelected {
  color: #000;
  background-color: rgba(255, 255, 255, 0);
}
/*存在选中*/
#delete-SelectAll-Checkbox.someSelected {
  color: rgba(255, 255, 255, 0);
  border: 7px solid #fff;
  background-color: #0095ff;
}
#diary {
  width: 95%;
  height: 75vh;
}
#DiaryList {
  height: 100%;
}
#NewBtn {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
