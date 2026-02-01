import api from '../axiosConfigation.js';

export const getDecisions = async () => {
  try {
    const res = await api.get('decisions');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getDecisionById = async (id) => {
  try {
    const res = await api.get(`decisions/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addDecision = async (data) => {
  try {
    const res = await api.post('decisions', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateDecision = async (id, data) => {
  try {
    const res = await api.put(`decisions/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDecision = async (id) => {
  try {
    const res = await api.delete(`decision/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
