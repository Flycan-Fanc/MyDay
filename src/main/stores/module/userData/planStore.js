// const electronStore = window.api.electronStore

import electronStore from '../../index'

/**
 * 用户计划存储
 */
class PlanStore {
  constructor(userId) {
    this.userId = userId
    this.config = {
      name: 'user-plan',
      cwd: `users/${userId}`, // 按用户ID分目录存储
      encryptionKey: `user-key-${userId}` // 动态加密密钥
    }
    this.store = electronStore.getStore(this.config)
  }

  /**
   * 获取用户计划
   * @returns {*}
   */
  getPlan() {
    return this.store.get('plan',[])
  }

  /**
   * 设置用户计划
   * @param plan
   * @returns {*}
   */
  setPlan(plan){
    if(plan) {
      return this.store.set('plan',plan)
    }
  }
}

export default PlanStore
