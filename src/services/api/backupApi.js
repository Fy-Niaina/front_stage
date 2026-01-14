import api from '../axiosConfigation.js';

export const getBackups = async () => {
  try {
    const res = await api.get('backup');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getBackupById = async (id) => {
  try {
    const res = await api.get(`backup/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addBackup = async (data) => {
  try {
    const res = await api.post('backup', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateBackup = async (id, data) => {
  try {
    const res = await api.put(`backup/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBackup = async (id) => {
  try {
    const res = await api.delete(`backup/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
