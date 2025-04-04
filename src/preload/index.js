import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
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
