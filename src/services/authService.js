import api from './api';

export const login = (credentials) => api.post('/user/login', credentials);
export const register = (data) => api.post('/user/register', data);