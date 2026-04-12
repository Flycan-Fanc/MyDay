import { app, BrowserWindow, ipcMain, screen } from 'electron'

function getWindowFromEvent(event) {
  const window = BrowserWindow.fromWebContents(event.sender)
  if (!window) {
    throw new Error('Window instance not found')
  }

  return window
}

function normalizeWindowSize(payload = {}) {
  const width = Number(payload.width)
  const height = Number(payload.height)

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error('Invalid window size payload')
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  }
}

export function windowHandler(){
  // 关闭窗口API
  ipcMain.handle('window:close', () => {
    app.quit();
  });
  // 最小化窗口API
  ipcMain.handle('window:minimize', (event) => {
    const window = getWindowFromEvent(event);
    window.minimize();
  });
  // 更改窗口尺寸API
  ipcMain.handle('window:resize', (event, payload) => {
    const window = getWindowFromEvent(event);
    const { width: newWidth, height: newHeight } = normalizeWindowSize(payload);
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const newX = (width - newWidth) / 2;
    const newY = (height - newHeight) / 2;
    window.setContentSize(newWidth, newHeight);
    window.setPosition(parseInt(newX), parseInt(newY));  //需要传入整数
  });
  // 判断窗口是否最大化
  ipcMain.handle('window:is-maximized', (event) => {
    const window = getWindowFromEvent(event);
    return window.isMaximized();
  });
  // 窗口最大化（非全屏）
  ipcMain.handle('window:maximize', (event) => {
    const window = getWindowFromEvent(event);
    window.maximize();
  });
}
