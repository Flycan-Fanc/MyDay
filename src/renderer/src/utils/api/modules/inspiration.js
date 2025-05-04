/**
 * 灵感接口
 */

import httpClient from "../httpClient";

// 创建灵感
export const createIns = (insData) => {
  return httpClient.post("/ins/create", insData);
}

// 获取单个灵感
export const getIns = (insId) => {
  return httpClient.get(`/ins/${insId}`);
}

// 获取用户灵感列表
export const getUserInsList = (userId) => {
  return httpClient.get(`/ins/list/${userId}`);
}

// 修改灵感
export const updateIns = (insData) => {
  return httpClient.post("/ins/update", insData);
}

// 删除灵感
export const deleteIns = (insId) => {
  return httpClient.delete(`/ins/${insId}`);
}
