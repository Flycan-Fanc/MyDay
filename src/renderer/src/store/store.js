import { createStore } from 'vuex'
import planAbout from './modules/planAbout'
import tagAbout from './modules/tagAbout'


const store = createStore({
  modules:{
    planAbout,
    tagAbout,
  }
})



export default store;
