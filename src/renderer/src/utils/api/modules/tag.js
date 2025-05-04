/**
 * 标签接口
 */

import httpClient from '../httpClient';

// 创建标签
export const createTag = (tagData) => {
  return httpClient.post('/tag/create', { ...tagData })
}

// 获取单个标签
export const getTag = (tagId) => {
  return httpClient.get(`/tag/${tagId}`)
}

// 获取用户标签列表
export const getUserTagList = (userId) => {
  return httpClient.get(`/tag/list/${userId}`)
}

// 修改标签
export const updateTag = (tagId, tagData) => {
  return httpClient.post(`/tag/update`, { ...tagData })
}

// 删除标签
export const deleteTag = (tagId) => {
  return httpClient.delete(`/tag/${tagId}`)
}

