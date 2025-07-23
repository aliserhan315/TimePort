import axios from 'axios';

const BaseURL = process.env.REACT_APP_BASE_URL;
const API_BASE_URL = `${BaseURL}/api`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = (userData) => {
  return axiosInstance.post(`/register`, userData);
};

export const loginUser = (userData) => {
  return axiosInstance.post(`/login`, userData);
};

export const getAllUsers = () => {
  return axiosInstance.get(`/user`);
};

export const getUserById = (id) => {
  return axiosInstance.get(`/user/${id}`);
};

export const addOrUpdateUser = (data, id) => {
  return axiosInstance.put(`/user/${id}`, data);
};

export const deleteUser = (id) => {
  return axiosInstance.delete(`/user/${id}`);
};

export const getAllCapsules = () => {
  return axiosInstance.get(`/capsule`);
};

export const getCapsuleById = (id) => {
  return axiosInstance.get(`/capsule/${id}`);
};

export const getCapsulesByUser = (userId) => {
  return axiosInstance.get(`/capsule/user/${userId}`);
};

export const addOrUpdateCapsule = (capsuleData, id = '') => {
  return axiosInstance.put(`/capsule/${id}`, capsuleData);
};

export const deleteCapsule = (id) => {
  return axiosInstance.delete(`/capsule/${id}`);
};

export const getAllFiles = () => {
  return axiosInstance.get(`/file`);
};

export const getCapsuleFiles = (capsuleId) => {
  return axiosInstance.get(`/file/capsule/${capsuleId}`);
};

export const getFileById = (id) => {
  return axiosInstance.get(`/file/${id}`);
};

export const addOrUpdateFile = (fileData, id = '') => {
  return axiosInstance.put(`/file/${id}`, fileData);
};

export const deleteFile = (id) => {
  return axiosInstance.delete(`/file/${id}`);
};
