import userStore from './userStore.js'
// const electronStore = window.api.electronStore

import electronStore from '../index'

// 使用固定的store配置（无需用户ID）
const appStoreConfig = {
  name: 'app-config',
  encryptionKey: 'app-level-secret' //TODO 可选加密,后续再配置
};

class AppStore {
  constructor() {
    this.store = electronStore.getStore(appStoreConfig)
    console.log(this.store)
    this.userStore = null  // 将userStore挂载到appStore上，保证全局可用
  }

  // TODO:后续拓展一些保存配置的功能（如窗口的状态、主题等）

  // ================= 用户索引相关方法 =================
  // 添加新用户到索引文件
  addUserIndex(user) {
    const index = this.getUserIndex();
    if (!index.find(u => u.userId === user.userId)) {
      index.push({
        userId: user.userId,
        userAccount: user.userAccount,
        isLogin: true
      });
      this.store.set('userIndex', index);
    }
  }

  // 挂载userStore
  setUserStore(userId){
    this.userStore = new userStore(userId)
  }

  // 获取userStore
  getUserStore(){
    if(!this.userStore) {
      throw new Error('userStore is unmounted')
    }
    return this.userStore
  }

  // 获取全部用户索引（用于登录界面判断是否有用户登录）
  getUserIndex() {
    return this.store.get('userIndex', []); // 默认空数组
  }

  // 根据用户id查找用户
  findUserById(userId) {
    return this.getUserIndex().find(u => u.userId === userId);
  }

  // 根据用户账户查找用户
  findUserByAccount(userAccount) {
    return this.getUserIndex().find(u => u.userAccount === userAccount);
  }

  // 返回登陆状态的用户id
  getLoginUserId() {
    return this.getUserIndex().find(u => u.isLogin)?.userId ?? -1;
  }

  // 根据用户id更改用户登陆状态
  changeUserLoginStatus(userId) {
    const index = this.getUserIndex();
    index.forEach(u => {
      if (u.userId === userId) {
        u.isLogin = !u.isLogin;
      }
      if (u.userId !== userId && u.isLogin) {
        u.isLogin = false;
      }
    })
  }

  // 根据用户id删除用户
  deleteUserById(userId) {
    const index = this.getUserIndex();
    this.store.set('userIndex', index.filter(u => u.userId !== userId));
  }

}

export default new AppStore()
