<template>
    <div>
      <div id="AddPlan-container">
        <div class="data-area">
          <span id="week">周五</span>
          <span id="day">6</span>
          <span id="month">12月</span>
        </div>
        <div class="weather-area">
          <span id="suggestion">记得喝水</span>
          <span id="weather-img"
          ><img
            src="../assets/weather/ic_weather_cloudy.png"
            alt="weather"
            style="width: 40px"
          /></span>
          <span id="weather">11℃</span>
        </div>
        <div class="addplan-area">
          <input
            id="planInput"
            type="text"
            placeholder="添加你的计划，按下回车确认"
          />
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AddPlan',
}
</script>

<style scoped>
body {
  background-color: #97c6f2;
}
* {
  margin: 0;
  padding: 0;
}
#AddPlan-container {
  display: flex;
  width: 800px;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 1em;
}
.data-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
  height: 100%;
}
.data-area #week {
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 14px;
}
.data-area #day {
  margin-bottom: 5px;
  font-size: 30px;
  font-weight: 900;
}
.data-area #month {
  font-size: 14px;
  font-weight: bold;
}
.weather-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 20%;
  height: 120px;
}
.weather-area #suggestion {
  grid-column: span 2;
  justify-self: center;
  align-self: center;
  font-size: 20px;
  font-weight: 400;
  margin-top: 5px;
}

.weather-area #weather-img {
  justify-self: right;
  margin-right: 10px;
}
.weather-area #weather {
  margin-left: -10px;
  margin-top: 3px;
  font-size: 25px;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(142, 142, 142, 0.5);
}
.addplan-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65%;
  height: 120px;
}
.addplan-area #planInput {
  width: 85%;
  height: 50px;
  margin-left: -5%;
  border-radius: 8px;
  border: none;
  text-indent: 2em;
  font-size: 15px;
  background-color: rgba(255, 255, 255, 0.6);
}
.addplan-area #planInput:focus {
  outline: none;
  background-color: #fff;
}
</style>

