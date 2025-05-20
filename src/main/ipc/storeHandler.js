import {ipcMain} from 'electron'
import appStore from '../stores/module/appStore'

export function storeHandler() {
  let userStore = null;
  let planStore = null;
  let tagStore = null;
  let diaryStore = null;
  let insStore = null;

  // appStore
  ipcMain.handle('app-store:add-userIndex',(user)=>{
    appStore.addUserIndex(user);
  })
  ipcMain.handle('app-store:set-userStore',(userId)=>{
    appStore.setUserStore(userId)
    userStore = appStore.getUserStore()
    let dataStore = userStore.getUserDataStore()
    planStore = dataStore.planStore
    tagStore = dataStore.tagStore
    diaryStore = dataStore.diaryStore
    insStore = dataStore.insStore
  })
  ipcMain.handle('app-store:get-userIndex',()=>{
    return appStore.getUserIndex()
  })
  ipcMain.handle('app-store:find-user-by-id',(userId)=>{
    return userStore.findUserById(userId)
  })
  ipcMain.handle('app-store:find-user-by-account',(userAccount)=>{
    return userStore.findUserByAccount(userAccount)
  })
  ipcMain.handle('app-store:get-login-user-id',()=>{
    return appStore.getLoginUserId()
  })
  ipcMain.handle('app-store:change-user-login-status',()=>{
    appStore.changeUserLoginStatus()
  })
  ipcMain.handle('app-store:delete-user-by-id', ({ userId }) => {
    appStore.deleteUserById(userId)
  })


  // userStore
  ipcMain.handle('user-store:get-userInfo',()=>{
    if(!userStore){
      throw new Error('userStore is not exist')
    }
    return userStore.getUserInfo()
  })
  ipcMain.handle('user-store:set-userInfo', (event,userInfo) => {
    if (!userStore) {
      throw new Error('userStore is not exist')
    }
    console.log('userInfo:',userInfo)
    userStore.setUserInfo(userInfo)
  })
  ipcMain.handle('user-store:get-userToken',()=>{
    if(!userStore){
      throw new Error('userStore is not exist')
    }
    return userStore.getUserToken()
  })
  ipcMain.handle('user-store:set-userToken', ({ token }) => {
    if (!userStore) {
      throw new Error('userStore is not exist')
    }
    userStore.setUserToken(token)
  })
  ipcMain.handle('user-store:get-userDataStore',()=>{
    if(!userStore){
      throw new Error('userStore is not exist')
    }
    return userStore.getUserDataStore()
  })


  // tagStore
  ipcMain.handle('tag-store:get-tag',()=>{
    if(!tagStore){
      throw new Error('tagStore is not exist')
    }
    return tagStore.getTag()
  })
  ipcMain.handle('tag-store:set-tag', (event, tag) => {
    console.log('tag111:',tag)
    if (!tagStore) {
      throw new Error('tagStore is not exist')
    }
    tagStore.setTag(tag)
  })


  // planStore
  ipcMain.handle('plan-store:get-plan',()=>{
    if(!planStore){
      throw new Error('planStore is not exist')
    }
    return planStore.getPlan()
  })
  ipcMain.handle('plan-store:set-plan', (event, plan) => {
    if (!planStore) {
      throw new Error('planStore is not exist')
    }
    planStore.setPlan(plan)
  })

  // diaryStore
  ipcMain.handle('diary-store:get-diary',()=>{
    if(!diaryStore){
      throw new Error('diaryStore is not exist')
    }
    return diaryStore.getDiary()
  })
  ipcMain.handle('diary-store:set-diary', (event, diary) => {
    if (!diaryStore) {
      throw new Error('diaryStore is not exist')
    }
    diaryStore.setDiary(diary)
  })

  // insStore
  ipcMain.handle('ins-store:get-ins',()=>{
    if(!insStore){
      throw new Error('insStore is not exist')
    }
    return insStore.getIns()
  })
  ipcMain.handle('ins-store:set-ins', (event, ins) => {
    if (!insStore) {
      throw new Error('insStore is not exist')
    }
    insStore.setIns(ins)
  })
}
