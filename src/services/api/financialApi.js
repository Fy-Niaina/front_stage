import api from '../axiosConfigation.js';

export const getFinances = async () => {
  try {
    const res = await api.get('finance');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getFinanceById = async (id) => {
  try {
    const res = await api.get(`finance/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addFinance = async (data) => {
  try {
    const res = await api.post('finance', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateFinance = async (id, data) => {
  try {
    const res = await api.put(`finance/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
