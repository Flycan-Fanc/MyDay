<template>
  <div id="diary">
    <div id="diaryHeader">
      <span class="calendar-area"><CalendarSearch></CalendarSearch></span>
      <span class="tools-area">
        <span>Select All</span>
        <span id="delete-SelectAll-Checkbox" class="someSelected">✔</span>
        <img src="../assets/icon/ic_tools_delete.png" alt="删除">
        <img src="../assets/icon/ic_tools_return.png" alt="返回" />
      </span>
    </div>
    <DiaryList id="DiaryList"></DiaryList>
  </div>
</template>

<script>
import DiaryList from '../components/DiaryList.vue'
import CalendarSearch from '../components/CalendarSearch.vue'
export default {
  name: 'Diary',
  components: { CalendarSearch, DiaryList }
}
</script>

<style scoped>
#diaryHeader{
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
#diary{
  width: 95%;
  height: 75vh;
}
#DiaryList{
  height:100%;
}
</style>
