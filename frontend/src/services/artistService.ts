// src/services/artistService.ts
import api from './api';

export interface Artist {
    id: number;
    name: string;
    genre: string;
    debut_year: number;
    country: string;
    active: boolean;
    albums: number;
    created_at: string;
}

export const fetchArtists = async (): Promise<Artist[]> => {
    const response = await api.get('/artists');
    return response.data;
};

export const fetchArtistById = async (id: number): Promise<Artist> => {
    const response = await api.get(`/artists/${id}`);
    return response.data;
};

export const addArtist = async (artist: Omit<Artist, 'id' | 'created_at'>): Promise<Artist> => {
    const response = await api.post('/artists', artist);
    return response.data;
};

export const updateArtist = async (id: number, artist: Partial<Omit<Artist, 'id' | 'created_at'>>): Promise<Artist> => {
    const response = await api.put(`/artists/${id}`, artist);
    return response.data;
};

export const deleteArtist = async (id: number): Promise<void> => {
    await api.delete(`/artists/${id}`);
};
