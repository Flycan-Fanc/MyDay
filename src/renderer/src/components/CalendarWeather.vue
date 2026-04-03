<template>
  <div id="calendar-weather-container">
    <div class="calendar-area">
      <img
        src="../assets/icon/ic_tools_calendar.png"
        alt="calendar"
        class="calendar"
      />
      <span class="date-text">{{ displayDate }}</span>
    </div>
    <div class="weather-area">
      <img :src="weatherIcon" alt="weather" class="weather-img" />
      <span class="weather-text">{{ displayTemperature }}</span>
    </div>
  </div>
</template>

<script>
import { dayjs } from 'element-plus'
import store from '../store/store'

import sunIcon from '../assets/weather/ic_weather_sun.png'
import cloudyIcon from '../assets/weather/ic_weather_cloudy.png'
import cloudIcon from '../assets/weather/ic_weather_cloud.png'
import rainIcon from '../assets/weather/ic_weather_rain.png'

export default {
  name: 'CalendarWeather',
  props: {
    date: {
      type: String,
      default: '',
    },
  },
  computed: {
    normalizedDate() {
      return this.date ? dayjs(this.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')
    },
    displayDate() {
      return dayjs(this.normalizedDate).format('YYYY.MM.DD')
    },
    weatherInfo() {
      return store.getters['weatherAbout/getWeatherByDate'](this.normalizedDate)
    },
    displayTemperature() {
      if (!this.weatherInfo?.temperature) {
        return '-'
      }

      return `${this.weatherInfo.temperature}℃`
    },
    weatherIcon() {
      const skytext = (this.weatherInfo?.skytext || '').toLowerCase()

      if (skytext.includes('rain') || skytext.includes('shower') || skytext.includes('storm')) {
        return rainIcon
      }
      if (skytext.includes('cloudy') || skytext.includes('overcast')) {
        return cloudyIcon
      }
      if (skytext.includes('cloud')) {
        return cloudIcon
      }
      return sunIcon
    },
  },
}
</script>

<style scoped>
#calendar-weather-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 20px;
  min-width: 240px;
  height: 50px;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: -3px 4px 5px rgba(0, 0, 0, 0.4);
}

.calendar-area,
.weather-area {
  display: flex;
  align-items: center;
}

.calendar,
.weather-img {
  width: 32px;
  height: 32px;
}

.date-text {
  margin-left: 8px;
  font-size: 16px;
  color: #3b3b3b;
}

.weather-text {
  margin-left: 6px;
  font-size: 13px;
  color: #3b3b3b;
  white-space: nowrap;
}
</style>
