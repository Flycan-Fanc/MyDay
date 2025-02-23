<template>
  <div id="inspiration">
    <div id="insHeader">
      <span class="calendar-area"><CalendarSearch></CalendarSearch></span>
      <span class="tools-area">
        <span>Select All</span>
        <span id="delete-SelectAll-Checkbox" class="someSelected">✔</span>
        <img src="../assets/icon/ic_tools_delete.png" alt="删除" />
        <img src="../assets/icon/ic_tools_return.png" alt="返回" />
      </span>
    </div>
    <InsList id="InsList"></InsList>
    <NewBtn id="NewBtn"></NewBtn>
  </div>
</template>

<script>
import CalendarSearch from '../components/CalendarSearch.vue'
import InsList from '../components/InsList.vue'
import NewBtn from "../components/NewBtn.vue";

export default {
  name: 'Inspiration',
  components: { NewBtn, CalendarSearch,InsList },
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
#InsList{
  height:100%;
}
#NewBtn{
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
