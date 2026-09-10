import axios from 'axios';
const DEFAULT_ORIGIN = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : 'https://ringslot-backend.onrender.com';
const BASE = (process.env.NEXT_PUBLIC_API_URL || DEFAULT_ORIGIN).replace(/\/$/, '') + '/api';
const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});
api.interceptors.request.use(c => {
  if (typeof window !== 'undefined') {
    const t = localStorage.getItem('rs_token');
    if (t) c.headers.Authorization = `Bearer ${t}`;
  }
  return c;
});
api.interceptors.response.use(r => r, err => {
  if (err.response?.status === 401 && typeof window !== 'undefined') {
    const isAuth = err.config?.url?.includes('/auth/');
    if (!isAuth) {
      localStorage.removeItem('rs_token');
      localStorage.removeItem('rs_user');
      window.location.href = '/login';
    }
  }
  return Promise.reject(err);
});
export default api;
