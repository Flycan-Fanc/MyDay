import axios from 'axios';

// 创建axios实例
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // 基础URL,后续改为具体url
  timeout: 10000, // 超时时间
});

// 请求拦截器（添加Token）
httpClient.interceptors.request.use(config => {
  // 统一添加 /api 前缀
  if (!config.url.startsWith('/api')) {
    config.url = `/api${config.url}`;
  }

  // TODO: 从用户对应的userStore中取token
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  return config;
});

// 响应拦截器（错误处理）
httpClient.interceptors.response.use(
  response => response.data, // 直接返回data字段
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login'; // Token过期跳转登录
    }
    return Promise.reject(error);
  }
);

export default httpClient;
