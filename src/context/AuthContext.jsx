import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [showLogin, setShowLogin] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);

    // Configure axios defaults
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    useEffect(() => {
        // Check if token is valid (optional: ping backend)
        if (token) {
            setUser({ username: 'admin' }); // Simple client-side persistence
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const res = await axios.post('http://localhost:3001/api/auth/login', { username, password });
            const { token: newToken, username: user } = res.data;

            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser({ username: user });
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            setShowLogin(false);
            setShowAdmin(true);
            return true;
        } catch (err) {
            console.error("Login failed", err);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        setShowAdmin(false);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            showLogin,
            setShowLogin,
            showAdmin,
            setShowAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};
