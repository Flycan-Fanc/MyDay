// const electronStore = window.api.electronStore

import electronStore from '../../index'

/**
 * 用户标签存储
 */
class TagStore {
  constructor(userId) {
    this.userId = userId
    this.config = {
      name: 'user-tag',
      cwd: `users/${userId}`, // 按用户ID分目录存储
      encryptionKey: `user-key-${userId}` // 动态加密密钥
    }
    this.store = electronStore.getStore(this.config)
  }

  /**
   * 获取用户标签
   * @param userId
   * @returns {*}
   */
  getTag(userId) {
    return this.store.get(userId)
  }

  /**
   * 设置用户标签
   * @param userId
   * @param tag
   * @returns {*}
   */
  setTag(userId,tag){
    return this.store.set(userId,tag)
  }
}

export default TagStore
