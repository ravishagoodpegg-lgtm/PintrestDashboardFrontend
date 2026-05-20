import api from './api';

export const getFeed = (tag = '', search = '') => {
  const params = new URLSearchParams();
  if (tag) params.append('tag', tag);
  if (search) params.append('search', search);
  return api.get(`/api/pins/feed?${params.toString()}`);
};

export const createPin = (data) => api.post('/api/pins', data);
export const toggleLike = (id) => api.patch(`/api/pins/${id}/like`);
export const savePin = (id, boardId) => api.patch(`/api/pins/${id}/save`, { boardId });
export const getStats = () => api.get('/api/pins/stats');