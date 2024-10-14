// src/services/authService.ts
import api from './api';

interface LoginResponse {
    token: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
};

export const register = async (username: string, password: string): Promise<void> => {
    await api.post('/auth/register', { username, password });
};
