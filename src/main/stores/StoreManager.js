// const Store = require('electron-store'); // 引入electron-store模块
// const path = require('path'); // 引入路径处理模块

import Store from 'electron-store'
import path from 'path'

/**
 * Store管理类：负责创建和管理所有electron-store实例
 * 采用单例模式，确保整个应用只有一个StoreManager实例
 */
class StoreManager {
  constructor() {
    // 使用Map来存储所有创建的store实例
    // key: 由name和cwd生成的唯一标识
    // value: 对应的store实例
    this.stores = new Map();
  }

  /**
   * 创建或获取一个store实例
   * @param {Object} config - 配置对象
   *        config.name      - 必须，存储文件名（不含扩展名）
   *        config.encryptionKey - 可选，加密密钥（如果提供则启用加密）
   *        config.cwd       - 可选，存储子目录（相对userData目录）
   * @return {Store} 返回electron-store实例
   *
   * 示例：
   * getStore({ name: 'user-prefs', cwd: 'user123' })
   * 会创建或获取 user-data/user123/user-prefs.json 的store
   */
  getStore(config) {
    // 从配置中解构需要的参数
    const { name, encryptionKey, cwd } = config;

    // 生成这个store的唯一标识key
    const storeKey = this._generateStoreKey(config);

    // 如果还没有创建过这个store，则创建新的
    if (!this.stores.has(storeKey)) {
      // 准备store的配置对象
      const storeConfig = {
        name, // 存储文件名
        encryptionKey, // 加密密钥（可选）
        // 如果有cwd参数，就拼接到user-data目录下
        cwd: cwd ? path.join('user-data', cwd) : undefined
      };

      // 过滤掉undefined的配置项（electron-store不接受undefined值）
      const finalConfig = Object.fromEntries(
        Object.entries(storeConfig).filter(([_, v]) => v !== undefined)
      );

      // 创建新的store实例并存入Map
      this.stores.set(storeKey, new Store(finalConfig));
    }

    // 返回对应的store实例
    return this.stores.get(storeKey);
  }

  /**
   * 从store中读取数据
   * @param {Object} 参数对象
   *        config - store配置对象（同getStore）
   *        key - 要读取的数据键名
   *        defaultValue - 可选，当键不存在时返回的默认值
   * @return {any} 返回读取到的数据或默认值
   */
  get({ config, key, defaultValue }) {
    // 1. 先获取对应的store实例
    const store = this.getStore(config);
    // 2. 调用store的get方法读取数据
    return store.get(key, defaultValue);
  }

  /**
   * 向store存储数据
   * @param {Object} 参数对象
   *        config - store配置对象
   *        key - 要存储的数据键名
   *        value - 要存储的数据值
   */
  set({ config, key, value }) {
    // 1. 获取对应的store实例
    const store = this.getStore(config);
    // 2. 调用store的set方法存储数据
    store.set(key, value);
  }

  /**
   * 从store删除数据
   * @param {Object} 参数对象
   *        config - store配置对象
   *        key - 要删除的数据键名
   */
  delete({ config, key }) {
    // 1. 获取对应的store实例
    const store = this.getStore(config);
    // 2. 调用store的delete方法删除数据
    store.delete(key);
  }

  /*************************
   * 私有方法（内部使用）
   *************************/

  /**
   * 生成store的唯一标识key
   * 格式："文件名-目录名" 或 "文件名-default"（当没有目录时）
   * @private
   */
  _generateStoreKey({ name, cwd }) {
    return `${name}-${cwd || 'default'}`;
  }
}

// 导出StoreManager类
export default StoreManager;
