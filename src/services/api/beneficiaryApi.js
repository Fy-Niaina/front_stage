import api from '../axiosConfigation.js';

export const getBeneficiaries = async () => {
  try {
    const res = await api.get('beneficiary');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getBeneficiaryById = async (id) => {
  try {
    const res = await api.get(`beneficiary/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addBeneficiary = async (data) => {
  try {
    const res = await api.post('beneficiary/add', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateBeneficiary = async (id, data) => {
  try {
    const res = await api.put(`beneficiary/edit/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBeneficiary = async (id) => {
  try {
    const res = await api.delete(`beneficiary/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
