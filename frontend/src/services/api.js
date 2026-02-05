import axios from 'axios';

const API_URL = 'https://fastsaver.live'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API calls
export const employeeAPI = {
  getAll: () => api.get('/api/employees'),
  create: (data) => api.post('/api/employees', data),
  delete: (employeeId) => api.delete(`/api/employees/${employeeId}`),
};

// Attendance API calls
export const attendanceAPI = {
  create: (data) => api.post('/api/attendance', data),
  getByEmployee: (employeeId) => api.get(`/api/attendance/${employeeId}`),
};

export default api;
