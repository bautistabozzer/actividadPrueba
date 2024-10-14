import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByUsername, createUser } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            res.status(400).json({ message: 'Usuario ya existe' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const user = await createUser(username, password_hash);
        res.status(201).json({ message: 'Usuario creado', user: { id: user.id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);
        if (!user) {
            res.status(400).json({ message: 'Credenciales inválidas' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            res.status(400).json({ message: 'Credenciales inválidas' });
            return;
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};
