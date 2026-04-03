import express from 'express'
import fs from 'fs'
import path from 'path'
import { app as electronApp } from 'electron'
import appStore from '../stores/module/appStore'

const serverApp = express()
const PORT = 3001
const IMAGE_DIR = path.join(electronApp.getPath('userData'), 'images')

let serverStarted = false

serverApp.use(express.json({ limit: '20mb' }))
serverApp.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.sendStatus(204)
    return
  }

  next()
})

function getApiBaseUrl() {
  return (process.env.VITE_APP_API_URL || 'http://localhost:3000').replace(/\/$/, '')
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function logImageServer(event, payload = {}) {
  console.log(`[image-server] ${event}`, payload)
}

function getLocalImagePath(userId, docId, pictureId) {
  return path.join(IMAGE_DIR, String(userId), String(docId), String(pictureId))
}

function getTempImagePath(userId, pictureId) {
  return path.join(IMAGE_DIR, String(userId), 'temp', String(pictureId))
}

function getCurrentToken() {
  const loginUserId = appStore.getLoginUserId()
  if (!loginUserId || loginUserId === -1) {
    return ''
  }

  appStore.setUserStore(loginUserId)
  return appStore.getUserStore().getUserToken() || ''
}

async function downloadFromServer(pictureId) {
  const token = getCurrentToken()
  if (!token) {
    throw new Error('Missing token for picture download')
  }

  const response = await fetch(
    `${getApiBaseUrl()}/api/picture/${pictureId}?token=${encodeURIComponent(token)}`
  )

  if (!response.ok) {
    throw new Error(`Picture download failed: ${response.status}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

function writeBase64Image(filePath, dataUrl) {
  const matches = String(dataUrl).match(/^data:(.+);base64,(.+)$/)
  if (!matches) {
    throw new Error('Invalid image payload')
  }

  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, Buffer.from(matches[2], 'base64'))
}

function sendLocalFile(res, filePath) {
  if (!fs.existsSync(filePath)) {
    logImageServer('file-miss', { filePath })
    res.status(404).json({
      message: 'Image not found',
      errorType: 'ImageServerError',
    })
    return
  }

  res.sendFile(filePath)
}

export function imageServer() {
  if (serverStarted) {
    return
  }

  serverStarted = true

  serverApp.get('/images/temp/:userId/:pictureId', (req, res) => {
    const filePath = getTempImagePath(req.params.userId, req.params.pictureId)
    logImageServer('temp-get', { filePath })
    sendLocalFile(res, filePath)
  })

  serverApp.post('/images/temp/:userId/:pictureId', (req, res) => {
    try {
      const filePath = getTempImagePath(req.params.userId, req.params.pictureId)
      writeBase64Image(filePath, req.body.dataUrl)
      logImageServer('temp-save-success', {
        filePath,
        userId: req.params.userId,
        pictureId: req.params.pictureId,
      })
      res.json({ success: true })
    } catch (error) {
      logImageServer('temp-save-failed', {
        userId: req.params.userId,
        pictureId: req.params.pictureId,
        message: error.message,
      })
      res.status(400).json({
        success: false,
        message: error.message,
      })
    }
  })

  serverApp.post('/images/save/:userId/:docId/:pictureId', (req, res) => {
    const tempPath = getTempImagePath(req.params.userId, req.params.pictureId)
    const targetPath = getLocalImagePath(req.params.userId, req.params.docId, req.params.pictureId)

    try {
      ensureDir(path.dirname(targetPath))

      if (fs.existsSync(tempPath)) {
        fs.copyFileSync(tempPath, targetPath)
        fs.unlinkSync(tempPath)
        logImageServer('doc-save-success', {
          tempPath,
          targetPath,
          userId: req.params.userId,
          docId: req.params.docId,
          pictureId: req.params.pictureId,
        })
      } else if (!fs.existsSync(targetPath)) {
        throw new Error('Temp image not found')
      }

      res.json({ success: true })
    } catch (error) {
      logImageServer('doc-save-failed', {
        tempPath,
        targetPath,
        userId: req.params.userId,
        docId: req.params.docId,
        pictureId: req.params.pictureId,
        message: error.message,
      })
      res.status(400).json({
        success: false,
        message: error.message,
      })
    }
  })

  serverApp.get('/images/:userId/:docId/:pictureId', async (req, res) => {
    const { userId, docId, pictureId } = req.params
    const filePath = getLocalImagePath(userId, docId, pictureId)

    try {
      if (!fs.existsSync(filePath)) {
        logImageServer('doc-miss-download-start', { filePath, userId, docId, pictureId })
        const buffer = await downloadFromServer(pictureId)
        ensureDir(path.dirname(filePath))
        fs.writeFileSync(filePath, buffer)
        logImageServer('doc-miss-download-success', { filePath, userId, docId, pictureId })
      }

      logImageServer('doc-get-success', { filePath, userId, docId, pictureId })
      res.sendFile(filePath)
    } catch (error) {
      logImageServer('doc-get-failed', {
        filePath,
        userId,
        docId,
        pictureId,
        message: error.message,
      })
      res.status(404).json({
        message: 'Image not found',
        errorType: 'ImageServerError',
      })
    }
  })

  serverApp.listen(PORT, () => {
    console.log(`Image server running on http://localhost:${PORT}`)
  })
}
