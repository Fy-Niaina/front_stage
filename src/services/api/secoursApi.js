import api from '../axiosConfigation.js';

export const getSecours = async () => {
  try {
    const res = await api.get('secours');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getSecoursById = async (id) => {
  try {
    const res = await api.get(`secours/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addSecours = async (data) => {
  try {
    const res = await api.post('secours', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateSecours = async (id, data) => {
  try {
    const res = await api.put(`secours/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSecours = async (id) => {
  try {
    const res = await api.delete(`secours/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
