// main-process/image-server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const IMAGE_DIR = path.join(app.getPath('userData'), 'images');

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

// 在Electron主进程启动
app.listen(PORT, () => console.log(`Image server running on ${PORT}`));
