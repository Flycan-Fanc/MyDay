/**
 * renderer API
 */
import { ipcRenderer } from "electron";
import { uploadPicture } from "../../renderer/src/utils/api/modules/picture";

export const rendererAPI = {
  /**
   * 图片相关通信
   */
  picture: {
    // 上传图片
    uploadPicture: (callback) => {
      ipcRenderer.on('main-send-upload-picture', (event, args) => {
        const result = callback(args); // 执行渲染进程逻辑
        event.sender.send('renderer-response-upload-picture', result); // 返回结果
      });
    },
    // 获取图片数据
    getPicture: (callback) => {
      ipcRenderer.on('main-send-get-picture', (event, args) => {
        const result = callback(args); // 执行渲染进程逻辑
        event.sender.send('renderer-response-get-picture', result); // 返回结果
      });
    },
    // 获取用户图片列表
    getUserPictureList: (callback) => {
      ipcRenderer.on('main-send-get-user-picture-list', (event, args) => {
        const result = callback(args); // 执行渲染进程逻辑
        event.sender.send('renderer-response-get-user-picture-list', result); // 返回结果
      });
    },
    // 删除图片
    deletePicture: (callback) => {
      ipcRenderer.on('main-send-delete-picture', (event, args) => {
        const result = callback(args); // 执行渲染进程逻辑
        event.sender.send('renderer-response-delete-picture', result); // 返回结果
      });
    },
  }

}
