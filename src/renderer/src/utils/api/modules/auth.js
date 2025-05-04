/**
 * 权限接口
 */

import httpClient from '../httpClient';

// 登录接口
export const login = (userAccount, password) => {
  return httpClient.post('/user/login', { userAccount, password });
};

// 注册接口
export  const register = (userAccount, email, password) => {
  return httpClient.post('/user/register', { userAccount, email, password });
}


// 获取用户权限
// export const getPermissions = () => {
//   return httpClient.get('/user/permissions');
// };
