import api from '../axiosConfigation.js';

export const getCountdowns = async () => {
  try {
    const res = await api.get('decomptes');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCountdownById = async (id) => {
  try {
    const res = await api.get(`decomptes/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addCountdown = async (data) => {
  try {
    const res = await api.post('decomptes', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCountdown = async (id, data) => {
  try {
    const res = await api.put(`decomptes/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCountdown = async (id) => {
  try {
    const res = await api.delete(`decomptes/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}