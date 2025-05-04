// const electronStore = window.api.electronStore

import electronStore from '../../index'

/**
 * 用户灵感存储
 */
class InsStore {
  constructor(userId) {
    this.userId = userId
    this.config = {
      name: 'user-ins',
      cwd: `users/${userId}`, // 按用户ID分目录存储
      encryptionKey: `user-key-${userId}` // 动态加密密钥
    }
    this.store = electronStore.getStore(this.config)
  }

  /**
   * 获取用户灵感
   * @param userId
   * @returns {*}
   */
  getIns(userId) {
    return this.store.get(userId)
  }

  /**
   * 存储用户灵感
   * @param userId
   * @param ins
   * @returns {*}
   */
  setIns(userId,ins){
    return this.store.set(userId,ins)
  }
}

export default InsStore
