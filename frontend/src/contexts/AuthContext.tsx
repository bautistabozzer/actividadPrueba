// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService, register as registerService } from '../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: async () => {},
    register: async () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const data = await loginService(username, password);
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
        } catch (error: any) {
            // Manejo de errores (puedes mejorar esto según tus necesidades)
            throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    const register = async (username: string, password: string) => {
        try {
            await registerService(username, password);
            // Opcional: iniciar sesión automáticamente después del registro
            await login(username, password);
        } catch (error: any) {
            // Manejo de errores
            throw new Error(error.response?.data?.message || 'Error al registrar usuario');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
