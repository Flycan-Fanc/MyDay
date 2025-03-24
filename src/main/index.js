import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// 窗口管理
function createWindow() {
  // 使用BrowserWindow创建窗口.
  const mainWindow = new BrowserWindow({
    // width: 1000,
    // height: 670, //登录页的值
    width:1300,
    height:800, //主页面
    frame:false,
    resizable: false, // 禁止手动改变窗口尺寸
    transparent: true, // 设置背景为透明
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      scrollBounce: false, // 禁用滚动反弹效果
      scrollbarOverlayStyle: 'none', // 隐藏滚动条
      webSecurity: false,  //TODO：electron跨域处理 暂时禁用web安全策略，仅在开发环境中使用
      nodeIntegration: true, // 如果未启用可能需要设置
      contextIsolation: false // 如果未启用可能需要设置
    }
  })

  // 生命周期控制
  // ready-to-show事件，当窗口准备好显示时触发，延迟显示窗口优化体验
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 拦截新窗口创建，强制用系统浏览器打开外部链接
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // 开发环境：加载 Vite 开发服务器地址
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']).then(() => {
      setupCSPHeaders(mainWindow); // 调用 CSP 配置函数
    });
  } else {
    // 生产环境：加载打包后的文件
    mainWindow.loadFile(join(__dirname, '../renderer/index.html')).then(() => {
      setupCSPHeaders(mainWindow); // 调用 CSP 配置函数
    });
  }

  // 新增的 CSP 配置函数
  function setupCSPHeaders(window) {
    window.webContents.on('did-finish-load', () => {
      // 配置 CSP 规则（开发环境放宽策略）
      const cspHeader = [
        "default-src 'self'",
        "connect-src 'self' http://localhost:8080 ws://localhost:*", // 允许连接到后端和 WebSocket
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // 允许 Vue 开发模式
        "style-src 'self' 'unsafe-inline'",                 // 允许内联样式
        "img-src 'self' data:"                             // 允许图片和 data URL
      ].join('; ');

      // 通过 webRequest 修改响应头
      window.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        details.responseHeaders['Content-Security-Policy'] = [cspHeader];
        callback({ responseHeaders: details.responseHeaders });
      });
    });
  }

  // 修改 CSP 以允许从特定源加载资源
  // mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       'Access-Control-Allow-Origin': ['*'],
  //       ...details.responseHeaders,
  //     },
  //   });
  // });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC通信控制
  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
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

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
