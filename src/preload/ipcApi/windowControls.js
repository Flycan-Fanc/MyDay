/**
 * 窗口行为控制
 */
import { ipcRenderer } from "electron";

export const windowControls = {
  closeWindow: () => ipcRenderer.invoke('window:close'),
  minimizeWindow: () => ipcRenderer.invoke('window:minimize'),
  isMaximized: () => ipcRenderer.invoke('window:is-maximized'),
  maximize: ()=> ipcRenderer.invoke('window:maximize'),
  enlargeWindow: (width, height) => {
    if (!Number.isFinite(Number(width)) || !Number.isFinite(Number(height))) {
      throw new Error('Invalid window size')
    }

    return ipcRenderer.invoke('window:resize', {
      width: Number(width),
      height: Number(height),
    })
  },
  // TODO：文件读取相关api
}
