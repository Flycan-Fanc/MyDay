import { createStore } from 'vuex'
import planAbout from './modules/planAbout'
import tagAbout from './modules/tagAbout'
import diaryAbout from './modules/diaryAbout'
import insAbout from "./modules/insAbout";


const store = createStore({
  modules:{
    planAbout,
    tagAbout,
    diaryAbout,
    insAbout
  }
})



export default store;
