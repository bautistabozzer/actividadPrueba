// src/services/api.ts
import axios from 'axios';

// Crear una instancia de Axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Reemplaza con la URL de tu backend si es diferente
});

// Añadir un interceptor para incluir el token en cada solicitud
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
