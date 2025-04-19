import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  /**
   * 窗口行为控制
   */
  windowControls:{
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    isMaximized: () => {
      ipcRenderer.send("isMaximized");
      return new Promise((resolve, reject) => {
        ipcRenderer.once('isMaximized-reply', (event, isMaximized) => {
          resolve(isMaximized);
        });
      });
    },
    maximize: ()=> ipcRenderer.send('maximize'),
    enlargeWindow: (w,h)=> ipcRenderer.send('enlarge-window',[w,h]),
    // TODO：文件读取相关api
  },
  /**
   * electron-store API
   */
  electronStore:{
    getStore:(config) =>
      ipcRenderer.invoke('electron-store:get-store', { config }),
    get: (config, key, defaultValue) =>
      ipcRenderer.invoke('electron-store:get', { config, key, defaultValue }),
    set: (config, key, value) =>
      ipcRenderer.invoke('electron-store:set', { config, key, value }),
    delete: (config, key) =>
      ipcRenderer.invoke('electron-store:delete', { config, key })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
