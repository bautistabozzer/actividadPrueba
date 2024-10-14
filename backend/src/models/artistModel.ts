// src/models/artistModel.ts
import pool from '../utils/db';

export interface Artist {
    id: number;
    name: string;
    genre: string;
    debut_year: number;
    country: string;
    active: boolean;
    albums: number;
    created_at: Date;
}

export const getAllArtists = async (): Promise<Artist[]> => {
    const res = await pool.query('SELECT * FROM artists ORDER BY id ASC');
    return res.rows;
};

export const getArtistById = async (id: number): Promise<Artist | null> => {
    const res = await pool.query('SELECT * FROM artists WHERE id = $1', [id]);
    return res.rows[0] || null;
};

export const createArtist = async (artist: Omit<Artist, 'id' | 'created_at'>): Promise<Artist> => {
    const { name, genre, debut_year, country, active, albums } = artist;
    const res = await pool.query(
        `INSERT INTO artists (name, genre, debut_year, country, active, albums)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, genre, debut_year, country, active, albums]
    );
    return res.rows[0];
};

export const updateArtist = async (id: number, artist: Partial<Omit<Artist, 'id' | 'created_at'>>): Promise<Artist | null> => {
    const fields = [];
    const values: any[] = [];
    let index = 1;

    for (const key in artist) {
        fields.push(`${key} = $${index}`);
        values.push((artist as any)[key]);
        index++;
    }

    values.push(id);

    const query = `UPDATE artists SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    const res = await pool.query(query, values);
    return res.rows[0] || null;
};

export const deleteArtist = async (id: number): Promise<boolean> => {
    const res = await pool.query('DELETE FROM artists WHERE id = $1', [id]);
    return (res.rowCount ?? 0) > 0;
};
