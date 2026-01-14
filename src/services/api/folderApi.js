import api from '../axiosConfigation.js';

export const getFolders = async () => {
  try {
    const res = await api.get('folder');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getFolderById = async (id) => {
  try {
    const res = await api.get(`folder/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addFolder = async (data) => {
  try {
    const res = await api.post('folder', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateFolder = async (id, data) => {
  try {
    const res = await api.put(`folder/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFolder = async (id) => {
  try {
    const res = await api.delete(`folder/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
