import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { registerIpcHandler } from './ipc'
import { imageServer } from './services/image-server'

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    frame: false,
    resizable: false,
    transparent: true,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      scrollBounce: false,
      scrollbarOverlayStyle: 'none',
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      enableBlinkFeatures: 'Geolocation',
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.webContents.session.setPermissionRequestHandler((_, permission, callback) => {
    callback(permission === 'geolocation')
  })

  const loadPromise =
    is.dev && process.env.ELECTRON_RENDERER_URL
      ? mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
      : mainWindow.loadFile(join(__dirname, '../renderer/index.html'))

  loadPromise.then(() => {
    setupCSPHeaders(mainWindow)
  })
}

function setupCSPHeaders(window) {
  window.webContents.on('did-finish-load', () => {
    const isDev = process.env.NODE_ENV === 'development'
    const cspHeader = [
      "default-src 'self'",
      "connect-src 'self' http://localhost:8080 ws://localhost:* http://ip-api.com https://nominatim.openstreetmap.org http://weather.service.msn.com http://localhost:3000 http://localhost:3001",
      `script-src 'self' ${isDev ? "'unsafe-inline' 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: http://localhost:3000 http://localhost:3001",
    ]
      .filter(Boolean)
      .join('; ')

    window.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      details.responseHeaders['Content-Security-Policy'] = [cspHeader]
      callback({ responseHeaders: details.responseHeaders })
    })
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  registerIpcHandler()
  imageServer()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
