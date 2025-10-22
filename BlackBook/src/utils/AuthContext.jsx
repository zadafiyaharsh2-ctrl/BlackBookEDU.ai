import React, { createContext, useContext, useState, useEffect } from "react";
import api from './api'; // Make sure this points to your configured Axios instance

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export function AuthProvider({ children }) {
    // Read the initial token from localStorage
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const isAuthenticated = !!token;

    // This effect runs whenever the token changes
    useEffect(() => {
        if (token) {
            // Store token for persistence across page reloads
            localStorage.setItem('accessToken', token);
            // Set the default Authorization header for all future API requests
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // Remove token if it's null (e.g., on logout)
            localStorage.removeItem('accessToken');
            delete api.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Centralized login function
    const login = (newToken) => {
        setToken(newToken);
    };

    // Centralized logout function
    const logout = () => {
        setToken(null);
        // You can add a redirect here if needed, e.g., navigate('/login')
    };

    // The value provided to all consuming components
    const value = {
        token,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. Create the custom hook for easy consumption
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}