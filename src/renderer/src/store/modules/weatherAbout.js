import { dayjs } from 'element-plus'

function normalizeDate(date) {
  if (!date) {
    return ''
  }

  const parsed = dayjs(date)
  return parsed.isValid() ? parsed.format('YYYY-MM-DD') : String(date)
}

const weatherAbout = {
  namespaced: true,
  state: {
    weatherData: null,
    isWeatherReady: false,
  },
  actions: {
    setWeatherData(context, value) {
      context.commit('setWeatherData', value)
    }
  },
  mutations: {
    setWeatherData(state, value) {
      state.weatherData = value
      state.isWeatherReady = true
    },
    resetWeather(state) {
      state.weatherData = null
      state.isWeatherReady = false
    },
  },
  getters: {
    getWeather(state) {
      return state.weatherData?.[0]
    },
    getWeatherByDate: (state) => (date) => {
      const targetDate = normalizeDate(date)
      const weather = state.weatherData?.[0]

      if (!weather || !targetDate) {
        return null
      }

      const today = dayjs().format('YYYY-MM-DD')
      if (targetDate === today && weather.current) {
        return {
          type: 'current',
          temperature: weather.current.temperature,
          skytext: weather.current.skytext,
        }
      }

      const forecast = weather.forecast?.find(item => normalizeDate(item.date) === targetDate)
      if (!forecast) {
        return null
      }

      return {
        type: 'forecast',
        temperature: `${forecast.low}-${forecast.high}`,
        skytext: forecast.skytextday,
      }
    },
  }
}

export default weatherAbout
