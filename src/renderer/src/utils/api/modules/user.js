/**
 * 用户接口
 */

import httpClient from '../httpClient';

// 获取用户信息接口
export const getUserInfo = (userId) => {
  return httpClient.get(`/user/userInfo/${userId}`);
}

// 获取用户头像接口
export const getAvatar = (userId) => {
  return httpClient.get(`/user/avatar/${userId}`);
}

// 更新用户信息接口
export const updateUserInfo = (userData) => {
  return httpClient.post('/user/userInfo', { ...userData })
}

// 修改密码接口
export const updatePassword = (userId, oldPassword, newPassword) => {
  return httpClient.post('/user/password', { userId, oldPassword, newPassword })
}

// 用户注销接口
export const deleteUser = (userId) => {
  return httpClient.delete(`/user/${userId}`)
}
