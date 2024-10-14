// backend/src/routes/incomeDetails.ts
import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import upload from '../middlewares/upload';
import { procesarArchivo } from '../utils/incomeProcessor';

const router = express.Router();

// Mapeo de tipos de artistas a sus parámetros
const ARTIST_TYPES: { [key: number]: { ajusteUsd: number; multiplicador: number; porcentajeColaborador?: number } } = {
    1: { ajusteUsd: 0.70, multiplicador: 1 },
    2: { ajusteUsd: 0.70, multiplicador: 1.0968 },
    3: { ajusteUsd: 0.70, multiplicador: 1 }, // porcentajeColaborador será manejado separadamente
    4: { ajusteUsd: 0.70, multiplicador: 0.94 }
};

// Nuevos nombres de columnas
const nuevosNombres = {
    "payee": "ARTIST NAME",
    "service-name": "RETAILER",
    "territory": "TERRITORY",
    "product-title": "PRODUCT NAME",
    "isrc": "ISRC",
    "track-title": "TRACK NAME",
    "units": "QUANTITY",
    "usd-net-price": "TOTAL INGRESOS (USD)",
    "file-name": "FILE NAME",         // Nueva columna
    "period-end": "PERIOD END"        // Nueva columna
};

// Ruta para procesar el archivo de detalles de ingresos
router.post('/income-details', upload.single('archivo'), async (req: Request, res: Response) => {
    try {
        const tipoArtista = parseInt(req.body.tipo_artista);
        let multiplicador: number | undefined;
        let porcentajeColaborador: number | undefined;
        let formatoSalida: 'csv' | 'xlsx' = 'xlsx'; // Por defecto a Excel

        if (!ARTIST_TYPES[tipoArtista]) {
            res.status(400).json({ error: 'Tipo de artista inválido' });
            return;
        }

        if (tipoArtista === 3) {
            multiplicador = parseFloat(req.body.multiplicador);
            porcentajeColaborador = parseFloat(req.body.porcentaje_colaborador) / 100;

            if (isNaN(multiplicador) || isNaN(porcentajeColaborador)) {
                res.status(400).json({ error: 'Multiplicador y porcentaje colaborador deben ser números válidos' });
                return;
            }

            ARTIST_TYPES[tipoArtista].multiplicador = multiplicador;
            ARTIST_TYPES[tipoArtista].porcentajeColaborador = porcentajeColaborador;
        }

        const archivoOriginal = req.file ? req.file.path : null;

        if (!archivoOriginal) {
            res.status(400).json({ error: 'No se ha subido ningún archivo' });
            return;
        }

        // Procesar el archivo
        const archivoProcesado = await procesarArchivo(
            archivoOriginal,
            nuevosNombres,
            ARTIST_TYPES[tipoArtista],
            formatoSalida
        );

        res.json({ mensaje: 'Archivo procesado con éxito', archivoProcesado: path.basename(archivoProcesado) });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Error al procesar el archivo' });
    }
});

// Ruta para descargar el archivo procesado
router.get('/download/:filename', (req: Request, res: Response) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);

    if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: 'Archivo no encontrado' });
        return;
    }

    res.download(filePath, filename, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al descargar el archivo' });
        }
    });
});

export default router;
