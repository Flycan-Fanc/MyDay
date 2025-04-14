<template>
  <div>
    <div id="AddPlan-container">
      <div class="data-area">
        <span id="week">{{dayObj.week}}</span>
        <span id="day">{{dayObj.day}}</span>
        <span id="month">{{dayObj.month}}月</span>
      </div>
      <div class="weather-area">
        <span id="suggestion">记得喝水</span>
        <span id="weather-img"
          ><img src="../assets/weather/ic_weather_cloudy.png" alt="weather" style="width: 40px"
        /></span>
        <span id="weather">{{curWeather.temperature}}℃</span>
      </div>
      <div class="addplan-area">
        <input
          id="planInput"
          v-model="planInput"
          type="text"
          placeholder="添加你的计划，按下回车确认"
          @keyup.enter="addPlan(planInput)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import { dayjs } from "element-plus";
import { stringUtils } from "../utils/dataUtils";
import store from "../store/store";

export default {
  name: 'AddPlan',
  mounted(){
    this.pid_getCurDate = PubSub.subscribe('getCurDate',this.getCurDate)
    this.pid_getWeather = PubSub.subscribe('getWeather',this.getWeather)
    console.log('AddPlan挂载了')
    // 检测weather是否就绪，若就绪则获取
    let isWeatherReady = store.state.weatherAbout.isWeatherReady
    console.log('isWeatherReady:'+isWeatherReady)
    if(isWeatherReady === true){
      console.log('重新获取天气')
      this.getWeather()
    }
  },
  data(){
    return{
      planInput:'',
      curDate:'',
      pid_getCurDate:'',
      pid_getWeather:'',
      weather:{},
    }
  },
  computed:{
    dayObj(){
      let date = ''
      if(this.curDate===''){
        date = dayjs()
      } else{
        date = dayjs(this.curDate)
      }
      let year = date.year()
      let month = date.month() + 1
      let day = date.date()
      switch(date.day()){
        case 0:
          return {year,month,day,'week':'周日'}
        case 1:
          return {year,month,day,'week':'周一'}
        case 2:
          return {year,month,day,'week':'周二'}
        case 3:
          return {year,month,day,'week':'周三'}
        case 4:
          return {year,month,day,'week':'周四'}
        case 5:
          return {year,month,day,'week':'周五'}
        case 6:
          return {year,month,day,'week':'周六'}
      }

    },
    curWeather(){
      console.log('weather:'+JSON.stringify(this.weather))
      if(Object.keys(this.weather).length===0){
        console.log('curWeather变了:'+'-')
        return {temperature:'-',sky:''}
      }
      let today = dayjs().format('YYYY-MM-DD')
      if(this.curDate === ''||this.curDate === today){
        return {temperature:this.weather.current.temperature,sky:this.weather.current.skytext}
      } else{
        if(this.weather.forecast.some(item => item.date === this.curDate)){
          let forecastItem = this.weather.forecast.filter(item => item.date === this.curDate)[0]
          return {
            temperature:`${forecastItem.low}-${forecastItem.high}`,
            sky:this.weather.forecast.filter(item => item.date === this.curDate)[0].skytextday
          }
        } else {
          return {temperature:'-',sky:''}
        }
      }
    }
  },
  methods:{
    addPlan(planInput){
      if(stringUtils.isStringEmpty(planInput)){
        ElMessage({
          message: '计划内容不能为空',
          type: 'warning'
        })
        this.planInput = ''
        return
      }
      this.$store.dispatch('planAbout/addPlan',{planInput,curDate:this.curDate})
      this.planInput = ''
    },
    getCurDate(msg,data){
      // TODO:添加对应日期的计划
      this.curDate = data
    },
    getWeather(msg,data){
      this.weather = store.getters['weatherAbout/getWeather']
    }
  },
  beforeUnmount(){
    PubSub.unsubscribe(this.pid_getCurDate)
    PubSub.unsubscribe(this.pid_getWeather)
  }
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
  align-items: center;
  width: 95%;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 1em;
}
.data-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 100%;
}
.data-area #week {
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
  line-height: 20px;
  font-weight: 400;
  margin-top: 10px;
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
