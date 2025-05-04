// const electronStore = window.api.electronStore

import electronStore from '../../index'

/**
 * 用户日记存储
 */
class DiaryStore {
  constructor(userId) {
    this.userId = userId
    this.config = {
      name: 'user-diary',
      cwd: `users/${userId}`, // 按用户ID分目录存储
      encryptionKey: `user-key-${userId}` // 动态加密密钥
    }
    this.store = electronStore.getStore(this.config)
  }

  /**
   * 获取用户日记
   * @param userId
   * @returns {*}
   */
  getDiary(userId) {
    return this.store.get(userId)
  }

  /**
   * 存储用户日记
   * @param userId
   * @param diary
   * @returns {*}
   */
  setDiary(userId,diary){
    return this.store.set(userId,diary)
  }
}

export default DiaryStore
