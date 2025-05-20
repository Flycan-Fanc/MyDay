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
   * @returns {*}
   */
  getIns() {
    return this.store.get('ins',[])
  }

  /**
   * 存储用户灵感
   * @param ins
   * @returns {*}
   */
  setIns(ins){
    if(ins) {
      return this.store.set('ins',ins)
    }
  }
}

export default InsStore
