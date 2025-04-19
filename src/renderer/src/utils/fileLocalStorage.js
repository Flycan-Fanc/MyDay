const fs = require('fs')
const path = require('path')

// TODO:后续改为用户安装目录
const _userDir = 'D:/Desktop/data'

// 图片本地存储
const imageStorage = {
  // 图片保存路径
  imageDir: path.join(_userDir, 'images'),
  pathInit: function(){
    // 确保图片路径存在
    if (!fs.existsSync(this.imageDir)) {
      fs.mkdirSync(this.imageDir);
    }
  },
  /**
   * 将图片base64写入文件
   * @param fileName
   * @param imageData
   */
  saveImage: function(fileName,imageData) {
    this.pathInit()
    let imagePath = path.join(this.imageDir, fileName)
    fs.appendFile(imagePath, imageData, (err) => {
      if(err){
        console.log('写入错误:'+err)
      } else {
        console.log('写入成功')
      }
    })
  },
  /**
   * 从文件中读取图片base64数据
   * @param fileName
   * @returns {Promise<unknown>}
   */
  getImage: function(fileName) {
    this.pathInit()
    let imagePath = path.join(this.imageDir, fileName)
    return new Promise((resolve, reject) => {
      fs.readFile(imagePath, (err, data) => {
        if (err) {
          return reject(err);
        }
        console.log(data); // 输出的是utf8编码的文本内容
        resolve(data);
      });
    });
  },
  /**
   * 将图片文件保存到本地
   * @param fileName
   * @param file
   */
  saveImageFile(fileName, file) {
    
  },
  /**
   * 从本地读取图片文件
   * @param fileName
   */
  getImageFile(fileName) {

  },
  /**
   * 删除本地图片文件
   * @param fileName
   */
  deleteImageFile(fileName) {

  }
}

const mdStorage = {
  saveMd: (mdData) => {},
  getMd: (mdPath) => {}
}

export {imageStorage, mdStorage}
