import planStore from './userData/planStore'
import diaryStore from './userData/diaryStore'
import insStore from './userData/insStore';
import tagStore from './userData/tagStore';

// const electronStore = window.api.electronStore

import electronStore from '../index'

class UserStore {
  constructor(userId) {
    this.userId = userId;
    this.config = {
      name: 'user-data',
      cwd: `users/${userId}`, // 按用户ID分目录存储
      encryptionKey: `user-key-${userId}` // 动态加密密钥
    }
    this.store = electronStore.getStore(this.config)
    this.planStore = new planStore(userId)
    this.diaryStore = new diaryStore(userId)
    this.insStore = new insStore(userId)
    this.tagStore = new tagStore(userId)
  }

  //TODO： 后续可能增加保存用户偏好设置的api

  // ================= 用户数据相关方法 =================
  getUserInfo(){
    return this.store.get('userInfo')
  }

  setUserInfo(userInfo){
    this.store.set('userInfo',userInfo)
  }

  getUserToken(){
    return this.store.get('token', '')
  }

  setUserToken(token){
    this.store.set('token',token )
  }

  getUserDataStore(){
    // 返回浅拷贝，保证操作同一个dataStore
    return {
      planStore:this.planStore,
      diaryStore:this.diaryStore,
      insStore:this.insStore,
      tagStore:this.tagStore
    }
  }

  // setUserDataStore(userDataDir){
  //   this.store.set({ config:this.config,key:'userDataDir',value:userDataDir })
  // }

}

export default (userId) => new UserStore(userId);
