import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API calls
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

// User API calls
export const userAPI = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
    getViolations: () => api.get('/users/violations'),
};

// Officer API calls
export const officerAPI = {
    getProfile: () => api.get('/officers/profile'),
    getViolations: () => api.get('/officers/violations'),
    searchUser: (licenseNumber) => api.get(`/officers/search-user/${licenseNumber}`),
};

// Violation API calls
export const violationAPI = {
    create: (data) => api.post('/violations', data),
    getAll: () => api.get('/violations'),
    getById: (id) => api.get(`/violations/${id}`),
    updateStatus: (id, status) => api.put(`/violations/${id}/status`, { payment_status: status }),
};

// Payment API calls
export const paymentAPI = {
    submit: (formData) => {
        return api.post('/payments', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getAll: () => api.get('/payments'),
    getByViolation: (violationId) => api.get(`/payments/violation/${violationId}`),
};

// Admin API calls
export const adminAPI = {
    getDashboard: () => api.get('/admin/dashboard'),
    getUsers: () => api.get('/admin/users'),
    getOfficers: () => api.get('/admin/officers'),
    createOfficer: (data) => api.post('/admin/officers', data),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
    deleteOfficer: (id) => api.delete(`/admin/officers/${id}`),
    confirmPayment: (id) => api.put(`/admin/payments/${id}/confirm`),
    getUserViolations: (id) => api.get(`/admin/users/${id}/violations`),
    getUserProfile: (id) => api.get(`/admin/users/${id}/profile`),
};

export default api;
