/**
 * 图片接口
 */

import httpClient from '../httpClient';

/**
 * 上传图片
 * @param {Object} params - 上传参数
 * @param {string} [params.userId] - 用户ID
 * @param {string} [params.diaryId] - 日记ID
 * @param {string} [params.insId] - 灵感ID
 * @param {boolean} [params.isAvatar] - 是否作为头像
 * @param {boolean} [params.isCover] - 是否作为封面
 * @param {number} [params.fileScale] - 文件缩放比例
 * @param {File[]} files - 要上传的文件列表
 * @returns {Promise} 上传结果
 */
export const uploadPicture = (params, files) => {
  const formData = new FormData();

  // 添加参数到FormData
  if (params.userId) formData.append('userId', params.userId);
  if (params.diaryId) formData.append('diaryId', params.diaryId);
  if (params.insId) formData.append('insId', params.insId);
  if (params.isAvatar) formData.append('isAvatar', params.isAvatar);
  if (params.isCover) formData.append('isCover', params.isCover);
  if (params.fileScale) formData.append('fileScale', params.fileScale);

  // 添加文件到FormData
  files.forEach(file => {
    formData.append('files', file);
  });

  return httpClient.post('/picture/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

/**
 * 获取图片数据
 * @param {string} pictureId - 图片ID
 * @returns {Promise} 包含图片数据的Promise
 */
export const getPicture = (pictureId) => {
  return httpClient.get(`/picture/${pictureId}`, {
    responseType: 'blob' // 重要：指定响应类型为blob
  });
}

/**
 * 获取用户图片列表
 * @param {string} userId - 用户ID
 * @returns {Promise} 包含图片列表的Promise
 */
export const getUserPictureList = (userId) => {
  return httpClient.get(`/picture/list/${userId}`);
}

/**
 * 删除图片
 * @param {string} pictureId - 图片ID
 * @returns {Promise} 删除结果
 */
export const deletePicture = (pictureId) => {
  return httpClient.delete(`/picture/${pictureId}`);
}

/**
 * 获取图片URL（辅助函数）
 * @param {string} pictureId - 图片ID
 * @returns {string} 图片URL
 */
export const getPictureUrl = (pictureId) => {
  // 从axios实例配置中获取baseURL，确保与请求使用相同的配置
  const baseURL = httpClient.defaults.baseURL;
  // 移除baseURL末尾可能存在的斜杠，然后拼接路径
  return `${baseURL.replace(/\/$/, '')}/picture/${pictureId}`;
}
