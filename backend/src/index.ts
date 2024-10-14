// backend/src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import artistRoutes from './routes/artistRoutes';
import incomeDetailsRouter from './routes/incomeDetails'; // Importar la nueva ruta

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Cambia esto a la URL de tu frontend en producción
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api', incomeDetailsRouter); // Usar la nueva ruta

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Music App funcionando');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
