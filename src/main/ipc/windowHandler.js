import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'

export function windowHandler(){
  // 关闭窗口API
  ipcMain.on('close-window', () => {
    app.quit();
  });
  // 最小化窗口API
  ipcMain.on('minimize-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    window.minimize();
  });
  // 更改窗口尺寸API
  ipcMain.on('enlarge-window', (event,args) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const newWidth = args[0]; // 新的窗口宽度
    const newHeight = args[1]; // 新的窗口高度
    const newX = (width - newWidth) / 2;
    const newY = (height - newHeight) / 2;
    window.setContentSize(newWidth, newHeight);
    window.setPosition(parseInt(newX), parseInt(newY));  //需要传入整数
  });
  // 判断窗口是否最大化
  ipcMain.on('isMaximized', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const isMaximized = window.isMaximized();
    event.reply('isMaximized-reply', isMaximized);
  });
  // 窗口最大化（非全屏）
  ipcMain.on('maximize', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    window.maximize();
  });
}
