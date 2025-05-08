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
   * @returns {any}
   */
  getTag() {
    return this.store.get('userTag')
  }

  /**
   * 设置用户标签
   * @param userId
   * @param tag
   * @returns {*}
   */
  setTag(userId,tag){
    return this.store.set('userTag',tag)
  }
}

export default TagStore
