import api from '../axiosConfigation.js';

export const getBeneficiaries = async () => {
  try {
    const res = await api.get('beneficiaires');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getBeneficiaryById = async (id) => {
  try {
    const res = await api.get(`beneficiaires/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addBeneficiary = async (data) => {
  try {
    const res = await api.post('beneficiaires', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateBeneficiary = async (id, data) => {
  try {
    const res = await api.put(`beneficiaires/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBeneficiary = async (id) => {
  try {
    const res = await api.delete(`beneficiaires/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
