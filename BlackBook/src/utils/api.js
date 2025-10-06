// // ============= IMPORTS ====================
// import axios from 'axios';
// import { setAuthFromOutside } from './AuthContext';

// /**
//  * Instead of writing axios.get("http://localhost:9000/something") everywhere, 
//  * you create a reusable api instance that already knows the base URL and that it should send cookies along with requests.
//  * This makes your requests cleaner: api.get("/users").
//  */
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API || 'http://localhost:9090/',
//   withCredentials: true,
// });

// /**
//  * Before any request leaves your frontend, axios will run this function by itself .
//  * It looks into localStorage for an accessToken.
//  * It sets Authorization: Bearer ee4545cr... in requested headers.
//  * This let the system knows are we able to access the routes protected by the cookie.token
//  */

// api.interceptors.request.use((config) => {
//     // get token
//     const token = localStorage.getItem('accessToken');
//     // if exists then put it in request's headers
//     if(token) config.headers.Authorization = `Bearer ${token}`;
//     // finaly returns the correct configuration
//     return config;
// });

// // HANDLING THE INVALID AND EXPIRED TOKEN
// /**
//  * 
//  */

// api.interceptors.response.use(
//   // success handler: just return the response unchanged
//   r => r,  // you can also write  * function (r) { return r; } * instead

//   // error handler: runs when a request fails (note: it's an async arrow function)
//   async (err) => {
//     // "original" is the axios request config for the request that failed.
//     // We will reuse this config if we want to retry the same request.
//     const original = err.config;

//     // Optional chaining (?.) safely reads err.response.status only if err.response exists.
//     // This checks: "did the server respond with HTTP 401 Unauthorized?"
//     // Also check !original._retry to ensure we only attempt a refresh once per request.
//     if (err.response?.status === 401 && !original._retry) {
//       // mark the request as retried so we don't loop forever
//       original._retry = true;

//       try {
//         // Try to refresh the access token by calling the refresh endpoint.
//         // This line pauses here until the POST completes (because of await).
//         const { data } = await api.post('/admin/token');

//         // Save the new access token into localStorage for future requests.
//         localStorage.setItem('accessToken', data.accessToken);

//         // Inform your React auth layer (outside of this file) that authentication is valid.
//         setAuthFromOutside(true);

//         // Retry the original request with the same config.
//         // Because we saved a new token, the request interceptor will attach it.
//         return api(original);
//       }
//       catch {
//         // If refreshing fails (refresh token invalid/expired/etc), clean up and log out:

//         // Remove any stale token from localStorage
//         localStorage.removeItem('accessToken');

//         // Inform React that the user is no longer authenticated
//         setAuthFromOutside(false);

//         // Redirect the browser to the login page (full page navigation)
//         window.location.href = '/login';
//       }
//     }

//     // If we get here, either it wasn't a 401, or retry already happened, or refresh failed.
//     // Propagate the error to the caller by returning a rejected Promise.
//     return Promise.reject(err);
//   }
// );

import axios from 'axios';
import { setAuthFromOutside } from './AuthContext'; // adjust path if needed

const BASE_URL = import.meta.env.VITE_API || 'http://localhost:9090/';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies automatically
});

// In-memory copy of token + localStorage persistence
let accessToken = localStorage.getItem('accessToken') || null;

function setAccessToken(token) {
  accessToken = token || null;
  if (token) localStorage.setItem('accessToken', token);
  else localStorage.removeItem('accessToken');
}

// Use a separate client without interceptors for refresh calls
const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Ensure only one refresh runs at a time
let refreshPromise = null;
function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        // Backend should read refresh cookie and return a new access token
        const { data } = await refreshClient.post('/admin/token');
        const newToken = data?.accessToken;
        if (!newToken) throw new Error('No accessToken returned by /admin/token');
        setAccessToken(newToken);
        setAuthFromOutside(true);
        return newToken;
      } catch (e) {
        setAccessToken(null);
        setAuthFromOutside(false);
        throw e;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

// Attach Authorization automatically if we have a token
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle 401s without redirecting
api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const original = err?.config || {};
    const status = err?.response?.status;

    // Opt-out flag if you ever want to skip refresh on a specific request
    if (status === 401 && !original.__retry && original.__noAuthRefresh !== true) {
      try {
        original.__retry = true;
        await refreshAccessToken();
        return api(original);
      } catch {
        // Stay on the page, propagate the error so UI can show it
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
export { setAccessToken };