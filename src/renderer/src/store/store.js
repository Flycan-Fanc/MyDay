import { createStore } from 'vuex'
import planAbout from './modules/planAbout'
import tagAbout from './modules/tagAbout'
import diaryAbout from './modules/diaryAbout'
import insAbout from "./modules/insAbout";
import pictureAbout from "./modules/pictureAbout";


const store = createStore({
  modules:{
    planAbout,
    tagAbout,
    diaryAbout,
    insAbout,
    pictureAbout
  }
})



export default store;
