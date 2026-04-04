import { createStore } from 'vuex'
import userAbout from './modules/userAbout'
import planAbout from './modules/planAbout'
import tagAbout from './modules/tagAbout'
import diaryAbout from './modules/diaryAbout'
import insAbout from "./modules/insAbout";
import pictureAbout from "./modules/pictureAbout";
import weatherAbout from "./modules/weatherAbout";
import syncAbout from './modules/syncAbout'

const DIRTY_MUTATIONS = new Set([
  'userAbout/editUser',
  'planAbout/addPlan',
  'planAbout/deletePlan',
  'planAbout/deletePlanBatch',
  'planAbout/changeTopStatus',
  'planAbout/changeDoneStatus',
  'planAbout/editPlanContent',
  'planAbout/editPlanTag',
  'planAbout/deletePlanTag',
  'tagAbout/addTag',
  'tagAbout/deleteTag',
  'tagAbout/editTagName',
  'diaryAbout/addDiary',
  'diaryAbout/deleteDiary',
  'diaryAbout/deleteDiaryBatch',
  'diaryAbout/editDiary',
  'insAbout/addIns',
  'insAbout/deleteIns',
  'insAbout/deleteInsBatch',
  'insAbout/editIns',
  'insAbout/deleteInsTag',
  'pictureAbout/addPicture',
  'pictureAbout/deletePicture',
  'pictureAbout/deletePictureBatch',
])


const store = createStore({
  modules:{
    userAbout,
    planAbout,
    tagAbout,
    diaryAbout,
    insAbout,
    pictureAbout,
    weatherAbout,
    syncAbout,
  }
})

store.subscribe((mutation, state) => {
  if (!DIRTY_MUTATIONS.has(mutation.type)) {
    return
  }

  if (state.syncAbout.status === 'syncing') {
    return
  }

  const remoteVersion = Number(state.syncAbout.remoteVersion ?? 0)
  const localVersion = Math.max(Number(state.syncAbout.localVersion ?? 0), remoteVersion + 1)

  store.commit('syncAbout/markPending', {
    localVersion,
    remoteVersion,
    detail: '\u5f85\u540c\u6b65',
  })
})



export default store;
