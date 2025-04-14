/**
 * @description: 天气store
 */

const weatherAbout = {
  namespaced:true,
  state:{
    weatherData:null,
    isWeatherReady: false, // 就绪状态检测
  },
  actions:{
    setWeatherData(context,value){
      context.commit('setWeatherData',value)
    }
  },
  mutations:{
    setWeatherData(state,value){
      state.weatherData = value
      state.isWeatherReady = true
    }
  },
  getters:{
    getWeather(state){
      console.log(state.weatherData)
      return state.weatherData[0]
    },
    getWeatherByDate:(state) => (date) => {
      return state.weatherData[0].forecast.filter(item => item.date === date)
    }
  }
}

export default weatherAbout;
