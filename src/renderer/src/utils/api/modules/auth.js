/**
 * 权限接口
 */

import httpClient from '../httpClient';

export const verifyToken = async (token) => {
  try {
    let response = await httpClient.post('/user/auth');
    localStorage.setItem('token', token);
    return response;
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
}

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
