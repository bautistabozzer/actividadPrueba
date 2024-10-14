// src/services/userService.ts
import api from './api';
import { UserData } from '../types';

export const fetchUserData = async (): Promise<UserData> => {
  const response = await api.get('/user'); // Asegúrate de que este endpoint exista en tu backend
  return response.data;
};
