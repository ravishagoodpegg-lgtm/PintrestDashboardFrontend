import api from './api';

export const getBoards = () => api.get('/api/boards');
export const createBoard = (data) => api.post('/api/boards', data);