<template>
  <div id="CalenderWeather-container">
    <div class="calender-area">
      <img
        src="../assets/icon/ic_tools_calendar.png"
        alt="calender"
        class="calender"
      />
      <VDatePicker v-model="date" mode="date" />
    </div>
    <div class="date-area">2024.12.7</div>
    <div class="weather-area">
      <img src="../assets/weather/ic_weather_sun.png" alt="" class="weatherImg" />
      <span class="weather">10℃</span>
    </div>
  </div>
</template>

<script>

export default {
  name:'CalendarWeather',
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
}
.calender-area {
  display: flex;
  align-items: center;
  height: 100%;
}
.calender-area img {
  width: 40px;
}
.date-area {
  display: flex;
  align-items: center;
  font-size: 17px;
}
.weather-area {
  display: flex;
  align-items: center;
  margin-left: 13px;
}
.weather-area img {
  width: 40px;
}
.weather-area span {
  font-size: 12px;
}
</style>

