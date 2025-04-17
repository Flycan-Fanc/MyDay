import StoreManager from './index.js';

// 使用固定的store配置（无需用户ID）
const appStoreConfig = {
  name: 'app-config',
  encryptionKey: 'app-level-secret' //TODO 可选加密,后续再配置
};

class AppStore {
  constructor() {
    this.store = StoreManager.getStore(appStoreConfig)
  }

  // TODO:后续拓展一些保存配置的功能（如窗口的状态、主题等）

  // ================= 用户索引相关方法 =================
  // 添加新用户到索引
  addUserToIndex(user) {
    const index = this.getUserIndex();
    if (!index.find(u => u.user === user.userId)) {
      index.push({
        id: user.id,
        userAccount: user.userAccount,
        isLogin: true
      });
      this.store.set('userIndex', index);
    }
  }

  // 获取全部用户索引（用于登录界面判断是否有用户登录）
  getUserIndex() {
    return this.store.get('userIndex', []); // 默认空数组
  }

  // 根据用户id查找用户
  findUserByUserId(userId) {
    return this.getUserIndex().find(u => u.userId === userId);
  }

  // 根据用户账户查找用户
  findUserByUsername(userAccount) {
    return this.getUserIndex().find(u => u.userAccount === userAccount);
  }

  // 返回登陆状态的用户id
  getLoginUserId() {
    return this.getUserIndex().find(u => u.isLogin).userId
  }

  // 根据用户id更改用户登陆状态
  changeUserLoginStatus(userId) {
    const index = this.getUserIndex();
    index.forEach(u => {
      if (u.userId === userId) {
        u.isLogin = true;
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
