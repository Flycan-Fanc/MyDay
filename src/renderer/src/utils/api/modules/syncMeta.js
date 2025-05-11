/**
 * 同步元数据接口
 */

import httpClient from "../httpClient";

// 通知服务器添加同步元数据
export const addSyncMeta = (userId) => {
  return httpClient.post(`/syncMeta/add/${userId}`)
}

// 获取同步元数据
export const getSyncMeta = (userId) => {
  return httpClient.get(`/syncMeta/${userId}`)
}

// 通知服务器更新同步元数据
export const updateSyncMeta = (userId) => {
  return httpClient.post(`/syncMeta/update/${userId}`)
}

// 通知服务器删除同步元数据
export const deleteSyncMeta = (userId) => {
  return httpClient.delete(`/syncMeta/${userId}`)
}
