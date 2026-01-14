import api from '../axiosConfigation.js';

export const getCessations = async () => {
  try {
    const res = await api.get('cessation');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCessationById = async (id) => {
  try {
    const res = await api.get(`cessation/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addCessation = async (data) => {
  try {
    const res = await api.post('cessation', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
