import axios from 'axios';

// Use relative path for production, absolute for development
const isProduction = process.env.NODE_ENV === 'production';
// In production, we don't add /api to the base URL since it's already in the routes
const API_BASE_URL = isProduction 
    ? ''  // Empty base URL in production (Vercel) to avoid path duplication
    : process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Use environment or default in development

console.log('API Base URL:', API_BASE_URL, 'Environment:', process.env.NODE_ENV);

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
    login: (credentials) => api.post('/api/auth/login', credentials),
    register: (userData) => api.post('/api/auth/register', userData),
};

// User API calls
export const userAPI = {
    getProfile: () => api.get('/api/users/profile'),
    updateProfile: (data) => api.put('/api/users/profile', data),
    getViolations: () => api.get('/api/users/violations'),
};

// Officer API calls
export const officerAPI = {
    getProfile: () => api.get('/api/officers/profile'),
    getViolations: () => api.get('/api/officers/violations'),
    searchUser: (licenseNumber) => api.get(`/api/officers/search-user/${licenseNumber}`),
};

// Violation API calls
export const violationAPI = {
    create: (data) => api.post('/api/violations', data),
    getAll: () => api.get('/api/violations'),
    getById: (id) => api.get(`/api/violations/${id}`),
    updateStatus: (id, status) => api.put(`/api/violations/${id}/status`, { payment_status: status }),
};

// Payment API calls
export const paymentAPI = {
    submit: (formData) => {
        return api.post('/api/payments', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getAll: () => api.get('/api/payments'),
    getByViolation: (violationId) => api.get(`/api/payments/violation/${violationId}`),
};

// Admin API calls
export const adminAPI = {
    getDashboard: () => api.get('/api/admin/dashboard'),
    getUsers: () => api.get('/api/admin/users'),
    getOfficers: () => api.get('/api/admin/officers'),
    createOfficer: (data) => api.post('/api/admin/officers', data),
    deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
    updateUser: (id, data) => api.put(`/api/admin/users/${id}`, data),
    deleteOfficer: (id) => api.delete(`/api/admin/officers/${id}`),
    confirmPayment: (id) => api.put(`/api/admin/payments/${id}/confirm`),
    getUserViolations: (id) => api.get(`/api/admin/users/${id}/violations`),
    getUserProfile: (id) => api.get(`/api/admin/users/${id}/profile`),
};

export default api;
