import { createStore } from 'vuex'
import planAbout from './modules/planAbout'


const store = createStore({
  modules:{
    planAbout
  }
})



export default store;
