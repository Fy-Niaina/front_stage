import api from '../axiosConfigation.js';

export const getCessations = async () => {
  try {
    const res = await api.get('cessations');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCessationById = async (id) => {
  try {
    const res = await api.get(`cessations/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addCessation = async (data) => {
  try {
    const res = await api.post('cessations', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCessation = async (id, data) => {
  try {
    const res = await api.put(`cessations/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCessation = async (id) => {
  try {
    const res = await api.delete(`cessations/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
