import axios from 'axios';
// import { useAuth } from '../utils/AuthContext'; // <--- REMOVE THIS

const api = axios.create({
  baseURL: import.meta.env.VITE_API || "http://localhost:9090",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helper: get current user role from localStorage
function getUserRole() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role || null;
  } catch {
    return null;
  }
}

// Helper function to log out and redirect
function handleLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user'); // Also remove user info
  window.location.href = '/login';
}

api.interceptors.response.use(
  r => r,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      const role = getUserRole();
      
      // Only attempt refresh if user is admin or student (as per your logic)
      if (role === 'admin' || role === "student") {
        try {
          // Assumes /admin/token uses the httpOnly cookie to refresh
          const { data } = await api.post('/admin/token'); 
          localStorage.setItem('accessToken', data.accessToken);
          // useAuth(true); // <--- REMOVE
          return api(original); // Retry the original request with new token
        }catch (refreshError) { // <--- The variable is defined here
          // Refresh failed, force logout
          console.error("Token refresh failed:", refreshError); // Log the actual error
          handleLogout();
        }
      } else {
        // For other roles or guests, just log out and redirect
        handleLogout();
        // useAuth(false); // <--- REMOVE
      }
    }
    return Promise.reject(err);
  }
);

export default api;