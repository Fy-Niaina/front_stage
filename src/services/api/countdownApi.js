import api from '../axiosConfigation.js';

export const getCountdowns = async () => {
  try {
    const res = await api.get('countdown');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCountdownById = async (id) => {
  try {
    const res = await api.get(`countdown/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addCountdown = async (data) => {
  try {
    const res = await api.post('countdown', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCountdown = async (id, data) => {
  try {
    const res = await api.put(`countdown/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
