
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const registerUser = (userData) => {
  return axios.post(`${API_BASE_URL}/register`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_BASE_URL}/login`, userData);
};

export const getAllUsers = () => {
  return axios.get(`${API_BASE_URL}/user`);
};

export const getUserById = (id) => {
  return axios.get(`${API_BASE_URL}/user/${id}`);
};

export const addOrUpdateUser = (userData, id ) => {
  return axios.put(`${API_BASE_URL}/user/${id}`, userData);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_BASE_URL}/user/${id}`);
};

export const getAllCapsules = () => {
  return axios.get(`${API_BASE_URL}/capsule`);
};

export const getCapsuleById = (id) => {
  return axios.get(`${API_BASE_URL}/capsule/${id}`);
};

export const getCapsulesByUser = (userId) => {
  return axios.get(`${API_BASE_URL}/capsule/user/${userId}`);
};

export const addOrUpdateCapsule = (capsuleData, id = '') => {
  return axios.put(`${API_BASE_URL}/capsule/${id}`, capsuleData);
};

export const deleteCapsule = (id) => {
  return axios.delete(`${API_BASE_URL}/capsule/${id}`);
};

export const getAllFiles = () => {
  return axios.get(`${API_BASE_URL}/file`);
};

export const getCapsuleFiles = (capsuleId) => {
  return axios.get(`${API_BASE_URL}/file/capsule/${capsuleId}`);
};

export const getFileById = (id) => {
  return axios.get(`${API_BASE_URL}/file/${id}`);
};

export const addOrUpdateFile = (fileData, id = '') => {
  return axios.put(`${API_BASE_URL}/file/${id}`, fileData);
};

export const deleteFile = (id) => {
  return axios.delete(`${API_BASE_URL}/file/${id}`);
};