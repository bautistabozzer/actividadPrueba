// src/controllers/artistController.ts
import { Request, Response } from 'express';
import { getAllArtists, getArtistById, createArtist, updateArtist, deleteArtist } from '../models/artistModel';

// Definir las funciones controladoras con Promise<void>
export const getArtists = async (req: Request, res: Response): Promise<void> => {
    try {
        const artists = await getAllArtists();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener artistas' });
    }
};

export const getArtist = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const artist = await getArtistById(id);
        if (!artist) {
            res.status(404).json({ message: 'Artista no encontrado' });
            return;
        }
        res.json(artist);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el artista' });
    }
};

export const addArtist = async (req: Request, res: Response): Promise<void> => {
    const artistData = req.body;
    try {
        const newArtist = await createArtist(artistData);
        res.status(201).json(newArtist);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el artista' });
    }
};

export const modifyArtist = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const artistData = req.body;
    try {
        const updatedArtist = await updateArtist(id, artistData);
        if (!updatedArtist) {
            res.status(404).json({ message: 'Artista no encontrado' });
            return;
        }
        res.json(updatedArtist);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el artista' });
    }
};

export const removeArtist = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const success = await deleteArtist(id);
        if (!success) {
            res.status(404).json({ message: 'Artista no encontrado' });
            return;
        }
        res.json({ message: 'Artista eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el artista' });
    }
};
