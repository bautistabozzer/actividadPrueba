import pool from '../utils/db';

export interface User {
    id: number;
    username: string;
    password_hash: string;
    created_at: Date;
}

export const getUserByUsername = async (username: string): Promise<User | null> => {
    const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return res.rows[0] || null;
};

export const createUser = async (username: string, password_hash: string): Promise<User> => {
    const res = await pool.query(
        `INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *`,
        [username, password_hash]
    );
    return res.rows[0];
};
