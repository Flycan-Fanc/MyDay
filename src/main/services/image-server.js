// main-process/image-services.js
import { ipcMain } from "electron";
import { deletePicture, getPicture, getUserPictureList } from "../../renderer/src/utils/api/modules/picture";

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const IMAGE_DIR = path.join(app.getPath('userData'), 'images');

export function imageServer(win) {
  // 启动本地服务
  app.get('/images/:docId/:filename', (req, res) => {
    const filePath = path.join(IMAGE_DIR, req.params.docId, req.params.filename);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath); // 本地存在直接返回
    } else {
      downloadFromServer(req.params.docId, req.params.filename)
        .then(savedPath => res.sendFile(savedPath))
        .catch(() => res.status(404).end());
    }
  });
  // 在Electron主进程启动
  app.listen(PORT, () => console.log(`Image server running on ${PORT}`));

  // 主进程主动调用渲染进程 —— 上传图片
  function uploadPicture(params) {
    win.webContents.send('main-send-upload-picture', params);

    // 监听渲染进程的回复
    return new Promise(resolve => {
      ipcMain.once('renderer-response-upload-picture', (event, result) => {
        resolve(result);
      });
    });
  }
  // 主进程主动调用渲染进程 —— 获取图片数据
  function getPicture(params) {
    win.webContents.send('main-send-get-picture', params);

    // 监听渲染进程的回复
    return new Promise(resolve => {
      ipcMain.once('renderer-response-get-picture', (event, result) => {
        resolve(result);
      });
    });
  }
  // 主进程主动调用渲染进程 —— 获取用户图片列表
  function getUserPictureList(params) {
    win.webContents.send('main-send-get-user-picture-list', params);

    // 监听渲染进程的回复
    return new Promise(resolve => {
      ipcMain.once('renderer-response-get-user-picture-list', (event, result) => {
        resolve(result);
      });
    });
  }
  // 主进程主动调用渲染进程 —— 删除图片
  function deletePicture(params) {
    win.webContents.send('main-send-delete-picture', params);

    // 监听渲染进程的回复
    return new Promise(resolve => {
      ipcMain.once('renderer-response-delete-picture', (event, result) => {
        resolve(result);
      });
    });
  }
}

// 从服务器上获取图片
function downloadFromServer(docId, filename) {
  return new Promise((resolve, reject) => {
    const saveDir = path.join(IMAGE_DIR, docId);
    const savePath = path.join(saveDir, filename);

    // 伪代码：实际替换为您的下载逻辑
    api.downloadImage(docId, filename).then(stream => {
      fs.mkdirSync(saveDir, { recursive: true });
      stream.pipe(fs.createWriteStream(savePath))
        .on('finish', () => resolve(savePath));
    }).catch(reject);
  });
}
