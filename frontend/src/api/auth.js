import api from './axios';

export const register = (data) => api.post('/auth/register/', data);
export const login = (data) => api.post('/auth/login/', data);
export const logout = (refresh) => api.post('/auth/logout/', { refresh });
export const getProfile = () => api.get('/auth/me/');
export const updateProfile = (data) => api.patch('/auth/me/update/', data);
export const forgotPassword = (email) => api.post('/auth/password-reset/', { email });
export const resetPassword = (token, new_password) =>
  api.post(`/auth/password-reset/confirm/${token}/`, { new_password });
