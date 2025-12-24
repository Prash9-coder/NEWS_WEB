import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            try {
                // Verify token with API
                // const response = await verifyToken(token);
                // setUser(response.user);

                // For demo
                setUser({ name: 'Admin User', email: 'admin@iqar.com', role: 'admin' });
            } catch (error) {
                localStorage.removeItem('adminToken');
            }
        }
        setLoading(false);
    };

    const login = async (credentials) => {
        // const response = await loginAPI(credentials);
        // localStorage.setItem('adminToken', response.token);
        // setUser(response.user);
        return true;
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setUser(null);
        navigate('/admin/login');
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};