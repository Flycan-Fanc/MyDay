/**
 * electron-store API
 */
import { ipcRenderer } from "electron";

export const electronStore = {
  /**
   * Electron-store 管理器
   */
  storeManager: {
    getStore:(config) =>
      ipcRenderer.invoke('electron-store:get-store', { config }),
    get: (config, key, defaultValue) =>
      ipcRenderer.invoke('electron-store:get', { config, key, defaultValue }),
    set: (config, key, value) =>
      ipcRenderer.invoke('electron-store:set', { config, key, value }),
    delete: (config, key) =>
      ipcRenderer.invoke('electron-store:delete', { config, key })
  },

  /**
   * 项目根配置store
   */
  appStore: {
    addUserIndex: (user) =>
      ipcRenderer.invoke('app-store:add-userIndex', user),
    setUserStore: (userId) =>
      ipcRenderer.invoke('app-store:set-userStore', { userId }),
    getUserStore: () =>
      ipcRenderer.invoke('app-store:get-userStore'),
    getUserIndex: () =>
      ipcRenderer.invoke('app-store:get-userIndex'),
    findUserById: (userId) =>
      ipcRenderer.invoke('app-store:find-user-by-id', { userId }),
    findUserByAccount: (userAccount) =>
      ipcRenderer.invoke('app-store:find-user-by-account', { userAccount }),
    getLoginUserId: () =>
      ipcRenderer.invoke('app-store:get-login-user-id'),
    changeUserLoginStatus: (userId) =>
      ipcRenderer.invoke('app-store:change-user-login-status', userId),
    deleteUserById: (userId) =>
      ipcRenderer.invoke('app-store:delete-user-by-id', { userId })
  },

  /**
   * 用户配置store
   */
  userStore: {
    getUserInfo: () =>
      ipcRenderer.invoke('user-store:get-userInfo'),
    setUserInfo: (userInfo) =>
      ipcRenderer.invoke('user-store:set-userInfo', userInfo),
    getUserToken: () =>
      ipcRenderer.invoke('user-store:get-userToken'),
    setUserToken: (token) =>
      ipcRenderer.invoke('user-store:set-userToken', token),
    getUserSyncMeta: () =>
      ipcRenderer.invoke('user-store:get-userSyncMeta'),
    setUserSyncMeta: (syncMeta) =>
      ipcRenderer.invoke('user-store:set-userSyncMeta', syncMeta),
    getUserDataStore: () =>
      ipcRenderer.invoke('user-store:get-userDataStore')
  },

  /**
   * 标签store
   */
  tagStore: {
    getTag: () =>
      ipcRenderer.invoke('tag-store:get-tag'),
    setTag: (tag) =>
      ipcRenderer.invoke('tag-store:set-tag', tag )
  },

  /**
   * 计划store
   */
  planStore: {
    getPlan: () =>
      ipcRenderer.invoke('plan-store:get-plan'),
    setPlan: (plan) =>
      ipcRenderer.invoke('plan-store:set-plan', plan)
  },

  /**
   * 日记store
   */
  diaryStore: {
    getDiary: () =>
      ipcRenderer.invoke('diary-store:get-diary'),
    setDiary: (diary) =>
      ipcRenderer.invoke('diary-store:set-diary', diary)
  },

  /**
   * 灵感store
   */
  insStore: {
    getIns: () =>
      ipcRenderer.invoke('ins-store:get-ins'),
    setIns: (ins) =>
      ipcRenderer.invoke('ins-store:set-ins', ins)
  },


}
