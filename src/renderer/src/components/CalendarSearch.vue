<template>
  <div id="CalenderWeather-container">
    <div class="calender-area">
      <img src="../assets/icon/ic_tools_calendar.png" alt="calender" class="calender" />
      <!--      <VDatePicker v-model="date" mode="date" />后续使用日历组件-->
    </div>
    <div class="date-area">2024.12.7</div>
    <div class="search-area selected">
      <img src="../assets/icon/ic_tools_search.png" alt="" class="searchImg" />
      <input type="text" class="search" :placeholder="`查找:输入${from}标题`" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarSearch',
  props:['from'],
  mounted(){}
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#CalenderWeather-container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  padding: 0 20px;
  width: 240px;
  height: 50px;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: -3px 4px 5px rgba(0, 0, 0, 0.4);
  transition: width 0.3s ease;
}
.calender-area {
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
}
.calender-area img {
  width: 40px;
}
.date-area {
  display: flex;
  align-items: center;
  font-size: 17px;
}
.search-area {
  display: flex;
  align-items: center;
  margin-left: 30px;
  cursor: pointer;
  transition: margin-left 0.3s ease;
}
.search-area img {
  width: 40px;
}
.search-area input {
  visibility: hidden;
  width: 0;
  height: 30px;
  text-indent: 0.5em;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  transition: width 0.3s ease;
}
#CalenderWeather-container:hover {
  width: 380px;
}
#CalenderWeather-container:hover .search-area {
  margin-left: 15px;
}
#CalenderWeather-container:hover .search-area input {
  visibility: visible;
  width: 160px;
}
#aaa {
  width: 200px;
  height: 100px;
  background-color: #fff;
  transition: height 0.2s ease;
}
#aaa:hover {
  height: 200px;
}
</style>
