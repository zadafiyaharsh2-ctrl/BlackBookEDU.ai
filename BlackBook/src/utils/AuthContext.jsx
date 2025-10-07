// import { createContext , useContext, useState } from "react";


// // This makes a new React context called AuthContext
// const AuthContext = createContext();
// /**
//  * It will later hold a reference to React’s setIsAuthenticated function.
//  * This allows you to call setAuthFromOutside() from anywhere, even outside React components.
//  */
// let externalSetAuth ;
//     // If externelSetAuth has been assigned, it will update authentication state.
// export function setAuthFromOutside(value) {
//     if(externalSetAuth) externalSetAuth(value);
// }
//     // the container function for app takes arg as children
// export function AuthProvider({ children }) {
//     // useState 
//     const [isAuthenticated, setIsAuthenticated] = useState(
//         // !!value is a neat trick in JavaScript to convert any value into a real boolean (true or false).
//         !!localStorage.getItem('accessToken')
//     );
//     // Stores the state updater function so setAuthFromOutside() can use it later.
//     externalSetAuth = setIsAuthenticated;
//     // Wraps all child components in AuthContext.Provider.
//     return (
//         <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

//     // Custom hook to use the context easily.
// export function useAuth(){
//     return useContext(AuthContext);
// }
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

// Allow api.js to update auth state from outside React
let externalSetAuth = null;
export function setAuthFromOutside(value) {
  if (externalSetAuth) externalSetAuth(!!value);
}

export function AuthProvider({ children }) {
  // Start from persisted access token, but we’ll confirm with the server
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const [authLoading, setAuthLoading] = useState(true);

  externalSetAuth = setIsAuthenticated;

  // Bootstrap session using cookie (HttpOnly) via /auth/me
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setAuthLoading(true);
      try {
        await api.get('/auth/me'); // server validates cookie or access token
        if (!cancelled) setIsAuthenticated(true);
      } catch {
        if (!cancelled) setIsAuthenticated(false);
      } finally {
        if (!cancelled) setAuthLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ isAuthenticated, authLoading, setIsAuthenticated }), [isAuthenticated, authLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}