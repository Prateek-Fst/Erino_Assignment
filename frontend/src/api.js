import axios from 'axios';
const API = axios.create({ baseURL: 'https://erino-assignment-tq33.onrender.com', withCredentials: true });

export const register = (data) => API.post('/api/auth/register', data);
export const login = (data) => API.post('/api/auth/login', data);
export const logout = () => API.post('/api/auth/logout');
export const getExpenses = () => API.get('/api/expenses');
export const addExpense = (data) => API.post('/api/expenses', data);
export const deleteExpense = (id) => API.delete(`/api/expenses/${id}`);
export const getInsights = () => API.get('/api/expenses/insights');
