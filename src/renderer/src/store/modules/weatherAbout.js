/**
 * @description: 天气store
 */

const weatherApi = {

}

const weatherAbout = {
  namespaced:true,
  state:{
    weatherData:{},
  },
  actions:{
    setWeatherData(context,value){
      context.commit('setWeatherData',value)
    }
  },
  mutations:{
    setWeatherData(state,value){
      state.weatherData = value
      console.log('state weather:'+JSON.stringify(state.weatherData))
    }
  },
  getters:{

  }
}

export default weatherAbout;
