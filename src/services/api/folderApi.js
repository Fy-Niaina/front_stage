import api from '../axiosConfigation.js';

export const getFolders = async () => {
  try {
    const res = await api.get('folders');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getFolderById = async (id) => {
  try {
    const res = await api.get(`folders/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addFolder = async (data) => {
  try {
    const res = await api.post('folders', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateFolder = async (id, data) => {
  try {
    const res = await api.put(`folders/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFolder = async (id) => {
  try {
    const res = await api.delete(`folders/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const assignBeneficiaires = async (folderId, beneficiaires) => {
  const res = await api.post(
    `/folders/${folderId}/beneficiaires`,
    { beneficiaires }
  );
  return res.data;
};