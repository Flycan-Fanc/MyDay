import {ipcMain} from 'electron'
import appStore from '../stores/module/appStore'

export function storeHandler() {
  let userStore = null;
  let planStore = null;
  let tagStore = null;
  let diaryStore = null;
  let insStore = null;

  // appStore
  ipcMain.handle('app-store:add-userIndex',(event, user)=>{
    appStore.addUserIndex(user);
  })
  ipcMain.handle('app-store:set-userStore',(event, { userId })=>{
    appStore.setUserStore(userId)
    userStore = appStore.getUserStore()
    let dataStore = userStore.getUserDataStore()
    planStore = dataStore.planStore
    tagStore = dataStore.tagStore
    diaryStore = dataStore.diaryStore
    insStore = dataStore.insStore
  })
  ipcMain.handle('app-store:get-userIndex',(event,args)=>{
    return appStore.getUserIndex()
  })
  ipcMain.handle('app-store:find-user-by-id',(event,{userId})=>{
    return userStore.findUserById(userId)
  })
  ipcMain.handle('app-store:find-user-by-account',(event,{ userAccount })=>{
    return userStore.findUserByAccount(userAccount)
  })
  ipcMain.handle('app-store:get-login-user-id',(event,args)=>{
    return appStore.getLoginUserId()
  })
  ipcMain.handle('app-store:change-user-login-status',(event,userId)=>{
    appStore.changeUserLoginStatus(userId)
  })
  ipcMain.handle('app-store:delete-user-by-id', (event,{ userId }) => {
    appStore.deleteUserById(userId)
  })


  // userStore
  ipcMain.handle('user-store:get-userInfo',(event,args)=>{
    if(!userStore){
      throw new Error('userStore is not exist')
    }
    return userStore.getUserInfo()
  })
  ipcMain.handle('user-store:set-userInfo', (event,userInfo) => {
    if (!userStore) {
      throw new Error('userStore is not exist')
    }
    console.log('保存userInfo:',JSON.stringify(userInfo))
    userStore.setUserInfo(userInfo)
  })
  ipcMain.handle('user-store:get-userToken',(event,args)=>{
    if(!userStore){
      throw new Error('userStore is not exist')
    }
    return userStore.getUserToken()
  })
  ipcMain.handle('user-store:set-userToken', (event, token) => {
    console.log('token:'+token)
    if (!userStore) {
      throw new Error('userStore is not exist')
    }
    userStore.setUserToken(token)
  })
  ipcMain.handle('user-store:get-userDataStore',(event,args)=>{
    if(!userStore){
      throw new Error('userStore is not exist')
    }
    return userStore.getUserDataStore()
  })


  // tagStore
  ipcMain.handle('tag-store:get-tag',(event,args)=>{
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
  ipcMain.handle('plan-store:get-plan',(event,args)=>{
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
  ipcMain.handle('diary-store:get-diary',(event,args)=>{
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
  ipcMain.handle('ins-store:get-ins',(event, args)=>{
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
