import httpClient from '../httpClient';

export const verifyToken = async (token) => {
  try {
    const response = await httpClient.post(
      '/user/auth',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    localStorage.setItem('token', token);
    return response;
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
}

export const login = (userAccount, password) => {
  return httpClient.post('/user/login', { userAccount, password });
};

export const register = (userAccount, email, password) => {
  return httpClient.post('/user/register', { userAccount, email, password });
}
