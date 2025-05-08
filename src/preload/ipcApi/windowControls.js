/**
 * 窗口行为控制
 */
import { ipcRenderer } from "electron";

export const windowControls = {
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

