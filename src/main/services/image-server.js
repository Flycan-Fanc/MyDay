// main-process/image-services.js
import { ipcMain, app as electronApp} from "electron";
import { deletePicture, getPicture, getUserPictureList } from "../../renderer/src/utils/api/modules/picture";

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const IMAGE_DIR = path.join(electronApp.getPath('userData'), 'images');

export function imageServer(win) {
  // 启动本地服务
  // 获取图片
  app.get('/images/:userId/:docId/:pictureId', (req, res) => {
    const filePath = path.join(IMAGE_DIR, req.params.userId, req.params.docId, req.params.pictureId);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath); // 本地存在直接返回
    } else {
      downloadFromServer(req.params.userId, req.params.docId, req.params.pictureId)
        .then(savedPath => res.sendFile(savedPath))
        .catch(() => res.status(404).end());
    }
  });
  // 将图片暂存在temp目录
  app.post('/images/temp/:userId/:pictureId', (req, res) => {
    saveTemp(req.params.userId, req.params.pictureId, req.file)
      .then(savedPath => res.json({
        success: true,
        path: savedPath
      }).catch(() => res.status(500).end()));
  });
  // 删除temp目录的图片
  app.delete('/images/temp/:userId/:pictureId', (req, res) => {
    deleteTemp(req.params.userId, req.params.pictureId)
      .then(() => res.json({
        success: true,
      }).catch(() => res.status(500).end()));
  })
  // 将图片保存至本地
  app.post('/images/save/:userId/:docId/:pictureId', (req, res) => {
    // const filePath = path.join(IMAGE_DIR, req.params.userId, req.params.docId, req.params.pictureId);
    saveToLocal(req.params.userId, req.params.docId, req.params.pictureId, req.file)
      .then(savedPath => res.json({
        success: true,
        path: savedPath
      }).catch(() => res.status(500).end()));
  })
  // 将图片上传至服务器
  app.post('/images/upload/:userId/:docId/:pictureId', (req, res) => {
    const filePath = path.join(IMAGE_DIR, req.params.userId, req.params.docId, req.params.pictureId);
    uploadToServer(req.params.userId, req.params.docId, req.params.pictureId, req.file)
      .then(() => res.json({
        success: true,
      }).catch(() => res.status(500).end()));
  })
  // 删除本地图片
  app.delete('/images/:userId/:docId/:pictureId', (req, res) => {
    deleteLocal(req.params.userId, req.params.docId, req.params.pictureId)
      .then(() => res.json({
        success: true,
      }).catch(() => res.status(500).end()));
  })
  // 在Electron主进程启动
  app.listen(PORT, () => console.log(`Image server running on ${PORT}`));

  // ※※※※ 注意：以下内部函数参数传入对象
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
  // 从服务器上获取图片，使用stream流存放到本地
  function downloadFromServer(userId, docId, pictureId) {
    return new Promise((resolve, reject) => {
      const saveDir = path.join(IMAGE_DIR, userId, docId);
      const savePath = path.join(saveDir, pictureId);

      // 调用API获取图片Blob数据
      getPicture({ pictureId })
        .then(async (response) => {
          fs.mkdirSync(saveDir, { recursive: true })

          // 将Blob转换为Buffer并写入文件
          const arrayBuffer = await response.data.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer)
          fs.writeFile(savePath, buffer, (err) => {
            if (err) reject(err)
            else resolve(savePath)
          })
        })
        .catch(reject)
    });
  }
  // 将图片上传至服务器
  function uploadToServer(userId, docId, pictureId, params) {
    return new Promise(async (resolve, reject) => {
      const fileDir = path.join(IMAGE_DIR, userId, docId);
      const filePath = path.join(fileDir, pictureId);

      if (fs.existsSync(filePath)) {
        const file = new FormData();
        file.append('file', fs.createReadStream(filePath)); // 使用文件流
        file.append('filename', path.basename(filePath));
        uploadPicture({ params, file })
          .then(resolve)
          .catch(reject)
      }
    })
  }
  // 将图片保存至本地
  function saveToLocal(userId, docId, pictureId, file) {
    return new Promise(async (resolve, reject) => {
      try {
        const saveDir = path.join(IMAGE_DIR, userId, docId);
        const savePath = path.join(saveDir, pictureId);

        fs.mkdirSync(saveDir, { recursive: true });

        // 将Blob转换为Buffer并写入文件
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer)
        fs.writeFile(savePath, buffer, (err) => {
          if (err) reject(err)
          else resolve(savePath)
        })
      } catch (err) {
        reject(err);
      }
    });
  }
  // 删除本地的图片
  function deleteLocal(userId, docId, pictureId) {
    return new Promise((resolve, reject) => {
      const filePath = path.join(IMAGE_DIR, userId, docId, pictureId);
      try {
        fs.unlinkSync(filePath);
        console.log(`文件已删除: ${filePath}`);
        resolve({ success: true, existed: true }); // 明确返回状态
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log(`文件不存在（无需删除）: ${filePath}`);
          resolve({ success: true, existed: false }); // 文件不存在视为成功
        } else {
          console.error(`删除文件失败: ${filePath}`, err);
          reject(err); // 其他错误才 reject
        }
      }
    });
  }
  // 将图片保存至临时目录
  function saveTemp(userId, pictureId, file) {
    return new Promise(async (resolve, reject) => {
      try {
        const saveDir = path.join(IMAGE_DIR, userId, 'temp');
        const savePath = path.join(saveDir, pictureId);

        fs.mkdirSync(saveDir, { recursive: true });

        // 将Blob转换为Buffer并写入文件
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer)
        fs.writeFile(savePath, buffer, (err) => {
          if (err) reject(err)
          else resolve(savePath)
        })
      } catch (err) {
        reject(err);
      }
    })
  }
  // 将图片从临时目录删除
  function deleteTemp(userId, pictureId) {
    return new Promise((resolve, reject) => {
      const filePath = path.join(IMAGE_DIR, userId, 'temp', pictureId);
      try {
        fs.unlinkSync(filePath);
        console.log(`文件已删除: ${filePath}`);
        resolve({ success: true, existed: true }); // 明确返回状态

      } catch (err){
        if (err.code === 'ENOENT') {
          console.log(`文件不存在（无需删除）: ${filePath}`);
          resolve({ success: true, existed: false }); // 文件不存在视为成功
        } else {
          console.error(`删除文件失败: ${filePath}`, err);
          reject(err); // 其他错误才 reject
        }
      }
    })
  }
}
