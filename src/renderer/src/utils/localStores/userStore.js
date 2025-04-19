import planStore from './userData/planStore.js'
import diaryStore from './userData/diaryStore.js'
import insStore from './userData/insStore.js';
import tagStore from './userData/tagStore.js';

const electronStore = window.api.electronStore

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
    return this.store.get({ config:this.config,key:'userInfo' })
  }

  setUserInfo(userInfo){
    this.store.set({ config:this.config,key:'userInfo',value:userInfo })
  }

  getUserDataDir(){
    return this.store.get({ config:this.config,key:'userDataDir' })
  }

  setUserDataDir(userDataDir){
    this.store.set({ config:this.config,key:'userDataDir',value:userDataDir })
  }

}

export default (userId) => new UserStore(userId);
